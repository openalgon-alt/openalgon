import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollAnimate, ScrollAnimateStagger, ScrollAnimateItem } from "@/components/ui/scroll-animate";
import { ArrowRight, Target, Eye, Workflow, Mail, MapPin, Phone } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission",
    description: "To empower organizations with intelligent technology that solves real problems and creates lasting value.",
  },
  {
    icon: Eye,
    title: "Vision",
    description: "A world where every business has access to enterprise-grade technology that drives meaningful outcomes.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "We start by understanding your business, challenges, and goals through in-depth conversations.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "We develop a clear roadmap with defined milestones, deliverables, and success metrics.",
  },
  {
    step: "03",
    title: "Build",
    description: "Our engineering teams execute with precision, maintaining transparency throughout the process.",
  },
  {
    step: "04",
    title: "Launch & Support",
    description: "We ensure successful deployment and provide ongoing support to maximize your investment.",
  },
];

const Company = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-light py-24 lg:py-32">
        <div className="container-page">
          <div className="max-w-3xl">
            <ScrollAnimate>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                About OpenAlgon
              </h1>
            </ScrollAnimate>
            <ScrollAnimate delay={0.1}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                We're the team behind intelligent systems. A global software and AI company 
                building technology that transforms how businesses operate.
              </p>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-light pb-20 lg:pb-28">
        <div className="container-page">
          <ScrollAnimateStagger className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.1}>
            {values.map((value) => (
              <ScrollAnimateItem key={value.title}>
                <div className="p-8 rounded-2xl bg-muted h-full">
                  <value.icon className="h-8 w-8 text-accent mb-4" />
                  <h2 className="text-2xl font-bold mb-4">{value.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </ScrollAnimateItem>
            ))}
          </ScrollAnimateStagger>
        </div>
      </section>

      {/* How We Work */}
      <section className="section-neutral py-20 lg:py-28">
        <div className="container-page">
          <ScrollAnimate>
            <div className="max-w-3xl mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Workflow className="h-6 w-6 text-accent" />
                <h2 className="text-3xl lg:text-4xl font-bold">How We Work</h2>
              </div>
              <p className="text-dark-foreground/70 text-lg">
                A proven methodology that balances speed with quality, ensuring successful 
                outcomes for every engagement.
              </p>
            </div>
          </ScrollAnimate>
          <ScrollAnimateStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {processSteps.map((step) => (
              <ScrollAnimateItem key={step.step}>
                <div className="relative">
                  <span className="text-5xl font-bold text-dark-foreground/10 mb-4 block">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-dark-foreground/70 text-sm">{step.description}</p>
                </div>
              </ScrollAnimateItem>
            ))}
          </ScrollAnimateStagger>
        </div>
      </section>

      {/* Careers Placeholder */}
      <section className="section-light py-20 lg:py-28" id="careers">
        <div className="container-page">
          <ScrollAnimate>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Join Our Team</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're always looking for talented engineers, designers, and strategists 
                who share our passion for building great technology.
              </p>
              <Button variant="outline" size="lg">
                View Open Positions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Contact */}
      <section className="section-dark py-20 lg:py-28" id="contact">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <ScrollAnimate>
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Get in Touch</h2>
                <p className="text-dark-foreground/70 text-lg mb-8">
                  Ready to discuss your project? We'd love to hear from you. 
                  Reach out and let's start a conversation.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-accent" />
                    <span className="text-dark-foreground/80">hello@openalgon.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-accent" />
                    <span className="text-dark-foreground/80">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-accent" />
                    <span className="text-dark-foreground/80">Global · Remote-First</span>
                  </div>
                </div>
              </div>
            </ScrollAnimate>
            <ScrollAnimate delay={0.15} direction="right">
              <div className="bg-dark/50 rounded-2xl p-8 border border-dark-foreground/10">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-foreground/80 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-dark-foreground/10 border border-dark-foreground/20 text-dark-foreground placeholder:text-dark-foreground/50 focus:outline-none focus:border-accent transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-foreground/80 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg bg-dark-foreground/10 border border-dark-foreground/20 text-dark-foreground placeholder:text-dark-foreground/50 focus:outline-none focus:border-accent transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-foreground/80 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-dark-foreground/10 border border-dark-foreground/20 text-dark-foreground placeholder:text-dark-foreground/50 focus:outline-none focus:border-accent resize-none transition-colors"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <Button variant="accent" size="lg" className="w-full">
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

export default Company;
