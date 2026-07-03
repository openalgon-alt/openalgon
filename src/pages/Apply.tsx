import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase, InternshipPosition, uploadResume } from "@/lib/supabase";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, ArrowRight, UploadCloud, Link as LinkIcon, CheckCircle } from "lucide-react";

// Reduced form schema
const formSchema = z.object({
  // Step 1: Personal
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  mobile: z.string().min(10, "Valid mobile number is required"),
  linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  github: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  portfolio: z.string().url("Must be a valid URL").optional().or(z.literal("")),

  // Step 2: AI & Coding Experience
  usedAI: z.enum(["Yes", "No"]).optional(),
  writeJSNoAI: z.enum(["Yes", "Somewhat", "No"]).optional(),
  debugComfort: z.string().optional(),
  buildCRUD: z.enum(["Yes", "No", "Learning"]).optional(),

  // Step 3: Availability & Motivation
  hoursPerDay: z.string().min(1, "Hours required"),
  ownLaptop: z.enum(["Yes", "No"]),
  englishComm: z.enum(["Beginner", "Intermediate", "Advanced"]),
  whyJoin: z.string().min(10, "Please provide a detailed answer"),
  expectToLearn: z.string().min(10, "Please provide a detailed answer"),
  whereInOneYear: z.string().min(10, "Please provide a detailed answer"),

  // Step 4: Uploads & Declaration
  resumeLink: z.string().optional(),
  declaration: z.boolean().refine(val => val === true, "You must accept the declaration"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Apply() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [position, setPosition] = useState<InternshipPosition | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
    mode: "onTouched"
  });

  useEffect(() => {
    const fetchPos = async () => {
      if (!id) return;
      const { data, error } = await supabase.from("internship_positions").select("*").eq("id", id).single();
      if (!error && data) setPosition(data as InternshipPosition);
      setLoading(false);
    };
    fetchPos();
  }, [id]);

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ['fullName', 'email', 'mobile', 'linkedin', 'github', 'portfolio'];
    if (step === 2) fieldsToValidate = ['usedAI', 'writeJSNoAI', 'debugComfort', 'buildCRUD'];
    if (step === 3) fieldsToValidate = ['hoursPerDay', 'ownLaptop', 'englishComm', 'whyJoin', 'expectToLearn', 'whereInOneYear'];
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep(s => Math.min(s + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setStep(s => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (values: FormValues) => {
    if (!resumeFile && !values.resumeLink) {
      toast({ title: "Resume Required", description: "Please upload a resume or provide a link.", variant: "destructive" });
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
    <Layout>
      <div className="py-20 lg:py-28 section-light min-h-screen">
        <div className="container-page max-w-4xl mx-auto">
          
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-2">Apply for {position.title}</h1>
            <p className="text-muted-foreground">Internship Programme • {position.department}</p>
          </div>

          <div className="bg-background rounded-2xl border border-border p-6 md:p-10 shadow-sm">
            <div className="flex gap-2 mb-10">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className={`h-2 flex-1 rounded-full ${step >= i + 1 ? 'bg-accent' : 'bg-muted'}`} />
              ))}
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* --- STEP 1: Personal --- */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Section 1: Personal Information</h2>
                    <p className="text-muted-foreground text-sm mb-6">Tell us about yourself.</p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-xl border border-border flex flex-col md:flex-row gap-4 items-center mb-8">
                    <div className="flex-grow">
                      <h4 className="font-medium text-sm">Have a LinkedIn or Resume URL?</h4>
                      <p className="text-xs text-muted-foreground">Paste it here to auto-fill some fields (Experimental)</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <Input placeholder="https://..." className="bg-background" />
                      <Button type="button" variant="secondary" onClick={() => toast({ title: "Coming Soon", description: "Auto-fill API integration is pending." })}>
                        Fetch
                      </Button>
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
                      <Label>Portfolio Link</Label>
                      <Input {...form.register("portfolio")} placeholder="https://" />
                    </div>
                    <div className="space-y-2">
                      <Label>LinkedIn Profile</Label>
                      <Input {...form.register("linkedin")} placeholder="https://" />
                    </div>
                    <div className="space-y-2">
                      <Label>GitHub Profile</Label>
                      <Input {...form.register("github")} placeholder="https://" />
                    </div>
                  </div>
                </div>
              )}

              {/* --- STEP 2: AI & Coding Experience --- */}
              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Section 2: AI & Coding Experience</h2>
                    <p className="text-muted-foreground text-sm mb-6">Help us understand your technical background.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label className="text-base">Have you used AI to build projects?</Label>
                      <RadioGroup defaultValue={form.watch("usedAI")} onValueChange={(v) => form.setValue("usedAI", v as "Yes"|"No")}>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="Yes" id="ai-yes" /><Label htmlFor="ai-yes">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="No" id="ai-no" /><Label htmlFor="ai-no">No</Label></div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label>Can you write JavaScript without AI assistance?</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...form.register("writeJSNoAI")}>
                        <option value="">Select...</option>
                        <option value="Yes">Yes</option>
                        <option value="Somewhat">Somewhat</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <Label>How comfortable are you debugging code? (1-5)</Label>
                      <Input type="number" min="1" max="5" {...form.register("debugComfort")} />
                    </div>

                    <div className="space-y-3">
                      <Label>Can you build a CRUD app from scratch?</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...form.register("buildCRUD")}>
                        <option value="">Select...</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Learning">Learning</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* --- STEP 3: Availability & Motivation --- */}
              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Section 3: Availability & Motivation</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-3">
                      <Label>How many hours can you dedicate per day?</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...form.register("hoursPerDay")}>
                        <option value="">Select...</option>
                        <option value="2 Hours">2 Hours</option>
                        <option value="4 Hours">4 Hours</option>
                        <option value="6 Hours">6 Hours</option>
                        <option value="8+ Hours">8+ Hours</option>
                      </select>
                      {form.formState.errors.hoursPerDay && <p className="text-xs text-red-500">{form.formState.errors.hoursPerDay.message}</p>}
                    </div>

                    <div className="space-y-3">
                      <Label>Do you have your own laptop?</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...form.register("ownLaptop")}>
                        <option value="">Select...</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {form.formState.errors.ownLaptop && <p className="text-xs text-red-500">{form.formState.errors.ownLaptop.message}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Rate your English communication</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...form.register("englishComm")}>
                        <option value="">Select...</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                      {form.formState.errors.englishComm && <p className="text-xs text-red-500">{form.formState.errors.englishComm.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-6 border-t border-border pt-6">
                    <div className="space-y-2">
                      <Label>Why do you want to join OpenAlgon?</Label>
                      <Textarea rows={3} {...form.register("whyJoin")} />
                      {form.formState.errors.whyJoin && <p className="text-xs text-red-500">{form.formState.errors.whyJoin.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>What do you expect to learn?</Label>
                      <Textarea rows={3} {...form.register("expectToLearn")} />
                      {form.formState.errors.expectToLearn && <p className="text-xs text-red-500">{form.formState.errors.expectToLearn.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Where do you see yourself after one year?</Label>
                      <Textarea rows={3} {...form.register("whereInOneYear")} />
                      {form.formState.errors.whereInOneYear && <p className="text-xs text-red-500">{form.formState.errors.whereInOneYear.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* --- STEP 4: Uploads & Submit --- */}
              {step === 4 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Section 4: Final Steps</h2>
                    <p className="text-muted-foreground text-sm mb-6">Upload your resume and submit.</p>
                  </div>
                  
                  <div className="space-y-4 p-6 bg-muted/30 rounded-xl border border-border">
                    <Label className="text-base font-semibold">Resume Upload (PDF, max 5MB) *</Label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Option 1: Provide a Link</Label>
                        <Input placeholder="Google Drive or Website Link" {...form.register("resumeLink")} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Option 2: Upload File</Label>
                        <div className="relative border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-accent/50 transition-colors cursor-pointer">
                          <input 
                            type="file" 
                            accept=".pdf" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                            onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)} 
                          />
                          {resumeFile ? (
                            <div className="flex flex-col items-center gap-2 text-accent">
                              <CheckCircle size={24} />
                              <span className="text-sm font-medium">{resumeFile.name}</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              <UploadCloud size={24} />
                              <span className="text-sm">Click or drag PDF here</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Declaration</Label>
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
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 mt-8 border-t border-border">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={handlePrev}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                ) : <div></div>}
                
                {step < totalSteps ? (
                  <Button type="button" onClick={handleNext}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Application"}
                  </Button>
                )}
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}
