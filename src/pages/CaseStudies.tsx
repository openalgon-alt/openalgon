import { ArrowDown, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollAnimate } from "@/components/ui/scroll-animate";
import SEOHead from "@/components/SEOHead";
import { pageSEO } from "@/lib/seo";
import { caseStudies } from "@/data/caseStudies";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";

const CaseStudies = () => (
  <Layout>
    <SEOHead {...pageSEO.caseStudies} />
    <section className="section-dark relative overflow-hidden py-24 lg:py-36">
      <div className="absolute right-[-10%] top-[-35%] h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-3xl" />
      <div className="container-page relative">
        <ScrollAnimate>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-accent">OpenAlgon / Case studies</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
            Real Problems. Thoughtful Technology. Measurable Impact.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-dark-foreground/70 md:text-xl">
            Explore how we approach business challenges through custom software, AI, automation, and practical digital solutions.
          </p>
          <a
            href="#selected-work"
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-dark-foreground/25 px-4 py-2.5 text-sm font-medium text-dark-foreground/80 transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
            aria-label="Scroll down to selected case studies"
          >
            Explore selected work
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </ScrollAnimate>
      </div>
    </section>

    <section id="selected-work" className="section-light scroll-mt-24 py-20 lg:py-28">
      <div className="container-page">
        <ScrollAnimate>
          <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent">Selected work</p>
              <h2 className="text-3xl font-semibold md:text-4xl">A place for work with a point of view.</h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              These are clearly labelled content placeholders until verified project details are ready to publish.
            </p>
          </div>
        </ScrollAnimate>
        <div className="grid gap-7 lg:grid-cols-2">
          {caseStudies.map((caseStudy, index) => (
            <ScrollAnimate key={caseStudy.slug} delay={index * 0.06}>
              <CaseStudyCard caseStudy={caseStudy} />
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>

    <section className="section-light border-t border-border/60 py-20 lg:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent">Evidence over noise</p>
          <h2 className="text-3xl font-semibold md:text-4xl">Good work should make the next decision easier.</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {["Business context before technology", "Practical implementation details", "Verified outcomes where available", "Clear learnings for what comes next"].map((point) => (
            <div key={point} className="flex gap-3 border-t border-border pt-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-muted-foreground">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-dark py-20 lg:py-28">
      <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent">Have a challenge?</p>
          <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">Let&apos;s make the right next move together.</h2>
        </div>
        <Button variant="accent" size="lg" asChild>
          <Link to="/enquire">Discuss Your Project <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  </Layout>
);

export default CaseStudies;
