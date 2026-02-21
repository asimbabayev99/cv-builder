// Resume data types matching backend schema

export interface Education {
  id?: number;
  institution: string;
  degree?: string;
  field_of_study?: string;
  start_date?: string;
  end_date?: string;
  currently_studying?: boolean;
  description?: string;
  sort_order?: number;
}

export interface Experience {
  id?: number;
  job_title: string;
  company?: string;
  employment_type?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  currently_working?: boolean;
  description?: string;
  sort_order?: number;
}

export interface Skill {
  id?: number;
  name: string;
  category?: string;
  level?: number; // 1-5 for rating bars
  sort_order?: number;
}

export interface Language {
  id?: number;
  name: string;
  proficiency?: string;
  level?: number; // 1-5 for rating bars
  sort_order?: number;
}

export interface Certificate {
  id?: number;
  name: string;
  organization?: string;
  issue_date?: string;
  expiration_date?: string;
  no_expiry?: boolean;
  credential_link?: string;
  description?: string;
  sort_order?: number;
}

export interface CustomSection {
  id?: number;
  title: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  sort_order?: number;
}

export interface ResumeData {
  // Personal Information
  first_name?: string;
  last_name?: string;
  professional_title?: string;
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
  summary?: string;
  photo_url?: string;

  // Sections
  educations?: Education[];
  experiences?: Experience[];
  skills?: Skill[];
  languages?: Language[];
  certificates?: Certificate[];
  custom_sections?: CustomSection[];
}

// Translation types for multilingual support
export interface TemplateTranslations {
  // Section titles
  contact: string;
  skills: string;
  professional_summary: string;
  work_history: string;
  education: string;
  languages: string;
  certificates: string;

  // Common labels
  present: string;
  expected_in: string;

  // Proficiency levels
  native: string;
  fluent: string;
  advanced: string;
  intermediate: string;
  beginner: string;
}

// Supported languages
export type SupportedLanguage = 'en' | 'de' | 'fr' | 'es' | 'it' | 'pt' | 'ru' | 'ar' | 'zh' | 'ja' | 'ko' | 'az';

// Props for dynamic templates
export interface DynamicTemplateProps {
  data: ResumeData;
  translations: TemplateTranslations;
  language?: SupportedLanguage;
  colorHex?: string;
}
