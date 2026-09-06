interface ProgressBarProps {
  percent: number;
}

export function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="h-1.5 rounded-full bg-fg/9 overflow-hidden mb-[34px]">
      <div
        className="h-full bg-accent rounded-full transition-[width] duration-[350ms] ease-[cubic-bezier(.4,0,.2,1)]"
        style={{ width: `${Math.max(2, percent)}%` }}
      />
    </div>
  );
}
