import heroAbstract from "@/assets/hero-abstract.png";
import heroCompany from "@/assets/hero-company.png";
import heroIndustries from "@/assets/hero-industries.png";
import heroPricing from "@/assets/hero-pricing.png";
import heroResources from "@/assets/hero-resources.png";
import heroServices from "@/assets/hero-services.png";
import fieldFlowDashboard from "@/assets/case-studies/field-flow-dashboard.jpg";
import crmReports from "@/assets/case-studies/openalgon-crm-reports.png";
import agriArchivesIssue from "@/assets/case-studies/agriarchives-current-issue.jpg";
import krushikutaHero from "@/assets/case-studies/krushikuta-hero.jpg";

export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  industry: string;
  solutionType?: string;
  status?: "Live Product" | "Client Delivery" | "Internal Product" | "Prototype";
  headline?: string;
  summary: string;
  approach?: string;
  challenge: string;
  solution: string;
  technologies: string[];
  outcomes?: string[];
  evidenceNote?: string;
  evidence?: string[];
  screenshotNote?: string;
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
    solutionType: "Multi-tenant ERP and POS",
    headline: "Bringing billing, inventory, and agricultural retail operations into one system.",
    summary:
      "A multi-tenant ERP and POS platform for agricultural businesses, seed and fertilizer distributors, agrochemical outlets, and retail or wholesale teams.",
    challenge:
      "Agricultural retailers need one operational view across fast billing, batches and expiry dates, stock movement, credit ledgers, suppliers, and tax reporting.",
    solution:
      "Field Flow brings multi-tenant shop management, barcode-ready POS billing, inventory alerts, customer and supplier ledgers, purchase orders, returns, GST reporting, and cross-platform access into one system.",
    technologies: ["React 19", "TanStack Start", "PostgreSQL", "Drizzle ORM", "Cloudflare R2", "Tauri", "Capacitor"],
    approach:
      "The documented product scope prioritises workflows that operators use every day: fast billing, stock accuracy, credit tracking, purchasing, and compliance reporting.",
    image: fieldFlowDashboard,
    isPlaceholder: false,
    evidenceNote: "Feature and technology details are documented in the local Field Flow ERP README. Verified client outcomes are not published.",
    evidence: ["Working dashboard mockup is available in the project output.", "Billing, inventory, supplier, credit, purchase, returns, and GST modules are documented."],
    screenshotNote: "Use the dashboard mockup as the featured visual; add billing, inventory, and GST screens before publication if cleared for marketing.",
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
    solutionType: "AI-powered CRM platform",
    status: "Internal Product",
    headline: "Turning fragmented lead handling into a visible, accountable sales workflow.",
    summary:
      "An AI-powered CRM platform that centralises lead capture, automates distribution, and gives teams a shared view of sales activity and performance.",
    challenge:
      "The project documentation identifies lost leads, uneven assignment, limited accountability, and poor reporting as core sales-operations problems.",
    solution:
      "The platform supports multi-channel lead capture, configurable assignment, lifecycle tracking, CRM records, audit trails, semantic search, AI enrichment, and performance dashboards.",
    approach:
      "The product is organised around the operational failure points documented for the project: lost leads, uneven distribution, limited accountability, and weak reporting.",
    technologies: ["Next.js 16", "React 19", "PostgreSQL", "Prisma", "Better Auth", "Capacitor", "Tauri", "Inngest"],
    image: crmReports,
    isPlaceholder: false,
    evidenceNote: "Capabilities and architecture are documented in the local OpenAlgon CRM README. Verified client outcomes are not published.",
    evidence: ["The README documents multi-channel capture, assignment modes, lifecycle tracking, dashboards, and AI capabilities.", "A reports visual is available in the project assets."],
    screenshotNote: "Use the reports screen as the hero visual; add lead inbox, assignment rules, and lifecycle screens once reviewed for public release.",
  },
  {
    slug: "odie-document-intelligence",
    title: "ODIE Document Intelligence Engine",
    category: "AI & document processing",
    industry: "Knowledge workflows",
    solutionType: "Document intelligence workflow",
    headline: "Making document analysis and optimisation a guided, repeatable workflow.",
    summary:
      "A document-processing workflow that extracts, analyses, improves, and exports PDF and DOCX files through one guided interface.",
    challenge:
      "Document-heavy work can require extraction, similarity checks, analysis, rewriting, and export while preserving the original document’s formatting.",
    solution:
      "ODIE presents a staged pipeline for extraction, similarity, AI analysis, rewriting, and merge/export, with optimized DOCX, PDF, and comprehensive report downloads.",
    technologies: ["FastAPI", "PyMuPDF", "python-docx", "Qdrant", "Sentence Transformers", "Gemini", "Pytesseract"],
    approach:
      "The interface makes a multi-stage processing pipeline visible to the user, separating extraction, similarity, AI analysis, rewriting, and export rather than hiding the work behind one opaque action.",
    image: heroAbstract,
    isPlaceholder: false,
    evidenceNote: "The local ODIE interface documents PDF/DOCX processing and output flows. No validated processing or business metrics are published.",
    evidence: ["The interface documents PDF and DOCX upload, staged processing, and three downloadable output types.", "The local requirements verify the parsing, OCR, vector-search, NLP, and generative-AI components."],
    screenshotNote: "Capture the upload, processing pipeline, and completed-results states from the local interface before publication.",
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
    solutionType: "Exam preparation platform",
    headline: "Giving CEE learners a structured way to practise, measure progress, and prepare with confidence.",
    summary:
      "A CEE preparation platform combining model exams, chapter practice, persistent attempts, progress analytics, leaderboards, and admin content workflows.",
    challenge:
      "CEE learners need structured practice, timed exam conditions, reliable score and accuracy tracking, answer review, and a way to measure progress over time.",
    solution:
      "Abhyas provides subject-based MCQs, timed exams, persistent attempts, answer review, progress dashboards, All-Nepal leaderboards, OTP authentication, and offline-friendly practice fallbacks.",
    technologies: ["React", "TypeScript", "TanStack Start", "Tailwind CSS", "Supabase", "Vitest", "KaTeX"],
    approach:
      "The product combines exam realism with persistent progress: timed sessions, answer review, subject coverage, dashboards, and leaderboard views are treated as one learning loop.",
    image: heroIndustries,
    isPlaceholder: false,
    evidenceNote: "Features and architecture are documented in the local Abhyas Nepal README. Student growth or outcome metrics are not published.",
    evidence: ["The README documents timed exams, persistent attempts, scoring, analytics, leaderboards, authentication, and offline-friendly fallbacks."],
    screenshotNote: "Add cleared screenshots of the exam session, score review, progress dashboard, and leaderboard.",
  },
  {
    slug: "rankprediction",
    title: "RankPrediction",
    category: "Data products",
    industry: "Higher-education counselling",
    solutionType: "Counselling intelligence platform",
    status: "Live Product",
    headline: "Helping students turn rank and cutoff data into clearer admission decisions.",
    summary:
      "A student-focused counselling intelligence platform for KCET and COMEDK aspirants.",
    challenge:
      "Students comparing admission options need rank-based guidance, cutoff context, college discovery, round tracking, and counselling support in one place.",
    solution:
      "RankPrediction combines a rank predictor, cutoff explorer, college finder, round tracker, counselling guide, AI counsellor, enquiry workflows, and moderation tools.",
    technologies: ["React", "TypeScript", "Vite", "Supabase", "Firebase", "Vercel Functions", "Recharts"],
    approach:
      "The documented product brings prediction, exploration, comparison, and guidance into one journey instead of forcing students to assemble decisions across separate tools.",
    image: heroPricing,
    isPlaceholder: false,
    evidenceNote: "The product scope and stack are documented in the local RankPrediction README. Verified admission or conversion outcomes are not published.",
    evidence: ["The project README identifies a live product at rankprediction.com.", "The documented feature set includes predictor, cutoff explorer, college finder, round tracker, guide, and AI counsellor."],
    screenshotNote: "Use cleared screenshots of the predictor, cutoff explorer, college finder, and result views.",
  },
  {
    slug: "agriarchives",
    title: "AgriArchives",
    category: "Publishing platform",
    industry: "Agriculture research",
    solutionType: "Digital publishing and content platform",
    status: "Live Product",
    headline: "Making agricultural research easier to publish, discover, and archive.",
    summary:
      "A full-stack digital hub for publishing, discovering, and archiving an international monthly agriculture e-magazine.",
    challenge:
      "Readers, authors, and editors need a dependable way to browse current and past issues, search content, manage submissions, and administer publishing data.",
    solution:
      "AgriArchives combines issue archives, an issue viewer, editorial board profiles, submission guidelines, membership and shop areas, full-text search, and an authenticated admin panel.",
    technologies: ["React 18", "TypeScript", "Vite", "Supabase", "Tailwind CSS", "shadcn/ui"],
    approach:
      "The platform serves both public readers and administrators, pairing an editorial reading experience with authenticated management for issues, board members, and products.",
    image: agriArchivesIssue,
    isPlaceholder: false,
    evidenceNote: "The product capabilities are documented in the local AgriArchives README and the project identifies agriarchives.in. No business performance metrics are published.",
    evidence: ["The README identifies the live domain agriarchives.in.", "The documented public and admin features cover issue publishing, discovery, search, and content management."],
    screenshotNote: "Use the current issue cover as the hero visual; add the archive, issue viewer, and admin screens after a marketing-asset review.",
  },
  {
    slug: "krushikuta",
    title: "Krushikuta",
    category: "Education & consulting",
    industry: "Agriculture and veterinary",
    solutionType: "Education and consulting platform",
    status: "Live Product",
    headline: "Connecting agricultural and veterinary learners with preparation, guidance, and practical consulting.",
    summary:
      "A platform for agriculture and veterinary aspirants that combines exam coaching, admission guidance, and agricultural consulting services.",
    challenge:
      "Students and agri-entrepreneurs need access to exam preparation, admission support, project-report guidance, and practical agricultural consulting in one place.",
    solution:
      "Krushikuta brings together practical exam coaching, AO/AAO and ICAR preparation, VCI and K-CET guidance, bank-ready DPR support, and agri-investment consulting.",
    technologies: ["React 19", "TanStack Router", "Supabase", "Tailwind CSS", "shadcn/ui", "Vite"],
    approach:
      "The documented platform groups coaching, admissions, project-report support, and agri-investment guidance around the needs of students and agricultural entrepreneurs.",
    image: krushikutaHero,
    isPlaceholder: false,
    evidenceNote: "The scope and live demo link are documented in the local Krushikuta README. Verified learner or consulting outcomes are not published.",
    evidence: ["The README identifies a live demo at krushikuta.vercel.app.", "The documented services cover exam preparation, admission guidance, DPR consulting, and agri-investment support."],
    screenshotNote: "Use the agriculture hero visual; add cleared screenshots of coaching, admissions, and consulting flows.",
  },
  {
    slug: "shree-udupi-aramane",
    title: "Shree Udupi Aramane",
    category: "Commerce & operations",
    industry: "Restaurant technology",
    solutionType: "Online ordering and operations suite",
    headline: "Connecting restaurant orders, kitchen work, delivery, and payment handoffs in real time.",
    summary:
      "An online ordering platform and unified operations suite connecting a restaurant storefront with administration, kitchen, and delivery workflows.",
    challenge:
      "Restaurant teams need customer ordering, kitchen coordination, delivery handoffs, payment flows, and operational visibility to stay in sync in real time.",
    solution:
      "The system documents customer ordering and live tracking, admin operations, menu management, kitchen tickets, delivery queues, COD and UPI handover, and role-authorized order progression.",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Express", "Prisma", "Socket.IO", "BullMQ", "Upstash Redis"],
    approach:
      "The documented system treats the restaurant as one connected operation, with role-specific portals and a strict order state machine coordinating each handoff.",
    image: heroServices,
    isPlaceholder: false,
    evidenceNote: "The local Shree Udupi Aramane README documents the four operational portals and order workflow. Restaurant performance metrics are not published.",
    evidence: ["The README documents customer, admin, kitchen, and delivery portals.", "The documented order state machine and payment handoff flows demonstrate implemented operational functionality."],
    screenshotNote: "Capture cleared storefront, admin, kitchen display, delivery, and order-status screens before publication.",
    implementation:
      "The documented order state machine moves orders through placed, accepted, preparing, ready, assigned, picked up, out for delivery, and delivered states.",
  },
  {
    slug: "skyward-properties-crm",
    title: "Skyward Properties CRM",
    category: "CRM & workflow",
    industry: "Real estate",
    solutionType: "Internal sales CRM",
    status: "Internal Product",
    headline: "Giving property teams one place to manage leads, inventory, and follow-up.",
    summary:
      "An internal CRM for managing property leads, inventory, follow-ups, team access, and reporting.",
    challenge:
      "Property teams need a shared workspace to manage leads, match prospects to inventory, schedule follow-ups, and maintain visibility across sales activity.",
    solution:
      "The documented CRM includes Kanban and table lead views, property image storage, lead-to-property matching, follow-up scheduling, real-time sync, role-based access, reports, activity logs, and notifications.",
    technologies: ["TanStack Start", "React", "TypeScript", "Supabase", "Tailwind CSS", "Recharts"],
    approach:
      "The documented CRM connects lead management to property inventory, matching, follow-up, and reporting so sales teams can act from a shared operational view.",
    image: heroCompany,
    isPlaceholder: false,
    evidenceNote: "The scope and stack are documented in the local Skyward Properties CRM README. Verified sales outcomes are not published.",
    evidence: ["The README documents lead kanban and table views, property-to-lead matching, real-time sync, role access, reports, and activity logs."],
    screenshotNote: "Add cleared screenshots of the lead board, property inventory, matching view, and reporting dashboard.",
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((caseStudy) => caseStudy.slug === slug);
