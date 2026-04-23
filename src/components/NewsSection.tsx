import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLastNews } from "@/hooks/useNews";
import { ArrowRight, Calendar, Globe, Newspaper } from "lucide-react";
import { RevealOnScroll } from "./RevealOnScroll";

const NewsSection = () => {
  const { t } = useTranslation();
  const { lastNews, loading } = useLastNews();

  return (
    <section id="news" className="py-24 md:py-36 relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Centered Header - Updated to Global Project Style */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              <Newspaper className="w-3 h-3" />
              {t('news.eyebrow', 'Actualités')}
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              {t('news.title', 'Dernières Nouvelles')} <br />
              <span className="text-[#E6683A]">&</span> {t('news.updates', 'Mises à jour')}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg mx-auto">
              {t('news.description', 'Restez informé des dernières tendances du transport international.')}
            </p>
          </RevealOnScroll>
        </div>

        {/* Horizontal Layout: Cleaned up Border and Background for Global Consistency */}
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="h-96 rounded-[48px] bg-card/20 animate-pulse" />
          ) : lastNews ? (
            <RevealOnScroll scale={0.98}>
              <div className="group flex flex-col lg:flex-row bg-transparent overflow-hidden transition-all duration-500">

                {/* Left: Small Image with rounded corners and no outer card border */}
                <div className="w-full lg:w-[40%] xl:w-[35%] h-[300px] lg:h-auto overflow-hidden rounded-[32px] shadow-xl">
                  <img
                    src={lastNews.image}
                    alt={lastNews.titre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>

                {/* Right: Details - Matching Project Font and Style */}
                <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center">
                  {/* Date and Country */}
                  <div className="flex flex-wrap items-center gap-6 mb-6 text-[11px] font-bold uppercase tracking-[0.15em] text-[#E6683A]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(lastNews.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    {lastNews.pays && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="w-4 h-4 text-[#E6683A]" />
                        {lastNews.pays}
                      </div>
                    )}
                  </div>

                  {/* Title - Global Style */}
                  <h3 className="text-2xl md:text-4xl font-extrabold mb-6 leading-tight tracking-tight group-hover:text-[#E6683A] transition-colors">
                    {lastNews.titre}
                  </h3>

                  {/* Description - Global Style */}
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-10 line-clamp-3 md:line-clamp-4">
                    {lastNews.description}
                  </p>

                  {/* More Button */}
                  <div className="mt-auto">
                    <Link
                      to="/news"
                      className="inline-flex items-center gap-4 text-[#E6683A] font-bold uppercase text-xs tracking-[0.2em] group/btn"
                    >
                      <span>{t('news.readMore', 'Lire la suite')}</span>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E6683A] text-white flex items-center justify-center shadow-lg shadow-[#E6683A]/20 group-hover/btn:scale-110 group-hover/btn:translate-x-2 transition-all">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              {t('news.empty', 'Aucun article trouvé.')}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
