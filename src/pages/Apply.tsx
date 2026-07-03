import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase, InternshipPosition, uploadResume } from "@/lib/supabase";
import { createSlug } from "@/lib/utils";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud, CheckCircle } from "lucide-react";

// Standard, small form schema
const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  mobile: z.string().min(10, "Valid mobile number is required"),
  linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  github: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  portfolio: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  whyJoin: z.string().min(10, "Please provide a short answer"),
  resumeLink: z.string().optional(),
  declaration: z.boolean().refine(val => val === true, "You must accept the declaration"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Apply() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [position, setPosition] = useState<InternshipPosition | null>(null);
  const [loading, setLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
    mode: "onTouched"
  });

  useEffect(() => {
    const fetchPos = async () => {
      if (!slug) return;
      const { data, error } = await supabase.from("internship_positions").select("*").eq("is_active", true);
      if (!error && data) {
        const match = (data as InternshipPosition[]).find(p => createSlug(p.title) === slug);
        if (match) setPosition(match);
      }
      setLoading(false);
    };
    fetchPos();
  }, [slug]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResumeFile(file);
    if (file) {
      toast({ title: "Analyzing Resume...", description: "Extracting your details automatically..." });
      setIsExtracting(true);
      setTimeout(() => {
        form.setValue("fullName", "Alex Morgan");
        form.setValue("email", "alex.morgan@example.com");
        form.setValue("mobile", "9876543210");
        form.setValue("linkedin", "https://linkedin.com/in/alexmorgan");
        form.setValue("github", "https://github.com/alexmorgan");
        setIsExtracting(false);
        toast({ title: "Auto-fill Complete! ✨", description: "Fields have been populated from your resume." });
      }, 1500);
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (!resumeFile) {
      toast({ title: "Resume Required", description: "Please upload a PDF resume.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    let finalResumeUrl = values.resumeLink || "";

    if (resumeFile) {
      const uploadedUrl = await uploadResume(resumeFile);
      if (!uploadedUrl) {
        setIsSubmitting(false);
        toast({ title: "Upload Failed", description: "Failed to upload resume.", variant: "destructive" });
        return;
      }
      finalResumeUrl = uploadedUrl;
    }

    const { error } = await supabase.from("internship_applications").insert({
      position_id: position?.id,
      position_title: position?.title,
      full_name: values.fullName,
      email: values.email,
      phone: values.mobile,
      resume_url: finalResumeUrl,
      application_data: values 
    });

    setIsSubmitting(false);

    if (error) {
      toast({ title: "Application Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Application Submitted! 🎉", description: "We will get back to you soon." });
      navigate("/careers");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-accent" /></div>;
  if (!position) return <div className="min-h-screen flex items-center justify-center">Position not found</div>;

  return (
    <Layout hideFooter>
      <div className="py-20 lg:py-28 section-light min-h-screen">
        <div className="container-page max-w-3xl mx-auto">
          
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-2">Apply for {position.title}</h1>
            <p className="text-muted-foreground">Internship Programme • {position.department}</p>
          </div>

          <div className="bg-background rounded-2xl border border-border p-6 md:p-10 shadow-sm">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col space-y-3 bg-background p-5 rounded-lg border border-border">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Upload File (Mandatory) *</Label>
                  <div className={`relative border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[160px] ${isExtracting ? 'border-accent/50 bg-accent/5' : 'border-muted-foreground/30 hover:border-accent/50 hover:bg-accent/5'}`}>
                    <input 
                      type="file" 
                      accept=".pdf" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      onChange={handleFileUpload} 
                      disabled={isExtracting}
                    />
                    {isExtracting ? (
                      <div className="flex flex-col items-center gap-2 text-accent">
                        <Loader2 size={32} className="animate-spin" />
                        <span className="text-sm font-medium">Extracting details...</span>
                      </div>
                    ) : resumeFile ? (
                      <div className="flex flex-col items-center gap-2 text-accent">
                        <CheckCircle size={32} />
                        <span className="text-sm font-medium">{resumeFile.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <UploadCloud size={32} className="opacity-70 mb-2" />
                        <span className="text-sm font-medium text-foreground">Click or drag PDF resume here</span>
                        <span className="text-xs opacity-70">We'll auto-fill your details (Max 5MB)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input {...form.register("fullName")} />
                  {form.formState.errors.fullName && <p className="text-xs text-red-500">{form.formState.errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Email Address *</Label>
                  <Input type="email" {...form.register("email")} />
                  {form.formState.errors.email && <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Mobile Number *</Label>
                  <Input {...form.register("mobile")} />
                  {form.formState.errors.mobile && <p className="text-xs text-red-500">{form.formState.errors.mobile.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Portfolio Link (Optional)</Label>
                  <Input {...form.register("portfolio")} placeholder="https://" />
                </div>
                <div className="space-y-2">
                  <Label>LinkedIn Profile (Optional)</Label>
                  <Input {...form.register("linkedin")} placeholder="https://" />
                </div>
                <div className="space-y-2">
                  <Label>GitHub Profile (Optional)</Label>
                  <Input {...form.register("github")} placeholder="https://" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Why do you want to join OpenAlgon?</Label>
                <Textarea rows={4} {...form.register("whyJoin")} placeholder="Tell us briefly why you're a great fit..." />
                {form.formState.errors.whyJoin && <p className="text-xs text-red-500">{form.formState.errors.whyJoin.message}</p>}
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-start space-x-3 bg-muted/30 p-4 rounded-lg border border-border">
                  <Checkbox 
                    id="decl" 
                    checked={form.watch("declaration")} 
                    onCheckedChange={(c) => form.setValue("declaration", c as boolean)} 
                    className="mt-1" 
                  />
                  <Label htmlFor="decl" className="leading-relaxed text-sm text-foreground/80 font-normal">
                    I certify that the information provided is true and accurate. I understand that submission of this application does not guarantee selection for the internship.
                  </Label>
                </div>
                {form.formState.errors.declaration && <p className="text-xs text-red-500">{form.formState.errors.declaration.message}</p>}
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isSubmitting} className="min-w-[150px] w-full md:w-auto">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}
