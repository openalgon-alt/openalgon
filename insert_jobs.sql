-- 1. Ensure the job_positions table exists
create table if not exists job_positions (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  department  text not null,
  location    text not null,
  type        text not null,
  description text not null,
  is_active   boolean not null default true,
  created_at  timestamptz default now()
);

-- 2. Ensure RLS is enabled and policies exist
alter table job_positions enable row level security;

drop policy if exists "Public can read active jobs" on job_positions;
drop policy if exists "Authenticated users can manage jobs" on job_positions;

create policy "Public can read active jobs"
  on job_positions for select using (is_active = true);

create policy "Authenticated users can manage jobs"
  on job_positions for all using (auth.role() = 'authenticated');

-- 3. Insert the 11 default job positions
INSERT INTO job_positions (title, department, location, type, description, is_active) VALUES
('AI Engineer', 'Engineering', 'Bangalore, India', 'Full-time', 'Design and implement state-of-the-art AI models to solve complex business problems. Experience with PyTorch/TensorFlow and LLMs required.', true),
('Machine Learning Specialist', 'Engineering', 'Remote / Bangalore', 'Full-time', 'Focus on optimizing ML pipelines and deploying scalable models in production environments. Strong background in MLOps is a plus.', true),
('Full Stack Developer', 'Product', 'Bangalore, India', 'Full-time', 'Build robust web applications using React, Node.js, and modern cloud infrastructure. You will own features from conception to deployment.', true),
('Backend Engineer', 'Engineering', 'Bangalore, India', 'Full-time', 'Architect high-performance APIs and microservices. Proficiency in Go, Python, or Rust, and experience with distributed systems is essential.', true),
('Frontend Developer', 'Product', 'Remote', 'Full-time', 'Create stunning, responsive user interfaces. Expert knowledge of React, TypeScript, and modern CSS/Tailwind practices is expected.', true),
('DevOps Engineer', 'Operations', 'Bangalore, India', 'Full-time', 'Manage our cloud infrastructure, CI/CD pipelines, and security protocols. AWS/Azure certification and Kubernetes experience preferred.', true),
('UI/UX Designer', 'Design', 'Bangalore, India', 'Full-time', 'Translate complex requirements into intuitive and beautiful designs. Portfolio demonstrating experience with Figma and user-centric design process required.', true),
('Content Creator', 'Marketing', 'Bangalore, India', 'Part-time / Full-time', 'Produce engaging video and written content for our digital channels. Storytelling skills and proficiency with editing software are key.', true),
('Social Media Content Creator', 'Marketing', 'Remote', 'Contract', 'Manage our social media presence, create viral content strategies, and engage with our community across LinkedIn and X (Twitter).', true),
('Product Manager', 'Product', 'Bangalore, India', 'Full-time', 'Lead the product vision and roadmap. You will work closely with engineering and design to deliver high-impact features.', true),
('Data Scientist', 'Analytics', 'Remote', 'Full-time', 'Analyze large datasets to derive actionable insights. Strong statistical background and experience with Python/R and SQL required.', true);
