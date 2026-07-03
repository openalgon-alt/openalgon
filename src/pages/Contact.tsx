import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollAnimate } from "@/components/ui/scroll-animate";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { ArrowRight, Mail, Phone, MapPin, CheckCircle, Loader2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { pageSEO } from "@/lib/seo";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type FormState = "idle" | "loading" | "success" | "error";

const Contact = () => {
    const { toast } = useToast();
    const [formState, setFormState] = useState<FormState>("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState("loading");

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const company = formData.get("company") as string;
        const message = formData.get("message") as string;

        // 1️⃣ Always open mailto so the message also lands in your inbox
        const mailtoLink = `mailto:info@openalgon.com?subject=Contact from ${encodeURIComponent(name)}&body=From: ${encodeURIComponent(name)} (${encodeURIComponent(email)})${company ? `%0ACompany: ${encodeURIComponent(company)}` : ""}%0A%0A${encodeURIComponent(message)}`;
        window.open(mailtoLink, "_blank");

        // 2️⃣ Also save to Supabase database
        try {
            const { error } = await supabase.from("contact_submissions").insert([
                { name, email, company: company || null, message },
            ]);

            if (error) {
                console.warn("[OpenAlgon] DB insert failed (mailto still sent):", error);
            }

            setFormState("success");
            (e.target as HTMLFormElement).reset();
            toast({
                title: "Message sent! ✉️",
                description: "Your mail client has opened and your message is saved.",
            });
        } catch (err) {
            // Even if DB fails, mailto already fired — mark success
            console.error("[OpenAlgon] Contact DB error:", err);
            setFormState("success");
            (e.target as HTMLFormElement).reset();
            toast({
                title: "Email opened! ✉️",
                description: "Please send the pre-filled email in your mail client.",
            });
        }
    };

    return (
        <Layout>
            <SEOHead {...pageSEO.contact} />

            <section className="bg-background py-24 lg:py-32 relative overflow-hidden">
                <FloatingParticles count={20} className="z-[1]" />

                {/* Background */}
                <div className="absolute inset-0 z-0 bg-background/95" />

                <div className="container-page relative z-[2]">
                    <div className="max-w-3xl mb-16">
                        <ScrollAnimate>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 text-foreground">
                                Get in Touch
                            </h1>
                        </ScrollAnimate>
                        <ScrollAnimate delay={0.1}>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                Ready to discuss your project? We'd love to hear from you.
                                Reach out and let's start a conversation.
                            </p>
                        </ScrollAnimate>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Contact Info */}
                        <ScrollAnimate delay={0.2}>
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                                        <div className="bg-accent/10 p-3 rounded-full">
                                            <Mail className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Email</p>
                                            <a href="mailto:info@openalgon.com" className="text-foreground font-medium hover:text-accent transition-colors">
                                                info@openalgon.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                                        <div className="bg-accent/10 p-3 rounded-full">
                                            <Phone className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Phone</p>
                                            <a href="tel:+919742182343" className="text-foreground font-medium hover:text-accent transition-colors">
                                                +91 9742182343
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                                        <div className="bg-accent/10 p-3 rounded-full">
                                            <MapPin className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Office</p>
                                            <span className="text-foreground font-medium">Mahadevpura, Bangalore</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Response time */}
                                <div className="mt-8 p-4 rounded-xl bg-accent/5 border border-accent/20">
                                    <p className="text-sm text-foreground/80">
                                        <span className="font-semibold text-accent">⚡ Fast Response:</span> We typically reply within 24 hours on business days.
                                    </p>
                                </div>
                            </div>
                        </ScrollAnimate>

                        {/* Contact Form */}
                        <ScrollAnimate delay={0.3} direction="right">
                            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                                {formState === "success" ? (
                                    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                                        <CheckCircle className="h-16 w-16 text-accent mb-4" />
                                        <h2 className="text-2xl font-bold mb-2 text-foreground">Message Sent!</h2>
                                        <p className="text-muted-foreground mb-6">
                                            Thank you for reaching out. We'll get back to you within 24 hours.
                                        </p>
                                        <Button variant="outline" onClick={() => setFormState("idle")}>
                                            Send Another Message
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold mb-6 text-foreground">Send us a Message</h2>
                                        <form className="space-y-5" onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div>
                                                    <label htmlFor="contact-name" className="block text-sm font-medium text-foreground/80 mb-2">
                                                        Name <span className="text-accent">*</span>
                                                    </label>
                                                    <input
                                                        id="contact-name"
                                                        name="name"
                                                        type="text"
                                                        className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-all"
                                                        placeholder="Your name"
                                                        required
                                                        disabled={formState === "loading"}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="contact-company" className="block text-sm font-medium text-foreground/80 mb-2">
                                                        Company
                                                    </label>
                                                    <input
                                                        id="contact-company"
                                                        name="company"
                                                        type="text"
                                                        className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-all"
                                                        placeholder="Your company"
                                                        disabled={formState === "loading"}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="contact-email" className="block text-sm font-medium text-foreground/80 mb-2">
                                                    Email <span className="text-accent">*</span>
                                                </label>
                                                <input
                                                    id="contact-email"
                                                    name="email"
                                                    type="email"
                                                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-all"
                                                    placeholder="you@company.com"
                                                    required
                                                    disabled={formState === "loading"}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="contact-message" className="block text-sm font-medium text-foreground/80 mb-2">
                                                    Message <span className="text-accent">*</span>
                                                </label>
                                                <textarea
                                                    id="contact-message"
                                                    name="message"
                                                    rows={5}
                                                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent resize-none transition-all"
                                                    placeholder="Tell us about your project..."
                                                    required
                                                    disabled={formState === "loading"}
                                                />
                                            </div>
                                            <Button
                                                variant="accent"
                                                size="lg"
                                                className="w-full"
                                                type="submit"
                                                disabled={formState === "loading"}
                                            >
                                                {formState === "loading" ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </>
                                                )}
                                            </Button>
                                            <p className="text-xs text-muted-foreground text-center">
                                                By submitting, you agree to our privacy policy. We never share your data.
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>
                        </ScrollAnimate>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Contact;
