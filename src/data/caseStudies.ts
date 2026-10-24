import heroAbstract from "@/assets/hero-abstract.png";

export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  technologies: string[];
  outcomes?: string[];
  image: string;
  isPlaceholder: boolean;
  context?: string;
  implementation?: string;
  architecture?: string;
  learnings?: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "your-project-name",
    title: "Your next case study starts here",
    category: "Case study placeholder",
    industry: "Your industry",
    summary:
      "A structured space for the story behind a meaningful product, system, or transformation delivered with OpenAlgon.",
    challenge:
      "Add the business context, constraints, and operational challenge your team needed to solve.",
    solution:
      "Describe the software, AI, automation, or digital solution delivered and how it changed the workflow.",
    technologies: ["Technology 01", "Technology 02", "Technology 03"],
    outcomes: ["Add a verified outcome", "Add a measurable result"],
    image: heroAbstract,
    isPlaceholder: true,
    context:
      "Use this section to explain the organisation, market, and moment that made the project important.",
    implementation:
      "Use this section to outline the implementation approach, delivery phases, and important product decisions.",
    architecture:
      "Add a high-level architecture diagram or a concise explanation of the systems and integrations involved.",
    learnings: [
      "Capture a reusable insight from the engagement.",
      "Share what you would repeat or improve next time.",
    ],
  },
  {
    slug: "add-your-project-here",
    title: "Add your next proof of work",
    category: "Content placeholder",
    industry: "Industry category",
    summary:
      "Duplicate this entry when you are ready to document another project with evidence, screenshots, and outcomes.",
    challenge: "Replace this prompt with the specific business problem.",
    solution: "Replace this prompt with the solution your team delivered.",
    technologies: ["Add stack"],
    image: heroAbstract,
    isPlaceholder: true,
  },
  {
    slug: "document-a-project",
    title: "Document a project worth sharing",
    category: "Content placeholder",
    industry: "Industry category",
    summary:
      "Keep the story focused on the problem, the decisions made, and the measurable value created.",
    challenge: "Replace this prompt with the specific business problem.",
    solution: "Replace this prompt with the solution your team delivered.",
    technologies: ["Add stack"],
    image: heroAbstract,
    isPlaceholder: true,
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((caseStudy) => caseStudy.slug === slug);
