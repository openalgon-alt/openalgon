import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export const CaseStudyCard = ({ caseStudy }: CaseStudyCardProps) => (
  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-accent/50">
    <Link
      to={`/case-studies/${caseStudy.slug}`}
      className="relative block aspect-[16/9] overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`View case study: ${caseStudy.title}`}
    >
      <img
        src={caseStudy.image}
        alt={`${caseStudy.title} visual preview`}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
      {caseStudy.isPlaceholder && (
        <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-foreground/70 px-3 py-1 text-xs font-medium text-background backdrop-blur-sm">
          Preview placeholder
        </span>
      )}
      <ArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </Link>

    <div className="flex flex-1 flex-col p-6 lg:p-7">
      <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        <span>{caseStudy.category}</span>
        <span className="text-border">/</span>
        <span className="text-muted-foreground">{caseStudy.industry}</span>
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">{caseStudy.title}</h2>
      <p className="mt-3 leading-relaxed text-muted-foreground">{caseStudy.summary}</p>

      <div className="mt-6 grid gap-4 border-t border-border/70 pt-5 text-sm">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-foreground">Business challenge</p>
          <p className="leading-relaxed text-muted-foreground">{caseStudy.challenge}</p>
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-foreground">Solution delivered</p>
          <p className="leading-relaxed text-muted-foreground">{caseStudy.solution}</p>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
        <div className="flex flex-wrap gap-2" aria-label="Technologies used">
          {caseStudy.technologies.map((technology) => (
            <span key={technology} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              {technology}
            </span>
          ))}
        </div>
        {caseStudy.outcomes?.length ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-accent" />
            Outcomes ready
          </span>
        ) : null}
      </div>
      <Link
        to={`/case-studies/${caseStudy.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        View Case Study <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  </article>
);
