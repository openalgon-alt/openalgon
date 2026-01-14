import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollAnimate } from "@/components/ui/scroll-animate";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
    return (
        <Layout>
            <section className="bg-background py-24 lg:py-32 relative overflow-hidden">
                <FloatingParticles count={20} className="z-[1]" />

                {/* Background Image */}
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
                                            <span className="text-foreground font-medium">info@openalgon.com</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                                        <div className="bg-accent/10 p-3 rounded-full">
                                            <Phone className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Phone</p>
                                            <span className="text-foreground font-medium">+91 9742182343</span>
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
                            </div>
                        </ScrollAnimate>

                        <ScrollAnimate delay={0.3} direction="right">
                            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                                <h2 className="text-2xl font-bold mb-6 text-foreground">Send us a Message</h2>
                                <form
                                    className="space-y-6"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.currentTarget);
                                        const name = formData.get('name');
                                        const email = formData.get('email');
                                        const message = formData.get('message');
                                        window.location.href = `mailto:info@openalgon.com?subject=Contact from ${name}&body=From: ${name} (${email})%0D%0A%0D%0A${message}`;
                                    }}
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                                            Name
                                        </label>
                                        <input
                                            name="name"
                                            type="text"
                                            className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-all"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                                            Email
                                        </label>
                                        <input
                                            name="email"
                                            type="email"
                                            className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-all"
                                            placeholder="you@company.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent resize-none transition-all"
                                            placeholder="Tell us about your project..."
                                            required
                                        />
                                    </div>
                                    <Button variant="accent" size="lg" className="w-full" type="submit">
                                        Send Message
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </form>
                            </div>
                        </ScrollAnimate>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Contact;
