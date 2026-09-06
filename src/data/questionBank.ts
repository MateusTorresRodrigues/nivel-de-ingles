// Banco de questões — seed inicial, portado de questionBank.js (pacote de design).
// Em produção este banco migra para a tabela `questions` do Supabase (ver architecture.html);
// a correção deixa de acontecer no cliente.

import type { CefrLevel, Categoria, NivelInfo, Questao } from "../lib/types";

export const CEFR_ORDER: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export const LEVEL_INFO: Record<CefrLevel, NivelInfo> = {
  A1: {
    name: "Beginner",
    description:
      "Você compreende e usa expressões cotidianas simples, apresenta-se e responde perguntas básicas sobre si mesmo com apoio do interlocutor.",
    next: "A2",
    focus: ["verb to be", "present simple", "vocabulário do dia a dia", "pronomes e artigos"],
  },
  A2: {
    name: "Elementary",
    description:
      "Você lida com situações rotineiras, descreve sua rotina, seu trabalho e o passado imediato usando frases curtas e conectadas.",
    next: "B1",
    focus: ["past simple", "comparativos", "futuro com will e going to", "vocabulário de viagem e trabalho"],
  },
  B1: {
    name: "Intermediate",
    description:
      "Você se comunica com autonomia em situações familiares, narra experiências, explica opiniões e entende textos sobre assuntos conhecidos.",
    next: "B2",
    focus: ["present perfect", "condicionais", "phrasal verbs", "reported speech"],
  },
  B2: {
    name: "Upper-Intermediate",
    description:
      "Você consegue compreender textos relativamente complexos, participar de conversas sobre diversos assuntos e se comunicar com boa autonomia em inglês.",
    next: "C1",
    focus: ["vocabulário avançado", "phrasal verbs", "collocations", "compreensão auditiva e conversação"],
  },
  C1: {
    name: "Advanced",
    description:
      "Você usa a língua de forma flexível e eficaz em contextos sociais, acadêmicos e profissionais, com estruturas complexas e poucos desvios.",
    next: "C2",
    focus: ["idioms e registro formal", "inversão e ênfase", "nuances de significado", "escrita argumentativa"],
  },
  C2: {
    name: "Proficient",
    description:
      "Você compreende praticamente tudo o que lê e ouve, reconstrói argumentos com precisão e se expressa com naturalidade e domínio de nuances.",
    next: null,
    focus: ["registro e estilo", "collocations pouco frequentes", "produção acadêmica", "manutenção do nível"],
  },
};

export const CATEGORIES: Categoria[] = ["Grammar", "Vocabulary", "Reading", "Sentence Structure"];

export const QUESTIONS: Questao[] = [
  // ── A1 ───────────────────────────────────────────────
  { id: 1, question: "She _____ from Brazil.", options: ["am", "is", "are", "be"], correctAnswer: "is", level: "A1", category: "Grammar", topic: "Verb to be", difficulty: 1, explanation: "Com o pronome 'she' usamos 'is'." },
  { id: 2, question: "_____ you like coffee?", options: ["Do", "Does", "Are", "Is"], correctAnswer: "Do", level: "A1", category: "Grammar", topic: "Present Simple", difficulty: 1, explanation: "Perguntas no present simple com 'you' usam o auxiliar 'do'." },
  { id: 3, question: "I have two _____.", options: ["childs", "childrens", "children", "child"], correctAnswer: "children", level: "A1", category: "Vocabulary", topic: "Plural", difficulty: 1, explanation: "'Children' é o plural irregular de 'child'." },
  { id: 4, question: "This is _____ apple.", options: ["a", "an", "the", "some"], correctAnswer: "an", level: "A1", category: "Grammar", topic: "Artigos", difficulty: 1, explanation: "Antes de som de vogal usamos 'an'." },
  { id: 5, question: "The book is _____ the table.", options: ["in", "at", "on", "to"], correctAnswer: "on", level: "A1", category: "Grammar", topic: "Preposições", difficulty: 1, explanation: "'On' indica contato com uma superfície." },
  { id: 6, question: "My sister is a _____. She works in a hospital.", options: ["teacher", "nurse", "driver", "waiter"], correctAnswer: "nurse", level: "A1", category: "Vocabulary", topic: "Profissões", difficulty: 1, explanation: "Quem trabalha em hospital cuidando de pacientes é 'nurse'." },

  // ── A2 ───────────────────────────────────────────────
  { id: 7, question: "She _____ to work every day.", options: ["go", "goes", "going", "gone"], correctAnswer: "goes", level: "A2", category: "Grammar", topic: "Present Simple", difficulty: 2, explanation: "Terceira pessoa do singular no present simple recebe -es." },
  { id: 8, question: "There isn't _____ milk in the fridge.", options: ["some", "any", "many", "a"], correctAnswer: "any", level: "A2", category: "Grammar", topic: "Quantificadores", difficulty: 2, explanation: "Em frases negativas com incontáveis usamos 'any'." },
  { id: 9, question: "He is taller _____ his brother.", options: ["that", "then", "than", "as"], correctAnswer: "than", level: "A2", category: "Grammar", topic: "Comparatives", difficulty: 2, explanation: "Comparativos de superioridade usam 'than'." },
  { id: 10, question: "Choose the opposite of \"expensive\".", options: ["rich", "cheap", "large", "heavy"], correctAnswer: "cheap", level: "A2", category: "Vocabulary", topic: "Antônimos", difficulty: 2, explanation: "'Cheap' é o oposto de 'expensive'." },
  { id: 11, question: "Yesterday we _____ to the beach.", options: ["go", "gone", "went", "goed"], correctAnswer: "went", level: "A2", category: "Grammar", topic: "Past Simple", difficulty: 2, explanation: "O passado irregular de 'go' é 'went'." },
  { id: 12, question: "Tom works from 9 to 5, Monday to Saturday. He never works on Sunday.\n\nWhen does Tom NOT work?", options: ["On Saturday", "On Sunday", "In the morning", "At 5 o'clock"], correctAnswer: "On Sunday", level: "A2", category: "Reading", topic: "Interpretação básica", difficulty: 2, explanation: "O texto diz explicitamente que ele nunca trabalha no domingo." },

  // ── B1 ───────────────────────────────────────────────
  { id: 13, question: "I _____ in London for five years.", options: ["live", "am living", "have lived", "lived since"], correctAnswer: "have lived", level: "B1", category: "Grammar", topic: "Present Perfect", difficulty: 3, explanation: "Ação que começou no passado e continua: present perfect com 'for'." },
  { id: 14, question: "If it rains tomorrow, we _____ at home.", options: ["stay", "will stay", "would stay", "stayed"], correctAnswer: "will stay", level: "B1", category: "Grammar", topic: "Conditionals", difficulty: 3, explanation: "First conditional: if + present simple, will + verbo." },
  { id: 15, question: "You _____ smoke here. It's forbidden.", options: ["don't have to", "mustn't", "shouldn't have", "needn't"], correctAnswer: "mustn't", level: "B1", category: "Grammar", topic: "Modal verbs", difficulty: 3, explanation: "'Mustn't' expressa proibição." },
  { id: 16, question: "Please _____ out this form before the interview.", options: ["fill", "put", "take", "look"], correctAnswer: "fill", level: "B1", category: "Vocabulary", topic: "Phrasal verbs", difficulty: 3, explanation: "'Fill out a form' = preencher um formulário." },
  { id: 17, question: "I'm really looking _____ to seeing you again.", options: ["ahead", "forward", "after", "up"], correctAnswer: "forward", level: "B1", category: "Vocabulary", topic: "Phrasal verbs", difficulty: 3, explanation: "'Look forward to' + gerúndio." },
  { id: 18, question: "The class was cancelled, _____ nobody had been told about it.", options: ["although", "despite", "because", "unless"], correctAnswer: "because", level: "B1", category: "Sentence Structure", topic: "Conectivos", difficulty: 3, explanation: "A segunda oração dá a causa, logo 'because'." },

  // ── B2 ───────────────────────────────────────────────
  { id: 19, question: "The bridge _____ in 1932 and is still in use.", options: ["built", "was built", "has built", "is building"], correctAnswer: "was built", level: "B2", category: "Grammar", topic: "Passive voice", difficulty: 4, explanation: "Voz passiva no passado: was/were + participle." },
  { id: 20, question: "By the time we arrived, the film _____.", options: ["started", "was starting", "had started", "has started"], correctAnswer: "had started", level: "B2", category: "Grammar", topic: "Past Perfect", difficulty: 4, explanation: "Ação anterior a outra no passado: past perfect." },
  { id: 21, question: "That's the neighbour _____ car was stolen last week.", options: ["who", "whose", "which", "whom"], correctAnswer: "whose", level: "B2", category: "Sentence Structure", topic: "Relative clauses", difficulty: 4, explanation: "'Whose' indica posse em orações relativas." },
  { id: 22, question: "She told me she _____ the report the day before.", options: ["finishes", "has finished", "had finished", "was finish"], correctAnswer: "had finished", level: "B2", category: "Grammar", topic: "Reported speech", difficulty: 4, explanation: "No discurso indireto o present perfect recua para past perfect." },
  { id: 23, question: "Opera isn't really my _____ of tea.", options: ["glass", "cup", "kind", "taste"], correctAnswer: "cup", level: "B2", category: "Vocabulary", topic: "Idioms", difficulty: 4, explanation: "'Not my cup of tea' = não é muito a minha praia." },
  { id: 24, question: "The new policy was welcomed by managers, though several employees quietly questioned whether the promised flexibility would ever materialise.\n\nWhat does the text suggest about the employees?", options: ["They openly protested.", "They were sceptical.", "They fully agreed.", "They wrote the policy."], correctAnswer: "They were sceptical.", level: "B2", category: "Reading", topic: "Inferência", difficulty: 4, explanation: "'Quietly questioned' indica ceticismo, não protesto aberto." },

  // ── C1 ───────────────────────────────────────────────
  { id: 25, question: "_____ had I sat down when the phone rang.", options: ["No sooner", "Hardly ever", "As soon", "Rather than"], correctAnswer: "No sooner", level: "C1", category: "Sentence Structure", topic: "Inversão", difficulty: 5, explanation: "'No sooner had... when/than' é uma estrutura de inversão enfática." },
  { id: 26, question: "The audience was visibly _____ to tears by her speech.", options: ["taken", "moved", "brought", "pulled"], correctAnswer: "moved", level: "C1", category: "Vocabulary", topic: "Collocations", difficulty: 5, explanation: "'Moved to tears' é a collocation usual." },
  { id: 27, question: "Little _____ that his decision would change everything.", options: ["he knew", "did he know", "he did know", "knew he"], correctAnswer: "did he know", level: "C1", category: "Sentence Structure", topic: "Inversão", difficulty: 5, explanation: "Advérbio negativo em posição inicial exige inversão auxiliar-sujeito." },
  { id: 28, question: "The proposal was rejected on the _____ that it was too costly.", options: ["reasons", "grounds", "basics", "causes"], correctAnswer: "grounds", level: "C1", category: "Vocabulary", topic: "Registro formal", difficulty: 5, explanation: "'On the grounds that' = com base no argumento de que." },
  { id: 29, question: "The reforms brought about a _____ improvement in literacy rates.", options: ["marked", "marking", "remarking", "markable"], correctAnswer: "marked", level: "C1", category: "Vocabulary", topic: "Nuances de significado", difficulty: 5, explanation: "'A marked improvement' = uma melhora notável." },
  { id: 30, question: "I'd rather you _____ anyone about this for now.", options: ["don't tell", "didn't tell", "wouldn't tell", "not telling"], correctAnswer: "didn't tell", level: "C1", category: "Grammar", topic: "Advanced conditionals", difficulty: 5, explanation: "'Would rather' + sujeito exige past subjunctive." },

  // ── C2 ───────────────────────────────────────────────
  { id: 31, question: "_____ it not for his intervention, the deal would have collapsed.", options: ["Was", "Were", "Had", "If"], correctAnswer: "Were", level: "C2", category: "Grammar", topic: "Estruturas avançadas", difficulty: 6, explanation: "'Were it not for' é a forma invertida de 'if it were not for'." },
  { id: 32, question: "He has something of a _____ for understatement.", options: ["penchant", "pending", "pretence", "portion"], correctAnswer: "penchant", level: "C2", category: "Vocabulary", topic: "Vocabulário avançado", difficulty: 6, explanation: "'A penchant for' = uma queda/predileção por." },
  { id: 33, question: "The committee _____ short of recommending the closure of the plant.", options: ["fell", "stopped", "cut", "held"], correctAnswer: "stopped", level: "C2", category: "Vocabulary", topic: "Collocations", difficulty: 6, explanation: "'Stop short of doing something' = quase fazer algo, mas não fazer." },
  { id: 34, question: "Their argument, _____ compelling, ultimately rested on a false premise.", options: ["however", "whatever", "although", "despite"], correctAnswer: "however", level: "C2", category: "Sentence Structure", topic: "Concessivas", difficulty: 6, explanation: "'However + adjetivo' equivale a 'no matter how compelling'." },
  { id: 35, question: "It is important to _____ a distinction between the two concepts.", options: ["make out", "draw", "pull", "set"], correctAnswer: "draw", level: "C2", category: "Vocabulary", topic: "Collocations", difficulty: 6, explanation: "'Draw a distinction' é a collocation consagrada." },
  { id: 36, question: "For all its technical brilliance, the film never quite earns the emotional weight it so evidently strives for.\n\nThe reviewer's tone is best described as", options: ["enthusiastic", "qualified praise", "openly hostile", "indifferent"], correctAnswer: "qualified praise", level: "C2", category: "Reading", topic: "Tom e registro", difficulty: 6, explanation: "'For all its brilliance... never quite earns' é elogio com ressalva." },
];

export const GOALS = ["Trabalho", "Viagem", "Estudos", "Conversação", "Provas/certificações", "Outro"];
