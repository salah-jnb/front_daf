import { useEffect, useMemo, useState } from "react";
import { Download, Mail, MapPin, Phone } from "lucide-react";

const policyLinks = [
  {
    label: "Anti-Corruption and Bribery Statement",
    href: "/documents/anti-corruption-bribery.pdf",
    download: "Anti corruption & bribery.pdf",
  },
  {
    label: "Data Protection Policy",
    href: "/documents/data-protection-policy.pdf",
    download: "Data protection policy.pdf",
  },
  {
    label: "Code of Ethics",
    href: "/documents/code-of-ethics.pdf",
    download: "Code of ethics.pdf",
  },
];

const Footer = () => {
  const apiBaseUrl = useMemo(
    () =>
      (localStorage.getItem("tg_api") || import.meta.env.VITE_API_URL || "http://localhost:9090").replace(
        /\/$/,
        "",
      ),
    [],
  );
  const [info, setInfo] = useState<{
    id?: number;
    moveProfetionelle?: string;
    storageSolution?: string;
    phone1?: string;
    phone2?: string;
    email?: string;
    yearsExperience?: number;
    offices?: unknown[];
    sponsors?: unknown[];
    contacts?: unknown[];
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/informations/1`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setInfo(data);
      } catch {
        if (!cancelled) setInfo(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl]);

  const line = (v?: string | null) => (v && v.trim() ? v.trim() : "—");

  return (
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
                <span>
                  <span className="text-foreground font-semibold">Information #{info?.id ?? 1}</span>
                  <span className="block text-muted-foreground mt-1">
                    <span className="text-foreground/90 font-semibold">Move:</span>{" "}
                    {line(info?.moveProfetionelle)}
                  </span>
                  <span className="block text-muted-foreground">
                    <span className="text-foreground/90 font-semibold">Storage:</span>{" "}
                    {line(info?.storageSolution)}
                  </span>
                  <span className="block text-muted-foreground">
                    <span className="text-foreground/90 font-semibold">Years experience:</span>{" "}
                    {typeof info?.yearsExperience === "number" ? info.yearsExperience : "—"}
                  </span>
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>
                  {line(info?.phone1)}
                  <span className="mx-2 opacity-50">•</span>
                  {line(info?.phone2)}
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>{line(info?.email)}</span>
              </p>
              <div className="pt-3 mt-3 border-t border-border/70 text-sm md:text-base">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <span>
                    <span className="text-foreground/90 font-semibold">Offices:</span>{" "}
                    {Array.isArray(info?.offices) ? info!.offices!.length : 0}
                  </span>
                  <span>
                    <span className="text-foreground/90 font-semibold">Sponsors:</span>{" "}
                    {Array.isArray(info?.sponsors) ? info!.sponsors!.length : 0}
                  </span>
                  <span>
                    <span className="text-foreground/90 font-semibold">Contacts:</span>{" "}
                    {Array.isArray(info?.contacts) ? info!.contacts!.length : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

        <div className="glass rounded-2xl border border-border/70 p-6 md:p-8">
          <h3 className="text-3xl font-semibold mb-6">Policies and Documents</h3>
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
          © 2026 JAF Logistics. International Moving and Freight Services. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
