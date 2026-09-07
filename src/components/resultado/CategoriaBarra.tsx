import type { CategoriaDesempenho } from "../../lib/types";
import { CountUp } from "./CountUp";

interface CategoriaBarraProps {
  categoria: CategoriaDesempenho;
  /** Atraso (ms) antes da barra começar a crescer — usado para revelar as categorias em sequência. */
  delay?: number;
}

export function CategoriaBarra({ categoria, delay = 0 }: CategoriaBarraProps) {
  const pct = categoria.pct ?? 0;
  return (
    <div>
      <div className="flex justify-between items-baseline mb-[7px]">
        <span className="text-[14.5px] font-medium -tracking-[0.01em]">{categoria.name}</span>
        <span className="text-[14.5px] text-fg/55 tabular-nums">
          <CountUp value={pct} suffix="%" duration={700} />
        </span>
      </div>
      <div className="h-2 rounded-full bg-fg/8 overflow-hidden">
        <div
          className={`h-full rounded-full animate-grow-bar ${pct >= 70 ? "bg-accent" : "bg-warn"}`}
          style={{ width: `${Math.max(2, pct)}%`, animationDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}
