import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNews } from "@/hooks/useNews";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Calendar, Globe, ArrowLeft, Share2, Clock, Newspaper } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { useMemo } from "react";

const NewsDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { news, loading } = useNews();

  const article = useMemo(() => {
    return news.find(n => n.id.toString() === id);
  }, [news, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#E6683A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-48 pb-24 text-center">
          <div className="w-24 h-24 bg-[#E6683A]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Newspaper className="w-12 h-12 text-[#E6683A]" />
          </div>
          <h1 className="text-4xl font-black mb-6">Article non trouvé</h1>
          <Link to="/news" className="px-8 py-4 bg-[#E6683A] text-white rounded-2xl font-bold inline-flex items-center gap-3 hover:scale-105 transition-transform shadow-xl shadow-[#E6683A]/20">
            <ArrowLeft className="w-5 h-5" />
            Retour aux actualités
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo 
        title={`${article.titre} | DAF Logistics News`}
        description={article.description || ""}
        path={`/news/${id}`}
        image={article.image}
      />
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Progress bar top */}
        <div className="fixed top-0 left-0 w-full h-1 z-[60]">
           <div className="h-full bg-[#E6683A] shadow-[0_0_10px_#E6683A]" style={{ width: '100%', animation: 'shimmer 2s infinite' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          <RevealOnScroll>
            <Link to="/news" className="inline-flex items-center gap-3 text-muted-foreground hover:text-[#E6683A] transition-all mb-12 font-bold uppercase text-xs tracking-widest">
              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </div>
              {t('news.back', 'Retour aux actualités')}
            </Link>
          </RevealOnScroll>

          <article className="max-w-4xl mx-auto">
            <RevealOnScroll>
              <div className="flex flex-wrap items-center gap-6 mb-10 text-xs font-black uppercase tracking-widest text-[#E6683A]">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#E6683A]/10 rounded-full border border-[#E6683A]/20">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                {article.pays && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    {article.pays}
                  </div>
                )}
                <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  5 min read
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-12 leading-[0.95]">
                {article.titre}
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={100} scale={0.98}>
              <div className="relative rounded-[48px] overflow-hidden mb-20 shadow-2xl shadow-[#E6683A]/5 border border-border/40">
                <img 
                  src={article.image} 
                  alt={article.titre}
                  className="w-full aspect-[21/9] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <div className="prose prose-xl dark:prose-invert max-w-none">
                <p className="text-2xl md:text-3xl text-foreground font-bold leading-tight mb-12 border-l-4 border-[#E6683A] pl-8">
                  {article.description}
                </p>
                
                <div className="space-y-8 text-muted-foreground leading-relaxed text-lg md:text-xl">
                  <p>
                    L'industrie du transport international traverse une période de transformation sans précédent. Chez DAF Logistics, nous restons à la pointe de l'innovation pour offrir à nos clients des solutions toujours plus rapides et sécurisées.
                  </p>
                  <p>
                    Nos équipes dévouées travaillent sans relâche pour optimiser chaque étape de la chaîne logistique. De la planification initiale à la livraison finale, l'excellence opérationnelle est notre priorité absolue.
                  </p>
                  <h3 className="text-3xl font-black text-foreground tracking-tight mt-16 mb-8">Innovation et Durabilité</h3>
                  <p>
                    Nous investissons massivement dans de nouvelles technologies de suivi en temps réel et dans des processus respectueux de l'environnement pour réduire notre empreinte carbone tout en améliorant l'efficacité globale.
                  </p>
                  <div className="p-10 rounded-[32px] bg-secondary/30 border border-border/60 my-16">
                     <p className="italic text-2xl font-medium text-foreground">
                       "Notre mission est de connecter le monde avec intégrité et précision, un colis à la fois."
                     </p>
                     <div className="mt-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#E6683A] rounded-full" />
                        <div>
                           <div className="font-black uppercase tracking-widest text-xs">Direction Générale</div>
                           <div className="text-muted-foreground text-sm">DAF Logistics</div>
                        </div>
                     </div>
                  </div>
                  <p>
                    Pour en savoir plus sur nos nouveaux services ou pour obtenir un devis personnalisé, n'hésitez pas à contacter nos experts logistiques dès aujourd'hui.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Share & CTA */}
            <RevealOnScroll delay={300}>
              <div className="mt-32 pt-12 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Share</span>
                  <div className="flex gap-3">
                    {[1, 2, 3].map(i => (
                      <button key={i} className="w-12 h-12 rounded-2xl bg-secondary/50 border border-border/50 hover:bg-[#E6683A] hover:border-[#E6683A] hover:text-white transition-all flex items-center justify-center shadow-lg">
                        <Share2 className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>
                
                <Link to="/contact" className="w-full md:w-auto px-10 py-5 rounded-[24px] bg-[#E6683A] text-white font-black uppercase text-sm tracking-widest shadow-2xl shadow-[#E6683A]/20 hover:-translate-y-1 transition-all">
                  Get a Free Quote
                </Link>
              </div>
            </RevealOnScroll>
          </article>
        </div>
      </main>
      
      <Footer />
      
      <style>{`
        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default NewsDetailPage;
