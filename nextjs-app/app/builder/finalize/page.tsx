'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import BuilderSidebar, { BUILDER_STEPS, StepItem } from '@/components/BuilderSidebar';

export default function BuilderFinalizePage() {
  const router = useRouter();

  const steps: StepItem[] = useMemo(
    () =>
      BUILDER_STEPS.map((step) => ({
        ...step,
        completed: true,
        active: step.label === 'Finalize',
      })),
    []
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <BuilderSidebar steps={steps} progress={100} />

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Center: Action & Success States */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#f6f6f8]">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
              <a
                className="text-[#616289] hover:text-primary transition-colors"
                href="#"
              >
                Dashboard
              </a>
              <span className="text-[#616289]">/</span>
              <span className="text-[#111118] font-medium">Final Review</span>
            </div>

            {/* Page Heading */}
            <div className="flex flex-col gap-3">
              <p className="text-[#111118] text-4xl font-black leading-tight tracking-tight">
                Your resume is ready!
              </p>
              <p className="text-[#616289] text-lg font-normal leading-relaxed">
                Everything looks great. Review your final document and download
                it in your preferred format.
              </p>
            </div>

            {/* Success Card */}
            <div className="rounded-xl border border-[#dbdbe6] bg-white p-8 shadow-sm">
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <span className="material-symbols-outlined text-4xl fill-1">
                    verified
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#111118]">
                    All fields completed
                  </h3>
                  <p className="text-[#616289]">
                    Great job! Your professional resume is now polished and
                    complete.
                  </p>
                </div>
                <div className="w-full pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      className="flex items-center justify-center gap-2 h-12 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-all"
                      type="button"
                    >
                      <span className="material-symbols-outlined">
                        picture_as_pdf
                      </span>
                      Download PDF
                    </button>
                    <button
                      className="flex items-center justify-center gap-2 h-12 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all"
                      type="button"
                    >
                      <span className="material-symbols-outlined">
                        description
                      </span>
                      Download DOCX
                    </button>
                  </div>
                  <button
                    onClick={() => router.push('/builder/summary')}
                    className="w-full text-sm font-medium text-[#616289] hover:text-primary underline underline-offset-4 transition-colors"
                    type="button"
                  >
                    Need to make a quick change? Go back to Edit
                  </button>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white border border-[#dbdbe6] flex items-start gap-4">
                <div className="p-2 rounded-lg bg-[#f0f0f4] text-primary">
                  <span className="material-symbols-outlined">share</span>
                </div>
                <div>
                  <p className="font-bold text-sm">Share Link</p>
                  <p className="text-xs text-[#616289]">
                    Create a public URL to share.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white border border-[#dbdbe6] flex items-start gap-4">
                <div className="p-2 rounded-lg bg-[#f0f0f4] text-primary">
                  <span className="material-symbols-outlined">print</span>
                </div>
                <div>
                  <p className="font-bold text-sm">Print Version</p>
                  <p className="text-xs text-[#616289]">
                    Optimized for physical printing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Preview Pane */}
        <div className="w-[500px] border-l border-[#dbdbe6] bg-gray-200 p-8 flex flex-col items-center relative overflow-hidden shrink-0">
          {/* Header */}
          <div className="w-full flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-[#616289] uppercase tracking-widest">
              Live Preview
            </span>
            <button
              className="text-[#616289] hover:text-primary transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined">fullscreen</span>
            </button>
          </div>

          {/* Resume Document Preview Mock */}
          <div
            className="w-full bg-white shadow-2xl rounded-sm p-10 flex flex-col gap-6 scale-95 origin-top transition-transform cursor-zoom-in"
            style={{ aspectRatio: '1 / 1.414' }}
          >
            {/* Mock Header */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-6 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-48 bg-gray-100 rounded" />
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
            </div>
            <div className="h-px w-full bg-gray-100" />

            {/* Mock Experience Section */}
            <div className="space-y-4">
              <div className="h-4 w-24 bg-primary/20 rounded" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-50 rounded" />
                <div className="h-3 w-full bg-gray-50 rounded" />
                <div className="h-3 w-2/3 bg-gray-50 rounded" />
              </div>
            </div>

            {/* Mock Skills Section */}
            <div className="space-y-4">
              <div className="h-4 w-32 bg-primary/20 rounded" />
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-16 bg-gray-100 rounded-full" />
                <div className="h-6 w-20 bg-gray-100 rounded-full" />
                <div className="h-6 w-14 bg-gray-100 rounded-full" />
              </div>
            </div>
          </div>

          {/* Floating Preview Controls */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-2 bg-[#1a1b2e] text-white rounded-full shadow-xl">
            <div className="flex items-center gap-1 border-r border-gray-700 pr-3">
              <button type="button" className="hover:text-primary">
                <span className="material-symbols-outlined text-xl">
                  remove
                </span>
              </button>
              <span className="text-sm font-bold w-12 text-center">85%</span>
              <button type="button" className="hover:text-primary">
                <span className="material-symbols-outlined text-xl">add</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" className="opacity-50 cursor-not-allowed">
                <span className="material-symbols-outlined text-xl">
                  chevron_left
                </span>
              </button>
              <span className="text-xs font-medium">Page 1 of 1</span>
              <button type="button" className="opacity-50 cursor-not-allowed">
                <span className="material-symbols-outlined text-xl">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
