// Tipos centrais do teste de nivelamento — espelham o schema pensado para o Supabase
// em architecture.html (tabelas questions/results/answers), mas hoje vivem só no front-end.

export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type Categoria = "Grammar" | "Vocabulary" | "Reading" | "Sentence Structure";

export interface Questao {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  level: CefrLevel;
  category: Categoria;
  topic: string;
  difficulty: number; // 1–6
  explanation: string;
}

export interface RespostaDada {
  id: number;
  selected: string;
  correct: boolean;
  level: CefrLevel;
  category: Categoria;
  topic: string;
  difficulty: number;
}

export interface ResultadoRegistrado {
  id: number;
  name: string;
  email: string;
  goal: string;
  level: CefrLevel;
  percent: number;
  date: string; // ISO
  answered: number;
}

export interface NivelInfo {
  name: string;
  description: string;
  next: CefrLevel | null;
  focus: string[];
}

export interface CategoriaDesempenho {
  name: Categoria;
  pct: number | null;
  n: number;
}

export interface ResultadoAvaliado {
  percent: number;
  level: CefrLevel;
  levelIdx: number;
  info: NivelInfo;
  cats: CategoriaDesempenho[];
  consistency: number;
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
}
