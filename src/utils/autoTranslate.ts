/**
 * Lightweight auto-translation utility for dynamic backend content.
 * Uses the MyMemory free API (no key required, ~5 000 chars/day free).
 * Results are cached in memory AND sessionStorage to minimise API calls.
 */

const memCache = new Map<string, string>();

function cacheKey(text: string, from: string, to: string) {
  return `atl:${from}:${to}:${text.slice(0, 180)}`;
}

/**
 * Translate `text` from `from` language to `to` language.
 * Falls back to the original text on error or timeout (never throws).
 */
export async function autoTranslate(
  text: string,
  from = 'en',
  to = 'fr',
): Promise<string> {
  if (!text?.trim() || from === to) return text;

  const key = cacheKey(text, from, to);   

  // 1. Memory cache (instant)
  if (memCache.has(key)) return memCache.get(key)!;

  // 2. SessionStorage cache (survives hot-reload, lost on tab close)
  try {
    const stored = sessionStorage.getItem(key);
    if (stored) {
      memCache.set(key, stored);
      return stored;
    }
  } catch {
    /* sessionStorage unavailable (private mode, Safari ITP, …) */
  }

  // 3. Free Google Translate API with 6 s timeout
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6_000);

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(timer);

    if (!res.ok) return text;

    const data = await res.json();
    let result = text;
    if (Array.isArray(data) && Array.isArray(data[0]) && Array.isArray(data[0][0])) {
      result = data[0][0][0] || text;
    }

    if (result && result !== text) {
      memCache.set(key, result);
      try { sessionStorage.setItem(key, result); } catch { /* ignore */ }
      return result;
    }
    return text;
  } catch {
    return text; // network error / timeout → show original text
  }
}
