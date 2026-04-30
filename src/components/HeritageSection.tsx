import { useTranslation } from "react-i18next";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export const HeritageSection = () => {
  const { t } = useTranslation();

  return (
    <section id="heritage" className="py-20 md:py-28 relative overflow-hidden bg-background">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
        <RevealOnScroll>
          <p className="text-primary font-bold text-sm uppercase tracking-[0.4em] mb-4">
            {t('howWeWork.legacy', 'Our Legacy')}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-10 leading-[1.1]">
            {t('howWeWork.established', 'Established in the')} <span className="gradient-text">1950's</span>
          </h2>
          
          <div className="bg-secondary/20 backdrop-blur-sm p-8 md:p-14 rounded-[3rem] border border-border/50 shadow-xl transition-all duration-500 hover:shadow-2xl hover:bg-secondary/30">
            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-8">
              <strong className="text-primary">DEMENAGEMENTS JAF</strong> {t('howWeWork.p1').replace('DEMENAGEMENTS JAF', '')}
            </p>
            <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full mb-8" />
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light italic">
              "{t('howWeWork.p2')}"
            </p>
          </div>
        </RevealOnScroll>
      </div>

      <style>{`
        .gradient-text {
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
};
