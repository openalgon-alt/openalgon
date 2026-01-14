import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";

const integrations = [
  // Productivity & Collaboration
  { name: "Slack", logo: "https://api.iconify.design/logos:slack.svg" },
  { name: "Microsoft Teams", logo: "https://api.iconify.design/logos:microsoft-teams.svg" },
  { name: "Google Workspace", logo: "https://api.iconify.design/logos:google.svg" },
  { name: "Zoom", logo: "https://cdn.simpleicons.org/zoom" },
  { name: "Notion", logo: "https://cdn.simpleicons.org/notion" },
  { name: "Confluence", logo: "https://cdn.simpleicons.org/confluence" },
  // CRM & Business Systems
  { name: "Salesforce", logo: "https://api.iconify.design/logos:salesforce.svg" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot" },
  { name: "SAP", logo: "https://cdn.simpleicons.org/sap" },
  { name: "Oracle", logo: "https://api.iconify.design/logos:oracle.svg" },

  // Cloud & Dev Platforms
  { name: "AWS", logo: "https://api.iconify.design/logos:aws.svg" },
  { name: "Microsoft Azure", logo: "https://api.iconify.design/logos:microsoft-azure.svg" },
  { name: "Google Cloud", logo: "https://cdn.simpleicons.org/googlecloud" }, // works
  { name: "GitHub", logo: "https://cdn.simpleicons.org/github" },
  { name: "GitLab", logo: "https://cdn.simpleicons.org/gitlab" },
  // Data & Analytics
  { name: "Snowflake", logo: "https://cdn.simpleicons.org/snowflake" },
  { name: "Databricks", logo: "https://cdn.simpleicons.org/databricks" },
  { name: "Tableau", logo: "https://api.iconify.design/logos:tableau.svg" },
  { name: "Power BI", logo: "https://api.iconify.design/logos:microsoft-power-bi.svg" },
  // Automation & Ops
  { name: "Zapier", logo: "https://cdn.simpleicons.org/zapier" },
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker" },
  { name: "Kubernetes", logo: "https://cdn.simpleicons.org/kubernetes" },
  { name: "Jenkins", logo: "https://cdn.simpleicons.org/jenkins" },
  // Security & Identity
  { name: "Okta", logo: "https://cdn.simpleicons.org/okta" },
  { name: "Auth0", logo: "https://cdn.simpleicons.org/auth0" },
];

const LogoCard = ({ name, logo }: { name: string; logo: string }) => {
  const [error, setError] = useState(false);

  return (
    <div className="flex-shrink-0 w-20 h-20 bg-card border border-border/50 rounded-xl shadow-sm flex items-center justify-center p-4 hover:shadow-md transition-shadow duration-200 group">
      {!error ? (
        <img
          src={logo}
          alt={`${name} logo`}
          className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          onError={() => setError(true)}
        />
      ) : (
        <span className="text-xs font-semibold text-muted-foreground text-center leading-tight">
          {name}
        </span>
      )}
    </div>
  );
};

const IntegrationsSection = () => {
  const scrollerRef1 = useRef<HTMLDivElement>(null);
  const scrollerRef2 = useRef<HTMLDivElement>(null);

  // Split integrations into two rows
  const midPoint = Math.ceil(integrations.length / 2);
  const row1 = integrations.slice(0, midPoint);
  const row2 = integrations.slice(midPoint);

  useEffect(() => {
    const scroller1 = scrollerRef1.current;
    const scroller2 = scrollerRef2.current;
    
    let animationId: number;
    // Row 1 starts at 0
    let pos1 = 0;
    // Row 2 starts at arbitrary value, we will init it properly in loop
    // But setting a flag or using a layout effect is safer. 
    // We'll trust the loop logic (lazy init).
    let pos2 = 0;
    let isPos2Initialized = false;

    const scrollSpeed = 0.5;

    const animate = () => {
      // Row 1: Left-to-Right Scrolling (Content moves Left)
      // We increase scrollLeft.
      if (scroller1) {
        pos1 += scrollSpeed;
        const maxScroll1 = scroller1.scrollWidth / 2; // Assuming content is doubled
        if (pos1 >= maxScroll1) {
          pos1 = 0;
        }
        scroller1.scrollLeft = pos1;
      }

      // Row 2: Right-to-Left Scrolling (Content moves Right)
      // We decrease scrollLeft.
      if (scroller2) {
        const maxScroll2 = scroller2.scrollWidth / 2;

        // Initialize to visually 'end' so we can scroll backwards
        if (!isPos2Initialized && maxScroll2 > 0) {
          pos2 = maxScroll2;
          isPos2Initialized = true;
        }

        if (isPos2Initialized) {
          pos2 -= scrollSpeed;
          // Wrap around logic
          if (pos2 <= 0) {
            pos2 = maxScroll2;
          }
          scroller2.scrollLeft = pos2;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Duplicate for seamless scroll
  const duplicatedRow1 = [...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2];

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

          {/* Right Column - Logo Scrollers */}
          <div className="relative overflow-hidden space-y-8">
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            {/* Row 1 */}
            <div
              ref={scrollerRef1}
              className="overflow-hidden no-scrollbar"
            >
              <div className="flex gap-4 w-max py-2">
                {duplicatedRow1.map((integration, index) => (
                  <LogoCard
                    key={`row1-${integration.name}-${index}`}
                    name={integration.name}
                    logo={integration.logo}
                  />
                ))}
              </div>
            </div>

            {/* Row 2 */}
            <div
              ref={scrollerRef2}
              className="overflow-hidden no-scrollbar"
            >
              <div className="flex gap-4 w-max py-2">
                {duplicatedRow2.map((integration, index) => (
                  <LogoCard
                    key={`row2-${integration.name}-${index}`}
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
