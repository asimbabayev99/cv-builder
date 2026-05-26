'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSession } from 'next-auth/react';
import { useResume } from '@/contexts/ResumeContext';
import { getTranslations } from '@/lib/translations';
import { ResumeData, SupportedLanguage } from '@/types/resume';
import { downloadPdf, downloadDocx } from '@/lib/api';

// Import dynamic templates
import DynamicMli1 from './dynamic-templates/mli1';
import DynamicMli2 from './dynamic-templates/mli2';
import DynamicMli3 from './dynamic-templates/mli3';
import DynamicMli4 from './dynamic-templates/mli4';
import DynamicMli5 from './dynamic-templates/mli5';
import DynamicMli6 from './dynamic-templates/mli6';
import DynamicAta1 from './dynamic-templates/ata1';
import DynamicCba1 from './dynamic-templates/cba1';
import DynamicCba2 from './dynamic-templates/cba2';
import DynamicSma1 from './dynamic-templates/sma1';
import DynamicSma2 from './dynamic-templates/sma2';
import DynamicCna1 from './dynamic-templates/cna1';
import DynamicHra1 from './dynamic-templates/hra1';
import DynamicHra2 from './dynamic-templates/hra2';
import DynamicLca1 from './dynamic-templates/lca1';
import DynamicMca2 from './dynamic-templates/mca2';
import DynamicPca1 from './dynamic-templates/pca1';
import DynamicMla3 from './dynamic-templates/mla3';
import DynamicMta2 from './dynamic-templates/mta2';
import DynamicMls8 from './dynamic-templates/mls8';
import DynamicMls9 from './dynamic-templates/mls9';

const A4_WIDTH = 595;
const A4_HEIGHT = 842;

// Map template names to dynamic components
const DYNAMIC_TEMPLATES: Record<string, React.ComponentType<{
  data: ResumeData;
  translations: ReturnType<typeof getTranslations>;
  language?: SupportedLanguage;
  colorHex?: string;
}>> = {
  mli1: DynamicMli1,
  mli2: DynamicMli2,
  mli3: DynamicMli3,
  mli4: DynamicMli4,
  mli5: DynamicMli5,
  mli6: DynamicMli6,
  ata1: DynamicAta1,
  cba1: DynamicCba1,
  cba2: DynamicCba2,
  cna1: DynamicCna1,
  hra1: DynamicHra1,
  hra2: DynamicHra2,
  lca1: DynamicLca1,
  mca2: DynamicMca2,
  pca1: DynamicPca1,
  sma1: DynamicSma1,
  sma2: DynamicSma2,
  mla3: DynamicMla3,
  mta2: DynamicMta2,
  mls8: DynamicMls8,
  mls9: DynamicMls9,
};

// Default colors per template
const DEFAULT_COLORS: Record<string, string> = {
  mli1: '#496267',
  mli2: '#2a5978',
  mli3: '#009bcc',
  mli4: '#576d7b',
  mli5: '#2c5a77',
  mli6: '#0187de',
  ata1: '#000000',
  cba1: '#d76d76',
  cba2: '#000000',
  sma1: '#1A4771',
  sma2: '#bcbfc3',
  cna1: '#404041',
  hra1: '#000000',
  hra2: '#003300',
  lca1: '#fcc74a',
  mca2: '#000000',
  pca1: '#1A4771',
  mla3: '#DF7866',
  mta2: '#000000',
  mls8: '#9B3016',
  mls9: '#102A73',
};

interface BuilderPreviewProps {
  language?: SupportedLanguage;
}

export default function BuilderPreview({ language = 'en' }: BuilderPreviewProps) {
  const { data: session } = useSession();
  const { resume, resumeId, loading } = useResume();
  const [scale, setScale] = useState(0.6);
  const [downloading, setDownloading] = useState<'pdf' | 'docx' | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  // Get token from session
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const token = (session as any)?.accessToken ?? '';

  // Convert resume context data to template format
  const templateData: ResumeData = {
    first_name: resume?.first_name || undefined,
    last_name: resume?.last_name || undefined,
    professional_title: resume?.professional_title || undefined,
    email: resume?.email || undefined,
    phone: resume?.phone || undefined,
    country: resume?.country || undefined,
    city: resume?.city || undefined,
    summary: resume?.summary || undefined,
    photo_url: resume?.photo_url || undefined,
    educations: resume?.educations?.map(edu => ({
      id: edu.id,
      institution: edu.institution,
      degree: edu.degree,
      field_of_study: edu.field_of_study,
      start_date: edu.start_date,
      end_date: edu.end_date,
      currently_studying: edu.currently_studying,
      description: edu.description,
    })) || [],
    experiences: resume?.experiences?.map(exp => ({
      id: exp.id,
      job_title: exp.job_title,
      company: exp.company,
      employment_type: exp.employment_type,
      location: exp.location,
      start_date: exp.start_date,
      end_date: exp.end_date,
      currently_working: exp.currently_working,
      description: exp.description,
    })) || [],
    skills: resume?.skills?.map(skill => ({
      id: skill.id,
      name: skill.name,
      category: skill.category,
      level: 4, // Default level
    })) || [],
    languages: resume?.languages?.map(lang => ({
      id: lang.id,
      name: lang.name,
      proficiency: lang.proficiency,
      level: lang.proficiency === 'native' ? 5 :
             lang.proficiency === 'fluent' ? 4 :
             lang.proficiency === 'advanced' ? 3 :
             lang.proficiency === 'intermediate' ? 2 : 1,
    })) || [],
    certificates: resume?.certificates?.map(cert => ({
      id: cert.id,
      name: cert.name,
      organization: cert.organization,
      issue_date: cert.issue_date,
      expiration_date: cert.expiration_date,
      no_expiry: cert.no_expiry,
      credential_link: cert.credential_link,
      description: cert.description,
    })) || [],
  };

  const templateName = resume?.template_name || 'mli1';
  const colorHex = resume?.color_hex || DEFAULT_COLORS[templateName] || '#496267';
  const translations = getTranslations(language);

  const TemplateComponent = DYNAMIC_TEMPLATES[templateName];

  // Initialize shadow DOM for style isolation
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Check if shadow root already exists
    if (host.shadowRoot) {
      shadowRootRef.current = host.shadowRoot;
      const existingMount = host.shadowRoot.querySelector('div');
      if (existingMount) {
        mountRef.current = existingMount as HTMLDivElement;
        setReady(true);
        return;
      }
    }

    // Only attach if not already attached
    if (!shadowRootRef.current) {
      try {
        const shadow = host.attachShadow({ mode: 'open' });
        shadowRootRef.current = shadow;

        // Create mount point for React portal
        const mount = document.createElement('div');
        mount.style.width = `${A4_WIDTH}px`;
        mount.style.minHeight = `${A4_HEIGHT}px`;
        mount.style.transformOrigin = 'top left';
        mount.style.background = '#fff';
        shadow.appendChild(mount);
        mountRef.current = mount;

        setReady(true);
      } catch (e) {
        console.error('Failed to initialize shadow DOM:', e);
      }
    }
  }, [TemplateComponent]);

  // Update scale based on container width
  const updateScale = useCallback(() => {
    if (mountRef.current) {
      mountRef.current.style.transform = `scale(${scale})`;
    }
  }, [scale]);

  useEffect(() => {
    updateScale();
  }, [updateScale]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1.2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.3));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!token || !resumeId) return;
    setDownloading('pdf');
    try {
      await downloadPdf(token, resumeId);
    } catch (error) {
      console.error('Failed to download PDF:', error);
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadDocx = async () => {
    if (!token || !resumeId) return;
    setDownloading('docx');
    try {
      await downloadDocx(token, resumeId);
    } catch (error) {
      console.error('Failed to download DOCX:', error);
    } finally {
      setDownloading(null);
    }
  };

  // Check if there's any data to show
  const hasData = resume && (
    resume.first_name ||
    resume.last_name ||
    resume.professional_title ||
    resume.email ||
    resume.phone ||
    resume.country ||
    resume.city ||
    resume.summary ||
    resume.photo_url ||
    (resume.experiences && resume.experiences.length > 0) ||
    (resume.educations && resume.educations.length > 0) ||
    (resume.skills && resume.skills.length > 0) ||
    (resume.languages && resume.languages.length > 0) ||
    (resume.certificates && resume.certificates.length > 0)
  );

  return (
    <aside className="w-[450px] bg-[#f0f0f4] flex flex-col overflow-hidden border-l border-[#dbdbe6] shrink-0">
      {/* Zoom/Print Toolbar */}
      <div className="flex justify-center py-4 bg-[#f0f0f4] border-b border-[#dbdbe6]">
        <div className="flex gap-4 bg-white px-4 py-2 rounded-full shadow-sm border border-[#dbdbe6]">
          <button
            onClick={handleZoomIn}
            className="p-1 hover:text-primary transition-colors"
            title="Zoom In"
          >
            <span className="material-symbols-outlined text-lg">zoom_in</span>
          </button>
          <div className="w-[1px] h-4 bg-[#dbdbe6] my-auto" />
          <button
            onClick={handleZoomOut}
            className="p-1 hover:text-primary transition-colors"
            title="Zoom Out"
          >
            <span className="material-symbols-outlined text-lg">zoom_out</span>
          </button>
          <div className="w-[1px] h-4 bg-[#dbdbe6] my-auto" />
          <span className="text-xs text-[#616289] my-auto min-w-[40px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <div className="w-[1px] h-4 bg-[#dbdbe6] my-auto" />
          <button
            onClick={handlePrint}
            className="p-1 hover:text-primary transition-colors"
            title="Print"
          >
            <span className="material-symbols-outlined text-lg">print</span>
          </button>
          <div className="w-[1px] h-4 bg-[#dbdbe6] my-auto" />
          <button
            onClick={handleDownloadPdf}
            disabled={downloading === 'pdf' || !resumeId}
            className="p-1 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download PDF"
          >
            {downloading === 'pdf' ? (
              <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
            )}
          </button>
          <button
            onClick={handleDownloadDocx}
            disabled={downloading === 'docx' || !resumeId}
            className="p-1 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download Word"
          >
            {downloading === 'docx' ? (
              <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined text-lg">description</span>
            )}
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar flex justify-center py-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : !hasData ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <span className="material-symbols-outlined text-6xl text-[#dbdbe6] mb-4">description</span>
            <p className="text-[#616289] text-sm">
              Start filling in your information to see a live preview of your resume.
            </p>
          </div>
        ) : !TemplateComponent ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <span className="material-symbols-outlined text-6xl text-[#dbdbe6] mb-4">error</span>
            <p className="text-[#616289] text-sm">
              Template &quot;{templateName}&quot; not found. Please select a valid template.
            </p>
          </div>
        ) : (
          <div className="bg-white shadow-2xl rounded overflow-hidden">
            <div
              ref={hostRef}
              style={{
                width: `${A4_WIDTH * scale}px`,
                height: `${A4_HEIGHT * scale}px`,
                overflow: 'hidden',
              }}
            >
              {ready && mountRef.current && createPortal(
                <TemplateComponent
                  data={templateData}
                  translations={translations}
                  language={language}
                  colorHex={colorHex}
                />,
                mountRef.current
              )}
            </div>
          </div>
        )}
      </div>

      {/* Template Info Footer */}
      {resume?.template_name && (
        <div className="px-4 py-3 bg-white border-t border-[#dbdbe6] text-center">
          <p className="text-xs text-[#616289]">
            Template: <span className="font-semibold text-[#111118]">{resume.template_name.toUpperCase()}</span>
          </p>
        </div>
      )}
    </aside>
  );
}
