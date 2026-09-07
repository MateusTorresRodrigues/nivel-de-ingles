interface ProgressBarProps {
  percent: number;
}

export function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="h-1.5 rounded-full bg-fg/9 overflow-hidden mb-[34px]">
      <div
        className="relative h-full bg-accent rounded-full transition-[width] duration-[450ms] ease-[cubic-bezier(.16,.8,.3,1)]"
        style={{ width: `${Math.max(2, percent)}%` }}
      >
        {/* Brilho sutil na ponta da barra — reforça a sensação de progresso ativo. */}
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-accent blur-[3px] opacity-70" />
      </div>
    </div>
  );
}
