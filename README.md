# OpenAlgon

![OpenAlgon](https://openalgon.com/og-image.png)

OpenAlgon is a global software and AI company building technology that transforms how businesses operate. We specialize in AI & Automation, Web & Mobile Apps, Product Engineering, Cloud & DevOps, and Cybersecurity solutions.

This repository contains the frontend source code for the official OpenAlgon website.

---

## ✨ Features

- **Modern UI/UX**: Built with React, Vite, and Tailwind CSS.
- **Premium Components**: Utilizes shadcn/ui and Framer Motion for smooth animations.
- **Turbo SEO**: 
  - Dynamic per-page metadata (Titles, Descriptions, Canonical links).
  - Open Graph & Twitter Card tags for social sharing.
  - JSON-LD Structured Data (Organization, LocalBusiness, WebSite, FAQ).
  - Auto-generated `sitemap.xml` and `robots.txt`.
- **Supabase Integration**: Forms (Contact & Enquire) are wired to a Supabase PostgreSQL database while simultaneously opening the user's mail client.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy the `.env.example` file to `.env` and fill in your Supabase credentials.
```bash
cp .env.example .env
```
Inside `.env`, you must provide:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` to view the app.

---

## 🗄️ Supabase Setup

To enable the Contact and Enquire forms, you must create the necessary tables in your Supabase project. Run the following SQL in your Supabase SQL Editor:

```sql
-- Create Contact Submissions Table
create table if not exists public.contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamptz default now() not null
);

-- Create Enquiries Table
create table if not exists public.enquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  service_interest text,
  message text not null,
  created_at timestamptz default now() not null
);

-- Enable Row Level Security (RLS)
alter table public.contact_submissions enable row level security;
alter table public.enquiries enable row level security;

-- Allow anonymous inserts (for the website forms)
create policy "Allow public inserts" on public.contact_submissions for insert with check (true);
create policy "Allow public inserts" on public.enquiries for insert with check (true);

-- Only authenticated users (admins) can read submissions
create policy "Allow authenticated reads" on public.contact_submissions for select using (auth.role() = 'authenticated');
create policy "Allow authenticated reads" on public.enquiries for select using (auth.role() = 'authenticated');
```

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend/Database**: [Supabase](https://supabase.com/)

---

## 🌐 Deployment (Hostinger / Apache)

This project includes a `public/.htaccess` file to ensure React Router works correctly on Apache servers (like Hostinger Shared Hosting) without throwing 404 errors on page refresh.

### To Deploy Manually:
1. Run the build command:
   ```bash
   npm run build
   ```
2. Compress the contents of the `dist/` folder into a `.zip` file.
3. Upload and extract the `.zip` file into your server's `public_html` directory via File Manager or FTP.

*(Note: For automated deployments, consider hosting the frontend on Vercel/Netlify and pointing your domain's DNS to it, or using GitHub Actions to deploy to Hostinger via FTP).*
