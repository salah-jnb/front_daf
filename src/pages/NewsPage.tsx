import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNews, useLastNews, BlockNewsDTO } from "@/hooks/useNews";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Calendar, Globe, Clock, Smartphone, Share2, Search, ArrowRight, MessageSquare, Newspaper, Zap, Phone } from "lucide-react";
import { Seo } from "@/components/seo/Seo";

const NewsPage = () => {
  const { t } = useTranslation();
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Seo
        title={selectedArticle ? `${selectedArticle.titre} | Actualités` : "Actualités | DAF Logistics"}
        description={selectedArticle?.description || "Découvrez toutes nos actualités et mises à jour du transport international."}
        path="/news"
      />

      <Navbar lightTextOnTop={false} />

      <main className="pt-24 lg:pt-40">

        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 min-h-[calc(100vh-120px)]">

            {/* LEFT: Article Detail */}
            <section className="flex-1 lg:order-1 order-1 py-6 lg:py-0">
              {selectedArticle ? (
                <div className="animate-fade-in max-w-4xl">
                  <RevealOnScroll>
                    <div className="flex flex-wrap items-center gap-4 mb-8 text-[10px] font-black uppercase tracking-widest text-[#E6683A]">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#E6683A]/10 rounded-full border border-[#E6683A]/20">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(selectedArticle.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      {selectedArticle.pays && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-full text-muted-foreground">
                          <Globe className="w-3.5 h-3.5" />
                          {selectedArticle.pays}
                        </div>
                      )}
                    </div>

                    <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-8 lg:mb-12 leading-[1.05] uppercase text-foreground">
                      {selectedArticle.titre}
                    </h2>

                    <div className="relative rounded-[40px] md:rounded-[56px] overflow-hidden mb-12 border border-border/40 aspect-[16/9] shadow-2xl shadow-[#E6683A]/5">
                      <img src={selectedArticle.image} alt={selectedArticle.titre} className="w-full h-full object-cover" />
                    </div>

                    <div className="max-w-3xl mx-auto lg:mx-0 mb-12">
                      <p className="text-xl md:text-2xl text-foreground font-bold leading-tight mb-12 border-l-4 border-[#E6683A] pl-8">
                        {selectedArticle.description}
                      </p>

                      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6 text-sm md:text-lg">
                        <p>L'industrie du transport international traverse une période de transformation sans précédent. Chez DAF Logistics, nous restons à la pointe de l'innovation pour offrir à nos clients des solutions toujours plus rapides et sécurisées.</p>
                        <p>Nos équipes dévouées travaillent sans relâche pour optimiser chaque étape de la chaîne logistique. De la planification initiale à la livraison finale, l'excellence opérationnelle est notre priorité absolue.</p>
                      </div>
                    </div>
                  </RevealOnScroll>

                  {/* MOBILE MODERN IDEA: Moved to BOTTOM of content */}
                  <div className="md:hidden mt-16 pt-12 border-t border-border/40 pb-12">
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#E6683A] flex items-center gap-2">
                        <Zap size={14} fill="currentColor" />
                        Lire un autre article
                      </h2>
                      <span className="text-[8px] font-bold opacity-40 uppercase">Balayer →</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
                      {allNews.map((article) => (
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
                  <p className="font-bold uppercase tracking-widest text-[10px]">Chargement...</p>
                </div>
              )}
            </section>

            {/* RIGHT: Scrollable News List (Desktop Only) */}
            <aside className="w-full lg:w-[400px] xl:w-[450px] hidden md:flex flex-col border-l border-border/40 lg:pl-10 lg:order-2 order-2 pb-12 lg:pb-0">
              <div className="sticky top-40 space-y-8">
                <div className="mb-8">
                  <h1 className="text-3xl font-black tracking-tighter uppercase mb-2 flex items-center gap-3">
                    <Newspaper className="text-[#E6683A]" />
                    Récents
                  </h1>
                </div>

                {/* Search */}
                <div className="relative group mb-8">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..."
                    className="w-full bg-secondary/20 border border-border/40 rounded-2xl pl-12 pr-4 py-4 text-[11px] font-bold outline-none focus:border-[#E6683A]/30 transition-all"
                  />
                </div>

                {/* Scroll List */}
                <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                  {loading ? (
                    [1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-card animate-pulse rounded-2xl" />)
                  ) : allNews.map((article) => (
                    <button
                      key={article.id}
                      onClick={() => { setSelectedArticle(article); scrollToTop(); }}
                      className={`text-left p-4 rounded-3xl transition-all border flex gap-4 group ${selectedArticle?.id === article.id
                          ? "bg-secondary border-[#E6683A]/40 shadow-lg"
                          : "bg-transparent border-transparent hover:bg-secondary/40"
                        }`}
                    >
                      <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-border/20 shadow-sm">
                        <img src={article.image} alt={article.titre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <div className="text-[8px] font-bold text-[#E6683A] uppercase tracking-widest mb-1">
                          {article.pays} • {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                        </div>
                        <h3 className="text-[11px] font-bold leading-tight line-clamp-2 mb-2 group-hover:text-[#E6683A] transition-colors">
                          {article.titre}
                        </h3>
                        <div className="flex items-center gap-1 text-[8px] font-black uppercase text-muted-foreground/60">
                          Lire
                          <ArrowRight size={10} className={selectedArticle?.id === article.id ? "translate-x-1" : ""} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Premium Contact Card - Senior UI/UX Touch */}
                <div className="mt-12 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#E6683A] to-[#ff8c61] rounded-[42px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative p-8 rounded-[40px] bg-[#0f172a] text-white overflow-hidden border border-white/5 shadow-2xl">
                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-40 h-40 bg-[#E6683A]/20 rounded-full blur-[60px] group-hover:bg-[#E6683A]/30 transition-colors duration-500"></div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6683A] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E6683A]"></span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E6683A]">Support Prioritaire</span>
                      </div>

                      <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Besoin d'aide ?</h4>
                      <h3 className="text-2xl font-black mb-6 tracking-tight">JAF LOGISTICS</h3>

                      <p className="text-[11px] text-white/50 leading-relaxed mb-8 max-w-[200px]">
                        Notre équipe d'experts est disponible pour vous accompagner dans vos projets.
                      </p>

                      <a
                        href="tel:+212661374166"
                        className="group/btn relative flex items-center justify-between w-full bg-white/5 hover:bg-[#E6683A] border border-white/10 hover:border-[#E6683A] p-4 rounded-2xl transition-all duration-500 overflow-hidden"
                      >
                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-10 h-10 rounded-xl bg-[#E6683A] group-hover/btn:bg-white flex items-center justify-center transition-colors duration-500">
                            <Phone size={18} className="text-white group-hover/btn:text-[#E6683A] transition-colors" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black uppercase tracking-widest opacity-60 group-hover/btn:text-white transition-colors">Appel Direct</span>
                            <span className="text-sm font-bold tracking-tight group-hover/btn:text-white transition-colors">(+212) 661 37 41 66</span>
                          </div>
                        </div>
                        <ArrowRight size={18} className="relative z-10 opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-500" />

                        {/* Hover Shine Effect */}
                        <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000"></div>
                      </a>
                    </div>
                  </div>
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
