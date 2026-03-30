const steps = [
  {
    number: "01",
    title: "Request a Quote",
    description: "Share your shipment details and receive a competitive, transparent quote within hours.",
  },
  {
    number: "02",
    title: "Custom Planning",
    description: "Our logistics experts design the optimal route, timeline, and packaging strategy for your cargo.",
  },
  {
    number: "03",
    title: "Secure Handling",
    description: "Your goods are collected, inspected, and loaded with industry-leading safety protocols.",
  },
  {
    number: "04",
    title: "Track & Deliver",
    description: "Monitor your shipment in real-time and receive it on schedule, every time.",
  },
];

const ProcessSection = () => (
  <section id="process" className="py-32 relative section-glow">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <p className="text-primary font-semibold text-sm uppercase tracking-[0.3em] mb-4">
          How It Works
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Simple. <span className="gradient-text">Streamlined.</span> Reliable.
        </h2>
        <p className="text-muted-foreground text-lg">
          Four straightforward steps from request to delivery.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8 relative">
        {/* Connection line */}
        <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {steps.map((step, i) => (
          <div key={i} className="relative text-center group">
            <div className="w-24 h-24 mx-auto rounded-full glass flex items-center justify-center mb-6 group-hover:border-primary/40 transition-all duration-500">
              <span className="text-2xl font-black gradient-text">{step.number}</span>
            </div>
            <h3 className="text-lg font-bold mb-3">{step.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
