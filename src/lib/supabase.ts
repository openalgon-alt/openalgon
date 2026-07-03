import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[OpenAlgon] Supabase env vars missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export type ContactSubmission = {
  id?: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  created_at?: string;
};

export type InternshipPosition = {
  id?: string;
  title: string;
  department: string;
  location: string;
  duration: string;
  type: string;
  description: string;
  is_active: boolean;
  created_at?: string;
};

export type JobPosition = {
  id?: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  is_active: boolean;
  created_at?: string;
};

export type InternshipApplication = {
  id?: string;
  position_id: string;
  position_title: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  resume_url?: string;
  resume_link?: string;
  cover_note?: string;
  application_data?: any; // JSONB storage for complex extended form fields
  created_at?: string;
};

/**
 * Uploads a resume file to the 'resumes' Supabase Storage bucket.
 * Returns the public URL of the uploaded file, or null on failure.
 */
export async function uploadResume(file: File): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const fileName = `resume_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage
    .from('resumes')
    .upload(fileName, file, { cacheControl: '3600', upsert: false });
  if (error) {
    console.error('[OpenAlgon] Resume upload failed:', error);
    return null;
  }
  const { data } = supabase.storage.from('resumes').getPublicUrl(fileName);
  return data.publicUrl ?? null;
}
