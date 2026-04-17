import { useEffect, useMemo, useState } from "react";

type Sponsor = { id?: number; image?: string };

const AccreditationsSection = () => {
  const apiBaseUrl = useMemo(
    () =>
      (localStorage.getItem("tg_api") || import.meta.env.VITE_API_URL || "").replace(
        /\/$/,
        "",
      ),
    [],
  );
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiBaseUrl}/sponsors`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        const list = Array.isArray(data) ? data : [];
        setSponsors(list);
      } catch {
        if (!cancelled) setSponsors([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl]);

  const logos = sponsors
    .map((s) => s?.image)
    .filter((u): u is string => typeof u === "string" && u.trim().startsWith("http"));

  return (
    <section id="accreditations" className="py-16 md:py-24 relative section-glow">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto mb-8 sm:mb-14">
          <div className="w-full max-w-3xl mx-auto bg-primary/90 text-primary-foreground text-center rounded-sm py-2 sm:py-2.5 glow-primary">
            <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-wide font-light uppercase">
              Accreditations
            </h2>
          </div>
        </div>

        {logos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {logos.slice(0, 15).map((src, idx) => (
              <article
                key={`${src}-${idx}`}
                className="glass border border-border/70 rounded-3xl p-4 sm:p-5 flex items-center justify-center min-h-[140px] hover:border-primary/40 transition-all duration-300 hover:shadow-md"
                style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.06)" }}
              >
                <img
                  src={src}
                  alt={`JAF Logistics Accredited Partner - ${idx + 1}`}
                  className="w-full max-w-[170px] h-auto object-contain transition-all duration-300 hover:scale-105"
                  style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))" }}
                  loading="lazy"
                  decoding="async"
                />
              </article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-10 md:gap-16 items-stretch max-w-5xl mx-auto">
            <article className="glass border border-border/70 rounded-3xl p-4 sm:p-6 md:p-8 flex items-center justify-center min-h-[220px] sm:min-h-[280px] md:min-h-[330px] hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
              <img
                src="/partners/iamx.png"
                alt="IAMX Validated"
                className="w-full max-w-[190px] sm:max-w-[230px] md:max-w-[250px] h-auto object-contain transition-transform duration-300 hover:scale-105"
                style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))" }}
                loading="lazy"
              />
            </article>

            <article className="glass border border-border/70 rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center text-center min-h-[220px] sm:min-h-[280px] md:min-h-[330px] hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-center mb-4 sm:mb-5 w-full">
                <img
                  src="/partners/iam.png"
                  alt="IAM - International Association of Movers"
                  className="w-full max-w-[200px] sm:max-w-[240px] md:max-w-[260px] h-auto object-contain mx-auto transition-transform duration-300 hover:scale-105"
                  style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))" }}
                  loading="lazy"
                />
              </div>
              {loading ? (
                <div className="text-sm text-muted-foreground">Loading sponsors...</div>
              ) : (
                <div className="text-sm text-muted-foreground">No sponsors found.</div>
              )}
            </article>
          </div>
        )}
      </div>
    </section>
  );
};

export default AccreditationsSection;
