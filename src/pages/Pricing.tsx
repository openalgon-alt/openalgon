import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollAnimate, ScrollAnimateStagger, ScrollAnimateItem } from "@/components/ui/scroll-animate";
import { ArrowRight, Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "For teams getting started with digital transformation",
    price: "Starting from $15K",
    features: [
      "Single project engagement",
      "Dedicated project manager",
      "Weekly progress updates",
      "3-month support included",
      "Documentation & training",
    ],
    cta: "Request Quote",
    highlighted: false,
  },
  {
    name: "Growth",
    description: "For organizations scaling their technology capabilities",
    price: "Starting from $50K",
    features: [
      "Multiple concurrent projects",
      "Dedicated engineering team",
      "Daily standups & reporting",
      "6-month support included",
      "Priority response time",
      "Quarterly strategy sessions",
    ],
    cta: "Request Quote",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex requirements",
    price: "Custom",
    features: [
      "Unlimited project scope",
      "Full-stack dedicated team",
      "24/7 support & monitoring",
      "Ongoing partnership model",
      "Custom SLAs",
      "Executive sponsorship",
      "On-site workshops available",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-light py-24 lg:py-32">
        <div className="container-page text-center">
          <div className="max-w-3xl mx-auto">
            <ScrollAnimate>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Pricing
              </h1>
            </ScrollAnimate>
            <ScrollAnimate delay={0.1}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Value-based pricing tailored to your needs. Every engagement is customized 
                to deliver maximum business impact.
              </p>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-light pb-20 lg:pb-28">
        <div className="container-page">
          <ScrollAnimateStagger className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" staggerDelay={0.1}>
            {plans.map((plan) => (
              <ScrollAnimateItem key={plan.name}>
                <div
                  className={`relative p-8 rounded-2xl border h-full ${
                    plan.highlighted
                      ? "border-accent bg-accent/5 shadow-lg"
                      : "border-border bg-background"
                  }`}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                  <p className="text-3xl font-bold mb-8">{plan.price}</p>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.highlighted ? "accent" : "outline"}
                    size="lg"
                    className="w-full"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </ScrollAnimateItem>
            ))}
          </ScrollAnimateStagger>
        </div>
      </section>

      {/* FAQ-style note */}
      <section className="section-neutral py-20 lg:py-28">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollAnimate>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">How Pricing Works</h2>
            </ScrollAnimate>
            <ScrollAnimate delay={0.1}>
              <div className="text-left space-y-6 text-dark-foreground/80">
                <p>
                  We believe in transparent, value-based pricing. Every project is unique, 
                  and our pricing reflects the scope, complexity, and business outcomes 
                  you're looking to achieve.
                </p>
                <p>
                  After an initial discovery call, we provide a detailed proposal with 
                  clear deliverables, timelines, and investment requirements. No hidden fees, 
                  no surprises.
                </p>
                <p>
                  For ongoing partnerships, we offer flexible retainer models that give you 
                  access to our team while optimizing for your budget and priorities.
                </p>
              </div>
            </ScrollAnimate>
            <ScrollAnimate delay={0.2}>
              <Button variant="accent" size="xl" className="mt-10">
                Request Custom Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </ScrollAnimate>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
