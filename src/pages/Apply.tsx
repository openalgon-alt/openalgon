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
import * as pdfjsLib from 'pdfjs-dist';

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResumeFile(file);
    if (!file) return;

    toast({ title: "Analyzing Resume...", description: "Extracting your details automatically..." });
    setIsExtracting(true);

    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const pdf = await pdfjsLib.getDocument({ data }).promise;
      let text = "";
      // Only parse first 2 pages to save time and memory
      const maxPages = Math.min(pdf.numPages, 2);
      for (let i = 1; i <= maxPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(" ") + " ";
      }

      const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
      if (emailMatch) form.setValue("email", emailMatch[1]);
      else form.setValue("email", "");

      // Match common phone formats, especially Indian numbers since it's a common usecase based on +91
      const phoneMatch = text.match(/(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}/);
      if (phoneMatch) form.setValue("mobile", phoneMatch[0].replace(/\D/g, ''));
      else form.setValue("mobile", "");

      const linkedinMatch = text.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
      if (linkedinMatch) form.setValue("linkedin", "https://" + linkedinMatch[0]);
      else form.setValue("linkedin", "");

      const githubMatch = text.match(/github\.com\/[a-zA-Z0-9_-]+/i);
      if (githubMatch) form.setValue("github", "https://" + githubMatch[0]);
      else form.setValue("github", "");

      // Advanced Portfolio Extraction
      let portfolioUrl = "";
      
      // Strategy 1: Look for words like 'portfolio' or 'website' near a domain (.com, .net, etc)
      const explicitMatch = text.match(/(?:portfolio|website|site)[\s:|-]{1,10}(?:https?:\/\/|www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[a-zA-Z0-9_.-]+)*)/i);
      if (explicitMatch && !explicitMatch[0].toLowerCase().includes("linkedin") && !explicitMatch[0].toLowerCase().includes("github")) {
        portfolioUrl = explicitMatch[1];
      }
      
      // Strategy 2: Look for ANY link starting with http:// or www. that isn't linkedin/github
      if (!portfolioUrl) {
        const httpMatches = text.match(/(?:https?:\/\/|www\.)([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[a-zA-Z0-9_.-]+)*)/ig);
        if (httpMatches) {
          const validHttp = httpMatches.find(u => !u.toLowerCase().includes("linkedin") && !u.toLowerCase().includes("github"));
          if (validHttp) portfolioUrl = validHttp;
        }
      }
      
      // Strategy 3: Fallback to common dev/design domains even if they don't have http/www
      if (!portfolioUrl) {
         const domainMatch = text.match(/([a-zA-Z0-9-]+\.(?:vercel\.app|netlify\.app|github\.io|behance\.net|dribbble\.com|me|dev))(?:\/[a-zA-Z0-9_.-]+)?/i);
         if (domainMatch) portfolioUrl = domainMatch[0];
      }

      if (portfolioUrl) {
        // Clean up trailing punctuation if accidentally caught
        portfolioUrl = portfolioUrl.replace(/[.,;)]+$/, '');
        // Ensure valid URL format
        let cleanUrl = portfolioUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
        form.setValue("portfolio", 'https://' + cleanUrl);
      } else {
        form.setValue("portfolio", "");
      }

      // Smarter Name Extraction from Filename (Removes numbers, dots, and common words like 'final', 'updated')
      let nameFromFilename = file.name
        .replace(/\.pdf$/i, '')
        .replace(/[0-9.]+/g, ' ') // Remove all numbers and dots (like 4.2)
        .replace(/[_-\s]+/g, ' ') // Convert underscores/dashes to spaces
        .replace(/\b(resume|cv|final|updated|latest|draft|copy|portfolio|profile)\b/ig, '') // Remove common filler words
        .trim();
        
      // Capitalize first letter of each word
      nameFromFilename = nameFromFilename.split(' ').filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      
      form.setValue("fullName", nameFromFilename || "");

      toast({ title: "Auto-fill Complete! ✨", description: "We extracted what we could. Please verify the details." });
    } catch (error) {
      console.error(error);
      toast({ title: "Extraction Limited", description: "Could not fully parse PDF text. Please enter details manually." });
      form.setValue("fullName", file.name.replace(/\.pdf$/i, '').replace(/[_-\s]+/g, ' ').replace(/resume|cv/ig, '').trim());
    } finally {
      setIsExtracting(false);
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
      applicant_name: values.fullName,
      applicant_email: values.email,
      applicant_phone: values.mobile,
      resume_url: finalResumeUrl,
      application_data: values 
    });

    setIsSubmitting(false);

    if (error) {
      console.error("[OpenAlgon] DB insert failed:", error);
      toast({ title: "Application Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Application Submitted! 🎉", description: "Your application has been received successfully." });
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
