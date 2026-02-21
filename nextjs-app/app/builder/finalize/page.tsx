'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import BuilderSidebar, { BUILDER_STEPS, StepItem } from '@/components/BuilderSidebar';
import BuilderPreview from '@/components/BuilderPreview';
import { useResume } from '@/contexts/ResumeContext';
import { downloadPdf, downloadDocx } from '@/lib/api';

export default function BuilderFinalizePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { resumeId, saveSection } = useResume();
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const token = (session as any)?.accessToken ?? '';

  const handleDownloadPdf = async () => {
    if (!token || !resumeId) return;
    setDownloading(true);
    try {
      await downloadPdf(token, resumeId);
    } catch {
      // ignore
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadDocx = async () => {
    if (!token || !resumeId) return;
    setDownloading(true);
    try {
      await downloadDocx(token, resumeId);
    } catch {
      // ignore
    } finally {
      setDownloading(false);
    }
  };

  const handleSaveTemplate = async (templateName: string, colorHex: string) => {
    setSaving(true);
    try {
      await saveSection('template', {
        template_name: templateName,
        color_hex: colorHex,
      });
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

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

      {/* Center: Finalize Content */}
      <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 py-12 pb-32">
          {/* Page Heading */}
          <div className="flex flex-col gap-3 mb-10">
            <h2 className="text-4xl font-black leading-tight tracking-tight">
              Your resume is ready!
            </h2>
            <p className="text-[#616289] text-lg">
              Everything looks great. Review your final document and download it in your preferred format.
            </p>
          </div>

          {/* Template Quick-Save */}
          <div className="rounded-xl border border-[#dbdbe6] bg-white p-6 shadow-sm space-y-4 mb-8">
            <h3 className="text-lg font-bold text-[#111118]">Template Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSaveTemplate('mli1', '#496267')}
                disabled={saving}
                className="h-12 rounded-lg border-2 border-primary bg-primary/5 text-primary font-bold text-sm hover:bg-primary/10 transition-all disabled:opacity-50"
                type="button"
              >
                MLI1 Template
              </button>
              <button
                onClick={() => handleSaveTemplate('ata1', '#000000')}
                disabled={saving}
                className="h-12 rounded-lg border-2 border-[#dbdbe6] text-[#111118] font-bold text-sm hover:bg-gray-50 transition-all disabled:opacity-50"
                type="button"
              >
                ATA1 Template
              </button>
            </div>
          </div>

          {/* Success Card */}
          <div className="rounded-xl border border-[#dbdbe6] bg-white p-8 shadow-sm mb-8">
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
                  Great job! Your professional resume is now polished and complete.
                </p>
              </div>
              <div className="w-full pt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleDownloadPdf}
                    disabled={downloading}
                    className="flex items-center justify-center gap-2 h-12 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
                    type="button"
                  >
                    <span className="material-symbols-outlined">picture_as_pdf</span>
                    Download PDF
                  </button>
                  <button
                    onClick={handleDownloadDocx}
                    disabled={downloading}
                    className="flex items-center justify-center gap-2 h-12 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all disabled:opacity-50"
                    type="button"
                  >
                    <span className="material-symbols-outlined">description</span>
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
                <p className="text-xs text-[#616289]">Create a public URL to share.</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white border border-[#dbdbe6] flex items-start gap-4">
              <div className="p-2 rounded-lg bg-[#f0f0f4] text-primary">
                <span className="material-symbols-outlined">print</span>
              </div>
              <div>
                <p className="font-bold text-sm">Print Version</p>
                <p className="text-xs text-[#616289]">Optimized for physical printing.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Navigation */}
        <footer className="fixed bottom-0 left-64 right-[450px] bg-white/80 backdrop-blur-md border-t border-[#dbdbe6] px-8 py-4 z-10 flex justify-between items-center">
          <button
            onClick={() => router.push('/builder/summary')}
            className="flex items-center gap-2 text-sm font-bold text-[#111118] hover:bg-[#f0f0f4] px-6 py-2.5 rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Back
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-primary hover:bg-[#3235d6] text-white px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 transition-all"
          >
            Go to Dashboard
          </button>
        </footer>
      </main>

      <BuilderPreview />
    </div>
  );
}
