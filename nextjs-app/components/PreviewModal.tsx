'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Template } from '@/data/templates';
import TemplateWrapper from './TemplateWrapper';

interface PreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

const THEME_COLORS = [
  { color: '#6764f2', label: 'Primary' },
  { color: '#10b981', label: 'Green' },
  { color: '#3b82f6', label: 'Blue' },
  { color: '#8b5cf6', label: 'Purple' },
  { color: '#f59e0b', label: 'Amber' },
  { color: '#ef4444', label: 'Red' },
  { color: '#06b6d4', label: 'Cyan' },
  { color: '#111118', label: 'Dark' },
];

// Preview scale for the resume in modal
const PREVIEW_SCALE_X = 0.909244;
const PREVIEW_SCALE_Y = 0.832542;

export default function PreviewModal({
  template,
  isOpen,
  onClose,
}: PreviewModalProps) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(THEME_COLORS[0].color);
  const [zoom, setZoom] = useState(85);
  const [layoutOptions, setLayoutOptions] = useState({
    profilePhoto: true,
    modernHeader: false,
    compactMargins: true,
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
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

  const toggleLayoutOption = (key: keyof typeof layoutOptions) => {
    setLayoutOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-6"
      style={{ backdropFilter: 'blur(8px)' }}
      onClick={handleOverlayClick}
    >
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

        {/* Left: Preview Side (65%) */}
        <div className="w-[65%] h-full bg-[#f8f9fa] border-r border-gray-100 relative flex flex-col">
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
                scaleX={PREVIEW_SCALE_X}
                scaleY={PREVIEW_SCALE_Y}
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

        {/* Right: Customization Panel (35%) */}
        <div className="w-[35%] h-full flex flex-col p-8 overflow-y-auto custom-scrollbar">
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
            <div className="grid grid-cols-4 gap-4">
              {THEME_COLORS.map((theme) => (
                <button
                  key={theme.color}
                  onClick={() => setSelectedColor(theme.color)}
                  className={`size-10 rounded-full shadow-sm border border-black/5 flex items-center justify-center transition-transform ${
                    selectedColor !== theme.color ? 'hover:scale-110' : ''
                  }`}
                  style={{
                    backgroundColor: theme.color,
                    ...(selectedColor === theme.color
                      ? {
                          boxShadow: `0 0 0 2px white, 0 0 0 4px ${theme.color}`,
                        }
                      : {}),
                  }}
                  title={theme.label}
                >
                  {selectedColor === theme.color && (
                    <span className="material-symbols-outlined text-white text-lg">
                      check
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Layout Options */}
          <div className="mb-auto">
            <h3 className="text-xs font-bold text-[#111118] uppercase tracking-widest mb-4">
              Layout Options
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={layoutOptions.profilePhoto}
                  onChange={() => toggleLayoutOption('profilePhoto')}
                  className="rounded text-primary focus:ring-primary h-4 w-4 border-gray-300"
                />
                <span className="text-sm text-gray-700 font-medium">
                  Include profile photo
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={layoutOptions.modernHeader}
                  onChange={() => toggleLayoutOption('modernHeader')}
                  className="rounded text-primary focus:ring-primary h-4 w-4 border-gray-300"
                />
                <span className="text-sm text-gray-700 font-medium">
                  Modern header style
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={layoutOptions.compactMargins}
                  onChange={() => toggleLayoutOption('compactMargins')}
                  className="rounded text-primary focus:ring-primary h-4 w-4 border-gray-300"
                />
                <span className="text-sm text-gray-700 font-medium">
                  Compact margins
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-3">
            <button
              onClick={() => router.push(`/builder?template=${template.skinName}`)}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Continue with This Template</span>
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
