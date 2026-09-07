import type { Questao } from "../../lib/types";
import { cn } from "../../lib/utils";

const LETRAS = ["A", "B", "C", "D"];

interface QuestionCardProps {
  questao: Questao;
  /** Alternativa já escolhida (trava a interação até avançar para a próxima questão). */
  locked: string | null;
  onSelect: (option: string) => void;
}

export function QuestionCard({ questao, locked, onSelect }: QuestionCardProps) {
  return (
    <div
      key={questao.id}
      className="animate-q-in bg-white border border-fg/10 rounded-[20px] py-[26px] px-[22px] shadow-card"
    >
      <div className="flex items-center gap-2.5 mb-[18px]">
        <span className="text-[10.5px] font-semibold tracking-[0.1em] text-accent uppercase">{questao.category}</span>
        <span className="w-[3px] h-[3px] rounded-full bg-fg/25" />
        <span className="text-[10.5px] tracking-[0.1em] text-fg/40">{questao.topic}</span>
      </div>

      <p className="m-0 mb-6 text-[19.5px] leading-[1.45] -tracking-[0.015em] whitespace-pre-line [text-wrap:pretty]">
        {questao.question}
      </p>

      <div className="grid gap-[9px]">
        {questao.options.map((option, i) => {
          const selected = locked === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              disabled={!!locked}
              className={cn(
                "flex items-center gap-3 w-full text-left text-[15.5px] leading-[1.4] -tracking-[0.01em] py-3.5 px-[15px] rounded-xl transition-[border-color,background,transform,box-shadow] duration-200",
                selected
                  ? "border-[1.5px] border-accent bg-accent-soft-2 text-fg scale-[0.99] shadow-[0_0_0_4px_var(--color-accent-glow)] cursor-default"
                  : locked
                    ? "border-[1.5px] border-fg/12 bg-white text-fg/50 cursor-default"
                    : "border-[1.5px] border-fg/12 bg-white text-fg cursor-pointer hover:border-fg/34 hover:bg-fg/[0.02] hover:-translate-y-px",
              )}
            >
              <span
                className={cn(
                  "flex-none w-6 h-6 rounded-[7px] flex items-center justify-center text-[11.5px] font-semibold transition-colors duration-200",
                  selected ? "bg-accent text-white" : "bg-fg/7 text-fg/55",
                )}
              >
                {LETRAS[i]}
              </span>
              <span className="flex-1 text-left">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
