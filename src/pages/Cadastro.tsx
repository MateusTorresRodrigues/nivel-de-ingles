import { useNavigate } from "react-router-dom";
import { GOALS } from "../data/questionBank";
import { useCefr } from "../contexts/CefrContext";
import { cn } from "../lib/utils";

export function Cadastro() {
  const navigate = useNavigate();
  const { state, setName, setEmail, setGoal, beginTest } = useCefr();
  const canStart = state.name.trim().length > 0;

  function iniciarAvaliacao() {
    if (!canStart) return;
    beginTest();
    navigate("/teste");
  }

  return (
    <main className="w-full max-w-[560px] pt-11 animate-fade-up-sm">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="border-none bg-transparent p-0 mb-[26px] text-[13px] text-fg/50 cursor-pointer"
      >
        ← Voltar
      </button>

      <h2 className="m-0 mb-2 font-display font-normal text-[34px] leading-[1.1] -tracking-[0.02em]">Antes de começar</h2>
      <p className="m-0 mb-[30px] text-[15px] leading-[1.5] text-fg/60">
        Usamos essas informações para personalizar sua recomendação de estudo.
      </p>

      <label htmlFor="nome" className="block text-[12.5px] font-semibold tracking-[0.03em] mb-2">
        NOME
      </label>
      <input
        id="nome"
        type="text"
        value={state.name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Como podemos te chamar?"
        className="w-full border border-fg/14 bg-white rounded-xl py-[15px] px-4 text-[15.5px] text-fg outline-none mb-5 transition-colors duration-[180ms] focus:border-accent"
      />

      <label htmlFor="email" className="flex items-baseline gap-2 text-[12.5px] font-semibold tracking-[0.03em] mb-2">
        E-MAIL <span className="font-normal tracking-normal text-fg/42">opcional</span>
      </label>
      <input
        id="email"
        type="email"
        value={state.email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="para receber o resultado"
        className="w-full border border-fg/14 bg-white rounded-xl py-[15px] px-4 text-[15.5px] text-fg outline-none mb-5 transition-colors duration-[180ms] focus:border-accent"
      />

      <label className="block text-[12.5px] font-semibold tracking-[0.03em] mb-2.5">OBJETIVO AO APRENDER INGLÊS</label>
      <div className="flex flex-wrap gap-2 mb-8">
        {GOALS.map((goal) => (
          <button
            key={goal}
            type="button"
            onClick={() => setGoal(goal)}
            className={cn(
              "cursor-pointer text-sm -tracking-[0.01em] py-2.5 px-3.5 rounded-full border-[1.5px] transition-all duration-[160ms]",
              state.goal === goal ? "border-accent bg-accent text-white" : "border-fg/14 bg-white text-fg",
            )}
          >
            {goal}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={iniciarAvaliacao}
        disabled={!canStart}
        className={cn(
          "w-full border-none rounded-[14px] text-base font-semibold -tracking-[0.01em] py-[17px] px-5 transition-all duration-[180ms]",
          canStart
            ? "bg-accent text-white cursor-pointer shadow-[0_1px_2px_rgba(28,27,24,.14)]"
            : "bg-fg/9 text-fg/38 cursor-not-allowed",
        )}
      >
        Iniciar avaliação
      </button>
    </main>
  );
}
