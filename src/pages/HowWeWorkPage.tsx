import { useEffect } from "react";
import { MapPin, Globe, CalendarSearch, FileText, PackageCheck, PlaneTakeoff, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import img1 from "@/assets/howwework/img1.jpg";
import img2 from "@/assets/howwework/img2.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";

const HowWeWorkPage = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Navbar lightTextOnTop={false} />
      <div className="min-h-screen bg-background pt-24 md:pt-32">
        


      {/* 2. SERVICES DEEP DIVE (ZZ Layout) */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* National Move */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32 group">
            <div className="order-2 lg:order-1 relative rounded-[2rem] overflow-hidden shadow-2xl h-[400px] transform transition-transform duration-700 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
              <img src={img1} alt="National Move Service" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-blue-500" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6">{t('howWeWork.national.title')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                {t('howWeWork.national.p1')}
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('howWeWork.national.p2')}
              </p>
            </div>
          </div>

          {/* International Move */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center group">
            <div className="order-1 lg:order-1">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-amber-500" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6">{t('howWeWork.intl.title')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4 text-lg">
                {t('howWeWork.intl.p1')}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                {t('howWeWork.intl.p2')}
              </p>
              <div className="flex items-center gap-4 bg-primary/10 p-5 rounded-2xl border border-primary/20">
                <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
                <p className="text-foreground font-bold tracking-wide">{t('howWeWork.intl.shield')}</p>
              </div>
            </div>

            <div className="order-2 lg:order-2 relative rounded-[2rem] overflow-hidden shadow-2xl h-[400px] transform transition-transform duration-700 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-amber-500/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
              <img src={img2} alt="International Move Service" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. HOW WE WORK (4 Steps Interactive Timeline) */}
      <section className="py-20 md:py-32 bg-secondary/30 relative border-t border-border/50 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="text-center mb-16 md:mb-24">
            <p className="text-primary font-bold text-sm uppercase tracking-[0.4em] mb-3">{t('howWeWork.processLabel')}</p>
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-foreground">{t('howWeWork.howWeWorkLabel')}</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
            
            {/* Animated Connecting Path for Desktop */}
            <div className="hidden lg:block absolute top-[50%] left-[10%] right-[10%] h-0.5 bg-border/40 z-0">
              <div className="h-full bg-primary animate-[grow-right_3s_ease-out_forwards]" style={{ transformOrigin: 'left' }} />
            </div>

            {/* Animated Connecting Path for Mobile/Tablet (Vertical) */}
            <div className="lg:hidden absolute top-[10%] bottom-[10%] left-[50%] w-0.5 bg-border/40 z-0 -translate-x-1/2">
              <div className="w-full bg-primary animate-[grow-down_3s_ease-out_forwards]" style={{ transformOrigin: 'top' }} />
            </div>

            {/* Custom Keyframes for Path Animation */}
            <style>{`
              @keyframes grow-right {
                0% { transform: scaleX(0); }
                100% { transform: scaleX(1); }
              }
              @keyframes grow-down {
                0% { transform: scaleY(0); }
                100% { transform: scaleY(1); }
              }
            `}</style>

            {/* Step 1 */}
            <div className="glass p-8 rounded-3xl border border-border/60 shadow-lg hover:-translate-y-3 transition-transform duration-500 relative group">
              <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl font-black group-hover:scale-110 group-hover:text-primary transition-all duration-500">01</div>
              <CalendarSearch className="w-12 h-12 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold mb-4">{t('howWeWork.processSteps.s1.title')}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                {t('howWeWork.processSteps.s1.desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass p-8 rounded-3xl border border-border/60 shadow-lg hover:-translate-y-3 transition-transform duration-500 relative group md:translate-y-12">
              <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl font-black group-hover:scale-110 group-hover:text-primary transition-all duration-500">02</div>
              <FileText className="w-12 h-12 text-blue-500 mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold mb-4">{t('howWeWork.processSteps.s2.title')}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                {t('howWeWork.processSteps.s2.desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass p-8 rounded-3xl border border-border/60 shadow-lg hover:-translate-y-3 transition-transform duration-500 relative group">
              <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl font-black group-hover:scale-110 group-hover:text-primary transition-all duration-500">03</div>
              <PackageCheck className="w-12 h-12 text-amber-500 mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold mb-4">{t('howWeWork.processSteps.s3.title')}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                {t('howWeWork.processSteps.s3.desc')}
              </p>
            </div>

            {/* Step 4 */}
            <div className="glass p-8 rounded-3xl border border-border/60 shadow-lg hover:-translate-y-3 transition-transform duration-500 relative group md:translate-y-12">
              <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl font-black group-hover:scale-110 group-hover:text-primary transition-all duration-500">04</div>
              <PlaneTakeoff className="w-12 h-12 text-green-500 mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold mb-4">{t('howWeWork.processSteps.s4.title')}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                {t('howWeWork.processSteps.s4.desc')}
              </p>
            </div>
          </div>
          
        </div>
      </section>

    </div>
    <Footer />
    <FloatingCallButton />
  </>
  );
};

export default HowWeWorkPage;
