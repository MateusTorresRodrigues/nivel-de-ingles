# Teste de Nivelamento de Inglês (CEFR) — English With Rayanne

## Visão geral

App web de nivelamento de inglês para a marca "English With Rayanne". Fluxo do aluno: landing →
cadastro → teste adaptativo (múltipla escolha, dificuldade ponderada) → tela de resultado (nível
CEFR, categorias, pontos fortes/fracos, recomendação). Há também uma área administrativa (ainda
placeholder — ver "Próximos passos").

Este projeto nasceu de um **pacote de handoff de design** (protótipos HTML de alta fidelidade +
documento de arquitetura), recebido do usuário como `Adaptive language testing app.zip` em
`Documents/`. Os arquivos originais do handoff (`app.html`, `architecture.html`, `questionBank.js`,
`README.md`) descrevem cada tela, os tokens de design e o schema Supabase planejado — foram usados
como fonte da verdade para esta implementação, mas não fazem parte deste repositório.

## Stack

- React + Vite + TypeScript
- Tailwind CSS v4 (config via `@theme` em [src/index.css](src/index.css), sem `tailwind.config.js`)
- React Router (v7, `react-router-dom`)
- Sem backend ainda — todo o estado roda no cliente, persistido em `localStorage`

Mesma stack e convenções do outro projeto do usuário (`Projetos CRM`, sistema de barbearia), para
manter consistência entre os dois.

## Estrutura de pastas

```
src/
  core/
    adaptive.ts    seleção adaptativa da próxima questão (pickQuestion, proximoNivel) — lógica pura
    scoring.ts     cálculo do resultado final (evaluate) — lógica pura
  data/
    questionBank.ts  seed de 36 questões + LEVEL_INFO + GOALS (portado do handoff de design)
  lib/
    types.ts       tipos centrais (Questao, RespostaDada, ResultadoRegistrado, ResultadoAvaliado...)
    storage.ts     helpers de localStorage (mesmas chaves do protótipo original)
    utils.ts       helper `cn()` (clsx + tailwind-merge)
  contexts/
    CefrContext.tsx  todo o estado do teste (nome/email/objetivo, questão atual, respostas,
                     nível/sequências, banco de questões, resultados) + ações (beginTest,
                     selectOption, restart) — única fonte de verdade, consumida via `useCefr()`
  components/
    layout/    Header, Layout (wrapper com Outlet do React Router)
    teste/     ProgressBar, QuestionCard
    resultado/ EscadaCefr, CategoriaBarra
  pages/       uma página por rota (ver tabela abaixo)
  App.tsx      definição das rotas
  main.tsx     providers globais (BrowserRouter, CefrProvider)
```

## Rotas

| Rota | Página | Observação |
|---|---|---|
| `/` | Landing | botão "Retomar teste em andamento" aparece quando há teste salvo não finalizado |
| `/cadastro` | Cadastro | nome (obrigatório), e-mail (opcional), objetivo (chips) |
| `/teste` | Teste | redireciona para `/` se não há questão ativa e nenhuma resposta dada |
| `/resultado` | Resultado | redireciona para `/` se não há respostas para avaliar |
| `/admin` | Admin | **placeholder** — só mostra contadores, sem CRUD ainda (ver "Próximos passos") |

O protótipo original navegava trocando uma variável `screen` em memória (sem rotas reais); esta
implementação já usa rotas de verdade do React Router, conforme pedido no README do handoff
("recriar como rotas reais").

## Lógica do teste (core/)

- **Adaptativo** (`core/adaptive.ts`): começa em B1→A2 (índice 1 de 6, `pickQuestion`). Duas
  respostas certas seguidas sobem um nível; duas erradas seguidas descem um nível
  (`proximoNivel`); a sequência zera ao trocar de direção. Nunca repete uma questão já mostrada.
  Se não há questão no nível-alvo, busca no nível mais próximo (`spread` crescente ±1, ±2...).
- **Pontuação** (`core/scoring.ts`, função `evaluate`): percentual = soma das dificuldades das
  questões certas ÷ soma das dificuldades de todas as respondidas. Nível final considera acurácia
  mínima de 60% em pelo menos 2 questões daquele nível, com ajuste extra (≥88% sobe um nível, <35%
  desce um nível). Consistência = 100 − (alternâncias acerto/erro ÷ total de transições) × 60.
  Ambas as funções são puras (sem I/O), pensadas para depois rodar no servidor — ver
  "Próximos passos" / arquitetura Supabase.

## Persistência (localStorage)

Mesmas chaves do protótipo original, para compatibilidade com o comportamento documentado no
handoff:

- `cefr_nivelamento_v1` — progresso do teste em andamento (nome/email/objetivo, questões já
  mostradas, respostas, questão atual, nível/sequências). Gravado a cada resposta; permite
  retomar. Removido só ao reiniciar (`restart`).
- `cefr_admin_questions_v1` — banco de questões editado pelo admin, sobrepõe o banco padrão
  (ainda sem UI para editar — ver "Próximos passos").
- `cefr_results_v1` — histórico de testes concluídos (gravado automaticamente ao terminar um
  teste, mesmo sem a tela de admin para visualizá-los ainda).

## Identidade visual

Tokens em `@theme` no topo de [src/index.css](src/index.css), portados 1:1 do handoff de design:

- Fundo `#F7F5F1`, texto principal `#1C1B18`. Tema único (claro), sem alternância clara/escura.
- Acento primário (teal) `oklch(0.52 0.11 205)` e variações (`accent-hover`, `accent-soft`,
  `accent-badge`, `accent-reached`, `accent-text`...) para fundos, hover e texto.
- Alerta/atenção `oklch(0.58 0.12 40)` e variações, usado nas categorias <70% e pontos fracos.
- Tipografia: **Newsreader** (serifada, títulos, peso 300–600) + **Instrument Sans** (corpo/UI),
  via Google Fonts. Tokens `font-display` / `font-sans`.
- Opacidades de texto/borda usam o modificador `/N` do Tailwind v4 sobre as cores do tema
  (`text-fg/62`, `border-fg/10` etc.) em vez de valores `rgba(...)` fixos — mesmo resultado visual
  do handoff, mais fácil de manter.

## Próximos passos

Nesta rodada só foi construída a estrutura + as telas do aluno (Landing → Cadastro → Teste →
Resultado), com dados locais/mock, sem Supabase. Falta, na ordem sugerida pelo handoff original:

1. **Área administrativa completa** — CRUD de questões (formulário inline: pergunta, 4
   alternativas com marcação da correta, nível/categoria/dificuldade/tópico/explicação) e lista de
   resultados registrados. O `README.md` do handoff (não incluído neste repo, mas resumido acima)
   descreve cada campo e comportamento em detalhe.
2. **Integração com Supabase**, conforme `architecture.html` do handoff: tabelas
   `users`/`questions`/`results`/`answers`, função `submit_answer`/`finalize_result` e view
   `questions_public` (para a resposta correta nunca chegar ao cliente), políticas RLS por
   tabela. A regra central do documento: *"o cliente sabe o que perguntar, o servidor sabe o que
   é certo"* — a correção precisa migrar do front-end (`core/scoring.ts` hoje) para o backend.
3. Funcionalidades futuras mapeadas no documento de arquitetura (fora do escopo imediato):
   listening, writing avaliado por IA, histórico do aluno, plano de estudos, pagamento/certificado,
   integração com WhatsApp.
