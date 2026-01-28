'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import BuilderSidebar, { BUILDER_STEPS, StepItem } from '@/components/BuilderSidebar';
import BuilderPreview from '@/components/BuilderPreview';

export default function BuilderSummaryPage() {
  const router = useRouter();

  const steps: StepItem[] = useMemo(
    () =>
      BUILDER_STEPS.map((step) => ({
        ...step,
        completed: [
          'Profile',
          'Personal Info',
          'Education',
          'Work Experience',
          'Skills',
          'Languages',
          'Certificates',
          'Custom',
        ].includes(step.label),
        active: step.label === 'Summary',
      })),
    []
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <BuilderSidebar steps={steps} progress={95} />

      {/* Center: AI Resume Analysis */}
      <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 py-12 pb-32">
          <h2 className="text-4xl font-black leading-tight tracking-tight mb-2">
            AI Resume Analysis
          </h2>
          <p className="text-[#616289] text-base mb-8">
            Review your resume score and apply smart improvements suggested by AI.
          </p>

          {/* Score + Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Score Circle */}
            <div className="bg-[#f6f6f8] p-6 rounded-2xl border border-[#f0f0f4] flex flex-col items-center justify-center">
              <div className="relative flex flex-col items-center justify-center">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    className="text-[#e0e0e0]"
                    cx="80"
                    cy="80"
                    fill="transparent"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="10"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    fill="transparent"
                    r="70"
                    stroke="url(#scoreGradient)"
                    strokeDasharray="440"
                    strokeDashoffset="66"
                    strokeLinecap="round"
                    strokeWidth="10"
                  />
                  <defs>
                    <linearGradient
                      id="scoreGradient"
                      x1="0%"
                      x2="100%"
                      y1="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-[#111118]">
                    85
                  </span>
                  <span className="text-xs font-semibold text-[#616289] uppercase tracking-widest">
                    / 100
                  </span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100 inline-block">
                  Excellent Score!
                </p>
              </div>
            </div>

            {/* Metrics Bars */}
            <div className="flex flex-col justify-center space-y-5">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#111118] mb-1.5">
                  <span>ATS FRIENDLINESS</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-[#f0f0f4] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: '92%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-[#111118] mb-1.5">
                  <span>CONTENT DEPTH</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-[#f0f0f4] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: '78%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-[#111118] mb-1.5">
                  <span>CLARITY &amp; FLOW</span>
                  <span>88%</span>
                </div>
                <div className="w-full bg-[#f0f0f4] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: '88%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Smart Improvements Header */}
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary fill-1">
              auto_fix_high
            </span>
            <h3 className="text-lg font-bold text-[#111118]">
              Smart Improvements
            </h3>
          </div>

          {/* Improvement Cards */}
          <div className="space-y-4">
            {/* Quantify Impact */}
            <div className="p-5 rounded-xl border border-[#f0f0f4] bg-[#f6f6f8]/50 group hover:border-primary/50 transition-all">
              <div className="flex gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[24px] fill-1">
                    query_stats
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#111118]">
                    Quantify your impact
                  </h4>
                  <p className="text-sm text-[#616289] mt-1">
                    Add specific metrics (%, $) to your &quot;CloudScale&quot;
                    role to show measurable results.
                  </p>
                </div>
              </div>
              <button
                className="w-full py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  magic_button
                </span>
                <span>AI Draft Improvements</span>
              </button>
            </div>

            {/* Missing Keywords */}
            <div className="p-5 rounded-xl border border-[#f0f0f4] bg-[#f6f6f8]/50 group hover:border-primary/50 transition-all">
              <div className="flex gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <span className="material-symbols-outlined text-[24px] fill-1">
                    label
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#111118]">
                    Missing Keywords
                  </h4>
                  <p className="text-sm text-[#616289] mt-1">
                    Consider adding &apos;Kubernetes&apos; or
                    &apos;Docker&apos; to match the JD for Lead Dev roles.
                  </p>
                </div>
              </div>
              <button
                className="w-full py-2.5 bg-white border border-[#dbdbe6] text-[#111118] text-sm font-bold rounded-lg hover:bg-[#f6f6f8] transition-all"
                type="button"
              >
                Add to Skills
              </button>
            </div>

            {/* Professional Summary */}
            <div className="p-5 rounded-xl border border-[#f0f0f4] bg-[#f6f6f8]/50 group hover:border-primary/50 transition-all">
              <div className="flex gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <span className="material-symbols-outlined text-[24px] fill-1">
                    format_quote
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#111118]">
                    Professional Summary
                  </h4>
                  <p className="text-sm text-[#616289] mt-1">
                    Your summary is a bit short. AI can generate a more punchy
                    3-line intro.
                  </p>
                </div>
              </div>
              <button
                className="w-full py-2.5 bg-primary/10 border border-primary/20 text-primary text-sm font-bold rounded-lg hover:bg-primary/20 transition-all"
                type="button"
              >
                Apply Recommendation
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Navigation */}
        <footer className="fixed bottom-0 left-64 right-[450px] bg-white/80 backdrop-blur-md border-t border-[#dbdbe6] px-8 py-4 z-10 flex justify-between items-center">
          <button
            onClick={() => router.push('/builder/custom')}
            className="flex items-center gap-2 text-sm font-bold text-[#111118] hover:bg-[#f0f0f4] px-6 py-2.5 rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">
              arrow_back
            </span>
            Back
          </button>
          <button
            onClick={() => router.push('/builder/finalize')}
            className="bg-primary hover:bg-[#3235d6] text-white px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 transition-all"
          >
            Save &amp; Continue
          </button>
        </footer>
      </main>

      <BuilderPreview />
    </div>
  );
}
