import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollAnimate, ScrollAnimateStagger, ScrollAnimateItem } from "@/components/ui/scroll-animate";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { ArrowRight, Briefcase, MapPin, Clock, Users } from "lucide-react";

// Job Data
const jobs = [
  {
    title: "AI Engineer",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    description: "Design and implement state-of-the-art AI models to solve complex business problems. Experience with PyTorch/TensorFlow and LLMs required.",
  },
  {
    title: "Machine Learning Specialist",
    department: "Engineering",
    location: "Remote / Bangalore",
    type: "Full-time",
    description: "Focus on optimizing ML pipelines and deploying scalable models in production environments. Strong background in MLOps is a plus.",
  },
  {
    title: "Full Stack Developer",
    department: "Product",
    location: "Bangalore, India",
    type: "Full-time",
    description: "Build robust web applications using React, Node.js, and modern cloud infrastructure. You will own features from conception to deployment.",
  },
  {
    title: "Backend Engineer",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    description: "Architect high-performance APIs and microservices. Proficiency in Go, Python, or Rust, and experience with distributed systems is essential.",
  },
  {
    title: "Frontend Developer",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    description: "Create stunning, responsive user interfaces. Expert knowledge of React, TypeScript, and modern CSS/Tailwind practices is expected.",
  },
  {
    title: "DevOps Engineer",
    department: "Operations",
    location: "Bangalore, India",
    type: "Full-time",
    description: "Manage our cloud infrastructure, CI/CD pipelines, and security protocols. AWS/Azure certification and Kubernetes experience preferred.",
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Bangalore, India",
    type: "Full-time",
    description: "Translate complex requirements into intuitive and beautiful designs. Portfolio demonstrating experience with Figma and user-centric design process required.",
  },
  {
    title: "Content Creator",
    department: "Marketing",
    location: "Bangalore, India",
    type: "Part-time / Full-time",
    description: "Produce engaging video and written content for our digital channels. Storytelling skills and proficiency with editing software are key.",
  },
  {
    title: "Social Media Content Content Creator",
    department: "Marketing",
    location: "Remote",
    type: "Contract",
    description: "Manage our social media presence, create viral content strategies, and engage with our community across LinkedIn and X (Twitter).",
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Bangalore, India",
    type: "Full-time",
    description: "Lead the product vision and roadmap. You will work closely with engineering and design to deliver high-impact features.",
  },
  {
    title: "Data Scientist",
    department: "Analytics",
    location: "Remote",
    type: "Full-time",
    description: "Analyze large datasets to derive actionable insights. Strong statistical background and experience with Python/R and SQL required.",
  }
];

const Careers = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-dark py-24 lg:py-32 relative overflow-hidden">
        <FloatingParticles count={20} className="z-[1]" />
        
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-background to-background opacity-50" />
        
        <div className="container-page relative z-[2] text-center">
            <ScrollAnimate>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Build the Future With Us
              </h1>
            </ScrollAnimate>
            <ScrollAnimate delay={0.1}>
              <p className="text-xl text-dark-foreground/70 max-w-2xl mx-auto mb-10">
                Join a team of passionate innovators dedicated to solving the world's toughest challenges through technology.
              </p>
            </ScrollAnimate>
            <ScrollAnimate delay={0.2}>
              <Button variant="accent" size="xl" onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}>
                View Open Roles
              </Button>
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

      {/* Access Positions */}
      <section id="positions" className="section-neutral py-20 lg:py-28">
        <div className="container-page">
          <ScrollAnimate>
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">Open Positions</h2>
          </ScrollAnimate>
          
          <ScrollAnimateStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.05}>
            {jobs.map((job) => (
              <ScrollAnimateItem key={job.title}>
                <div className="group bg-background rounded-xl p-6 border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Header */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground mb-3">
                      {job.department}
                    </span>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {job.title}
                    </h3>
                  </div>
                  
                  {/* Details */}
                  <div className="flex flex-col gap-2 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>{job.type}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/80 text-sm mb-6 flex-grow">
                    {job.description}
                  </p>
                  
                  {/* Action */}
                  <Button variant="outline" className="w-full group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300" asChild>
                    <a 
                      href={`https://wa.me/919742182343?text=${encodeURIComponent(`Hi, I am interested in the ${job.title} role at OpenAlgon. Can you please provide more details?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                        Apply via WhatsApp
                    </a>
                  </Button>
                </div>
              </ScrollAnimateItem>
            ))}
          </ScrollAnimateStagger>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
