import { useState, useEffect, useContext, useMemo } from 'react';
import { AppContext } from '@/context/AppContext';

export type BlockDTO = {
  id: number;
  titre: string;
  description: string;
  motcle?: string[];
  imageUrl?: string;
};

export const slugify = (text: string) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
};

/* ── Color palette cycled per-card index ── */
const COLORS = [
  "#3b82f6", "#10b981", "#8b5cf6", "#f97316",
  "#0ea5e9", "#ec4899", "#6366f1",
];
export const getColorForIndex = (i: number) => COLORS[i % COLORS.length];

/* ── Normalise image URL coming from backend ── */
function normalizeImageUrl(url: string | undefined, baseUrl: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  const root = baseUrl.replace(/\/$/, "");
  return trimmed.startsWith("/") ? `${root}${trimmed}` : `${root}/${trimmed}`;
}

/* ── Main hook ────────────────────────────────────────────────── */
export function useBlocks() {
  const { baseUrl } = useContext(AppContext);
  const [blocks, setBlocks] = useState<BlockDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const root = useMemo(() => baseUrl.replace(/\/$/, ""), [baseUrl]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${root}/blocks`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        // Normalise image URLs from backend
        const normalised: BlockDTO[] = (Array.isArray(data) ? data : []).map((b: any) => ({
          ...b,
          imageUrl: normalizeImageUrl(b.imageUrl || b.image, root),
        }));
        setBlocks(normalised);
      } catch (err) {
        if (cancelled) return;
        console.warn("Failed to fetch blocks from backend.", err);
        setBlocks([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [root]);

  return { blocks, loading };
}

/* ── Helper: find a single block by its slugified title ─────── */
export function useBlockBySlug(slug: string | undefined) {
  const { blocks, loading } = useBlocks();

  const block = useMemo(() => {
    if (!slug || blocks.length === 0) return undefined;
    return blocks.find((b) => slugify(b.titre) === slug);
  }, [blocks, slug]);

  const index = useMemo(() => {
    if (!block) return 0;
    return blocks.indexOf(block);
  }, [blocks, block]);

  const others = useMemo(() => {
    if (!block) return blocks;
    return blocks.filter((b) => b.id !== block.id);
  }, [blocks, block]);

  return { block, blocks, others, index, loading };
}
