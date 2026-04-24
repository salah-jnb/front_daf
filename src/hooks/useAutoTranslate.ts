/**
 * useAutoTranslate.ts
 * Hook React pour la traduction automatique du contenu dynamique.
 * Retourne le texte traduit + un état de chargement.
 */

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { translateText } from '@/utils/translateService';

/**
 * Supprime le suffixe "| XXX" souvent ajouté par le backend
 * (ex: "Transport de véhicules | JAF Logistics") pour obtenir un titre propre.
 */
function cleanPipe(val: string): string {
  return val.includes('|') ? val.split('|')[0].trim() : val;
}

export function useAutoTranslate(
  text: string | null | undefined,
  sourceLang = 'fr',
): { value: string; loading: boolean } {
  const { i18n } = useTranslation();
  const targetLang = i18n.language.split('-')[0];

  const [value, setValue] = useState(text ? cleanPipe(text) : '');
  const [loading, setLoading] = useState(false);

  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    if (!text) { setValue(''); return; }

    const clean = cleanPipe(text);

    if (targetLang === sourceLang) {
      setValue(clean);
      return;
    }

    setLoading(true);
    translateText(clean, targetLang, sourceLang).then((result) => {
      if (mounted.current) {
        setValue(result);
        setLoading(false);
      }
    });
  }, [text, targetLang, sourceLang]);

  return { value, loading };
}

/**
 * useAutoTranslateObject
 * Traduit plusieurs champs d'un objet en une seule opération.
 */
export function useAutoTranslateObject<T extends Record<string, unknown>>(
  obj: T | null,
  fields: (keyof T)[],
  sourceLang = 'fr',
): { data: T | null; loading: boolean } {
  const { i18n } = useTranslation();
  const targetLang = i18n.language.split('-')[0];

  const [data, setData] = useState<T | null>(obj);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    if (!obj) { setData(null); return; }

    if (targetLang === sourceLang) {
      // Même langue : nettoyer les pipes et retourner directement
      const cleaned = { ...obj };
      fields.forEach((field) => {
        const val = obj[field];
        if (typeof val === 'string') {
          (cleaned as Record<string, unknown>)[field as string] = cleanPipe(val);
        }
      });
      setData(cleaned as T);
      return;
    }

    setLoading(true);
    const translated = { ...obj };

    Promise.all(
      fields.map(async (field) => {
        const val = obj[field];
        if (typeof val === 'string' && val) {
          const { translateText: tr } = await import('@/utils/translateService');
          (translated as Record<string, unknown>)[field as string] =
            await tr(cleanPipe(val), targetLang, sourceLang);
        }
      }),
    ).then(() => {
      if (mounted.current) {
        setData(translated as T);
        setLoading(false);
      }
    });
  }, [obj?.id, targetLang]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading };
}

/**
 * useAutoTranslateArray
 * Traduit un tableau d'objets complet
 */
export function useAutoTranslateArray<T extends Record<string, unknown>>(
  arr: T[],
  fields: (keyof T)[],
  sourceLang = 'fr',
): { data: T[]; loading: boolean } {
  const { i18n } = useTranslation();
  const targetLang = i18n.language.split('-')[0];

  const [data, setData] = useState<T[]>(arr);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    if (!arr || arr.length === 0) { setData([]); return; }

    if (targetLang === sourceLang) {
      // Même langue : nettoyer les pipes
      const cleaned = arr.map((obj) => {
        const c = { ...obj };
        fields.forEach((field) => {
          const val = obj[field];
          if (typeof val === 'string') {
            (c as Record<string, unknown>)[field as string] = cleanPipe(val);
          }
        });
        return c as T;
      });
      setData(cleaned);
      return;
    }

    setLoading(true);

    const translatePromises = arr.map(async (obj) => {
      const translated = { ...obj };
      await Promise.all(
        fields.map(async (field) => {
          const val = obj[field];
          if (typeof val === 'string' && val) {
            const { translateText: tr } = await import('@/utils/translateService');
            (translated as Record<string, unknown>)[field as string] =
              await tr(cleanPipe(val), targetLang, sourceLang);
          }
        })
      );
      return translated as T;
    });

    Promise.all(translatePromises).then((translatedArr) => {
      if (mounted.current) {
        setData(translatedArr);
        setLoading(false);
      }
    });
  }, [arr, targetLang, sourceLang]);

  return { data, loading };
}
