import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { pageSEO } from "@/lib/seo";

const Academy = () => (
  <Layout>
    <SEOHead {...pageSEO.academy} />
    <section className="section-dark relative isolate overflow-hidden">

      <div className="container-page relative grid min-h-[calc(100vh-5rem)] items-center gap-14 py-16 lg:grid-cols-[1fr_0.82fr] lg:gap-20 lg:py-24">
        <div className="max-w-2xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-dark-foreground">
            <Sparkles className="h-4 w-4 text-accent" />
            OpenAlgon Academy
          </div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Launching on 26th October</p>
          <h1 className="max-w-xl text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
            Learn. Build. Get real experience.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-dark-foreground/75 md:text-xl">
            Something practical is coming for builders who want to work on real products, learn through shipping, and grow inside a startup environment.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <div className="inline-flex items-center gap-3 rounded-xl border border-dark-foreground/15 bg-dark-foreground/10 px-5 py-4 backdrop-blur-sm">
              <CalendarDays className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs uppercase tracking-wider text-dark-foreground/60">Full details launch</p>
                <p className="font-semibold">26th October</p>
              </div>
            </div>
            <Button variant="accent" size="lg" asChild>
              <Link to="/enquire">Talk to OpenAlgon <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          <p className="mt-8 max-w-lg text-sm leading-relaxed text-dark-foreground/55">
            We don&apos;t promise jobs. We give you the opportunity to work in a startup, ship real products, and build real experience.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[30rem]">
          <div className="relative overflow-hidden rounded-2xl border border-dark-foreground/20 bg-dark-foreground/10 p-2 shadow-2xl shadow-black/30 backdrop-blur-sm">
            <img
              src="/academy-fellowship.png"
              alt="OpenAlgon AI and Fullstack Builder Fellowship poster"
              className="h-auto w-full rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Academy;
