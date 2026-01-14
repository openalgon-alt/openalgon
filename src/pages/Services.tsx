import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollAnimate } from "@/components/ui/scroll-animate";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import heroServices from "@/assets/hero-services.png";

import { servicesData } from "@/data/services";

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
          <div className="max-w-4xl">
            <ScrollAnimate>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Services built to design, scale, and run intelligent digital
                systems
              </h1>
            </ScrollAnimate>
            <ScrollAnimate delay={0.1}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                From AI-driven automation to cloud-scale platforms, OpenAlgon
                delivers end-to-end engineering solutions tailored to complex
                business needs.
              </p>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Services Sections */}
      <div className="space-y-24 pb-24">
        {servicesData.map((section, index) => (
          <section key={section.category} className="section-light">
            <div className="container-page">
              <ScrollAnimate>
                <div className="border-b border-border pb-6 mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    {section.category}
                  </h2>
                </div>
              </ScrollAnimate>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
                {section.items.map((item, itemIndex) => (
                  <ScrollAnimate
                    key={item.title}
                    delay={itemIndex * 0.1}
                    className="flex flex-col h-full"
                  >
                    <div className="bg-card/50 hover:bg-card transition-colors duration-300 rounded-lg p-6 h-full flex flex-col border border-border/50 hover:border-border">
                      <div className="mb-6">
                        <h3 className="text-xl font-bold mb-4 text-foreground">
                          {item.title}
                        </h3>
                        <ul className="space-y-3">
                          {item.services.map((service) => (
                            <li
                              key={service}
                              className="text-muted-foreground text-sm leading-relaxed flex items-start"
                            >
                              <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-auto pt-4">
                        <Button
                          variant="link"
                          className="p-0 h-auto text-accent hover:text-accent/80 group text-sm font-medium"
                        >
                          Discuss this service
                          <ArrowUpRight className="ml-1 h-3 w-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </ScrollAnimate>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="section-dark py-20 lg:py-28 text-white">
        <div className="container-page text-center">
          <ScrollAnimate>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to transform your business?
            </h2>
          </ScrollAnimate>
          <ScrollAnimate delay={0.1}>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              Let's build scalable, secure, and intelligent systems tailored to
              your specific needs.
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={0.2}>
            <Button
              variant="accent"
              size="xl"
              className="bg-accent text-white hover:bg-accent/90"
            >
              Start a Conversation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </ScrollAnimate>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
