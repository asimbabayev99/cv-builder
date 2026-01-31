'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Template } from '@/data/templates';
import TemplateWrapper from './TemplateWrapper';

interface PreviewModalProps {
  template: Template | null;
  templates: Template[];
  isOpen: boolean;
  onClose: () => void;
  onChangeTemplate: (template: Template) => void;
}

interface ColorItem {
  color: string;
  label: string;
  mainIndex: string | null;
  itemId: string;
}

const ALL_COLORS: ColorItem[] = [
  { color: "#929496", label: "Aluminium", mainIndex: "0", itemId: "main-0" },
  { color: "#AE9B93", label: "Cedrus", mainIndex: null, itemId: "sub-0-0" },
  { color: "#C4B08F", label: "Camel", mainIndex: null, itemId: "sub-0-1" },
  { color: "#944150", label: "Bordeaux", mainIndex: "1", itemId: "main-1" },
  { color: "#B41C2E", label: "Cardinal", mainIndex: null, itemId: "sub-1-0" },
  { color: "#CF142B", label: "Fire Engine", mainIndex: null, itemId: "sub-1-1" },
  { color: "#B9481F", label: "Terracotta", mainIndex: "2", itemId: "main-2" },
  { color: "#C9652D", label: "Nasturtium", mainIndex: null, itemId: "sub-2-0" },
  { color: "#C97375", label: "Ambrose", mainIndex: null, itemId: "sub-2-1" },
  { color: "#C28E56", label: "Ochre", mainIndex: "3", itemId: "main-3" },
  { color: "#E8A509", label: "Luteum", mainIndex: null, itemId: "sub-3-0" },
  { color: "#F2C000", label: "Tuscan Sun", mainIndex: null, itemId: "sub-3-1" },
  { color: "#166C60", label: "Castleton", mainIndex: "4", itemId: "main-4" },
  { color: "#008E6E", label: "Persian Green", mainIndex: null, itemId: "sub-4-0" },
  { color: "#56B239", label: "Shamrock", mainIndex: null, itemId: "sub-4-1" },
  { color: "#496267", label: "Smalt Blue", mainIndex: "5", itemId: "main-5" },
  { color: "#027D89", label: "Ocean", mainIndex: null, itemId: "sub-5-0" },
  { color: "#00B0C5", label: "Central Coast", mainIndex: null, itemId: "sub-5-1" },
  { color: "#102A73", label: "Ink Blue", mainIndex: "6", itemId: "main-6" },
  { color: "#0069A5", label: "Cobalt", mainIndex: null, itemId: "sub-6-0" },
  { color: "#009CCC", label: "Azure", mainIndex: null, itemId: "sub-6-1" },
  { color: "#4A4A4A", label: "Lead", mainIndex: "7", itemId: "main-7" },
  { color: "#2A5978", label: "Blumine", mainIndex: null, itemId: "sub-7-0" },
  { color: "#576C7C", label: "Slate", mainIndex: null, itemId: "sub-7-1" },
];

// Group into main + sub-colors
const COLOR_GROUPS = ALL_COLORS.reduce<{ main: ColorItem; subs: ColorItem[] }[]>((acc, item) => {
  if (item.mainIndex !== null) {
    acc.push({ main: item, subs: [] });
  } else {
    acc[acc.length - 1].subs.push(item);
  }
  return acc;
}, []);

export default function PreviewModal({
  template,
  templates,
  isOpen,
  onClose,
  onChangeTemplate,
}: PreviewModalProps) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(COLOR_GROUPS[0].main.color);
  const [zoom, setZoom] = useState(85);

  const currentIndex = template ? templates.findIndex(t => t.skinName === template.skinName) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < templates.length - 1;

  const goToPrev = useCallback(() => {
    if (hasPrev) onChangeTemplate(templates[currentIndex - 1]);
  }, [hasPrev, currentIndex, templates, onChangeTemplate]);

  const goToNext = useCallback(() => {
    if (hasNext) onChangeTemplate(templates[currentIndex + 1]);
  }, [hasNext, currentIndex, templates, onChangeTemplate]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    },
    [onClose, goToPrev, goToNext]
  );

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

  const handleZoomIn = () => setZoom((z) => Math.min(z + 10, 150));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 10, 50));

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-6"
      style={{ backdropFilter: 'blur(8px)' }}
      onClick={handleOverlayClick}
    >
      {/* Prev Button */}
      {hasPrev && (
        <button
          onClick={goToPrev}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-[70] w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
          aria-label="Previous template"
        >
          <span className="material-symbols-outlined text-[#626189] text-2xl leading-none">chevron_left</span>
        </button>
      )}

      {/* Next Button */}
      {hasNext && (
        <button
          onClick={goToNext}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-[70] w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
          aria-label="Next template"
        >
          <span className="material-symbols-outlined text-[#626189] text-2xl leading-none">chevron_right</span>
        </button>
      )}

      {/* Modal Container */}
      <div className="bg-white w-full max-w-6xl h-full max-h-[850px] rounded-xl shadow-2xl flex overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[#626189]">close</span>
        </button>

        {/* Left: Preview Side (55%) */}
        <div className="w-[60%] h-full bg-[#f8f9fa] border-r border-gray-100 relative flex flex-col">
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
            {/* Resume Paper */}
            <div
              className="bg-white mx-auto w-full max-w-[550px] shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
              style={{
                aspectRatio: '1 / 1.414',
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
              }}
            >
              <TemplateWrapper
                templateName={template.skinName}
                showBorder={false}
              />
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-lg">
            <button
              onClick={handleZoomOut}
              className="material-symbols-outlined text-gray-400 hover:text-primary transition-colors"
            >
              remove_circle_outline
            </button>
            <span className="text-sm font-semibold text-[#626189] min-w-[40px] text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              className="material-symbols-outlined text-gray-400 hover:text-primary transition-colors"
            >
              add_circle_outline
            </button>
          </div>
        </div>

        {/* Right: Customization Panel (45%) */}
        <div className="w-[40%] h-full flex flex-col p-8 overflow-y-auto custom-scrollbar">
          {/* Header Info */}
          <div className="mb-10">
            <h2 className="text-[#111118] text-2xl font-bold mb-2">
              {template.displayName}
            </h2>
            <p className="text-[#626189] text-sm leading-relaxed">
              A high-impact template designed for senior leadership roles, highlighting strategic achievements and core competencies.
            </p>
          </div>

          {/* Theme Selection */}
          <div className="mb-10">
            <h3 className="text-xs font-bold text-[#111118] uppercase tracking-widest mb-4">
              Choose your theme color
            </h3>
            <div className="flex gap-3">
              {/* No color option */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setSelectedColor('')}
                  className={`size-8 rounded-full border border-gray-300 flex items-center justify-center transition-transform ${
                    selectedColor !== '' ? 'hover:scale-110' : ''
                  } bg-white`}
                  style={{
                    ...(selectedColor === ''
                      ? { boxShadow: '0 0 0 2px white, 0 0 0 3px #999' }
                      : {}),
                  }}
                  title="No color"
                >
                  {selectedColor === '' ? (
                    <span className="material-symbols-outlined text-gray-500 text-sm leading-none">check</span>
                  ) : (
                    <span className="material-symbols-outlined text-gray-400 text-sm leading-none">block</span>
                  )}
                </button>
              </div>
              {COLOR_GROUPS.map((group) => (
                <div key={group.main.itemId} className="flex flex-col items-center gap-2">
                  {[group.main, ...group.subs].map((item) => {
                    const isSelected = selectedColor === item.color;
                    return (
                      <button
                        key={item.itemId}
                        onClick={() => setSelectedColor(item.color)}
                        className={`size-8 rounded-full border border-black/5 flex items-center justify-center transition-transform ${
                          !isSelected ? 'hover:scale-110' : ''
                        }`}
                        style={{
                          backgroundColor: item.color,
                          ...(isSelected
                            ? { boxShadow: `0 0 0 2px white, 0 0 0 3px ${item.color}` }
                            : {}),
                        }}
                        title={item.label}
                      >
                        {isSelected && (
                          <span className="material-symbols-outlined text-white text-sm leading-none">check</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-auto" />

          {/* Actions */}
          <div className="mt-8 space-y-3">
            <button
              onClick={() => router.push(`/builder?template=${template.skinName}`)}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Use Template</span>
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </button>
            <button
              onClick={onClose}
              className="w-full bg-transparent border border-gray-200 hover:bg-gray-50 text-[#626189] font-semibold py-4 rounded-lg transition-colors"
            >
              Back to Templates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
