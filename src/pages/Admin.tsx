import { useCefr } from "../contexts/CefrContext";

// Placeholder desta etapa: a área administrativa (CRUD de questões, lista de resultados)
// entra numa próxima rodada, junto com a integração ao Supabase (ver architecture.html).
// Por ora, resultados de testes concluídos já são gravados em localStorage — este contador
// só confirma que a gravação está funcionando.
export function Admin() {
  const { state } = useCefr();

  return (
    <main className="w-full max-w-[720px] pt-10 animate-fade-up-sm">
      <h2 className="m-0 mb-1.5 font-display font-normal text-[32px] leading-[1.1] -tracking-[0.02em]">
        Área administrativa
      </h2>
      <p className="m-0 mb-7 text-[14.5px] leading-[1.5] text-fg/60">
        O cadastro de questões e a lista de resultados chegam na próxima etapa, junto com a integração ao Supabase.
      </p>

      <div className="grid gap-px bg-fg/10 border border-fg/10 rounded-2xl overflow-hidden">
        <div className="bg-white py-[15px] px-4 flex items-baseline justify-between">
          <span className="text-[14.5px]">Questões no banco</span>
          <span className="text-[14.5px] text-fg/55 tabular-nums">{state.questions.length}</span>
        </div>
        <div className="bg-white py-[15px] px-4 flex items-baseline justify-between">
          <span className="text-[14.5px]">Testes concluídos registrados</span>
          <span className="text-[14.5px] text-fg/55 tabular-nums">{state.results.length}</span>
        </div>
      </div>
    </main>
  );
}
