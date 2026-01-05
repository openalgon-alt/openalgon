import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollAnimate, ScrollAnimateStagger, ScrollAnimateItem } from "@/components/ui/scroll-animate";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Globe, Cpu, Cloud, Users, Building2, TrendingUp, Shield } from "lucide-react";
import heroAbstract from "@/assets/hero-abstract.png";
const services = [
  {
    icon: Zap,
    title: "AI & Automation",
    description: "Intelligent agents, workflow automation, and advanced analytics.",
  },
  {
    icon: Globe,
    title: "Web & Mobile Apps",
    description: "Enterprise-grade platforms, dashboards, and mobile experiences.",
  },
  {
    icon: Cpu,
    title: "Product Engineering",
    description: "From MVP to scale, with architecture built for growth.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Infrastructure, security, and operational excellence.",
  },
];

const industries = [
  "Startups & SaaS",
  "Enterprises",
  "Agencies",
  "Retail & E-commerce",
  "Education & Research",
  "Real Estate & Finance",
];

const reasons = [
  {
    icon: TrendingUp,
    title: "Scale",
    description: "Systems designed to grow with your business demands.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "Enterprise-grade security and 99.9% uptime guaranteed.",
  },
  {
    icon: Users,
    title: "Expertise",
    description: "Senior engineers with deep domain knowledge.",
  },
  {
    icon: Building2,
    title: "Partnership",
    description: "We become an extension of your team.",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-light relative overflow-hidden">
        {/* Floating Particles */}
        <FloatingParticles count={25} className="z-[1]" />
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroAbstract} 
            alt="" 
            className="w-full h-full object-cover object-right opacity-60"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
        </div>
        
        <div className="container-page relative z-10 py-24 lg:py-32">
          <div className="max-w-3xl">
            <ScrollAnimate delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Intelligent Systems for
                <br />
                <span className="text-muted-foreground">Modern Enterprises</span>
              </h1>
            </ScrollAnimate>
            <ScrollAnimate delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                We build AI, automation, and digital engineering solutions that solve real 
                business problems. From strategy to deployment, we're the team behind systems 
                that transform operations.
              </p>
            </ScrollAnimate>
            <ScrollAnimate delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/pricing">Get Started</Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/services">
                    Explore Services
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-light py-20 lg:py-28 border-t border-border/50">
        <div className="container-page">
          <ScrollAnimate>
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">What OpenAlgon Does</h2>
              <p className="text-lg text-muted-foreground">
                We partner with organizations to design, build, and deploy technology 
                that drives measurable outcomes. Our focus is on delivering solutions 
                that work—efficiently, reliably, and at scale.
              </p>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Core Services */}
      <section className="section-neutral py-20 lg:py-28">
        <div className="container-page">
          <ScrollAnimate>
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">Core Services</h2>
          </ScrollAnimate>
          <ScrollAnimateStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ScrollAnimateItem key={service.title}>
                <div className="p-6 rounded-xl bg-dark/50 border border-dark-foreground/10 hover:border-accent/30 transition-colors h-full">
                  <service.icon className="h-8 w-8 text-accent mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-dark-foreground/70">{service.description}</p>
                </div>
              </ScrollAnimateItem>
            ))}
          </ScrollAnimateStagger>
          <ScrollAnimate delay={0.4}>
            <div className="text-center mt-10">
              <Button variant="darkOutline" size="lg" asChild>
                <Link to="/services">
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Industries */}
      <section className="section-light py-20 lg:py-28">
        <div className="container-page">
          <ScrollAnimate>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Industries We Serve</h2>
              <p className="text-lg text-muted-foreground">
                From fast-moving startups to established enterprises, we understand the 
                unique challenges across sectors.
              </p>
            </div>
          </ScrollAnimate>
          <ScrollAnimate delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="px-6 py-3 rounded-full bg-muted text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-default"
                >
                  {industry}
                </span>
              ))}
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Why OpenAlgon */}
      <section className="section-light py-20 lg:py-28 border-t border-border/50">
        <div className="container-page">
          <ScrollAnimate>
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">Why OpenAlgon</h2>
          </ScrollAnimate>
          <ScrollAnimateStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason) => (
              <ScrollAnimateItem key={reason.title}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-4">
                    <reason.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground">{reason.description}</p>
                </div>
              </ScrollAnimateItem>
            ))}
          </ScrollAnimateStagger>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-dark py-20 lg:py-28">
        <div className="container-page text-center">
          <ScrollAnimate>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Build Something Great?</h2>
          </ScrollAnimate>
          <ScrollAnimate delay={0.1}>
            <p className="text-lg text-dark-foreground/70 max-w-2xl mx-auto mb-10">
              Let's discuss how we can help transform your business with intelligent technology solutions.
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={0.2}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="accent" size="xl" asChild>
                <Link to="/company#contact">Talk to Experts</Link>
              </Button>
              <Button variant="darkOutline" size="xl" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
