const steps = [
  {
    number: "01",
    title: "Request Your Quote",
    description: "Tell us about your move or shipment and receive a clear, competitive estimate.",
  },
  {
    number: "02",
    title: "Custom Planning",
    description: "Our logistics team builds the right plan, timeline, and packing strategy for your needs.",
  },
  {
    number: "03",
    title: "Secure Handling",
    description: "Your belongings are packed, handled, and loaded using strict safety and quality standards.",
  },
  {
    number: "04",
    title: "Track and Deliver",
    description: "Track your shipment progress and receive delivery on time with proactive support.",
  },
];

const ProcessSection = () => (
  <section id="process" className="py-20 md:py-32 relative section-glow">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
        <p className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-[0.24em] sm:tracking-[0.3em] mb-3 sm:mb-4">
          How It Works
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
          Simple. <span className="gradient-text">Streamlined.</span> Reliable.
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg">
          A simple four-step process from planning to safe final delivery.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 sm:gap-8 relative">
        {/* Connection line */}
        <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {steps.map((step, i) => (
          <div key={i} className="relative text-center group glass md:bg-transparent rounded-2xl border border-border/70 md:border-0 p-5 md:p-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto rounded-full glass flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:border-primary/40 transition-all duration-500">
              <span className="text-xl sm:text-2xl font-black gradient-text">{step.number}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">{step.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
