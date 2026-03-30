const AccreditationsSection = () => (
  <section id="accreditations" className="py-20 md:py-24 relative section-glow">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto mb-14">
        <div className="w-full max-w-3xl mx-auto bg-primary/90 text-primary-foreground text-center rounded-sm py-2 glow-primary">
          <h2 className="text-3xl md:text-4xl tracking-wide font-light uppercase">Accreditations</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-stretch max-w-5xl mx-auto">
        <article className="glass border border-border/70 rounded-3xl p-6 md:p-8 flex items-center justify-center min-h-[330px]">
          <img
            src="/partners/iamx.png"
            alt="IAMX Validated"
            className="w-full max-w-[250px] h-auto object-contain"
            loading="lazy"
          />
        </article>

        <article className="glass border border-border/70 rounded-3xl p-6 md:p-8 flex flex-col justify-center items-center text-center min-h-[330px]">
          <div className="flex items-center justify-center mb-5 w-full">
            <img
              src="/partners/iam.png"
              alt="IAM - International Association of Movers"
              className="w-full max-w-[260px] h-auto object-contain mx-auto"
              loading="lazy"
            />
          </div>
        
        </article>
      </div>
    </div>
  </section>
);

export default AccreditationsSection;
