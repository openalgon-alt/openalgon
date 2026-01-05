import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";

const integrations = [
  // Productivity & Collaboration
  { name: "Slack", logo: "https://cdn.simpleicons.org/slack" },
  { name: "Microsoft Teams", logo: "https://cdn.simpleicons.org/microsoftteams" },
  { name: "Google Workspace", logo: "https://cdn.simpleicons.org/google" },
  { name: "Zoom", logo: "https://cdn.simpleicons.org/zoom" },
  { name: "Notion", logo: "https://cdn.simpleicons.org/notion/000000" },
  { name: "Confluence", logo: "https://cdn.simpleicons.org/confluence" },
  // CRM & Business Systems
  { name: "Salesforce", logo: "https://cdn.simpleicons.org/salesforce" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot" },
  { name: "SAP", logo: "https://cdn.simpleicons.org/sap" },
  { name: "Oracle", logo: "https://cdn.simpleicons.org/oracle" },
  { name: "ServiceNow", logo: "https://cdn.simpleicons.org/servicenow" },
  // Cloud & Dev Platforms
  { name: "AWS", logo: "https://cdn.simpleicons.org/amazonaws" },
  { name: "Microsoft Azure", logo: "https://cdn.simpleicons.org/microsoftazure" },
  { name: "Google Cloud", logo: "https://cdn.simpleicons.org/googlecloud" },
  { name: "GitHub", logo: "https://cdn.simpleicons.org/github/000000" },
  { name: "GitLab", logo: "https://cdn.simpleicons.org/gitlab" },
  // Data & Analytics
  { name: "Snowflake", logo: "https://cdn.simpleicons.org/snowflake" },
  { name: "Databricks", logo: "https://cdn.simpleicons.org/databricks" },
  { name: "Tableau", logo: "https://cdn.simpleicons.org/tableau" },
  { name: "Power BI", logo: "https://cdn.simpleicons.org/powerbi" },
  // Automation & Ops
  { name: "Zapier", logo: "https://cdn.simpleicons.org/zapier" },
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker" },
  { name: "Kubernetes", logo: "https://cdn.simpleicons.org/kubernetes" },
  { name: "Jenkins", logo: "https://cdn.simpleicons.org/jenkins" },
  // Security & Identity
  { name: "Okta", logo: "https://cdn.simpleicons.org/okta" },
  { name: "Auth0", logo: "https://cdn.simpleicons.org/auth0" },
];

const LogoCard = ({ name, logo }: { name: string; logo: string }) => (
  <div className="flex-shrink-0 w-20 h-20 bg-white rounded-xl shadow-sm border border-border/50 flex items-center justify-center p-4 hover:shadow-md transition-shadow duration-200">
    <img
      src={logo}
      alt={`${name} logo`}
      className="w-10 h-10 object-contain"
      loading="lazy"
    />
  </div>
);

const IntegrationsSection = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isPaused && scroller) {
        scrollPosition += scrollSpeed;
        const maxScroll = scroller.scrollWidth / 2;
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }
        scroller.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  // Duplicate logos for seamless infinite scroll
  const duplicatedIntegrations = [...integrations, ...integrations];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Out-of-the-box Integrations
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-tight">
              Integrates with all your key applications and systems
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg">
              OpenAlgon connects with the platforms your teams already rely on — enabling automation, intelligence, and scale without disruption.
            </p>
            <Button
              variant="heroOutline"
              size="lg"
              className="mt-4"
            >
              View all integrations
            </Button>
          </div>

          {/* Right Column - Logo Scroller */}
          <div className="relative overflow-hidden">
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div
              ref={scrollerRef}
              className="overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="flex gap-4 py-4">
                {duplicatedIntegrations.map((integration, index) => (
                  <LogoCard
                    key={`${integration.name}-${index}`}
                    name={integration.name}
                    logo={integration.logo}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
