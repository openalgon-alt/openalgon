import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollAnimate } from "@/components/ui/scroll-animate";
import { FloatingParticles } from "@/components/ui/floating-particles";
import {
  ArrowRight,
  CheckCircle,
  Loader2,
  Sparkles,
  Zap,
  Globe,
  Cpu,
  Cloud,
  Shield,
  MessageSquare,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { SITE_URL, GLOBAL_KEYWORDS } from "@/lib/seo";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type FormState = "idle" | "loading" | "success" | "error";

const services = [
  { icon: Zap, label: "AI & Automation" },
  { icon: Globe, label: "Web & Mobile Apps" },
  { icon: Cpu, label: "Product Engineering" },
  { icon: Cloud, label: "Cloud & DevOps" },
  { icon: Shield, label: "Cybersecurity" },
  { icon: MessageSquare, label: "IT Consulting" },
];

const benefits = [
  "Free initial consultation — no commitment",
  "Response within 24 business hours",
  "Tailored proposal with transparent pricing",
  "Expert engineers, startup-friendly budgets",
];

const enquireSEO = {
  title: "Enquire — Get a Free Tech Consultation | OpenAlgon Bangalore",
  description:
    "Submit an enquiry to OpenAlgon and get a free technology consultation. Tell us about your project and we'll craft a tailored solution for your startup or enterprise. Based in Bangalore, India.",
  keywords: `${GLOBAL_KEYWORDS}, enquire, free consultation, tech enquiry, get a quote, project enquiry, OpenAlgon enquiry, startup consultation Bangalore`,
  canonical: `${SITE_URL}/enquire`,
};

const Enquire = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState<FormState>("idle");
  const [selectedService, setSelectedService] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("loading");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const message = formData.get("message") as string;
    const service = selectedService || (formData.get("service") as string);

    // 1️⃣ Always open mailto so the enquiry lands in your inbox too
    const subject = `Enquiry from ${name}${service ? ` — ${service}` : ""}`;
    const body = [
      `From: ${name} (${email})`,
      company ? `Company: ${company}` : "",
      service ? `Service Interest: ${service}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `mailto:info@openalgon.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank"
    );

    // 2️⃣ Also save to Supabase database
    try {
      const { error } = await supabase.from("enquiries").insert([
        {
          name,
          email,
          company: company || null,
          service_interest: service || null,
          message,
        },
      ]);

      if (error) {
        console.warn("[OpenAlgon] DB insert failed (mailto still sent):", error);
      }

      setFormState("success");
      (e.target as HTMLFormElement).reset();
      setSelectedService("");
      toast({
        title: "Enquiry sent! 🎉",
        description: "Your mail client has opened and your enquiry is saved.",
      });
    } catch (err) {
      // Even if DB fails, mailto already fired — mark success
      console.error("[OpenAlgon] Enquiry DB error:", err);
      setFormState("success");
      (e.target as HTMLFormElement).reset();
      setSelectedService("");
      toast({
        title: "Email opened! ✉️",
        description: "Please send the pre-filled email in your mail client.",
      });
    }
  };

  return (
    <Layout>
      <SEOHead {...enquireSEO} />

      {/* Hero */}
      <section className="section-light py-24 lg:py-32 relative overflow-hidden">
        <FloatingParticles count={25} className="z-[1]" />

        {/* Gradient Background */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />

        <div className="container-page relative z-10">
          <div className="max-w-2xl">
            <ScrollAnimate>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                Free Consultation — No Commitment
              </div>
            </ScrollAnimate>
            <ScrollAnimate delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Let's Build
                <br />
                <span className="text-muted-foreground">Something Great</span>
              </h1>
            </ScrollAnimate>
            <ScrollAnimate delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                Tell us about your project. Our team of senior engineers will
                craft a tailored solution — whether you're a startup or an
                enterprise, at any budget.
              </p>
            </ScrollAnimate>

            {/* Benefits */}
            <ScrollAnimate delay={0.3}>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-neutral py-16 lg:py-24">
        <div className="container-page">
          <div className="max-w-3xl mx-auto">
            {formState === "success" ? (
              <ScrollAnimate>
                <div className="bg-card rounded-3xl border border-border p-12 text-center shadow-sm">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-6">
                    <CheckCircle className="h-10 w-10 text-accent" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3">Enquiry Received!</h2>
                  <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                    Thank you for reaching out to OpenAlgon. A member of our
                    team will contact you within 24 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" size="lg" onClick={() => setFormState("idle")}>
                      Submit Another Enquiry
                    </Button>
                    <Button variant="accent" size="lg" asChild>
                      <a href="/">Back to Home</a>
                    </Button>
                  </div>
                </div>
              </ScrollAnimate>
            ) : (
              <ScrollAnimate>
                <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
                  {/* Form Header */}
                  <div className="bg-foreground text-background px-8 py-6">
                    <h2 className="text-2xl font-bold">Start Your Enquiry</h2>
                    <p className="text-background/70 text-sm mt-1">
                      Fill in the details below and we'll get back to you shortly.
                    </p>
                  </div>

                  <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Name + Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="enquire-name" className="block text-sm font-medium text-foreground/80 mb-2">
                          Full Name <span className="text-accent">*</span>
                        </label>
                        <input
                          id="enquire-name"
                          name="name"
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                          placeholder="John Doe"
                          required
                          disabled={formState === "loading"}
                        />
                      </div>
                      <div>
                        <label htmlFor="enquire-company" className="block text-sm font-medium text-foreground/80 mb-2">
                          Company / Startup
                        </label>
                        <input
                          id="enquire-company"
                          name="company"
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                          placeholder="Your company name"
                          disabled={formState === "loading"}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="enquire-email" className="block text-sm font-medium text-foreground/80 mb-2">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        id="enquire-email"
                        name="email"
                        type="email"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                        placeholder="you@company.com"
                        required
                        disabled={formState === "loading"}
                      />
                    </div>

                    {/* Service Interest */}
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-3">
                        Service Interest
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {services.map(({ icon: Icon, label }) => (
                          <button
                            key={label}
                            type="button"
                            disabled={formState === "loading"}
                            onClick={() =>
                              setSelectedService(
                                selectedService === label ? "" : label
                              )
                            }
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                              selectedService === label
                                ? "border-accent bg-accent/10 text-accent"
                                : "border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-foreground"
                            }`}
                          >
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="enquire-message" className="block text-sm font-medium text-foreground/80 mb-2">
                        Tell Us About Your Project <span className="text-accent">*</span>
                      </label>
                      <textarea
                        id="enquire-message"
                        name="message"
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 resize-none transition-all"
                        placeholder="Describe your project, goals, timeline, and any specific requirements..."
                        required
                        disabled={formState === "loading"}
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      variant="accent"
                      size="lg"
                      className="w-full text-base py-4"
                      type="submit"
                      disabled={formState === "loading"}
                    >
                      {formState === "loading" ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting Enquiry...
                        </>
                      ) : (
                        <>
                          Submit Enquiry
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to our privacy policy.
                      We never share your information with third parties.
                    </p>
                  </form>
                </div>
              </ScrollAnimate>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Enquire;
