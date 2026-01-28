'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TemplateWrapper from '@/components/TemplateWrapper';
import PreviewModal from '@/components/PreviewModal';
import { TEMPLATES_DATA, Template } from '@/data/templates';

const CATEGORIES = ['All', 'Minimal', 'Modern', 'Creative', 'Professional'] as const;

function LogoIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.1288 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"
        fill="currentColor"
      />
      <path
        clipRule="evenodd"
        d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

// Scale for card thumbnails
const CARD_SCALE_X = 0.352941;
const CARD_SCALE_Y = 0.308642;

export default function TemplatesPage() {
  const router = useRouter();

  useEffect(() => {
    const link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.href = '/css/all.min.css';
    link1.id = 'template-css-1';

    const link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = '/css/main-1.0.0.380.css';
    link2.id = 'template-css-2';

    if (!document.getElementById('template-css-1')) {
      document.head.appendChild(link1);
    }
    if (!document.getElementById('template-css-2')) {
      document.head.appendChild(link2);
    }

    return () => {
      const css1 = document.getElementById('template-css-1');
      const css2 = document.getElementById('template-css-2');
      if (css1) css1.remove();
      if (css2) css2.remove();
    };
  }, []);

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
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f0f0f4] bg-white px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4 text-[#111118]">
          <div className="text-primary">
            <LogoIcon />
          </div>
          <Link href="/" className="text-xl font-bold leading-tight tracking-[-0.015em]">CVPro</Link>
        </div>
        <div className="flex flex-1 justify-end gap-8 items-center">
          <nav className="hidden md:flex items-center gap-9">
            <Link href="/templates" className="text-[#111118] text-sm font-medium leading-normal hover:text-primary transition-colors">
              Templates
            </Link>
            <a href="#" className="text-[#111118] text-sm font-medium leading-normal hover:text-primary transition-colors">
              My Resumes
            </a>
            <a href="#" className="text-[#111118] text-sm font-medium leading-normal hover:text-primary transition-colors">
              Pricing
            </a>
          </nav>
          <div className="flex gap-2">
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#f0f0f4] text-[#111118] text-sm font-bold">
              <span>Sign In</span>
            </button>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold">
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </header>

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
              <div className="relative w-full md:w-72">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">search</span>
                <input
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Search templates..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
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
                    {activeFilter === cat ? (
                      <span className="material-symbols-outlined text-primary text-lg">close</span>
                    ) : (
                      <span className="material-symbols-outlined text-gray-500 text-lg">expand_more</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            {/* Sort Options */}
            <div className="flex items-center gap-2 shrink-0">
              <button className="p-2 text-[#111118] hover:bg-gray-100 rounded-lg">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <button className="p-2 text-[#111118] hover:bg-gray-100 rounded-lg flex items-center gap-1 border border-gray-200 px-3">
                <span className="text-sm font-medium">Sort by: Popular</span>
                <span className="material-symbols-outlined text-lg">swap_vert</span>
              </button>
            </div>
          </div>
        </div>

        {/* Template Grid (4 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedTemplates.map((template) => (
            <div key={template.skinName} className="flex flex-col gap-3 group">
              <div className="relative overflow-hidden rounded-xl bg-white shadow-md border border-gray-100 aspect-[1/1.414]">
                <div className="w-full h-full overflow-hidden">
                  <div className="transform group-hover:scale-105 transition-transform duration-500 origin-top-left">
                    <TemplateWrapper
                      templateName={template.skinName}
                      scaleX={CARD_SCALE_X}
                      scaleY={CARD_SCALE_Y}
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
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
