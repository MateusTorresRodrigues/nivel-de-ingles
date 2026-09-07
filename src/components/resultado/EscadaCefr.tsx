import { CEFR_ORDER } from "../../data/questionBank";
import { cn } from "../../lib/utils";

interface EscadaCefrProps {
  levelIdx: number;
}

export function EscadaCefr({ levelIdx }: EscadaCefrProps) {
  return (
    <div className="flex gap-1 mb-[34px]">
      {CEFR_ORDER.map((code, i) => {
        const active = i === levelIdx;
        const reached = i <= levelIdx;
        return (
          <div
            key={code}
            className={cn(
              "flex items-center justify-center self-end rounded-[10px] transition-all duration-500",
              active ? "flex-[1.6]" : "flex-1",
              active ? "h-[50px]" : "h-10",
              active ? "bg-accent shadow-[0_6px_18px_-4px_rgb(26_85_208_/_0.5)]" : reached ? "bg-accent-reached" : "bg-fg/7",
            )}
          >
            <span
              className={cn(
                "font-semibold -tracking-[0.01em] transition-all duration-500",
                active ? "text-base" : "text-[12.5px]",
                active ? "text-white" : reached ? "text-accent-text-2" : "text-fg/40",
              )}
            >
              {code}
            </span>
          </div>
        );
      })}
    </div>
  );
}
