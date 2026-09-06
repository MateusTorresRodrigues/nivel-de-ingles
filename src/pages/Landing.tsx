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
    <main className="w-full max-w-[560px] pt-[52px] animate-fade-up">
      <p className="m-0 mb-[18px] inline-flex items-center gap-[7px] text-xs text-accent-text bg-accent-soft rounded-full py-1.5 px-3">
        <span className="w-[5px] h-[5px] rounded-full bg-accent" />
        Teste gratuito · resultado imediato
      </p>

      <h1 className="m-0 mb-3.5 font-display font-normal text-[clamp(38px,11vw,54px)] leading-[1.02] -tracking-[0.025em]">
        Descubra seu nível de inglês
      </h1>

      <p className="m-0 mb-8 text-[16.5px] leading-[1.55] text-fg/62 max-w-[46ch] [text-wrap:pretty]">
        Faça um teste rápido e descubra qual é o seu nível de inglês de acordo com o padrão internacional CEFR.
      </p>

      <div className="grid gap-px bg-fg/10 border border-fg/10 rounded-2xl overflow-hidden mb-7">
        {INFO_ROWS.map((row) => (
          <div key={row.label} className="flex items-baseline gap-3.5 bg-white py-[15px] px-[18px]">
            <span className="text-[11px] font-semibold tracking-[0.08em] text-accent w-[62px] flex-none">{row.label}</span>
            <span className="text-[14.5px] leading-[1.4]">{row.value}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate("/cadastro")}
        className="w-full border-none rounded-[14px] bg-accent text-white text-base font-semibold -tracking-[0.01em] py-[17px] px-5 cursor-pointer transition-[background,transform] duration-[180ms] shadow-[0_1px_2px_rgba(28,27,24,.14)] hover:bg-accent-hover active:translate-y-px"
      >
        Começar teste
      </button>

      {hasSaved && (
        <button
          type="button"
          onClick={() => navigate("/teste")}
          className="w-full mt-2.5 border border-fg/16 rounded-[14px] bg-transparent text-fg text-[14.5px] font-medium py-3.5 px-5 cursor-pointer transition-colors duration-[180ms] hover:bg-fg/4"
        >
          Retomar teste em andamento
        </button>
      )}

      <p className="m-0 mt-[22px] text-[12.5px] leading-[1.55] text-fg/45 [text-wrap:pretty]">
        Este teste oferece uma estimativa inicial e não substitui uma avaliação completa realizada por um professor.
      </p>
    </main>
  );
}
