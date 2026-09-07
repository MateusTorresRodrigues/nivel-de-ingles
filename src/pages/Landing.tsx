import { useNavigate } from "react-router-dom";
import { useCefr } from "../contexts/CefrContext";

const INFO_ROWS = [
  { label: "DURAÇÃO", value: "Aproximadamente 10–15 minutos" },
  { label: "ESCOPO", value: "Questões de gramática, vocabulário e interpretação" },
  { label: "FORMATO", value: "Adaptativo — a dificuldade acompanha suas respostas" },
  { label: "NÍVEIS", value: "A1 · A2 · B1 · B2 · C1 · C2" },
];

export function Landing() {
  const navigate = useNavigate();
  const { hasSaved } = useCefr();

  return (
    <main className="relative w-full max-w-[560px] pt-[52px]">
      {/* Gradiente decorativo — profundidade sutil atrás do hero, sem competir com o texto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-32 -z-10 w-[420px] h-[420px] rounded-full blur-3xl opacity-60 animate-blob"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-soft) 0%, var(--color-accent-soft-2) 45%, transparent 72%)",
        }}
      />

      <p className="animate-fade-up m-0 mb-[18px] inline-flex items-center gap-[7px] text-xs text-accent-text bg-accent-soft rounded-full py-1.5 px-3">
        <span className="w-[5px] h-[5px] rounded-full bg-accent" />
        Teste gratuito · resultado imediato
      </p>

      <h1 className="animate-fade-up stagger-1 m-0 mb-3.5 font-display font-normal text-[clamp(38px,11vw,54px)] leading-[1.02] -tracking-[0.025em]">
        Descubra seu nível de inglês
      </h1>

      <p className="animate-fade-up stagger-2 m-0 mb-8 text-[16.5px] leading-[1.55] text-fg/62 max-w-[46ch] [text-wrap:pretty]">
        Faça um teste rápido e descubra qual é o seu nível de inglês de acordo com o padrão internacional CEFR.
      </p>

      <div className="animate-fade-up stagger-3 grid gap-px bg-fg/10 border border-fg/10 rounded-2xl overflow-hidden mb-7 shadow-card">
        {INFO_ROWS.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline gap-3.5 bg-white py-[15px] px-[18px] transition-colors duration-150 hover:bg-accent-soft-2/60"
          >
            <span className="text-[11px] font-semibold tracking-[0.08em] text-accent w-[62px] flex-none">{row.label}</span>
            <span className="text-[14.5px] leading-[1.4]">{row.value}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate("/cadastro")}
        className="animate-fade-up stagger-4 w-full border-none rounded-[14px] bg-accent text-white text-base font-semibold -tracking-[0.01em] py-[17px] px-5 cursor-pointer transition-[background,box-shadow,transform] duration-200 shadow-button hover:bg-accent-hover hover:shadow-button-hover hover:-translate-y-0.5 active:translate-y-0"
      >
        Começar teste
      </button>

      {hasSaved && (
        <button
          type="button"
          onClick={() => navigate("/teste")}
          className="animate-fade-up stagger-5 w-full mt-2.5 border border-fg/16 rounded-[14px] bg-transparent text-fg text-[14.5px] font-medium py-3.5 px-5 cursor-pointer transition-colors duration-[180ms] hover:bg-fg/4"
        >
          Retomar teste em andamento
        </button>
      )}

      <p className="animate-fade-up stagger-5 m-0 mt-[22px] text-[12.5px] leading-[1.55] text-fg/45 [text-wrap:pretty]">
        Este teste oferece uma estimativa inicial e não substitui uma avaliação completa realizada por um professor.
      </p>
    </main>
  );
}
