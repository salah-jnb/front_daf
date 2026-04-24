import { useState, useEffect, useContext, useMemo } from 'react';
import { AppContext } from '@/context/AppContext';

export interface BlockNewsDTO {
  id: number;
  titre: string;
  description: string | null;
  pays: string | null;       // optionnel — peut être null
  date: string;              // "yyyy-MM-dd"
  image: string;             // URL publique
}

/* ── Normalise image URL ── */
function normalizeImageUrl(url: string | undefined, baseUrl: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  const root = baseUrl.replace(/\/$/, "");
  return trimmed.startsWith("/") ? `${root}${trimmed}` : `${root}/${trimmed}`;
}

export function useNews() {
  const { baseUrl } = useContext(AppContext);
  const [news, setNews] = useState<BlockNewsDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const root = useMemo(() => baseUrl.replace(/\/$/, ""), [baseUrl]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${root}/block-news`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        const normalized: BlockNewsDTO[] = (Array.isArray(data) ? data : []).map((n: any) => ({
          ...n,
          image: normalizeImageUrl(n.image, root),
        }));
        setNews(normalized);
      } catch (err) {
        if (cancelled) return;
        console.warn("Failed to fetch news from backend.", err);
        setNews([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [root]);

  return { news, loading };
}

export function useLastNews() {
  const { baseUrl } = useContext(AppContext);
  const [lastNews, setLastNews] = useState<BlockNewsDTO | null>(null);
  const [loading, setLoading] = useState(true);

  const root = useMemo(() => baseUrl.replace(/\/$/, ""), [baseUrl]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${root}/block-news/last`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        if (data) {
          setLastNews({
            ...data,
            image: normalizeImageUrl(data.image, root),
          });
        }
      } catch (err) {
        if (cancelled) return;
        console.warn("Failed to fetch last news from backend.", err);
        setLastNews(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [root]);

  return { lastNews, loading };
}
