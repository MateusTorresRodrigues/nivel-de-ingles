import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "../components/teste/ProgressBar";
import { QuestionCard } from "../components/teste/QuestionCard";
import { TEST_LENGTH, useCefr } from "../contexts/CefrContext";

export function Teste() {
  const navigate = useNavigate();
  const { state, selectOption } = useCefr();
  const { current } = state;

  useEffect(() => {
    if (current) return;
    // Sem questão ativa: ou o teste acabou de terminar (há respostas -> foi para o resultado),
    // ou não existe teste em andamento (nunca começou / já foi abandonado) -> volta à landing.
    navigate(state.answers.length > 0 ? "/resultado" : "/", { replace: true });
  }, [current, state.answers.length, navigate]);

  if (!current) return null;

  const qNumber = state.answers.length + 1;
  const percent = Math.round(((qNumber - 1) / TEST_LENGTH) * 100);
  const left = TEST_LENGTH - qNumber;
  const remainingLabel = left <= 0 ? "última questão" : left === 1 ? "falta 1" : `faltam ${left}`;

  return (
    <main className="w-full max-w-[560px] pt-[34px]">
      <div className="flex items-baseline justify-between mb-2.5">
        <span className="text-[13px] font-semibold -tracking-[0.01em]">
          Questão {qNumber} de {TEST_LENGTH}
        </span>
        <span className="text-[12.5px] text-fg/48">{remainingLabel}</span>
      </div>

      <ProgressBar percent={percent} />

      <QuestionCard questao={current} locked={state.locked} onSelect={selectOption} />

      <div className="flex justify-center mt-5">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="border-none bg-transparent text-[12.5px] text-fg/42 cursor-pointer"
        >
          Sair do teste
        </button>
      </div>
    </main>
  );
}
