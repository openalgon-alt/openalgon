import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollAnimate, ScrollAnimateStagger, ScrollAnimateItem } from "@/components/ui/scroll-animate";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { ArrowRight, BookOpen, FileText, Lightbulb, Cpu } from "lucide-react";
import heroResources from "@/assets/hero-resources.png";

const resourceCategories = [
  {
    icon: Lightbulb,
    title: "Insights & Articles",
    description: "Thought leadership on AI, automation, and digital transformation. Stay informed about technology trends that matter for your business.",
    items: [
      { title: "The Future of Enterprise AI", tag: "AI" },
      { title: "Building Scalable Systems", tag: "Engineering" },
      { title: "Digital Transformation Playbook", tag: "Strategy" },
    ],
  },
  {
    icon: FileText,
    title: "Case Studies",
    description: "Real stories of how we've helped organizations solve complex challenges and achieve measurable results.",
    items: [
      { title: "SaaS Platform Scale-Up", tag: "Product" },
      { title: "Enterprise Automation Project", tag: "Automation" },
      { title: "Cloud Migration Success", tag: "Cloud" },
    ],
  },
  {
    icon: BookOpen,
    title: "Guides & Whitepapers",
    description: "In-depth resources to help you make informed technology decisions. From strategy guides to technical deep-dives.",
    items: [
      { title: "AI Implementation Guide", tag: "Guide" },
      { title: "Cloud Architecture Best Practices", tag: "Whitepaper" },
      { title: "Security Compliance Checklist", tag: "Guide" },
    ],
  },
  {
    icon: Cpu,
    title: "AI & Automation Explainers",
    description: "Demystifying AI and automation for business leaders. Understand what's possible and how to get started.",
    items: [
      { title: "What Are AI Agents?", tag: "Explainer" },
      { title: "Automation ROI Calculator", tag: "Tool" },
      { title: "Machine Learning 101", tag: "Explainer" },
    ],
  },
];

const Resources = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-light py-24 lg:py-32 relative overflow-hidden">
        {/* Floating Particles */}
        <FloatingParticles count={20} className="z-[1]" />
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroResources} 
            alt="" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
        </div>
        
        <div className="container-page relative z-[2]">
          <div className="max-w-3xl">
            <ScrollAnimate>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Resources
              </h1>
            </ScrollAnimate>
            <ScrollAnimate delay={0.1}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Insights, guides, and case studies to help you navigate technology 
                decisions with confidence.
              </p>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="section-light pb-20 lg:pb-28">
        <div className="container-page">
          <div className="space-y-16">
            {resourceCategories.map((category, idx) => (
              <ScrollAnimate key={category.title} delay={idx * 0.05}>
                <div id={category.title.toLowerCase().replace(/\s+/g, '-')}>
                  <div className="flex items-start gap-4 mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted flex-shrink-0">
                      <category.icon className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                      <p className="text-muted-foreground max-w-2xl">{category.description}</p>
                    </div>
                  </div>
                  <ScrollAnimateStagger className="grid grid-cols-1 md:grid-cols-3 gap-4" staggerDelay={0.08}>
                    {category.items.map((item) => (
                      <ScrollAnimateItem key={item.title}>
                        <article className="group p-6 rounded-xl border border-border hover:border-accent/30 transition-colors cursor-pointer h-full">
                          <span className="inline-block px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4">
                            {item.tag}
                          </span>
                          <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                            {item.title}
                          </h3>
                          <span className="inline-flex items-center mt-4 text-sm text-muted-foreground group-hover:text-accent transition-colors">
                            Read more
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </span>
                        </article>
                      </ScrollAnimateItem>
                    ))}
                  </ScrollAnimateStagger>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-dark py-20 lg:py-28">
        <div className="container-page text-center">
          <ScrollAnimate>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Stay Informed</h2>
          </ScrollAnimate>
          <ScrollAnimate delay={0.1}>
            <p className="text-lg text-dark-foreground/70 max-w-2xl mx-auto mb-10">
              Get the latest insights on AI, automation, and digital engineering 
              delivered to your inbox.
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={0.2}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-dark-foreground/10 border border-dark-foreground/20 text-dark-foreground placeholder:text-dark-foreground/50 focus:outline-none focus:border-accent"
              />
              <Button variant="accent" size="lg">
                Subscribe
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
