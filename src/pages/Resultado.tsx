import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CategoriaBarra } from "../components/resultado/CategoriaBarra";
import { EscadaCefr } from "../components/resultado/EscadaCefr";
import { evaluate } from "../core/scoring";
import { useCefr } from "../contexts/CefrContext";

export function Resultado() {
  const navigate = useNavigate();
  const { state, restart } = useCefr();
  const resultado = useMemo(() => evaluate(state.answers), [state.answers]);

  useEffect(() => {
    if (!resultado) navigate("/", { replace: true });
  }, [resultado, navigate]);

  if (!resultado) return null;

  const primeiroNome = state.name ? state.name.split(" ")[0] : "";
  const greeting = primeiroNome ? `${primeiroNome}, aqui está o seu resultado` : "Aqui está o seu resultado";

  function fazerNovamente() {
    restart();
    navigate("/");
  }

  return (
    <main className="w-full max-w-[560px] pt-11 animate-fade-up">
      <p className="m-0 mb-1.5 text-[13px] text-fg/50">{greeting}</p>
      <h2 className="m-0 mb-1.5 font-display font-normal text-[clamp(30px,8.5vw,40px)] leading-[1.08] -tracking-[0.025em]">
        Seu nível é {resultado.level} — {resultado.info.name}
      </h2>
      <p className="m-0 mb-7 text-[15.5px] leading-[1.55] text-fg/62 [text-wrap:pretty]">{resultado.info.description}</p>

      <div className="flex gap-2.5 mb-[26px]">
        <div className="flex-1 bg-white border border-fg/10 rounded-2xl p-[18px]">
          <div className="text-[11px] font-semibold tracking-[0.08em] text-fg/45 mb-1.5">PONTUAÇÃO GERAL</div>
          <div className="font-display text-[40px] leading-none -tracking-[0.03em]">{resultado.percent}%</div>
        </div>
        <div className="flex-1 bg-white border border-fg/10 rounded-2xl p-[18px]">
          <div className="text-[11px] font-semibold tracking-[0.08em] text-fg/45 mb-1.5">CONSISTÊNCIA</div>
          <div className="font-display text-[40px] leading-none -tracking-[0.03em]">{resultado.consistency}%</div>
        </div>
      </div>

      <EscadaCefr levelIdx={resultado.levelIdx} />

      <h3 className="m-0 mb-4 text-[13px] font-semibold tracking-[0.04em]">DESEMPENHO POR CATEGORIA</h3>
      <div className="grid gap-4 mb-9">
        {resultado.cats.map((cat) => (
          <CategoriaBarra key={cat.name} categoria={cat} />
        ))}
      </div>

      <div className="grid gap-2.5 mb-8">
        <div className="bg-white border border-fg/10 rounded-2xl p-5">
          <h3 className="m-0 mb-3 text-[13px] font-semibold tracking-[0.04em] text-accent-text">SEUS PONTOS FORTES</h3>
          <ul className="m-0 p-0 list-none grid gap-2">
            {resultado.strengths.map((item) => (
              <li key={item} className="text-[14.5px] leading-[1.45] flex gap-2.5">
                <span className="text-accent">+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-fg/10 rounded-2xl p-5">
          <h3 className="m-0 mb-3 text-[13px] font-semibold tracking-[0.04em] text-warn-dark">PONTOS PARA MELHORAR</h3>
          <ul className="m-0 p-0 list-none grid gap-2">
            {resultado.weaknesses.map((item) => (
              <li key={item} className="text-[14.5px] leading-[1.45] flex gap-2.5">
                <span className="text-warn">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-ink rounded-[18px] p-6 mb-3.5">
        <h3 className="m-0 mb-2.5 text-[11.5px] font-semibold tracking-[0.1em] text-white/55">RECOMENDAÇÃO PERSONALIZADA</h3>
        <p className="m-0 mb-5 text-base leading-[1.5] text-white [text-wrap:pretty]">{resultado.recommendation}</p>
        <button
          type="button"
          className="w-full border-none rounded-xl bg-white text-ink text-[15px] font-semibold py-[15px] px-[18px] cursor-pointer transition-opacity duration-[180ms] hover:opacity-88"
        >
          Quero melhorar meu inglês
        </button>
      </div>

      <button
        type="button"
        onClick={fazerNovamente}
        className="w-full border border-fg/16 rounded-[14px] bg-transparent text-fg text-[14.5px] font-medium py-3.5 px-5 cursor-pointer transition-colors duration-[180ms] hover:bg-fg/4"
      >
        Fazer o teste novamente
      </button>

      <p className="m-0 mt-5 text-[12.5px] leading-[1.55] text-fg/45 [text-wrap:pretty]">
        Estimativa baseada em {state.answers.length} questões ponderadas por dificuldade. Não substitui uma avaliação
        completa com um professor.
      </p>
    </main>
  );
}
