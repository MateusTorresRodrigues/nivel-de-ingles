import { createContext, useContext, useState, type ReactNode } from "react";
import { QUESTIONS } from "../data/questionBank";
import { pickQuestion, proximoNivel } from "../core/adaptive";
import { evaluate } from "../core/scoring";
import {
  ADMIN_QUESTIONS_KEY,
  RESULTS_KEY,
  TEST_PROGRESS_KEY,
  readStorage,
  removeStorage,
  writeStorage,
} from "../lib/storage";
import type { Questao, RespostaDada, ResultadoRegistrado } from "../lib/types";

/** Nº de questões por teste (`testLength` no protótipo — hoje fixo, sem tela para ajustar). */
export const TEST_LENGTH = 18;

interface ProgressoSalvo {
  name: string;
  email: string;
  goal: string;
  asked: number[];
  answers: RespostaDada[];
  current: Questao | null;
  levelIdx: number;
  streakC: number;
  streakW: number;
}

interface EstadoCefr extends ProgressoSalvo {
  questions: Questao[];
  results: ResultadoRegistrado[];
  locked: string | null;
  anim: number;
}

function estadoInicial(): EstadoCefr {
  const saved = readStorage<Partial<ProgressoSalvo>>(TEST_PROGRESS_KEY, {});
  const questions = readStorage<Questao[] | null>(ADMIN_QUESTIONS_KEY, null) ?? QUESTIONS;
  const results = readStorage<ResultadoRegistrado[]>(RESULTS_KEY, []);
  return {
    questions,
    results,
    name: saved.name ?? "",
    email: saved.email ?? "",
    goal: saved.goal ?? "",
    asked: saved.asked ?? [],
    answers: saved.answers ?? [],
    current: saved.current ?? null,
    levelIdx: saved.levelIdx ?? 1,
    streakC: saved.streakC ?? 0,
    streakW: saved.streakW ?? 0,
    locked: null,
    anim: 0,
  };
}

function persistProgress(s: EstadoCefr) {
  const progresso: ProgressoSalvo = {
    name: s.name,
    email: s.email,
    goal: s.goal,
    asked: s.asked,
    answers: s.answers,
    current: s.current,
    levelIdx: s.levelIdx,
    streakC: s.streakC,
    streakW: s.streakW,
  };
  writeStorage(TEST_PROGRESS_KEY, progresso);
}

/** Registra o teste concluído e devolve o estado já com `current: null`. */
function finishInternal(prev: EstadoCefr, answers: RespostaDada[]): EstadoCefr {
  const next: EstadoCefr = { ...prev, answers, current: null, locked: null };
  persistProgress(next);

  const r = evaluate(answers);
  if (r) {
    const registro: ResultadoRegistrado = {
      id: Date.now(),
      name: prev.name || "Sem nome",
      email: prev.email || "",
      goal: prev.goal || "—",
      level: r.level,
      percent: r.percent,
      date: new Date().toISOString(),
      answered: answers.length,
    };
    next.results = [registro, ...prev.results];
    writeStorage(RESULTS_KEY, next.results);
  }
  return next;
}

interface CefrContextValue {
  state: EstadoCefr;
  /** Há um teste em andamento (retomável) salvo localmente. */
  hasSaved: boolean;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setGoal: (v: string) => void;
  /** Começa (ou reinicia do zero) um teste — exige `name` preenchido. */
  beginTest: () => void;
  /** Aluno escolheu uma alternativa; a resposta trava por 260ms antes de avançar. */
  selectOption: (option: string) => void;
  /** Limpa o progresso salvo e volta ao estado inicial (para tentar de novo). */
  restart: () => void;
}

const CefrContext = createContext<CefrContextValue | null>(null);

export function CefrProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EstadoCefr>(estadoInicial);

  function update(patch: Partial<EstadoCefr>, persist = false) {
    setState((prev) => {
      const next = { ...prev, ...patch };
      if (persist) persistProgress(next);
      return next;
    });
  }

  function beginTest() {
    if (!state.name.trim()) return;
    const first = pickQuestion(state.questions, 1, []);
    if (!first) return;
    update(
      { asked: [first.id], answers: [], current: first, levelIdx: 1, streakC: 0, streakW: 0, locked: null, anim: 0 },
      true,
    );
  }

  function selectOption(option: string) {
    const q = state.current;
    if (!q || state.locked) return;
    const correct = option === q.correctAnswer;
    setState((prev) => ({ ...prev, locked: option }));

    window.setTimeout(() => {
      setState((prev) => {
        const answers = prev.answers.concat([
          { id: q.id, selected: option, correct, level: q.level, category: q.category, topic: q.topic, difficulty: q.difficulty },
        ]);
        const { levelIdx, streakC, streakW } = proximoNivel(prev.levelIdx, prev.streakC, prev.streakW, correct);

        if (answers.length >= TEST_LENGTH) return finishInternal(prev, answers);

        const asked = prev.asked.concat([q.id]);
        const nq = pickQuestion(prev.questions, levelIdx, asked);
        if (!nq) return finishInternal(prev, answers);

        const next: EstadoCefr = {
          ...prev,
          answers,
          asked: asked.concat([nq.id]),
          current: nq,
          levelIdx,
          streakC,
          streakW,
          locked: null,
          anim: 1 - prev.anim,
        };
        persistProgress(next);
        return next;
      });
    }, 260);
  }

  function restart() {
    removeStorage(TEST_PROGRESS_KEY);
    update({ answers: [], asked: [], current: null, locked: null });
  }

  const value: CefrContextValue = {
    state,
    hasSaved: state.current !== null,
    setName: (v) => update({ name: v }),
    setEmail: (v) => update({ email: v }),
    setGoal: (v) => update({ goal: v }),
    beginTest,
    selectOption,
    restart,
  };

  return <CefrContext.Provider value={value}>{children}</CefrContext.Provider>;
}

export function useCefr() {
  const ctx = useContext(CefrContext);
  if (!ctx) throw new Error("useCefr deve ser usado dentro de <CefrProvider>");
  return ctx;
}
