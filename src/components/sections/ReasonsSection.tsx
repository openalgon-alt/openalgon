import { Button } from "@/components/ui/button";

const reasons = [
  {
    number: "01",
    title: "Enterprise-grade AI & automation intelligence",
    description:
      "OpenAlgon designs intelligent AI systems that reason, automate, and adapt across business workflows — enabling scalable decision-making and real-world execution.",
  },
  {
    number: "02",
    title: "Faster time to value",
    description:
      "Our solutions are built for rapid deployment — delivering measurable outcomes in weeks, not months, without unnecessary complexity or overhead.",
  },
  {
    number: "03",
    title: "Easy-to-build and deploy AI systems",
    description:
      "From AI agents to automation pipelines, OpenAlgon builds flexible, customizable systems that integrate seamlessly into your existing business environment.",
  },
  {
    number: "04",
    title: "Advanced optimization & engineering",
    description:
      "We engineer systems that are measurable, observable, and continuously optimized — helping teams improve performance, governance, and operational efficiency.",
  },
  {
    number: "05",
    title: "Omnichannel & multi-platform solutions",
    description:
      "Our solutions work wherever your teams operate — web, mobile, cloud platforms, internal tools, CRMs, ERPs, and enterprise ecosystems.",
  },
  {
    number: "06",
    title: "Security, reliability, and scalability by design",
    description:
      "Security, compliance, and reliability are embedded at every layer — ensuring enterprise-grade trust, data protection, and long-term scalability.",
  },
];

const ReasonsSection = () => {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-foreground leading-tight max-w-2xl">
            Six reasons why businesses rely on OpenAlgon
          </h2>
          <Button
            variant="outline"
            className="shrink-0 border-foreground text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors self-start"
          >
            Get more details
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14 lg:gap-y-16">
          {reasons.map((reason) => (
            <div key={reason.number} className="space-y-4">
              <span className="text-sm text-muted-foreground font-medium tracking-wide">
                {reason.number}
              </span>
              <h3 className="text-xl font-medium text-foreground leading-snug">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonsSection;
