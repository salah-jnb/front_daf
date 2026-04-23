import React, { useState, useEffect } from "react";
import { Wrench, Hammer, Settings, Cpu } from "lucide-react";

const Entraindemaintenance = () => {
  const [dots, setDots] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Initialisation des systèmes...",
    "Optimisation de la base de données...",
    "Mise à jour des protocoles de sécurité...",
    "Finalisation de la maintenance..."
  ];

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 3000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E6683A]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 text-center px-4 max-w-2xl">
        {/* Animated Icon Cluster */}
        <div className="flex justify-center items-center gap-6 mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-[#E6683A]/20 blur-xl rounded-full animate-ping" />
            <div className="relative bg-black/40 border border-[#E6683A]/30 p-4 rounded-2xl backdrop-blur-xl">
              <Settings className="w-10 h-10 text-[#E6683A] animate-[spin_8s_linear_infinite]" />
            </div>
          </div>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#E6683A]/50 to-transparent" />
          <div className="relative">
             <div className="bg-black/40 border border-blue-500/30 p-4 rounded-2xl backdrop-blur-xl">
              <Cpu className="w-10 h-10 text-blue-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* The Main Phrase */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          En Maintenance{dots}
        </h1>

        {/* Animated Process Indicator */}
        <div className="flex flex-col items-center">
          <div className="h-6 overflow-hidden mb-8">
            <p className="text-[#E6683A] font-mono text-sm uppercase tracking-widest animate-bounce">
              {steps[currentStep]}
            </p>
          </div>

          {/* Premium Progress Bar */}
          <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#E6683A]/0 via-[#E6683A] to-[#E6683A]/0 w-20 animate-[maintenance-scan_2s_ease-in-out_infinite]"
            />
          </div>
        </div>

        {/* Subtle Bottom Note */}
        <p className="mt-16 text-white/30 text-xs uppercase tracking-[0.3em] font-medium">
          Daf Service • Qualité & Performance
        </p>
      </div>

      <style>{`
        @keyframes maintenance-scan {
          0% { left: -20%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Entraindemaintenance;
