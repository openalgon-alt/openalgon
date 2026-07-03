-- Add the JSONB column for detailed application data (Education, Skills, etc.)
ALTER TABLE internship_applications 
ADD COLUMN IF NOT EXISTS application_data JSONB DEFAULT '{}'::jsonb;
