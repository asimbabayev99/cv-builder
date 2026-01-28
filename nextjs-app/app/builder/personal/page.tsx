'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import BuilderSidebar, { BUILDER_STEPS, StepItem } from '@/components/BuilderSidebar';
import BuilderPreview from '@/components/BuilderPreview';
import AiSummaryModal from '@/components/AiSummaryModal';

export default function BuilderPersonalPage() {
  const router = useRouter();
  const [showAiModal, setShowAiModal] = useState(false);
  const [summary, setSummary] = useState('');

  const steps: StepItem[] = useMemo(
    () =>
      BUILDER_STEPS.map((step) => ({
        ...step,
        completed: ['Profile'].includes(step.label),
        active: step.label === 'Personal Info',
      })),
    []
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <BuilderSidebar steps={steps} progress={20} />

      {/* Center: Personal Information Form */}
      <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 py-12 pb-32">
          {/* Header */}
          <div className="flex flex-col gap-2 mb-10">
            <h2 className="text-4xl font-black leading-tight tracking-tight">
              Personal Information
            </h2>
            <p className="text-[#616289] text-base">
              Introduce yourself to employers and provide contact details.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-8">
            {/* Two-Column Grid for Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#111118]">
                  First Name
                </label>
                <input
                  className="w-full h-12 px-4 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  placeholder="e.g. Alexander"
                  type="text"
                  defaultValue="Alexander"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#111118]">
                  Last Name
                </label>
                <input
                  className="w-full h-12 px-4 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  placeholder="e.g. Bennett"
                  type="text"
                  defaultValue="Bennett"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-[#111118]">
                  Professional Title
                </label>
                <input
                  className="w-full h-12 px-4 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  placeholder="e.g. Senior Software Engineer"
                  type="text"
                  defaultValue="Senior Product Designer"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#111118]">
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#616289] text-xl">
                    mail
                  </span>
                  <input
                    className="w-full h-12 pl-11 pr-4 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    placeholder="alex.b@example.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#111118]">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#616289] text-xl">
                    call
                  </span>
                  <input
                    className="w-full h-12 pl-11 pr-4 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-[#111118]">
                  Location
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#616289] text-xl">
                    location_on
                  </span>
                  <input
                    className="w-full h-12 pl-11 pr-4 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    placeholder="San Francisco, CA"
                    type="text"
                  />
                </div>
              </div>
            </div>

            {/* AI Enhanced Summary Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="text-sm font-semibold text-[#111118]">
                  Professional Summary
                </label>
                <button
                  className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-full transition-colors border border-primary/20"
                  type="button"
                  onClick={() => setShowAiModal(true)}
                >
                  <span className="material-symbols-outlined text-sm">
                    auto_awesome
                  </span>
                  GENERATE SUMMARY
                </button>
              </div>
              <div className="relative border border-[#dbdbe6] rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="flex items-center gap-2 px-3 py-2 border-b border-[#f0f0f4] bg-[#fbfbfd]">
                  <button
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">
                      format_bold
                    </span>
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">
                      format_italic
                    </span>
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">
                      format_list_bulleted
                    </span>
                  </button>
                  <div className="h-4 w-px bg-[#dbdbe6] mx-1" />
                  <button
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">
                      undo
                    </span>
                  </button>
                </div>
                <textarea
                  className="w-full p-4 resize-none border-none focus:ring-0 bg-transparent text-[#111118] text-sm leading-relaxed outline-none"
                  placeholder="Briefly describe your professional background and key achievements..."
                  rows={6}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Sticky Bottom Navigation */}
        <footer className="fixed bottom-0 left-64 right-[450px] bg-white/80 backdrop-blur-md border-t border-[#dbdbe6] px-8 py-4 z-10 flex justify-between items-center">
          <button
            onClick={() => router.push('/builder/photo')}
            className="px-6 py-2.5 text-[#111118] font-bold text-sm hover:bg-[#f0f0f4] rounded-lg transition-all"
          >
            Back
          </button>
          <button
            onClick={() => router.push('/builder/education')}
            className="px-8 py-2.5 bg-primary text-white font-bold text-sm rounded-lg shadow-lg shadow-primary/20 hover:bg-[#3235d6] transition-all"
            type="button"
          >
            Save &amp; Continue
          </button>
        </footer>
      </main>

      <BuilderPreview />

      <AiSummaryModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        onApply={(text) => setSummary(text)}
        currentDraft={summary}
      />
    </div>
  );
}
