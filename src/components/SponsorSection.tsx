import { Globe, Mail, Phone } from "lucide-react";

const SponsorSection = () => (
  <section id="sponsor" className="py-20 relative">
    <div className="container mx-auto px-6">
      <div className="glass rounded-3xl border border-border/70 p-8 md:p-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-[0.3em] mb-4">Partner Network</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              Partner in <span className="gradient-text">Morocco</span>
            </h2>
            <p className="text-xl md:text-2xl leading-snug mb-6">MOUMENE INTERNATIONAL MOVING COMPANY</p>

            <div className="space-y-2 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>Address Rabat: 37, Rue Idriss Al Akbar N°3 - HASSAN - RABAT -10020</p>
              <p>Address Casa: 5, Bd Abdellah Ben Yacine - 5eme Etage N°1 - CASA</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> mimc@moumene.com</p>
              <p className="flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> www.moumene.com</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> (+212) 537 26 20 46 / 26 31 57</p>
              <p>GSM: (+212) 661 37 41 66</p>
              <p>FAX: (+212) 537 26 23 94</p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[360px] rounded-2xl border border-border/70 bg-card/60 p-6">
              <img
                src="/partners/mimc.jpg"
                alt="MIMC logo"
                className="w-full h-auto object-contain rounded-md"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SponsorSection;
