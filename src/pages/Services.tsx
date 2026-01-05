import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollAnimate } from "@/components/ui/scroll-animate";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { ArrowRight, Bot, Code2, Layers, Cloud, Settings } from "lucide-react";
import heroServices from "@/assets/hero-services.png";

const services = [
  {
    id: "ai",
    icon: Bot,
    title: "AI, Data & Automation",
    description:
      "Transform operations with intelligent automation. We build AI agents, workflow automation systems, advanced analytics platforms, and conversational interfaces that drive efficiency and unlock insights.",
    outcomes: [
      "Reduce manual processes by up to 70%",
      "Enable data-driven decision making",
      "Deploy intelligent customer interactions",
    ],
  },
  {
    id: "web",
    icon: Code2,
    title: "Web & Mobile Platform Applications",
    description:
      "Build powerful digital experiences that users love. From enterprise dashboards to consumer mobile apps, we create platforms that scale with your business and delight your users.",
    outcomes: [
      "Launch market-ready platforms faster",
      "Improve user engagement and retention",
      "Scale seamlessly with demand",
    ],
  },
  {
    id: "product",
    icon: Layers,
    title: "Product Engineering",
    description:
      "From concept to scale, we partner with you through the entire product lifecycle. Our engineering teams bring deep expertise in architecture, development, and long-term product evolution.",
    outcomes: [
      "Accelerate time-to-market",
      "Build scalable, maintainable systems",
      "Reduce technical debt",
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud & Network Engineering",
    description:
      "Architect and operate modern infrastructure that's secure, scalable, and cost-effective. We handle cloud migrations, DevOps practices, and security implementations.",
    outcomes: [
      "Optimize cloud costs by 30-50%",
      "Achieve 99.9%+ uptime",
      "Strengthen security posture",
    ],
  },
  {
    id: "crm",
    icon: Settings,
    title: "CRM, ERP & HRMS Solutions",
    description:
      "Streamline business operations with custom systems that fit your workflows. We build and integrate CRM, ERP, and HRMS solutions that eliminate friction and boost productivity.",
    outcomes: [
      "Unify business data and processes",
      "Improve team productivity",
      "Enable real-time business insights",
    ],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-light py-24 lg:py-32 relative overflow-hidden">
        {/* Floating Particles */}
        <FloatingParticles count={20} className="z-[1]" />
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroServices} 
            alt="" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
        </div>
        
        <div className="container-page relative z-[2]">
          <div className="max-w-3xl">
            <ScrollAnimate>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Services
              </h1>
            </ScrollAnimate>
            <ScrollAnimate delay={0.1}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                End-to-end technology solutions designed to solve real business problems. 
                We focus on outcomes, not outputs.
              </p>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-light pb-20 lg:pb-28">
        <div className="container-page">
          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => (
              <ScrollAnimate key={service.id} delay={0.1}>
                <div
                  id={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-muted mb-6">
                      <service.icon className="h-7 w-7 text-foreground" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4">{service.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Button variant="link" className="p-0 h-auto text-accent">
                      Discuss this service
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                  <div className={`bg-muted rounded-2xl p-8 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                      Business Impact
                    </h3>
                    <ul className="space-y-4">
                      {service.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                          <span className="text-foreground">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark py-20 lg:py-28">
        <div className="container-page text-center">
          <ScrollAnimate>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Need a Custom Solution?</h2>
          </ScrollAnimate>
          <ScrollAnimate delay={0.1}>
            <p className="text-lg text-dark-foreground/70 max-w-2xl mx-auto mb-10">
              Every business is unique. Let's discuss how we can tailor our services 
              to your specific needs and challenges.
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={0.2}>
            <Button variant="accent" size="xl">
              Talk to Experts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </ScrollAnimate>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
