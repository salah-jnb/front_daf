/**
 * translateService.ts
 * Service de traduction automatique pour le contenu dynamique (venant de l'API backend).
 * Utilise MyMemory API (gratuit, CORS compatible, 1000 req/jour).
 * Cache persistant dans localStorage pour éviter les appels répétés.
 */

const CACHE_PREFIX = 'jaf_trans_';
const DEFAULT_SOURCE = 'fr';

/**
 * Génère une clé de cache unique pour un texte + langue cible.
 */
function cacheKey(text: string, targetLang: string): string {
  // On hash le texte de manière simple pour éviter les clés trop longues
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) - h + text.charCodeAt(i)) | 0;
  }
  return `${CACHE_PREFIX}${targetLang}_${Math.abs(h)}`;
}

/**
 * Traduit un texte via MyMemory API.
 * - Si la langue cible === source → retourne le texte original
 * - Résultat mis en cache dans localStorage
 * @param text       Texte à traduire
 * @param targetLang Code langue cible ('en', 'fr', 'ar', etc.)
 * @param sourceLang Code langue source (défaut: 'fr')
 */
export async function translateText(
  text: string,
  targetLang: string,
  sourceLang: string = DEFAULT_SOURCE,
): Promise<string> {
  if (!text?.trim()) return text;

  // Pas besoin de traduire si même langue
  const target = targetLang.split('-')[0]; // 'en-US' → 'en'
  const source = sourceLang.split('-')[0];
  if (target === source) return text;

  // Vérifier le cache localStorage
  const key = cacheKey(text, target);
  try {
    const cached = localStorage.getItem(key);
    if (cached) return cached;
  } catch {
    // localStorage peut être indisponible (mode privé)
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // L'API Google retourne un tableau imbriqué : data[0][0][0] contient le texte traduit
    let translated = text;
    if (Array.isArray(data) && Array.isArray(data[0]) && Array.isArray(data[0][0])) {
      translated = data[0][0][0] || text;
    }

    // Mettre en cache
    try {
      localStorage.setItem(key, translated);
    } catch {
      // Ignorer les erreurs de quota localStorage
    }

    return translated;
  } catch {
    // En cas d'erreur réseau, retourner le texte original
    return text;
  }
}

/**
 * Traduit un objet entier (plusieurs champs à la fois).
 * Utile pour traduire titre + description en un seul batch.
 */
export async function translateFields<T extends Record<string, string | null | undefined>>(
  obj: T,
  fields: (keyof T)[],
  targetLang: string,
  sourceLang: string = DEFAULT_SOURCE,
): Promise<T> {
  const translated = { ...obj };
  await Promise.all(
    fields.map(async (field) => {
      const val = obj[field];
      if (val) {
        (translated as Record<string, unknown>)[field as string] =
          await translateText(val, targetLang, sourceLang);
      }
    }),
  );
  return translated;
}
