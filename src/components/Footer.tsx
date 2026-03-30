import { Download, MapPin, Phone } from "lucide-react";

const policyLinks = [
  {
    label: "Anti corruption & Bribery Statement",
    href: "/documents/anti-corruption-bribery.pdf",
    download: "Anti corruption & bribery.pdf",
  },
  {
    label: "Data protection policy",
    href: "/documents/data-protection-policy.pdf",
    download: "Data protection policy.pdf",
  },
  {
    label: "Code of ethics",
    href: "/documents/code-of-ethics.pdf",
    download: "Code of ethics.pdf",
  },
];

const Footer = () => (
  <footer className="border-t border-border bg-secondary/20 py-14">
    <div className="container mx-auto px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="glass rounded-2xl border border-border/70 p-6 md:p-8">
          <a href="#home" className="inline-block mb-6">
            <img
              src="/brand/jaf-logo.png"
              alt="JAF Demenagements"
              className="h-20 md:h-24 w-auto object-contain"
              loading="lazy"
            />
          </a>
          <div className="space-y-3 text-muted-foreground text-base md:text-lg">
            <p className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span>4 Rue de la Nouvelle Delhi, Tunis 1002</span>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>71 906 446</span>
            </p>
          </div>
        </div>

        <div className="glass rounded-2xl border border-border/70 p-6 md:p-8">
          <h3 className="text-3xl font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-muted-foreground">
            {policyLinks.map((item) => (
              <li key={item.label} className="border-b border-border/70 pb-3 last:border-b-0 last:pb-0">
                <a
                  href={item.href}
                  download={item.download}
                  className="inline-flex items-center gap-3 hover:text-foreground transition-colors text-base md:text-lg"
                >
                  <Download className="w-4 h-4 text-primary" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-border/70 text-sm text-muted-foreground text-center">
        © 2026 JAF Logistics. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
