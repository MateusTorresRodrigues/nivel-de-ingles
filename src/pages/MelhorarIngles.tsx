import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import { useCefr } from "../contexts/CefrContext";

type Objetivo = "Viagem" | "Trabalho / carreira" | "Prova ou certificado" | "Intercâmbio" | "Conversar sem travar";

export function MelhorarIngles() {
  const navigate = useNavigate();
  const { state } = useCefr();

  const [formData, setFormData] = useState({
    nome: state.name || "",
    email: state.email || "",
    nivel: "",
    objetivos: [] as Objetivo[],
  });

  const [isLoading, setIsLoading] = useState(false);

  const objetivosDisponiveis: Objetivo[] = [
    "Viagem",
    "Trabalho / carreira",
    "Prova ou certificado",
    "Intercâmbio",
    "Conversar sem travar",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleObjetivo = (objetivo: Objetivo) => {
    setFormData((prev) => ({
      ...prev,
      objetivos: prev.objetivos.includes(objetivo)
        ? prev.objetivos.filter((o) => o !== objetivo)
        : [...prev.objetivos, objetivo],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.nivel || formData.objetivos.length === 0) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    setIsLoading(true);

    // Montar a mensagem para o WhatsApp
    const mensagem = `*Aula Experimental - Nível de Inglês*\n\n*Nome:* ${formData.nome}\n*E-mail:* ${formData.email}\n*Nível atual:* ${formData.nivel}\n*Objetivos:* ${formData.objetivos.join(", ")}\n\nGostaria de agendar uma aula experimental!`;

    // Link do WhatsApp (substitua pelo seu número)
    const numeroWhatsApp = "5521973684804"; // ALTERAR PARA O NÚMERO CORRETO
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    // Abrir WhatsApp em nova aba
    window.open(linkWhatsApp, "_blank");

    // Voltar à landing após um tempo
    setTimeout(() => {
      setIsLoading(false);
      navigate("/", { replace: true });
    }, 500);
  };

  return (
    <main className="w-full max-w-[560px] pt-11">
      <div className="grid gap-8">
        {/* Lado esquerdo - Texto descritivo */}
        <div className="space-y-4">
          <p className="animate-fade-up m-0 text-[13px] text-fg/50">AULA EXPERIMENTAL</p>
          <h1 className="animate-fade-up stagger-1 m-0 font-display font-normal text-[clamp(30px,8.5vw,40px)] leading-[1.08] -tracking-[0.025em]">
            Bora descobrir o melhor caminho pro seu inglês?
          </h1>
          <p className="animate-fade-up stagger-2 m-0 text-[15px] leading-[1.55] text-fg/62 [text-wrap:pretty]">
            Conte um pouco sobre você. Respondendo pelo WhatsApp para combinarmos os 20 minutos de conversa inicial — gratuita e sem compromisso.
          </p>
          <ul className="animate-fade-up stagger-3 m-0 p-0 list-none space-y-2.5">
            <li className="flex gap-2 text-[14px] text-fg/70">
              <span className="text-accent">—</span>
              <span>Resposta no mesmo dia</span>
            </li>
            <li className="flex gap-2 text-[14px] text-fg/70">
              <span className="text-accent">—</span>
              <span>Horários de manhã, noite e sábado</span>
            </li>
            <li className="flex gap-2 text-[14px] text-fg/70">
              <span className="text-accent">—</span>
              <span>Nenhuma cobrança na conversa inicial</span>
            </li>
          </ul>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="animate-fade-up stagger-4 space-y-5 bg-white rounded-[20px] p-6 shadow-card">
          {/* Nome */}
          <div className="space-y-2">
            <label htmlFor="nome" className="block text-[13px] font-semibold text-ink">
              Seu nome
            </label>
            <input
              id="nome"
              type="text"
              name="nome"
              placeholder="Como você se chama?"
              value={formData.nome}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-fg/10 bg-white px-4 py-3.5 text-ink placeholder:text-fg/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* E-mail */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-[13px] font-semibold text-ink">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="voce@email.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-fg/10 bg-white px-4 py-3.5 text-ink placeholder:text-fg/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Nível */}
          <div className="space-y-2">
            <label htmlFor="nivel" className="block text-[13px] font-semibold text-ink">
              Seu nível hoje
            </label>
            <select
              id="nivel"
              name="nivel"
              value={formData.nivel}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-fg/10 bg-white px-4 py-3.5 text-ink focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all appearance-none cursor-pointer"
              required
            >
              <option value="">Selecione</option>
              <option value="A1">A1 - Iniciante</option>
              <option value="A2">A2 - Elementar</option>
              <option value="B1">B1 - Intermediário</option>
              <option value="B2">B2 - Intermediário-Alto</option>
              <option value="C1">C1 - Avançado</option>
              <option value="C2">C2 - Mastery</option>
            </select>
          </div>

          {/* Objetivos */}
          <div className="space-y-3">
            <label className="block text-[13px] font-semibold text-ink">
              Seu objetivo
            </label>
            <div className="flex flex-wrap gap-2.5">
              {objetivosDisponiveis.map((objetivo) => (
                <button
                  key={objetivo}
                  type="button"
                  onClick={() => toggleObjetivo(objetivo)}
                  className={`px-4 py-2.5 rounded-full text-[13.5px] font-medium transition-all border ${
                    formData.objetivos.includes(objetivo)
                      ? "bg-accent text-white border-accent"
                      : "bg-white text-ink border border-fg/10 hover:border-fg/30"
                  }`}
                >
                  {objetivo}
                </button>
              ))}
            </div>
          </div>

          {/* Aviso */}
          <p className="m-0 text-[12px] text-fg/50 [text-wrap:pretty]">
            Ao enviar, abre uma conversa no WhatsApp com esses dados já preenchidos.
          </p>

          {/* Botão */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white rounded-full py-4 px-6 text-[15px] font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg"
          >
            <Send size={18} />
            Quero minha aula experimental
          </button>
        </form>
      </div>
    </main>
  );
}
