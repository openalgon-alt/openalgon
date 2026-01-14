import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollAnimate, ScrollAnimateStagger, ScrollAnimateItem } from "@/components/ui/scroll-animate";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { ArrowRight, Target, Eye, Workflow, Mail, MapPin, Phone } from "lucide-react";
import heroCompany from "@/assets/hero-company.png";

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
      <section className="section-light py-24 lg:py-32 relative overflow-hidden">
        {/* Floating Particles */}
        <FloatingParticles count={20} className="z-[1]" />
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroCompany} 
            alt="" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
        </div>
        
        <div className="container-page relative z-[2]">
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

      {/* CTA */}
      <section className="section-light py-20 lg:py-28 text-center">
        <div className="container-page">
           <ScrollAnimate>
             <h2 className="text-3xl lg:text-4xl font-bold mb-8">Want to know more?</h2>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Button variant="outline" size="xl" asChild>
                 <a href="/careers">Join Our Team</a>
               </Button>
               <Button variant="accent" size="xl" asChild>
                 <a href="/contact">Contact Us</a>
               </Button>
             </div>
           </ScrollAnimate>
        </div>
      </section>
    </Layout>
  );
};

export default Company;
