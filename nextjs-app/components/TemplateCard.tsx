'use client';

import { Template } from '@/data/templates';
import TemplateWrapper from './TemplateWrapper';
import styles from './TemplateCard.module.css';

interface TemplateCardProps {
  template: Template;
  onPreview: (template: Template) => void;
  animationDelay?: number;
}

export default function TemplateCard({ template, onPreview, animationDelay = 0 }: TemplateCardProps) {
  return (
    <div
      className={styles.cardWrap}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div
        className={styles.skinsCardContainer}
        onClick={() => onPreview(template)}
      >
        <div className={styles.card}>
          <div className={styles.templateThumbnail}>
            <TemplateWrapper
              templateName={template.skinName}
              showBorder={false}
            />
          </div>
          <div className={styles.previewOverlay}>
            <button
              className={styles.btnPreview}
              onClick={(e) => {
                e.stopPropagation();
                onPreview(template);
              }}
            >
              Preview template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
