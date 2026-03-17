'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { useSession } from 'next-auth/react';
import * as api from '@/lib/api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ResumeData {
  id: number;
  uid: string;
  title: string;
  template_name?: string | null;
  color_hex?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  professional_title?: string | null;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  city?: string | null;
  summary?: string | null;
  photo_url?: string | null;
  completion: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  educations: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  experiences: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  skills: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  languages: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  certificates: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  custom_sections: any[];
}

interface ResumeContextValue {
  resumeId: number | null;
  resume: ResumeData | null;
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveSection: (section: string, data: any) => Promise<void>;
  loadResume: (id: number) => Promise<void>;
  createResume: (title: string, templateName?: string) => Promise<number>;
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
}

function getToken(session: ReturnType<typeof useSession>['data']): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (session as any)?.accessToken ?? '';
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [resumeId, setResumeId] = useState<number | null>(null);
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(false);

  const loadResume = useCallback(
    async (id: number) => {
      const token = getToken(session);
      if (!token) return;
      setLoading(true);
      try {
        const data = await api.getResume(token, id);
        setResume(data);
        setResumeId(id);
      } finally {
        setLoading(false);
      }
    },
    [session],
  );

  const createResumeCtx = useCallback(
    async (title: string, templateName?: string): Promise<number> => {
      const token = getToken(session);
      if (!token) throw new Error('Not authenticated');
      setLoading(true);
      try {
        const data = await api.createResume(token, title, templateName);
        // If template was provided, save it immediately
        if (templateName) {
          await api.saveTemplate(token, data.id, { template_name: templateName });
          // Reload to get fresh data with template
          const fresh = await api.getResume(token, data.id);
          setResume(fresh);
          setResumeId(fresh.id);
          return fresh.id;
        }
        setResume(data);
        setResumeId(data.id);
        return data.id;
      } finally {
        setLoading(false);
      }
    },
    [session],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveSection = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (section: string, data: any) => {
      const token = getToken(session);
      if (!token || !resumeId) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const saveFns: Record<string, (t: string, id: number, d: any) => Promise<any>> = {
        'personal-info': api.savePersonalInfo,
        education: api.saveEducation,
        experience: api.saveExperience,
        skills: api.saveSkills,
        languages: api.saveLanguages,
        certificates: api.saveCertificates,
        'custom-sections': api.saveCustomSections,
        template: api.saveTemplate,
      };

      const fn = saveFns[section];
      if (!fn) throw new Error(`Unknown section: ${section}`);

      await fn(token, resumeId, data);

      // Reload full resume to get fresh state
      const fresh = await api.getResume(token, resumeId);
      setResume(fresh);
    },
    [session, resumeId],
  );

  return (
    <ResumeContext.Provider
      value={{
        resumeId,
        resume,
        loading,
        saveSection,
        loadResume,
        createResume: createResumeCtx,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}
