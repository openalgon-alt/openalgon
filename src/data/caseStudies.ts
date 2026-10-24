import heroAbstract from "@/assets/hero-abstract.png";
import heroCompany from "@/assets/hero-company.png";
import heroIndustries from "@/assets/hero-industries.png";
import heroPricing from "@/assets/hero-pricing.png";
import heroResources from "@/assets/hero-resources.png";
import heroServices from "@/assets/hero-services.png";

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
  evidenceNote?: string;
  image: string;
  isPlaceholder: boolean;
  context?: string;
  implementation?: string;
  architecture?: string;
  learnings?: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "field-flow-erp",
    title: "Field Flow ERP",
    category: "ERP & POS",
    industry: "Agriculture and retail",
    summary:
      "A multi-tenant ERP and POS platform for agricultural businesses, seed and fertilizer distributors, agrochemical outlets, and retail or wholesale teams.",
    challenge:
      "Agricultural retailers need one operational view across fast billing, batches and expiry dates, stock movement, credit ledgers, suppliers, and tax reporting.",
    solution:
      "Field Flow brings multi-tenant shop management, barcode-ready POS billing, inventory alerts, customer and supplier ledgers, purchase orders, returns, GST reporting, and cross-platform access into one system.",
    technologies: ["React 19", "TanStack Start", "PostgreSQL", "Drizzle ORM", "Cloudflare R2", "Tauri", "Capacitor"],
    image: heroServices,
    isPlaceholder: false,
    evidenceNote: "Feature and technology details are documented in the local Field Flow ERP README. Verified client outcomes are not published.",
    context:
      "The product is designed around the day-to-day operating model of agricultural retail and wholesale businesses.",
    implementation:
      "The documented implementation includes protected ERP modules for dashboard, billing, inventory, customers, suppliers, purchases, credit, and GST workflows.",
    architecture:
      "The documented stack uses TanStack Start with SSR, PostgreSQL on Neon, Drizzle ORM, Upstash Redis, Cloudflare R2, Resend, Tauri, Capacitor, and Playwright.",
  },
  {
    slug: "openalgon-crm",
    title: "OpenAlgon CRM",
    category: "CRM & AI automation",
    industry: "Sales operations",
    summary:
      "An AI-powered CRM platform that centralises lead capture, automates distribution, and gives teams a shared view of sales activity and performance.",
    challenge:
      "The project documentation identifies lost leads, uneven assignment, limited accountability, and poor reporting as core sales-operations problems.",
    solution:
      "The platform supports multi-channel lead capture, configurable assignment, lifecycle tracking, CRM records, audit trails, semantic search, AI enrichment, and performance dashboards.",
    technologies: ["Next.js 16", "React 19", "PostgreSQL", "Prisma", "Better Auth", "Capacitor", "Tauri", "Inngest"],
    image: heroCompany,
    isPlaceholder: false,
    evidenceNote: "Capabilities and architecture are documented in the local OpenAlgon CRM README. Verified client outcomes are not published.",
  },
  {
    slug: "odie-document-intelligence",
    title: "ODIE Document Intelligence Engine",
    category: "AI & document processing",
    industry: "Knowledge workflows",
    summary:
      "A document-processing workflow that extracts, analyses, improves, and exports PDF and DOCX files through one guided interface.",
    challenge:
      "Document-heavy work can require extraction, similarity checks, analysis, rewriting, and export while preserving the original document’s formatting.",
    solution:
      "ODIE presents a staged pipeline for extraction, similarity, AI analysis, rewriting, and merge/export, with optimized DOCX, PDF, and comprehensive report downloads.",
    technologies: ["FastAPI", "PyMuPDF", "python-docx", "Qdrant", "Sentence Transformers", "Gemini", "Pytesseract"],
    image: heroAbstract,
    isPlaceholder: false,
    evidenceNote: "The local ODIE interface documents PDF/DOCX processing and output flows. No validated processing or business metrics are published.",
    implementation:
      "The interface supports documents up to the documented 200MB limit and exposes progress through extraction, similarity, AI analysis, rewrite, and merge stages.",
    architecture:
      "The local requirements identify a Python/FastAPI service with document parsing, vector similarity, OCR, NLP, and generative-AI components.",
  },
  {
    slug: "abhyas-nepal",
    title: "Abhyas Nepal",
    category: "Education technology",
    industry: "Medical entrance preparation",
    summary:
      "A CEE preparation platform combining model exams, chapter practice, persistent attempts, progress analytics, leaderboards, and admin content workflows.",
    challenge:
      "CEE learners need structured practice, timed exam conditions, reliable score and accuracy tracking, answer review, and a way to measure progress over time.",
    solution:
      "Abhyas provides subject-based MCQs, timed exams, persistent attempts, answer review, progress dashboards, All-Nepal leaderboards, OTP authentication, and offline-friendly practice fallbacks.",
    technologies: ["React", "TypeScript", "TanStack Start", "Tailwind CSS", "Supabase", "Vitest", "KaTeX"],
    image: heroIndustries,
    isPlaceholder: false,
    evidenceNote: "Features and architecture are documented in the local Abhyas Nepal README. Student growth or outcome metrics are not published.",
  },
  {
    slug: "rankprediction",
    title: "RankPrediction",
    category: "Data products",
    industry: "Higher-education counselling",
    summary:
      "A student-focused counselling intelligence platform for KCET and COMEDK aspirants.",
    challenge:
      "Students comparing admission options need rank-based guidance, cutoff context, college discovery, round tracking, and counselling support in one place.",
    solution:
      "RankPrediction combines a rank predictor, cutoff explorer, college finder, round tracker, counselling guide, AI counsellor, enquiry workflows, and moderation tools.",
    technologies: ["React", "TypeScript", "Vite", "Supabase", "Firebase", "Vercel Functions", "Recharts"],
    image: heroPricing,
    isPlaceholder: false,
    evidenceNote: "The product scope and stack are documented in the local RankPrediction README. Verified admission or conversion outcomes are not published.",
  },
  {
    slug: "agriarchives",
    title: "AgriArchives",
    category: "Publishing platform",
    industry: "Agriculture research",
    summary:
      "A full-stack digital hub for publishing, discovering, and archiving an international monthly agriculture e-magazine.",
    challenge:
      "Readers, authors, and editors need a dependable way to browse current and past issues, search content, manage submissions, and administer publishing data.",
    solution:
      "AgriArchives combines issue archives, an issue viewer, editorial board profiles, submission guidelines, membership and shop areas, full-text search, and an authenticated admin panel.",
    technologies: ["React 18", "TypeScript", "Vite", "Supabase", "Tailwind CSS", "shadcn/ui"],
    image: heroResources,
    isPlaceholder: false,
    evidenceNote: "The product capabilities are documented in the local AgriArchives README and the project identifies agriarchives.in. No business performance metrics are published.",
  },
  {
    slug: "krushikuta",
    title: "Krushikuta",
    category: "Education & consulting",
    industry: "Agriculture and veterinary",
    summary:
      "A platform for agriculture and veterinary aspirants that combines exam coaching, admission guidance, and agricultural consulting services.",
    challenge:
      "Students and agri-entrepreneurs need access to exam preparation, admission support, project-report guidance, and practical agricultural consulting in one place.",
    solution:
      "Krushikuta brings together practical exam coaching, AO/AAO and ICAR preparation, VCI and K-CET guidance, bank-ready DPR support, and agri-investment consulting.",
    technologies: ["React 19", "TanStack Router", "Supabase", "Tailwind CSS", "shadcn/ui", "Vite"],
    image: heroIndustries,
    isPlaceholder: false,
    evidenceNote: "The scope and live demo link are documented in the local Krushikuta README. Verified learner or consulting outcomes are not published.",
  },
  {
    slug: "shree-udupi-aramane",
    title: "Shree Udupi Aramane",
    category: "Commerce & operations",
    industry: "Restaurant technology",
    summary:
      "An online ordering platform and unified operations suite connecting a restaurant storefront with administration, kitchen, and delivery workflows.",
    challenge:
      "Restaurant teams need customer ordering, kitchen coordination, delivery handoffs, payment flows, and operational visibility to stay in sync in real time.",
    solution:
      "The system documents customer ordering and live tracking, admin operations, menu management, kitchen tickets, delivery queues, COD and UPI handover, and role-authorized order progression.",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Express", "Prisma", "Socket.IO", "BullMQ", "Upstash Redis"],
    image: heroServices,
    isPlaceholder: false,
    evidenceNote: "The local Shree Udupi Aramane README documents the four operational portals and order workflow. Restaurant performance metrics are not published.",
    implementation:
      "The documented order state machine moves orders through placed, accepted, preparing, ready, assigned, picked up, out for delivery, and delivered states.",
  },
  {
    slug: "skyward-properties-crm",
    title: "Skyward Properties CRM",
    category: "CRM & workflow",
    industry: "Real estate",
    summary:
      "An internal CRM for managing property leads, inventory, follow-ups, team access, and reporting.",
    challenge:
      "Property teams need a shared workspace to manage leads, match prospects to inventory, schedule follow-ups, and maintain visibility across sales activity.",
    solution:
      "The documented CRM includes Kanban and table lead views, property image storage, lead-to-property matching, follow-up scheduling, real-time sync, role-based access, reports, activity logs, and notifications.",
    technologies: ["TanStack Start", "React", "TypeScript", "Supabase", "Tailwind CSS", "Recharts"],
    image: heroCompany,
    isPlaceholder: false,
    evidenceNote: "The scope and stack are documented in the local Skyward Properties CRM README. Verified sales outcomes are not published.",
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((caseStudy) => caseStudy.slug === slug);
