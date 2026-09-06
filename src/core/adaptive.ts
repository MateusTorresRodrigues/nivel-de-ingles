// Seleção adaptativa da próxima questão — lógica pura, sem dependência de UI ou de rede.
// Não repete uma questão já mostrada; se não houver questão no nível-alvo, busca no nível
// mais próximo disponível (spread crescente ±1, ±2...).

import { CEFR_ORDER } from "../data/questionBank";
import type { Questao } from "../lib/types";

export function pickQuestion(
  questions: Questao[],
  levelIdx: number,
  asked: number[],
): Questao | null {
  for (let spread = 0; spread < 6; spread++) {
    for (const dir of [0, -1, 1]) {
      const idx = levelIdx + dir * spread;
      if (idx < 0 || idx > 5) continue;
      const pool = questions.filter(
        (q) => q.level === CEFR_ORDER[idx] && asked.indexOf(q.id) === -1,
      );
      if (pool.length) return pool[Math.floor(Math.random() * pool.length)];
    }
  }
  return null;
}

/** Duas respostas certas seguidas sobem um nível; duas erradas seguidas descem um nível;
 * a sequência de acerto/erro zera ao trocar de direção. */
export function proximoNivel(
  levelIdx: number,
  streakC: number,
  streakW: number,
  correct: boolean,
): { levelIdx: number; streakC: number; streakW: number } {
  if (correct) {
    streakC += 1;
    streakW = 0;
    if (streakC >= 2 && levelIdx < 5) {
      levelIdx += 1;
      streakC = 0;
    }
  } else {
    streakW += 1;
    streakC = 0;
    if (streakW >= 2 && levelIdx > 0) {
      levelIdx -= 1;
      streakW = 0;
    }
  }
  return { levelIdx, streakC, streakW };
}
