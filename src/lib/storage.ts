// Persistência local do protótipo (localStorage) — mesmas chaves definidas em app.html,
// para que o comportamento (retomar teste, banco editado pelo admin, resultados) seja
// idêntico ao handoff de design. Em produção, `answers`/`results`/`questions` migram para
// o Supabase (ver "State Management" em README.md do handoff).

export const TEST_PROGRESS_KEY = "cefr_nivelamento_v1";
export const ADMIN_QUESTIONS_KEY = "cefr_admin_questions_v1";
export const RESULTS_KEY = "cefr_results_v1";

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage indisponível (modo privado, cota excedida) — falha silenciosa, como no protótipo.
  }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // idem
  }
}
