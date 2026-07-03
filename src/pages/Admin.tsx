import { useState, useEffect } from "react";
import { supabase, InternshipPosition, JobPosition, InternshipApplication } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import { pageSEO } from "@/lib/seo";
import {
  LogOut, Loader2, Plus, Trash2, GraduationCap,
  Users, Briefcase, ToggleLeft, ToggleRight, Check, X, Mail,
  Phone, Link as LinkIcon, FileText, Eye, EyeOff, Shield, MapPin, Clock, Search
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Tab = "post" | "jobs" | "internships" | "applications";
type PostKind = "job" | "internship";
type FormState = "idle" | "loading" | "success" | "error";

// ─── Login Screen ─────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-4">
            <Shield className="h-7 w-7 text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Portal</h1>
          <p className="text-sm text-muted-foreground mt-1">OpenAlgon Internal Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="bg-background border border-border rounded-2xl p-6 shadow-xl space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="admin-email" className="text-sm font-medium">Email</label>
            <input id="admin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@openalgon.com"
              className="w-full px-3 py-2 rounded-lg border border-border bg-muted/30 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="admin-password" className="text-sm font-medium">Password</label>
            <div className="relative">
              <input id="admin-password" type={showPass ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                className="w-full px-3 py-2 pr-10 rounded-lg border border-border bg-muted/30 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              <button type="button" tabIndex={-1} onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <Button type="submit" variant="accent" className="w-full" disabled={loading}>
            {loading ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Signing in…</> : "Sign In"}
          </Button>
        </form>
        <p className="text-center text-xs text-muted-foreground mt-5">Protected portal — authorised personnel only.</p>
      </div>
    </div>
  );
};

// ─── Shared Position Card ─────────────────────────────────────────────────────
interface PositionCardProps {
  pos: JobPosition | InternshipPosition;
  onDelete: (id: string, title: string) => void;
  onToggle: (pos: JobPosition | InternshipPosition) => void;
  badge?: string;
}
const PositionCard = ({ pos, onDelete, onToggle, badge }: PositionCardProps) => (
  <div className={`bg-background border rounded-xl p-5 transition-all ${pos.is_active ? "border-border" : "border-border/40 opacity-60"}`}>
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {badge && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-secondary text-secondary-foreground">{badge}</span>
          )}
          <h3 className="font-semibold text-foreground">{pos.title}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${pos.is_active ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}>
            {pos.is_active ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-1 mb-2">
          <span className="flex items-center gap-1"><MapPin size={11} /> {pos.location}</span>
          <span className="flex items-center gap-1"><Users size={11} /> {pos.type}</span>
          {"duration" in pos && pos.duration && (
            <span className="flex items-center gap-1"><Clock size={11} /> {pos.duration}</span>
          )}
        </div>
        <p className="text-sm text-foreground/70 line-clamp-2">{pos.description}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button onClick={() => onToggle(pos)} title={pos.is_active ? "Deactivate" : "Activate"}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-accent transition-colors">
          {pos.is_active ? <ToggleRight size={20} className="text-accent" /> : <ToggleLeft size={20} />}
        </button>
        <button onClick={() => onDelete(pos.id!, pos.title)} title="Delete"
          className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  </div>
);

// ─── Post Position Tab (jobs + internships) ───────────────────────────────────
const PostPositionTab = ({ onPosted }: { onPosted: () => void }) => {
  const { toast } = useToast();
  const [kind, setKind] = useState<PostKind>("job");
  const [formState, setFormState] = useState<FormState>("idle");
  const inputCls = "w-full px-3 py-2 rounded-lg border border-border bg-muted/30 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent";

  // Job form state
  const [job, setJob] = useState<Omit<JobPosition, "id" | "created_at">>({ title: "", department: "", location: "", type: "", description: "", is_active: true });

  // Internship form state
  const [intern, setIntern] = useState<Omit<InternshipPosition, "id" | "created_at">>({ title: "", department: "", location: "", duration: "", type: "", description: "", is_active: true });

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    const { error } = await supabase.from("job_positions").insert([job]);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      setFormState("error");
    } else {
      toast({ title: "Job posted! 🎉", description: "It is now live on the Careers page." });
      setJob({ title: "", department: "", location: "", type: "", description: "", is_active: true });
      setFormState("idle");
      onPosted();
    }
  };

  const handleInternSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    const { error } = await supabase.from("internship_positions").insert([intern]);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      setFormState("error");
    } else {
      toast({ title: "Internship posted! 🎉", description: "It is now live on the Careers page." });
      setIntern({ title: "", department: "", location: "", duration: "", type: "", description: "", is_active: true });
      setFormState("idle");
      onPosted();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus size={20} className="text-accent" /> Post New Position</h2>

      {/* Kind Toggle */}
      <div className="flex rounded-xl overflow-hidden border border-border mb-6 text-sm font-medium">
        <button type="button" onClick={() => setKind("job")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 transition-colors ${kind === "job" ? "bg-accent text-white" : "bg-muted/40 text-muted-foreground hover:bg-muted/70"}`}>
          <Briefcase size={15} /> Open Position (Job)
        </button>
        <button type="button" onClick={() => setKind("internship")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 transition-colors ${kind === "internship" ? "bg-accent text-white" : "bg-muted/40 text-muted-foreground hover:bg-muted/70"}`}>
          <GraduationCap size={15} /> Internship
        </button>
      </div>

      {/* Job Form */}
      {kind === "job" && (
        <form onSubmit={handleJobSubmit} className="space-y-5 bg-background border border-border rounded-2xl p-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Position Title *</label>
            <input required value={job.title} onChange={(e) => setJob(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Senior AI Engineer" className={inputCls} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Department *</label>
              <input required value={job.department} onChange={(e) => setJob(p => ({ ...p, department: e.target.value }))} placeholder="e.g. Engineering" className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Location *</label>
              <input required value={job.location} onChange={(e) => setJob(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Remote / Bangalore" className={inputCls} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Employment Type *</label>
            <input required value={job.type} onChange={(e) => setJob(p => ({ ...p, type: e.target.value }))} placeholder="e.g. Full-time, Part-time, Contract" className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Description *</label>
            <textarea required rows={4} value={job.description} onChange={(e) => setJob(p => ({ ...p, description: e.target.value }))} placeholder="Describe the role..." className={`${inputCls} resize-none`} />
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setJob(p => ({ ...p, is_active: !p.is_active }))} className="text-accent">
              {job.is_active ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-muted-foreground" />}
            </button>
            <span className="text-sm font-medium">{job.is_active ? "Active — visible on Careers page" : "Inactive — hidden"}</span>
          </div>
          <Button type="submit" variant="accent" className="w-full" disabled={formState === "loading"}>
            {formState === "loading" ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Saving…</> : <><Briefcase className="mr-2 h-4 w-4" /> Post Job</>}
          </Button>
        </form>
      )}

      {/* Internship Form */}
      {kind === "internship" && (
        <form onSubmit={handleInternSubmit} className="space-y-5 bg-background border border-border rounded-2xl p-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Position Title *</label>
            <input required value={intern.title} onChange={(e) => setIntern(p => ({ ...p, title: e.target.value }))} placeholder="e.g. AI/ML Intern" className={inputCls} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Department *</label>
              <input required value={intern.department} onChange={(e) => setIntern(p => ({ ...p, department: e.target.value }))} placeholder="e.g. Engineering" className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Location *</label>
              <input required value={intern.location} onChange={(e) => setIntern(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Remote / Bangalore" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Duration *</label>
              <input required value={intern.duration} onChange={(e) => setIntern(p => ({ ...p, duration: e.target.value }))} placeholder="e.g. 3 Months" className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Type *</label>
              <input required value={intern.type} onChange={(e) => setIntern(p => ({ ...p, type: e.target.value }))} placeholder="e.g. Paid / Stipend" className={inputCls} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Description *</label>
            <textarea required rows={4} value={intern.description} onChange={(e) => setIntern(p => ({ ...p, description: e.target.value }))} placeholder="Describe the internship..." className={`${inputCls} resize-none`} />
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setIntern(p => ({ ...p, is_active: !p.is_active }))} className="text-accent">
              {intern.is_active ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-muted-foreground" />}
            </button>
            <span className="text-sm font-medium">{intern.is_active ? "Active — visible on Careers page" : "Inactive — hidden"}</span>
          </div>
          <Button type="submit" variant="accent" className="w-full" disabled={formState === "loading"}>
            {formState === "loading" ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Saving…</> : <><GraduationCap className="mr-2 h-4 w-4" /> Post Internship</>}
          </Button>
        </form>
      )}
    </div>
  );
};

// ─── Open Positions Tab (full-time jobs) ──────────────────────────────────────
const JobsTab = ({ jobs, loading, onRefresh }: { jobs: JobPosition[]; loading: boolean; onRefresh: () => void }) => {
  const { toast } = useToast();

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("job_positions").delete().eq("id", id);
    if (error) { toast({ title: "Delete failed", description: error.message, variant: "destructive" }); }
    else { toast({ title: "Deleted", description: `"${title}" removed.` }); onRefresh(); }
  };

  const handleToggle = async (pos: JobPosition) => {
    const { error } = await supabase.from("job_positions").update({ is_active: !pos.is_active }).eq("id", pos.id!);
    if (error) { toast({ title: "Toggle failed", description: error.message, variant: "destructive" }); }
    else { toast({ title: pos.is_active ? "Deactivated" : "Activated", description: `"${pos.title}" updated.` }); onRefresh(); }
  };

  if (loading) return <div className="flex justify-center items-center py-20"><Loader2 className="animate-spin h-8 w-8 text-accent" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Briefcase size={20} className="text-accent" /> Open Positions
          <span className="ml-2 text-sm font-normal text-muted-foreground">{jobs.length} listing{jobs.length !== 1 ? "s" : ""}</span>
        </h2>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground bg-background border border-dashed border-border rounded-2xl">
          <Briefcase className="mx-auto h-10 w-10 mb-3 opacity-30" />
          <p className="font-medium">No job positions yet.</p>
          <p className="text-sm mt-1">Post a new one from the <strong>Post Position</strong> tab.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((pos) => (
            <PositionCard key={pos.id} pos={pos} badge={pos.department} onDelete={handleDelete} onToggle={handleToggle} />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Internships Tab ──────────────────────────────────────────────────────────
const InternshipsTab = ({ internships, loading, onRefresh }: { internships: InternshipPosition[]; loading: boolean; onRefresh: () => void }) => {
  const { toast } = useToast();

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("internship_positions").delete().eq("id", id);
    if (error) { toast({ title: "Delete failed", description: error.message, variant: "destructive" }); }
    else { toast({ title: "Deleted", description: `"${title}" removed.` }); onRefresh(); }
  };

  const handleToggle = async (pos: InternshipPosition) => {
    const { error } = await supabase.from("internship_positions").update({ is_active: !pos.is_active }).eq("id", pos.id!);
    if (error) { toast({ title: "Toggle failed", description: error.message, variant: "destructive" }); }
    else { toast({ title: pos.is_active ? "Deactivated" : "Activated", description: `"${pos.title}" updated.` }); onRefresh(); }
  };

  if (loading) return <div className="flex justify-center items-center py-20"><Loader2 className="animate-spin h-8 w-8 text-accent" /></div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <GraduationCap size={20} className="text-accent" /> Internship Listings
        <span className="ml-2 text-sm font-normal text-muted-foreground">{internships.length} listing{internships.length !== 1 ? "s" : ""}</span>
      </h2>

      {internships.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground bg-background border border-dashed border-border rounded-2xl">
          <GraduationCap className="mx-auto h-10 w-10 mb-3 opacity-30" />
          <p className="font-medium">No internship positions yet.</p>
          <p className="text-sm mt-1">Post one from the <strong>Post Position</strong> tab.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {internships.map((pos) => (
            <PositionCard key={pos.id} pos={pos} badge={pos.department} onDelete={handleDelete} onToggle={handleToggle} />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Applications Tab ─────────────────────────────────────────────────────────
const ApplicationsTab = () => {
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPosition, setFilterPosition] = useState("all");
  const [selectedApp, setSelectedApp] = useState<InternshipApplication | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("internship_applications").select("*").order("created_at", { ascending: false });
      if (!error && data) setApplications(data as InternshipApplication[]);
      setLoading(false);
    })();
  }, []);

  const positions = ["all", ...Array.from(new Set(applications.map((a) => a.position_title)))];
  const filtered = filterPosition === "all" ? applications : applications.filter((a) => a.position_title === filterPosition);

  if (loading) return <div className="flex justify-center items-center py-20"><Loader2 className="animate-spin h-8 w-8 text-accent" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Users size={20} className="text-accent" /> Internship Applications
          <span className="ml-2 text-sm font-normal text-muted-foreground">{filtered.length} total</span>
        </h2>
        {positions.length > 1 && (
          <select value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)}
            className="sm:ml-auto px-3 py-2 rounded-lg border border-border bg-muted/30 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
            {positions.map((p) => <option key={p} value={p}>{p === "all" ? "All Positions" : p}</option>)}
          </select>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground bg-background border border-dashed border-border rounded-2xl">
          <Users className="mx-auto h-10 w-10 mb-3 opacity-30" />
          <p>No applications received yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((app) => (
            <div key={app.id} className="bg-background border border-border rounded-xl p-5 space-y-4 hover:border-accent/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div>
                  <h3 className="font-semibold text-foreground">{app.applicant_name}</h3>
                  <span className="inline-block mt-0.5 text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{app.position_title}</span>
                </div>
                <span className="sm:ml-auto text-xs text-muted-foreground">
                  {app.created_at ? new Date(app.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : ""}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <a href={`mailto:${app.applicant_email}`} className="flex items-center gap-1.5 hover:text-accent transition-colors"><Mail size={14} /> {app.applicant_email}</a>
                <a href={`tel:${app.applicant_phone}`} className="flex items-center gap-1.5 hover:text-accent transition-colors"><Phone size={14} /> {app.applicant_phone}</a>
              </div>
              
              <div className="flex items-center gap-4 pt-2 border-t border-border">
                {(app.resume_url || app.resume_link) && (
                  <a href={app.resume_url || app.resume_link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
                    {app.resume_url ? <FileText size={14} /> : <LinkIcon size={14} />}
                    Resume
                  </a>
                )}
                {app.application_data && (
                  <Button variant="ghost" size="sm" onClick={() => setSelectedApp(app)} className="h-8 gap-1.5 ml-auto text-xs">
                    <Search size={14} /> View Details
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedApp?.applicant_name}'s Application</DialogTitle>
            <DialogDescription>{selectedApp?.position_title}</DialogDescription>
          </DialogHeader>
          
          {selectedApp?.application_data && (
            <div className="space-y-6 mt-4">
              {/* Links */}
              <div className="space-y-2">
                <p className="font-semibold text-sm border-b pb-1">Profiles & Links</p>
                <div className="grid gap-3 text-sm mt-2">
                  {selectedApp.application_data.portfolio && (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs font-medium">Portfolio</span>
                      <a href={selectedApp.application_data.portfolio} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">
                        {selectedApp.application_data.portfolio}
                      </a>
                    </div>
                  )}
                  {selectedApp.application_data.linkedin && (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs font-medium">LinkedIn</span>
                      <a href={selectedApp.application_data.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">
                        {selectedApp.application_data.linkedin}
                      </a>
                    </div>
                  )}
                  {selectedApp.application_data.github && (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs font-medium">GitHub</span>
                      <a href={selectedApp.application_data.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">
                        {selectedApp.application_data.github}
                      </a>
                    </div>
                  )}
                  {!selectedApp.application_data.portfolio && !selectedApp.application_data.linkedin && !selectedApp.application_data.github && (
                    <p className="text-muted-foreground italic">No links provided.</p>
                  )}
                </div>
              </div>

              {/* Motivation */}
              <div className="space-y-3">
                <p className="font-semibold text-sm border-b pb-1">Motivation</p>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Why do you want to join OpenAlgon?</p>
                  <p className="text-sm bg-muted/30 p-3 rounded-lg leading-relaxed whitespace-pre-wrap">{selectedApp.application_data.whyJoin || "N/A"}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("jobs");
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [internships, setInternships] = useState<InternshipPosition[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingInternships, setLoadingInternships] = useState(true);

  const fetchJobs = async () => {
    setLoadingJobs(true);
    const { data, error } = await supabase.from("job_positions").select("*").order("created_at", { ascending: false });
    if (!error && data) setJobs(data as JobPosition[]);
    setLoadingJobs(false);
  };

  const fetchInternships = async () => {
    setLoadingInternships(true);
    const { data, error } = await supabase.from("internship_positions").select("*").order("created_at", { ascending: false });
    if (!error && data) setInternships(data as InternshipPosition[]);
    setLoadingInternships(false);
  };

  useEffect(() => {
    fetchJobs();
    fetchInternships();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out", description: "See you next time!" });
    onLogout();
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "post", label: "Post Position", icon: <Plus size={15} /> },
    { id: "jobs", label: "Open Positions", icon: <Briefcase size={15} />, count: jobs.length },
    { id: "internships", label: "Internships", icon: <GraduationCap size={15} />, count: internships.length },
    { id: "applications", label: "Applications", icon: <Users size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Shield size={14} className="text-accent" />
            </div>
            <span className="font-bold text-sm text-foreground">OpenAlgon Admin</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-1.5">
            <LogOut size={14} /> Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <nav className="flex flex-wrap gap-1 mb-8 bg-muted/50 p-1 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}>
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span className={`ml-1 text-xs rounded-full px-1.5 py-0.5 font-semibold ${activeTab === tab.id ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {activeTab === "post" && <PostPositionTab onPosted={() => { fetchJobs(); fetchInternships(); }} />}
        {activeTab === "jobs" && <JobsTab jobs={jobs} loading={loadingJobs} onRefresh={fetchJobs} />}
        {activeTab === "internships" && <InternshipsTab internships={internships} loading={loadingInternships} onRefresh={fetchInternships} />}
        {activeTab === "applications" && <ApplicationsTab />}
      </main>
    </div>
  );
};

// ─── Root Admin Component ─────────────────────────────────────────────────────
const Admin = () => {
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(!!session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(!!session));
    return () => subscription.unsubscribe();
  }, []);

  if (session === null) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin h-8 w-8 text-accent" />
    </div>
  );

  return (
    <>
      <SEOHead {...pageSEO.admin} />
      {session ? <AdminDashboard onLogout={() => setSession(false)} /> : <LoginScreen onLogin={() => setSession(true)} />}
    </>
  );
};

export default Admin;
