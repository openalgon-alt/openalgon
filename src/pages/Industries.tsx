import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Building, Palette, ShoppingCart, GraduationCap, Sprout, Home } from "lucide-react";

const industries = [
  {
    icon: Rocket,
    title: "Startups & SaaS",
    description: "Move fast without breaking things. We help startups build MVPs, scale platforms, and establish engineering foundations that support rapid growth.",
    useCases: ["MVP Development", "Platform Scaling", "Technical Due Diligence"],
  },
  {
    icon: Building,
    title: "Enterprises",
    description: "Modernize legacy systems and drive digital transformation. We partner with large organizations to deliver enterprise-grade solutions with security and compliance at the core.",
    useCases: ["Legacy Modernization", "System Integration", "Process Automation"],
  },
  {
    icon: Palette,
    title: "Agencies",
    description: "Extend your capabilities with a trusted development partner. We provide white-label engineering services that integrate seamlessly with your client workflows.",
    useCases: ["White-Label Development", "Team Augmentation", "Technical Consulting"],
  },
  {
    icon: ShoppingCart,
    title: "Retail & E-commerce",
    description: "Create seamless customer experiences across channels. From e-commerce platforms to inventory management, we build systems that drive revenue.",
    useCases: ["E-commerce Platforms", "Inventory Systems", "Customer Analytics"],
  },
  {
    icon: GraduationCap,
    title: "Education & Research",
    description: "Build platforms that enable learning and discovery. We create LMS solutions, research tools, and data platforms for educational institutions.",
    useCases: ["Learning Platforms", "Research Portals", "Data Management"],
  },
  {
    icon: Sprout,
    title: "Agriculture & Publications",
    description: "Digitize operations and reach new audiences. We build solutions for agricultural management, content publishing, and audience engagement.",
    useCases: ["Farm Management Systems", "Publishing Platforms", "Supply Chain Tools"],
  },
  {
    icon: Home,
    title: "Real Estate & Finance",
    description: "Streamline transactions and improve decision-making. We create platforms for property management, financial analytics, and secure transactions.",
    useCases: ["Property Platforms", "Financial Dashboards", "Transaction Systems"],
  },
];

const Industries = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-light py-24 lg:py-32">
        <div className="container-page">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Industries
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Deep domain expertise across sectors. We understand the unique challenges 
              and opportunities in your industry.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section-light pb-20 lg:pb-28">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <div
                key={industry.title}
                className="group p-8 rounded-2xl border border-border hover:border-accent/30 transition-colors bg-background"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted group-hover:bg-accent/10 transition-colors mb-6">
                  <industry.icon className="h-6 w-6 text-foreground group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{industry.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {industry.description}
                </p>
                <div className="space-y-2">
                  {industry.useCases.map((useCase) => (
                    <span
                      key={useCase}
                      className="inline-block mr-2 mb-2 px-3 py-1 rounded-full bg-muted text-xs font-medium text-foreground"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-neutral py-20 lg:py-28">
        <div className="container-page text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Don't See Your Industry?</h2>
          <p className="text-lg text-dark-foreground/70 max-w-2xl mx-auto mb-10">
            We work across many sectors. Let's discuss how our expertise 
            can address your specific industry challenges.
          </p>
          <Button variant="accent" size="xl">
            Talk to Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Industries;
