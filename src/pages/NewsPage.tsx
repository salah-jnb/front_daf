import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNews, useLastNews, BlockNewsDTO } from "@/hooks/useNews";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Calendar, Globe, Clock, Search, ArrowRight, Newspaper, Zap, Phone } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { useAutoTranslateObject, useAutoTranslateArray } from "@/hooks/useAutoTranslate";

const NewsPage = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'ar' ? 'ar-MA' : i18n.language === 'en' ? 'en-US' : 'fr-FR';
  const { news, loading: loadingAll } = useNews();
  const { lastNews, loading: loadingLast } = useLastNews();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<BlockNewsDTO | null>(null);

  const allNews = useMemo(() => {
    const combined = [...news];
    if (lastNews && !combined.find(n => n.id === lastNews.id)) {
      combined.unshift(lastNews);
    }

    let filtered = combined;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = combined.filter(n =>
        n.titre.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        (n.pays && n.pays.toLowerCase().includes(q))
      );
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [news, lastNews, searchQuery]);

  useEffect(() => {
    if (!selectedArticle && allNews.length > 0) {
      setSelectedArticle(allNews[0]);
    }
  }, [allNews, selectedArticle]);

  const loading = loadingAll || loadingLast;

  // ── Traduction automatique de l'article affiché ──────────────
  const { data: translatedArticle, loading: translating } = useAutoTranslateObject(
    selectedArticle,
    ['titre', 'description'] as (keyof BlockNewsDTO)[],
    'fr',
  );

  // ── Traduction automatique de la liste des articles ──────────────
  const { data: translatedAllNews, loading: translatingList } = useAutoTranslateArray(
    allNews,
    ['titre', 'pays'] as (keyof BlockNewsDTO)[],
    'fr'
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Seo
        title={translatedArticle ? `${translatedArticle.titre} | ${t('news.pageTitle')}` : `${t('news.pageTitle')} | JAF Logistics`}
        description={translatedArticle?.description || t('news.pageDesc')}
        path="/news"
      />

      <Navbar lightTextOnTop={false} />

      <main className="pt-24 lg:pt-40">

        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

            {/* LEFT: Article Detail */}
            <section className="flex-1 lg:order-1 order-1 py-6 lg:py-0">
              {selectedArticle ? (
                <div className="animate-fade-in max-w-4xl">
                  <RevealOnScroll>
                    <div className="flex flex-wrap items-center gap-4 mb-8 text-[10px] font-black uppercase tracking-widest text-[#E6683A]">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#E6683A]/10 rounded-full border border-[#E6683A]/20">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(selectedArticle.date).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      {selectedArticle.pays && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-full text-muted-foreground">
                          <Globe className="w-3.5 h-3.5" />
                          {selectedArticle.pays}
                        </div>
                      )}
                    </div>

                    <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-8 lg:mb-12 leading-[1.1] uppercase text-foreground">
                      {translating ? (
                        <span className="inline-block w-3/4 h-8 bg-foreground/10 rounded-lg animate-pulse" />
                      ) : (translatedArticle?.titre || selectedArticle.titre)}
                    </h2>

                    <div className="relative rounded-[40px] md:rounded-[56px] overflow-hidden mb-12 border border-border/40 aspect-[16/9] shadow-2xl shadow-[#E6683A]/5">
                      <img src={selectedArticle.image} alt={translatedArticle?.titre || selectedArticle.titre} className="w-full h-full object-cover" />
                    </div>

                    <div className="max-w-3xl mx-auto lg:mx-0 mb-12">
                      <p className="text-base md:text-lg text-foreground/80 font-normal leading-relaxed mb-12 border-l-4 border-[#E6683A] pl-8 italic">
                        {translating ? (
                          <span className="block space-y-2">
                            <span className="block w-full h-4 bg-foreground/10 rounded animate-pulse" />
                            <span className="block w-4/5 h-4 bg-foreground/10 rounded animate-pulse" />
                          </span>
                        ) : (translatedArticle?.description || selectedArticle.description)}
                      </p>
                    </div>
                  </RevealOnScroll>

                  {/* MOBILE MODERN IDEA: Moved to BOTTOM of content */}
                  <div className="md:hidden mt-16 pt-12 border-t border-border/40 pb-12">
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#E6683A] flex items-center gap-2">
                        <Zap size={14} fill="currentColor" />
                        {t('news.readAnother')}
                      </h2>
                      <span className="text-[8px] font-bold opacity-40 uppercase">{t('news.swipe')}</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
                      {(translatingList ? allNews : translatedAllNews).map((article) => (
                        <button
                          key={article.id}
                          onClick={() => { setSelectedArticle(article); scrollToTop(); }}
                          className={`flex-shrink-0 flex flex-col items-center gap-2 snap-center transition-all ${selectedArticle?.id === article.id ? 'scale-110' : 'opacity-60'}`}
                        >
                          <div className={`w-16 h-16 rounded-full p-[2px] ${selectedArticle?.id === article.id ? 'bg-[#E6683A]' : 'bg-border/40'}`}>
                            <div className="w-full h-full rounded-full border-2 border-background overflow-hidden">
                              <img src={article.image} alt="" className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <span className="text-[8px] font-bold uppercase tracking-tight w-16 truncate text-center">
                            {article.pays || 'INFO'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-10 border-t border-border/40 flex items-center justify-end">
                    <div className="flex gap-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === 1 ? 'bg-[#E6683A]' : 'bg-secondary'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                  <Clock size={48} className="mb-4 animate-pulse" />
                  <p className="font-bold uppercase tracking-widest text-[10px]">{t('news.loading')}</p>
                </div>
              )}
            </section>

            {/* RIGHT: Scrollable News List (Desktop Only) */}
            <aside className="w-full lg:w-[400px] xl:w-[450px] hidden md:flex flex-col border-l border-border/40 lg:pl-10 lg:order-2 order-2 pb-12 lg:pb-0">
              <div className="sticky top-40 space-y-6">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-[2px] bg-[#E6683A] rounded-full"></span>
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#E6683A]">{t('news.recentLabel')}</span>
                  </div>
                  <h1 className="text-xl font-black tracking-tight uppercase flex items-center gap-3 text-foreground">
                    <Newspaper className="text-[#E6683A] w-5 h-5" />
                    {t('news.recentTitle')}
                  </h1>
                </div>

                {/* Search */}
                <div className="relative group mb-6">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#E6683A]/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-all duration-300 pointer-events-none" />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E6683A]/60 group-focus-within:text-[#E6683A] w-4 h-4 transition-colors duration-300" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('news.search')}
                    className="w-full bg-secondary/30 border border-border/30 hover:border-border/60 focus:border-[#E6683A]/50 rounded-2xl pl-11 pr-4 py-3.5 text-[12px] font-medium outline-none transition-all duration-300 placeholder:text-muted-foreground/50 shadow-sm focus:shadow-[0_0_0_3px_rgba(230,104,58,0.08)]"
                  />
                </div>

                {/* Scroll List */}
                <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                  {loading ? (
                    [1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-card animate-pulse rounded-2xl" />)
                  ) : (translatingList ? allNews : translatedAllNews).map((article) => (
                    <button
                      key={article.id}
                      onClick={() => { setSelectedArticle(article); scrollToTop(); }}
                      className={`text-left p-3.5 rounded-2xl transition-all duration-300 border flex gap-3.5 group ${
                        selectedArticle?.id === article.id
                          ? "bg-[#E6683A]/8 border-[#E6683A]/35 shadow-md"
                          : "bg-transparent border-border/20 hover:bg-secondary/40 hover:border-border/50"
                      }`}
                    >
                      <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-border/20 shadow-sm">
                        <img src={article.image} alt={article.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-center min-w-0 gap-1">
                        <div className="flex items-center gap-1.5">
                          {selectedArticle?.id === article.id && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E6683A] shrink-0"></span>
                          )}
                          <span className="text-[9px] font-semibold text-[#E6683A] uppercase tracking-wider">
                            {new Date(article.date).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <h3 className={`text-[11px] font-semibold leading-snug line-clamp-2 transition-colors duration-200 ${
                          selectedArticle?.id === article.id ? 'text-[#E6683A]' : 'text-foreground group-hover:text-[#E6683A]'
                        }`}>
                          {article.titre}
                        </h3>
                        {article.pays && (
                          <span className="text-[9px] text-muted-foreground/60 uppercase tracking-wide">{article.pays}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>


              </div>
            </aside>

          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #E6683A; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default NewsPage;
