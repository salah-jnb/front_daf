import type { i18n as I18nInstance } from "i18next";

const SERVICE_KEY_ALIASES: Record<string, string[]> = {
  "demenagement-international": ["demenagement-international"],
  "office-moving": ["office-moving", "transfert-d-entreprise", "transfert-entreprise"],
  "demenagement-national": ["demenagement-national"],
  "car-shipping": ["car-shipping", "transport-de-vehicules"],
  "fine-art": ["fine-art", "logistique-oeuvres-d-art"],
  "garde-meubles": ["garde-meubles", "garde-meuble"],
  "service-de-dedouanement": ["service-de-dedouanement"],
  "pet-relocation": ["pet-relocation", "relocalisation-danimaux", "relocalisation-d-animaux"],
};

function cleanPipe(value?: string): string {
  if (!value) return "";
  return value.includes("|") ? value.split("|")[0].trim() : value.trim();
}

export function normalizeServiceKey(value?: string): string {
  const cleaned = cleanPipe(value);
  if (!cleaned) return "";
  return cleaned
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function serviceKeyCandidates(rawTitle?: string): string[] {
  const normalized = normalizeServiceKey(rawTitle);
  if (!normalized) return [];

  const result = new Set<string>([normalized]);
  Object.entries(SERVICE_KEY_ALIASES).forEach(([canonical, aliases]) => {
    if (canonical === normalized || aliases.includes(normalized)) {
      result.add(canonical);
      aliases.forEach((alias) => result.add(alias));
    }
  });
  return [...result];
}

export function getServiceI18nValue(
  i18n: I18nInstance,
  t: (key: string, defaultValue?: string) => string,
  title: string | undefined,
  field: "title" | "description" | "longDescription",
): string | null {
  const candidates = serviceKeyCandidates(title);
  for (const key of candidates) {
    const path = `servicesData.${key}.${field}`;
    if (i18n.exists(path)) return t(path);
  }
  return null;
}
