'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '@/components/AppHeader';
import TemplateWrapper from '@/components/TemplateWrapper';
import PreviewModal from '@/components/PreviewModal';
import { TEMPLATES_DATA, Template } from '@/data/templates';

const CATEGORIES = ['All', 'Minimal', 'Modern', 'Creative', 'Professional'] as const;


export default function TemplatesPage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [showAll, setShowAll] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredTemplates = TEMPLATES_DATA.filter((t) => {
    const matchesSearch = t.displayName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const displayedTemplates = showAll ? filteredTemplates : filteredTemplates.slice(0, 8);

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="bg-background-light font-display text-[#111118] min-h-screen">
      <AppHeader />

      <main className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Page Heading */}
        <div className="flex flex-col gap-3 mb-10 text-center md:text-left">
          <h1 className="text-[#111118] text-4xl font-black leading-tight tracking-[-0.033em]">
            Choose Your Resume Template
          </h1>
          <p className="text-[#616289] text-lg font-normal leading-normal">
            Select from {TEMPLATES_DATA.length} professional templates designed to get you hired faster.
          </p>
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-white p-4 rounded-xl border border-[#f0f0f4] shadow-sm mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search & Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-colors ${
                      activeFilter === cat
                        ? 'bg-primary/10 border border-primary/20'
                        : 'bg-[#f0f0f4] hover:bg-gray-200'
                    }`}
                  >
                    <span className={`text-sm font-medium ${activeFilter === cat ? 'text-primary' : 'text-[#111118]'}`}>
                      {cat}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Template Grid (4 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedTemplates.map((template) => (
            <div key={template.skinName} className="flex flex-col gap-3 group">
              <div className="relative overflow-hidden rounded-md bg-white shadow-md border border-gray-100 aspect-[1/1.414]">
                <div className="w-full h-full overflow-hidden">
                  <div className="transform group-hover:scale-105 transition-transform duration-500 origin-top-left">
                    <TemplateWrapper
                      templateName={template.skinName}
                      showBorder={false}
                    />
                  </div>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-3 p-6 transition-opacity">
                  <button
                    onClick={() => handlePreview(template)}
                    className="w-full bg-primary text-white font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-all shadow-lg"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => router.push(`/builder?template=${template.skinName}`)}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-2.5 rounded-lg hover:bg-white/20 transition-all"
                  >
                    Use Template
                  </button>
                </div>
              </div>
              <div>
                <p className="text-[#111118] text-base font-bold leading-normal">{template.displayName}</p>
                <p className="text-[#616289] text-sm font-normal">A4 &bull; {template.popular ? 'Popular' : 'All'} Category</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {!showAll && filteredTemplates.length > 8 && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 bg-white border border-gray-200 rounded-lg text-sm font-bold text-[#111118] hover:bg-gray-50 transition-colors shadow-sm"
            >
              View All {filteredTemplates.length} Templates
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#f0f0f4] mt-20 py-10 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 text-primary/60">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z" />
              </svg>
            </div>
            <span className="text-sm text-[#616289] font-medium">&copy; 2024 CVPro Builder. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-[#616289] hover:text-primary">Privacy Policy</a>
            <a href="#" className="text-sm text-[#616289] hover:text-primary">Terms of Service</a>
            <a href="#" className="text-sm text-[#616289] hover:text-primary">Contact Support</a>
          </div>
        </div>
      </footer>

      {/* Preview Modal */}
      <PreviewModal
        template={selectedTemplate}
        templates={filteredTemplates}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onChangeTemplate={setSelectedTemplate}
      />
    </div>
  );
}
