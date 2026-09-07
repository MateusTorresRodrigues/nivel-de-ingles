import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  suffix?: string;
  /** ms */
  duration?: number;
  className?: string;
}

/** Anima de 0 até `value` com easing suave — usado nos números do resultado (percentual, etc). */
export function CountUp({ value, suffix = "", duration = 900, className }: CountUpProps) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    const from = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplay(Math.round(from + (value - from) * eased));
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span className={className}>
      {display}
      {suffix}
    </span>
  );
}
