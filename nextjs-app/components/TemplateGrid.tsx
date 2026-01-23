'use client';

import { Template } from '@/data/templates';
import TemplateCard from './TemplateCard';
import styles from './TemplateGrid.module.css';

interface TemplateGridProps {
  templates: Template[];
  onPreview: (template: Template) => void;
}

export default function TemplateGrid({ templates, onPreview }: TemplateGridProps) {
  if (templates.length === 0) {
    return (
      <div className={styles.loading}>
        No templates available
      </div>
    );
  }

  return (
    <div className={styles.templatesGrid}>
      {templates.map((template, index) => (
        <TemplateCard
          key={template.skinName}
          template={template}
          onPreview={onPreview}
          animationDelay={index * 0.05}
        />
      ))}
    </div>
  );
}
