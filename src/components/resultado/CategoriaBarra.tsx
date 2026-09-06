import type { CategoriaDesempenho } from "../../lib/types";

interface CategoriaBarraProps {
  categoria: CategoriaDesempenho;
}

export function CategoriaBarra({ categoria }: CategoriaBarraProps) {
  const pct = categoria.pct ?? 0;
  return (
    <div>
      <div className="flex justify-between items-baseline mb-[7px]">
        <span className="text-[14.5px] font-medium -tracking-[0.01em]">{categoria.name}</span>
        <span className="text-[14.5px] text-fg/55 tabular-nums">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-fg/8 overflow-hidden">
        <div
          className={`h-full rounded-full animate-grow-bar ${pct >= 70 ? "bg-accent" : "bg-warn"}`}
          style={{ width: `${Math.max(2, pct)}%` }}
        />
      </div>
    </div>
  );
}
