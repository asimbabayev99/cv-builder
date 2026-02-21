'use client';

import { ResumeData, SupportedLanguage } from '@/types/resume';
import { getTranslations } from '@/lib/translations';
import { getTemplate, templateRegistry } from './index';

interface ResumeRendererProps {
  templateId: string;
  data: ResumeData;
  language?: SupportedLanguage;
  colorHex?: string;
}

export default function ResumeRenderer({
  templateId,
  data,
  language = 'en',
  colorHex,
}: ResumeRendererProps) {
  const Template = getTemplate(templateId);
  const translations = getTranslations(language);

  if (!Template) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        Template &quot;{templateId}&quot; not found.
        <br />
        Available templates: {Object.keys(templateRegistry).join(', ')}
      </div>
    );
  }

  return (
    <Template
      data={data}
      translations={translations}
      language={language}
      colorHex={colorHex}
    />
  );
}
