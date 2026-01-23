'use client';

import { useEffect, useState } from 'react';
import styles from './TemplateWrapper.module.css';

interface TemplateWrapperProps {
  templateName: string;
  scaleX: number;
  scaleY: number;
  showBorder?: boolean;
}

export default function TemplateWrapper({
  templateName,
  scaleX,
  scaleY,
  showBorder = true
}: TemplateWrapperProps) {
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch(`/templates/${templateName}.html`);
        if (response.ok) {
          const html = await response.text();
          setHtmlContent(html);
        }
      } catch (error) {
        console.error(`Failed to load template ${templateName}:`, error);
      }
    };

    fetchTemplate();
  }, [templateName]);

  // Calculate container dimensions based on A4 size (595px x 842px) and scale
  const containerWidth = 595 * scaleX;
  const containerHeight = 842 * scaleY;

  return (
    <div
      className={`${styles.wrapper} ${showBorder ? styles.withBorder : ''}`}
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
      }}
    >
      <div
        className={styles.content}
        style={{
          transform: `scale(${scaleX}, ${scaleY})`,
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
