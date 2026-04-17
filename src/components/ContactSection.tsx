import { useEffect, useMemo, useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Lottie from "lottie-react";
import truckAnimation from "../assets/truck-delivery-done.json";

const ContactSection = () => {
  const apiBaseUrl = useMemo(
    () =>
      (localStorage.getItem("tg_api") || import.meta.env.VITE_API_URL || "http://localhost:9090").replace(
        /\/$/,
        "",
      ),
    [],
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    originCity: "",
    destinationCity: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitOk, setSubmitOk] = useState<string | null>(null);

  const [infoLoading, setInfoLoading] = useState(true);
  const [info, setInfo] = useState<{ phone1?: string; phone2?: string; email?: string } | null>(null);

  const [offices, setOffices] = useState<{ id: number; officeName: string }[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setInfoLoading(true);
        const [resInfo, resOffices] = await Promise.all([
          fetch(`${apiBaseUrl}/informations/1`),
          fetch(`${apiBaseUrl}/offices`)
        ]);

        if (resInfo.ok) {
          const data = await resInfo.json();
          if (!cancelled) {
            setInfo({
              phone1: data.phone1 ?? "",
              phone2: data.phone2 ?? "",
              email: data.email ?? "",
            });
          }
        }
        
        if (resOffices.ok) {
          const dataOffices = await resOffices.json();
          if (!cancelled) {
            setOffices(Array.isArray(dataOffices) ? dataOffices : []);
          }
        }

      } catch {
        if (!cancelled) {
           setInfo(null);
           setOffices([]);
        }
      } finally {
        if (!cancelled) setInfoLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitOk(null);
    setSubmitting(true);

    const [firstName, ...rest] = form.name.trim().split(/\s+/);
    const lastName = rest.join(" ");

    try {
      const payload = {
        firstName: firstName || form.name.trim(),
        lastName: lastName || "",
        email: form.email.trim(),
        phone: form.phone.trim(),
        originCity: form.originCity.trim(),
        // Compat: some backend DTOs use this typo (see Admin pages)
        distnationCity: form.destinationCity.trim(),
        // Also send the correct spelling
        destinationCity: form.destinationCity.trim(),
        description: form.message.trim(),
        date: new Date().toISOString(),
        informationId: 1,
      };

      const res = await fetch(`${apiBaseUrl}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }

      setSubmitOk("Thank you for your request. Our team will contact you shortly.");
      setForm({ name: "", email: "", phone: "", originCity: "", destinationCity: "", message: "" });
    } catch (err: any) {
      setSubmitError(err?.message || "Erreur lors de l'envoi.");
    } finally {
      setSubmitting(false);
    }
  };

  const LottieComponent = Lottie && (Lottie as any).default ? (Lottie as any).default : Lottie;

  return (
    <section id="contact" className="py-32 relative section-glow">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <p
            className="text-primary font-semibold text-sm uppercase tracking-[0.3em] mb-4 opacity-0"
            style={{ animation: "contact-fade-up 0.8s ease forwards 0.2s" }}
          >
            Contact Our Team
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 opacity-0"
            style={{ animation: "contact-fade-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards 0.4s" }}
          >
            <span>Plan Your</span>
            <span className="gradient-text flex items-center justify-center gap-2">
              Next Move
              <span className="inline-flex items-center justify-center w-32 h-32 md:w-48 md:h-48 -mx-2 md:-mx-4 -my-8 md:-my-12" title="JAF Logistics Truck">
                <LottieComponent animationData={truckAnimation} loop={true} />
              </span>
            </span>
          </h2>
          <p
            className="text-muted-foreground text-lg opacity-0"
            style={{ animation: "contact-fade-up 0.8s ease forwards 0.6s" }}
          >
            Need an international moving quote or logistics advice? Send us your request and we will get back quickly.
          </p>

          <style>{`
            @keyframes contact-fade-up {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  id="contact-name"
                  aria-label="Full Name"
                  type="text"
                  placeholder="Full Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                />
                <input
                  id="contact-email"
                  aria-label="Email Address"
                  type="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                />
              </div>
              <input
                id="contact-phone"
                aria-label="Phone Number"
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300"
              />
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  id="contact-origin"
                  aria-label="Origin City"
                  type="text"
                  placeholder="Origin City"
                  required
                  value={form.originCity}
                  onChange={(e) => setForm({ ...form, originCity: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                />
                <input
                  id="contact-destination"
                  aria-label="Destination City"
                  type="text"
                  placeholder="Destination City"
                  required
                  value={form.destinationCity}
                  onChange={(e) => setForm({ ...form, destinationCity: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                />
              </div>
              <textarea
                id="contact-message"
                aria-label="Message"
                rows={5}
                placeholder="Tell us about your shipment..."
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
              />
              {submitError ? (
                <div className="text-sm text-destructive">{submitError}</div>
              ) : submitOk ? (
                <div className="text-sm text-primary">{submitOk}</div>
              ) : null}
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg glow-primary hover:scale-[1.02] transition-transform duration-300 disabled:opacity-70 disabled:hover:scale-100"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-2xl p-6 border border-border/70">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Call Us</h4>
                    <p className="text-muted-foreground text-sm">Free moving estimate & support</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {infoLoading ? "Loading…" : "Available"}
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <a
                  className="flex items-center justify-between gap-3 rounded-xl bg-secondary/60 border border-border px-4 py-3 hover:border-primary/50 transition-colors"
                  href={`tel:${(info?.phone1 || "+216 12 345 678").replace(/\s+/g, "")}`}
                >
                  <span className="text-sm font-semibold text-foreground">
                    {infoLoading ? "…" : info?.phone1 || "+216 12 345 678"}
                  </span>
                  <span className="text-xs text-muted-foreground">Tap to call</span>
                </a>

                <a
                  className="flex items-center justify-between gap-3 rounded-xl bg-secondary/60 border border-border px-4 py-3 hover:border-primary/50 transition-colors"
                  href={`tel:${(info?.phone2 || info?.phone1 || "+216 98 765 432").replace(/\s+/g, "")}`}
                >
                  <span className="text-sm font-semibold text-foreground">
                    {infoLoading ? "…" : info?.phone2 || info?.phone1 || "+216 98 765 432"}
                  </span>
                  <span className="text-xs text-muted-foreground">Support line</span>
                </a>

                <a
                  className="flex items-center justify-between gap-3 rounded-xl bg-secondary/60 border border-border px-4 py-3 hover:border-primary/50 transition-colors"
                  href={`mailto:${info?.email || "contact@example.com"}`}
                >
                  <span className="text-sm font-semibold text-foreground">
                    {infoLoading ? "…" : info?.email || "contact@example.com"}
                  </span>
                  <span className="text-xs text-muted-foreground">Email us</span>
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Fast response
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-secondary/60 text-muted-foreground border border-border">
                  International moves
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-secondary/60 text-muted-foreground border border-border">
                  Storage & logistics
                </span>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-border/70">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div className="flex-1">
                  <h4 className="font-bold mb-1">What we can help with</h4>
                  <p className="text-muted-foreground text-sm">
                    Share your origin, destination and details — we’ll prepare your quote.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-secondary/60 border border-border px-4 py-3">
                  <div className="text-xs text-muted-foreground">Professional moving</div>
                  <div className="font-semibold text-foreground mt-1">{infoLoading ? "…" : "Included"}</div>
                </div>
                <div className="rounded-xl bg-secondary/60 border border-border px-4 py-3">
                  <div className="text-xs text-muted-foreground">Secure storage</div>
                  <div className="font-semibold text-foreground mt-1">{infoLoading ? "…" : "Available"}</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-border/70">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div className="flex-1">
                  <h4 className="font-bold mb-1">Our Offices</h4>
                  <p className="text-muted-foreground text-sm">
                    Find us at these locations
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 text-sm">
                {infoLoading ? (
                  <div className="rounded-xl bg-secondary/60 border border-border px-4 py-3 text-muted-foreground">Loading offices...</div>
                ) : offices.length > 0 ? (
                  offices.map((office) => (
                    <div key={office.id} className="rounded-xl bg-secondary/60 border border-border px-4 py-3 flex items-start gap-2">
                       <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                       <div className="font-semibold text-foreground">{office.officeName}</div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl bg-secondary/60 border border-border px-4 py-3 text-muted-foreground">No offices available currently.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;