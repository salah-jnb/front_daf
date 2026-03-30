import { useState } from "react";
import { Phone, Mail } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
    alert("Thank you for your request. Our team will contact you shortly.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-32 relative section-glow">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-primary font-semibold text-sm uppercase tracking-[0.3em] mb-4">
            Contact Our Team
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Plan Your <span className="gradient-text">Next Move</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Need an international moving quote or logistics advice? Send us your request and we will get back quickly.
          </p>
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
              <button
                type="submit"
                className="w-full px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg glow-primary hover:scale-[1.02] transition-transform duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Free Moving Estimate</h4>
                  <p className="text-muted-foreground text-sm">(216)71906449</p>
                  <p className="text-muted-foreground text-sm">Demjaf@planet.tn</p>
                </div>
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Customer Support</h4>
                  <p className="text-muted-foreground text-sm">G.managerdemjaf@orange.tn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
