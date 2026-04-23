import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { ClipboardList, Map, ShieldCheck, Truck, Check } from "lucide-react";

const ProcessSection = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);

  // Auto-play the timeline states
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000); // Transitions every 4 seconds
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      id: 0,
      title: t('process.s1.title', "Request Quote"),
      description: t('process.s1.desc', "Provide details about your shipment and receive a clear, competitive estimate."),
      icon: ClipboardList,
    },
    {
      id: 1,
      title: t('process.s2.title', "Custom Plan"),
      description: t('process.s2.desc', "Our logistics team designs the timeline and packing strategy for your needs."),
      icon: Map,
    },
    {
      id: 2,
      title: t('process.s3.title', "Secure Handling"),
      description: t('process.s3.desc', "Belongings are packed and loaded using strict safety and quality standards."),
      icon: ShieldCheck,
    },
    {
      id: 3,
      title: t('process.s4.title', "Track & Deliver"),
      description: t('process.s4.desc', "Monitor your shipment progress and receive on-time delivery with full support."),
      icon: Truck,
    },
  ];

  return (
    <section id="process" className="py-24 md:py-32 relative bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Area */}
        <RevealOnScroll className="mb-16 md:mb-20">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-[#E6683A]/10 border border-[#E6683A]/20 text-[#E6683A] font-semibold text-xs sm:text-sm uppercase tracking-widest backdrop-blur-sm">
              {t('process.eyebrow', "Comment Ça Marche")}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-foreground">
              {t('process.title', "Simple. Efficace. Fiable.").split('.').map((p, i, a) => 
                i === a.length - 1 || p === "" ? <span key={i}>{p}</span> :
                i === 1 ? <span key={i} className="text-[#E6683A]"> {p}. </span> :
                <span key={i}>{p}. </span>
              )}
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              {t('process.desc', "Un processus simple en quatre étapes, de la planification à la livraison finale en toute sécurité.")}
            </p>
          </div>
        </RevealOnScroll>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
          {steps.map((step, index) => {
            const isCompleted = index < activeStep;
            const isActive = index === activeStep;
            
            return (
              <RevealOnScroll key={step.id} delay={index * 100} className="w-full">
                <div 
                  className="group relative flex flex-col cursor-pointer"
                  onClick={() => setActiveStep(index)}
                >
                  
                  {/* Connection Lines */}
                  {index < steps.length - 1 && (
                    <>
                      {/* Desktop Horizontal Line */}
                      <div className="hidden md:block absolute top-7 left-[56px] w-[calc(100%-56px+24px)] h-[2px] bg-border/40 z-0">
                        <div 
                          className="h-full bg-[#E6683A] transition-all duration-1000 ease-in-out"
                          style={{ width: isCompleted ? '100%' : '0%' }}
                        />
                      </div>
                      
                      {/* Mobile Vertical Line */}
                      <div className="md:hidden absolute top-[56px] left-7 w-[2px] h-[calc(100%-56px+32px)] bg-border/40 z-0">
                        <div 
                          className="w-full bg-[#E6683A] transition-all duration-1000 ease-in-out"
                          style={{ height: isCompleted ? '100%' : '0%' }}
                        />
                      </div>
                    </>
                  )}

                  {/* Timeline Node */}
                  <div className="relative flex justify-start z-10">
                    <div 
                      className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-700 bg-background
                        ${isActive ? 'border-[#E6683A] shadow-[0_0_15px_rgba(230,104,58,0.25)]' : 
                          isCompleted ? 'border-[#E6683A] bg-[#E6683A]' : 'border-border/60'}
                      `}
                    >
                      {/* Active Pulse Animation */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-[#E6683A]/20 animate-ping" style={{ animationDuration: '2.5s' }} />
                      )}
                      
                      {/* Node Content */}
                      {isCompleted ? (
                        <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                      ) : (
                        <span className={`text-sm font-semibold transition-colors duration-500 ${isActive ? 'text-[#E6683A]' : 'text-muted-foreground/60'}`}>
                          0{index + 1}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div 
                    className={`
                      relative mt-6 md:mt-8 p-6 rounded-[12px] transition-all duration-500
                      backdrop-blur-md border 
                      ${isActive 
                        ? 'bg-card/90 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-border/80 border-t-[3px] border-t-[#E6683A] md:-translate-y-1' 
                        : 'bg-card/40 border-border/40 hover:bg-card/60 hover:border-border/60'}
                    `}
                  >
                    <step.icon 
                      className={`w-5 h-5 mb-4 transition-colors duration-500
                        ${isActive ? 'text-[#E6683A]' : isCompleted ? 'text-foreground/80' : 'text-muted-foreground/50'}
                      `} 
                      strokeWidth={1.5}
                    />
                    <h3 className={`text-base font-semibold mb-2 transition-colors duration-500 ${isActive ? 'text-foreground' : 'text-foreground/70'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-500 ${isActive ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                      {step.description}
                    </p>
                  </div>
                  
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
