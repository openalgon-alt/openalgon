import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { getCaseStudy } from "@/data/caseStudies";
import { pageSEO } from "@/lib/seo";
import NotFound from "./NotFound";

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const caseStudy = slug ? getCaseStudy(slug) : undefined;

  if (!caseStudy) return <NotFound />;

  return (
    <Layout>
      <SEOHead
        title={`${caseStudy.title} — Case Study | OpenAlgon`}
        description={caseStudy.summary}
        keywords={`${pageSEO.caseStudies.keywords}, ${caseStudy.category}, ${caseStudy.industry}`}
        canonical={`${pageSEO.caseStudies.canonical}/${caseStudy.slug}`}
      />
      <section className="section-dark py-20 lg:py-28">
        <div className="container-page">
          <Link to="/case-studies" className="mb-10 inline-flex items-center gap-2 text-sm text-dark-foreground/70 transition-colors hover:text-dark-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Case Studies
          </Link>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-accent">{caseStudy.category} / {caseStudy.industry}</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">{caseStudy.title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-dark-foreground/70">{caseStudy.summary}</p>
          {caseStudy.evidenceNote && (
            <p className="mt-6 max-w-2xl border-l-2 border-accent pl-4 text-sm leading-relaxed text-dark-foreground/60">
              {caseStudy.evidenceNote}
            </p>
          )}
        </div>
      </section>

      <section className="section-light py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <img src={caseStudy.image} alt={`${caseStudy.title} project preview`} className="aspect-[16/10] w-full rounded-2xl object-cover" />
          <div className="space-y-8">
            <DetailSection title="Business context" text={caseStudy.context} />
            <DetailSection title="The challenge" text={caseStudy.challenge} />
            <DetailSection title="The solution" text={caseStudy.solution} />
          </div>
        </div>
      </section>

      <section className="section-light border-t border-border/60 py-16 lg:py-24">
        <div className="container-page grid gap-12 md:grid-cols-2">
          <DetailSection title="Implementation & architecture" text={caseStudy.implementation || caseStudy.architecture} />
          <div>
            <h2 className="mb-5 text-2xl font-semibold">Technology stack</h2>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((technology) => <span key={technology} className="rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">{technology}</span>)}
            </div>
          </div>
        </div>
      </section>

      {caseStudy.outcomes?.length ? (
        <section className="section-light border-t border-border/60 py-16 lg:py-24">
          <div className="container-page">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent">Outcomes</p>
            <h2 className="mb-8 text-3xl font-semibold">What changed</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {caseStudy.outcomes.map((outcome) => <div key={outcome} className="flex gap-3 rounded-xl border border-border p-5"><CheckCircle2 className="h-5 w-5 shrink-0 text-accent" /><span className="text-muted-foreground">{outcome}</span></div>)}
            </div>
          </div>
        </section>
      ) : null}

      {caseStudy.learnings?.length ? (
        <section className="section-light border-t border-border/60 py-16 lg:py-24">
          <div className="container-page max-w-4xl">
            <h2 className="mb-6 text-3xl font-semibold">Key learnings</h2>
            <ul className="space-y-3 text-lg leading-relaxed text-muted-foreground">{caseStudy.learnings.map((learning) => <li key={learning}>— {learning}</li>)}</ul>
          </div>
        </section>
      ) : null}

      <section className="section-dark py-20">
        <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="max-w-2xl text-3xl font-semibold">Have a similar problem to solve?</h2>
          <Button variant="accent" size="lg" asChild><Link to="/enquire">Contact OpenAlgon <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </section>
    </Layout>
  );
};

const DetailSection = ({ title, text }: { title: string; text?: string }) => (
  <div>
    <h2 className="mb-3 text-2xl font-semibold">{title}</h2>
    <p className="leading-relaxed text-muted-foreground">{text || "This section is ready for project evidence and documentation."}</p>
  </div>
);

export default CaseStudyDetail;
