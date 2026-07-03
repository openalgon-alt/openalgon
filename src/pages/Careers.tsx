import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollAnimate, ScrollAnimateStagger, ScrollAnimateItem } from "@/components/ui/scroll-animate";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { ArrowRight, Briefcase, MapPin, Clock, Users, GraduationCap, Loader2, CheckCircle, X, UploadCloud, Link as LinkIcon, Search, Filter, ArrowUpDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SEOHead from "@/components/SEOHead";
import { pageSEO } from "@/lib/seo";
import { supabase, uploadResume, InternshipPosition, InternshipApplication, JobPosition } from "@/lib/supabase";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// ─── Main Page ────────────────────────────────────────────────────────────────
const Careers = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  // Search, Filter, Sort state
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const [internships, setInternships] = useState<InternshipPosition[]>([]);
  const [loadingInternships, setLoadingInternships] = useState(true);

  useEffect(() => {
    // Fetch full-time jobs from Supabase
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("job_positions")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (!error && data) {
        setJobs(data as JobPosition[]);
      }
      setLoadingJobs(false);
    };

    const fetchInternships = async () => {
      const { data, error } = await supabase
        .from("internship_positions")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (!error && data) setInternships(data as InternshipPosition[]);
      setLoadingInternships(false);
    };

    fetchJobs();
    fetchInternships();
  }, []);

  const handleApply = (position: InternshipPosition) => {
    navigate(`/apply/${position.id}`);
  };

  type UnifiedPosition = (JobPosition & { kind: "job" }) | (InternshipPosition & { kind: "internship" });

  const allPositions: UnifiedPosition[] = [
    ...jobs.map(j => ({ ...j, kind: "job" as const })),
    ...internships.map(i => ({ ...i, kind: "internship" as const }))
  ];

  const departments = ["All", ...Array.from(new Set(allPositions.map((p) => p.department)))];

  const filteredAndSortedPositions = allPositions
    .filter((pos) => {
      const matchesSearch = pos.title.toLowerCase().includes(searchTerm.toLowerCase()) || pos.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = departmentFilter === "All" || pos.department === departmentFilter;
      const matchesRole = roleFilter === "All" || (roleFilter === "Full-time" && pos.kind === "job") || (roleFilter === "Internships" && pos.kind === "internship");
      return matchesSearch && matchesDept && matchesRole;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <Layout>
      <SEOHead {...pageSEO.careers} />

      {/* Hero */}
      <section className="section-dark py-24 lg:py-32 relative overflow-hidden">
        <FloatingParticles count={20} className="z-[1]" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-background to-background opacity-50" />
        <div className="container-page relative z-[2] text-center">
          <ScrollAnimate>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Build the Future With Us</h1>
          </ScrollAnimate>
          <ScrollAnimate delay={0.1}>
            <p className="text-xl text-dark-foreground/70 max-w-2xl mx-auto mb-10">
              Join a team of passionate innovators dedicated to solving the world's toughest challenges through technology.
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="accent" size="xl" onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}>
                View Open Roles
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Values/Culture */}
      <section className="section-light py-20 lg:py-28">
        <div className="container-page">
          <ScrollAnimate>
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl font-bold mb-4">Why OpenAlgon?</h2>
              <p className="text-lg text-muted-foreground">
                We believe in autonomy, mastery, and purpose. We provide an environment where you can do your best work, learn constantly, and make a real impact.
              </p>
            </div>
          </ScrollAnimate>
          <ScrollAnimateStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollAnimateItem>
              <div className="p-6 rounded-xl bg-muted/50 border border-border/50">
                <Users className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Great Team</h3>
                <p className="text-muted-foreground">Collaborate with some of the brightest minds in the industry.</p>
              </div>
            </ScrollAnimateItem>
            <ScrollAnimateItem>
              <div className="p-6 rounded-xl bg-muted/50 border border-border/50">
                <Briefcase className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Impactful Work</h3>
                <p className="text-muted-foreground">Work on projects that matter and scale to millions of users.</p>
              </div>
            </ScrollAnimateItem>
            <ScrollAnimateItem>
              <div className="p-6 rounded-xl bg-muted/50 border border-border/50">
                <Clock className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Flexible Culture</h3>
                <p className="text-muted-foreground">We focus on output, not hours. Remote-friendly and flexible execution.</p>
              </div>
            </ScrollAnimateItem>
          </ScrollAnimateStagger>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="section-neutral py-20 lg:py-28">
        <div className="container-page max-w-5xl mx-auto">
          <ScrollAnimate>
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center">Open Positions</h2>
          </ScrollAnimate>

          {!(loadingJobs || loadingInternships) && allPositions.length > 0 && (
            <ScrollAnimate>
              <div className="flex flex-col md:flex-row gap-4 mb-10 bg-background p-4 rounded-xl border border-border shadow-sm">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search roles or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:outline-none focus:ring-0 text-foreground"
                  />
                </div>
                <div className="h-px w-full md:h-auto md:w-px bg-border my-2 md:my-0"></div>
                <div className="flex items-center gap-2 px-2 shrink-0">
                  <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-[140px] bg-transparent border-none focus:ring-0 shadow-none text-sm">
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-px w-full md:h-auto md:w-px bg-border my-2 md:my-0"></div>
                <div className="flex items-center gap-2 px-2 shrink-0">
                  <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[130px] bg-transparent border-none focus:ring-0 shadow-none text-sm">
                      <SelectValue placeholder="Role Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Roles</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Internships">Internships</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-px w-full md:h-auto md:w-px bg-border my-2 md:my-0"></div>
                <div className="flex items-center gap-2 px-2 shrink-0">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as "newest" | "oldest")}>
                    <SelectTrigger className="w-[130px] bg-transparent border-none focus:ring-0 shadow-none text-sm">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </ScrollAnimate>
          )}

          {(loadingJobs || loadingInternships) ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="animate-spin h-8 w-8 text-accent" />
            </div>
          ) : allPositions.length === 0 ? (
            <ScrollAnimate>
              <div className="text-center py-16 text-muted-foreground bg-background rounded-xl border border-dashed border-border">
                <Briefcase className="mx-auto h-12 w-12 mb-4 opacity-30" />
                <p className="text-lg font-medium">No open positions at the moment.</p>
                <p className="text-sm mt-1">Check back soon — we post new opportunities regularly!</p>
              </div>
            </ScrollAnimate>
          ) : filteredAndSortedPositions.length === 0 ? (
            <ScrollAnimate>
              <div className="text-center py-16 text-muted-foreground bg-background rounded-xl border border-dashed border-border">
                <Search className="mx-auto h-12 w-12 mb-4 opacity-30" />
                <p className="text-lg font-medium">No results found.</p>
                <p className="text-sm mt-1">Try adjusting your search or filters.</p>
              </div>
            </ScrollAnimate>
          ) : (
            <ScrollAnimateStagger className="flex flex-col gap-4" staggerDelay={0.05}>
              {filteredAndSortedPositions.map((pos) => (
                <ScrollAnimateItem key={pos.id ?? pos.title}>
                  <div className="group bg-background rounded-xl p-5 border border-border hover:border-accent/50 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                          {pos.title}
                        </h3>
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                          {pos.department}
                        </span>
                        {pos.kind === "internship" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                            <GraduationCap size={12} /> Internship
                          </span>
                        )}
                      </div>
                      <p className="text-foreground/80 text-sm mb-4 max-w-3xl line-clamp-2 md:line-clamp-none">
                        {pos.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          <span>{pos.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users size={14} />
                          <span>{pos.type}</span>
                        </div>
                        {pos.kind === "internship" && pos.duration && (
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} />
                            <span>{pos.duration}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} />
                          <span>{pos.created_at ? new Date(pos.created_at).toLocaleDateString() : "Recently posted"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-auto shrink-0 md:pl-6 md:border-l md:border-border pt-4 md:pt-0">
                      {pos.kind === "job" ? (
                        <Button className="w-full md:w-auto group-hover:bg-accent group-hover:text-white transition-all duration-300" asChild>
                          <a
                            href={`https://wa.me/919742182343?text=${encodeURIComponent(`Hi, I am interested in the ${pos.title} role at OpenAlgon. Can you please provide more details?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Apply via WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      ) : (
                        <Button className="w-full md:w-auto group-hover:bg-accent group-hover:text-white transition-all duration-300" onClick={() => handleApply(pos as InternshipPosition)}>
                          Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </ScrollAnimateItem>
              ))}
            </ScrollAnimateStagger>
          )}
        </div>
      </section>



    </Layout>
  );
};

export default Careers;
