'use client';

import { useEffect, useCallback } from 'react';
import { Template } from '@/data/templates';
import { ColorGroup, ColorOption } from '@/data/colors';
import ColorPalette from './ColorPalette';
import TemplateWrapper from './TemplateWrapper';
import styles from './PreviewModal.module.css';

interface PreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  colors: ColorGroup[];
  selectedColor: ColorOption;
  onColorSelect: (color: ColorOption) => void;
}

// Preview scale
const PREVIEW_SCALE_X = 0.909244;
const PREVIEW_SCALE_Y = 0.832542;

export default function PreviewModal({
  template,
  isOpen,
  onClose,
  colors,
  selectedColor,
  onColorSelect,
}: PreviewModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !template) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleUseTemplate = () => {
    alert(`Template "${template.displayName}" selected!`);
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className={styles.modalContent}>
          {/* Left side - CV Preview */}
          <div className={styles.modalLeft}>
            <div className={styles.previewContainer}>
              <TemplateWrapper
                templateName={template.skinName}
                scaleX={PREVIEW_SCALE_X}
                scaleY={PREVIEW_SCALE_Y}
                showBorder={true}
              />
            </div>
          </div>

          {/* Right side - Controls */}
          <div className={styles.modalRight}>
            <div className={styles.modalHead}>
              <h2 className={styles.modalHeadText}>{template.displayName}</h2>
            </div>

            <ColorPalette
              colors={colors}
              selectedColor={selectedColor}
              onColorSelect={onColorSelect}
            />

            <button className={styles.btnUseTemplate} onClick={handleUseTemplate}>
              Choose this template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
