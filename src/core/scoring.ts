// Cálculo do resultado final — lógica pura, sem dependência de UI ou de rede.
// Portado de app.html `evaluate()`. Em produção, roda no servidor (a resposta correta
// não deve ficar acessível ao cliente) — ver "core/scoring" em architecture.html.

import { CATEGORIES, CEFR_ORDER, LEVEL_INFO } from "../data/questionBank";
import type { CefrLevel, CategoriaDesempenho, RespostaDada, ResultadoAvaliado } from "../lib/types";

const NOME_PONTO_FORTE: Record<string, string> = {
  Grammar: "Boa compreensão gramatical",
  Vocabulary: "Bom vocabulário",
  Reading: "Boa interpretação de textos",
  "Sentence Structure": "Boa construção de frases",
};

export function evaluate(answers: RespostaDada[]): ResultadoAvaliado | null {
  if (!answers.length) return null;

  const wSum = answers.reduce((s, x) => s + x.difficulty, 0);
  const wGot = answers.reduce((s, x) => s + (x.correct ? x.difficulty : 0), 0);
  const percent = Math.round((wGot / wSum) * 100);

  // Acurácia por nível → nível mais alto sustentado (mín. 60% de acerto em pelo menos 2 questões)
  const byLevel: Partial<Record<CefrLevel, { n: number; c: number }>> = {};
  answers.forEach((x) => {
    const d = (byLevel[x.level] ??= { n: 0, c: 0 });
    d.n += 1;
    d.c += x.correct ? 1 : 0;
  });
  let levelIdx = 0;
  CEFR_ORDER.forEach((lv, i) => {
    const d = byLevel[lv];
    if (d && d.n >= 2 && d.c / d.n >= 0.6) levelIdx = Math.max(levelIdx, i);
    else if (d && d.n === 1 && d.c === 1) levelIdx = Math.max(levelIdx, i - 1 < 0 ? 0 : i);
  });
  if (percent >= 88 && levelIdx < 5) levelIdx += 1;
  if (percent < 35 && levelIdx > 0) levelIdx -= 1;
  const level = CEFR_ORDER[levelIdx];

  const cats: CategoriaDesempenho[] = CATEGORIES.map((name) => {
    const set = answers.filter((x) => x.category === name);
    const w = set.reduce((s, x) => s + x.difficulty, 0);
    const g = set.reduce((s, x) => s + (x.correct ? x.difficulty : 0), 0);
    return { name, pct: w ? Math.round((g / w) * 100) : null, n: set.length };
  }).filter((c) => c.n > 0);

  // Consistência: quantas vezes o desempenho alternou entre acerto e erro
  let flips = 0;
  for (let i = 1; i < answers.length; i++) if (answers[i].correct !== answers[i - 1].correct) flips += 1;
  const consistency = Math.round(100 - (flips / Math.max(1, answers.length - 1)) * 60);

  const strengths: string[] = [];
  cats
    .filter((c) => (c.pct ?? 0) >= 75)
    .sort((x, y) => (y.pct ?? 0) - (x.pct ?? 0))
    .slice(0, 3)
    .forEach((c) => strengths.push(NOME_PONTO_FORTE[c.name]));
  const strongTopics = [
    ...new Set(answers.filter((x) => x.correct && x.difficulty >= 4).map((x) => x.topic)),
  ].slice(0, 2);
  strongTopics.forEach((t) => strengths.push("Domínio de " + t.toLowerCase()));
  if (!strengths.length) strengths.push("Boa base para começar a estudar de forma estruturada");

  const weaknesses = [...new Set(answers.filter((x) => !x.correct).map((x) => x.topic))].slice(0, 4);
  if (!weaknesses.length) weaknesses.push("Nenhuma lacuna clara neste teste — vale um teste mais longo");

  const info = LEVEL_INFO[level];
  const recommendation = info.next
    ? "Seu nível atual é " + level + ". Para avançar para " + info.next + ", recomendamos focar em " + info.focus.join(", ") + "."
    : "Seu nível atual é C2. Para manter e refinar esse domínio, recomendamos " + info.focus.join(", ") + ".";

  return { percent, level, levelIdx, info, cats, consistency, strengths, weaknesses: weaknesses.slice(0, 4), recommendation };
}
