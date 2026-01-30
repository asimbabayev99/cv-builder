'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BuilderSidebar, { BUILDER_STEPS, StepItem } from '@/components/BuilderSidebar';
import BuilderPreview from '@/components/BuilderPreview';
import { useResume } from '@/contexts/ResumeContext';

interface CustomEntry {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  expanded: boolean;
}

export default function BuilderCustomPage() {
  const router = useRouter();
  const { resume, saveSection, loading } = useResume();
  const [entries, setEntries] = useState<CustomEntry[]>([]);
  const [saving, setSaving] = useState(false);

  // Populate from loaded resume
  useEffect(() => {
    if (!resume) return;
    if (resume.custom_sections && resume.custom_sections.length > 0) {
      setEntries(
        resume.custom_sections.map((cs: Record<string, unknown>, i: number) => ({
          id: String(cs.id ?? i),
          title: (cs.title as string) ?? '',
          description: (cs.description as string) ?? '',
          startDate: (cs.start_date as string) ?? '',
          endDate: (cs.end_date as string) ?? '',
          expanded: false,
        }))
      );
    }
  }, [resume]);

  const updateEntry = (id: string, field: keyof CustomEntry, value: string | boolean) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry))
    );
  };

  const toggleExpand = (id: string) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, expanded: !entry.expanded } : entry))
    );
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const addEntry = () => {
    const newEntry: CustomEntry = {
      id: Date.now().toString(),
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      expanded: true,
    };
    setEntries((prev) => [...prev, newEntry]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSection(
        'custom-sections',
        entries
          .filter((e) => e.title.trim())
          .map((e, i) => ({
            title: e.title,
            description: e.description || null,
            start_date: e.startDate || null,
            end_date: e.endDate || null,
            sort_order: i,
          }))
      );
      router.push('/builder/summary');
    } catch {
      // stay on page
    } finally {
      setSaving(false);
    }
  };

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
        ].includes(step.label),
        active: step.label === 'Custom',
      })),
    []
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <BuilderSidebar steps={steps} progress={85} />

      {/* Center: Custom Section Form */}
      <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 py-12 pb-32">
          {/* Page Heading */}
          <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <h2 className="text-4xl font-black leading-tight tracking-tight">
                Custom Section
              </h2>
              <p className="text-[#616289] text-base">
                Add any additional sections such as volunteering, projects, or hobbies.
              </p>
            </div>
          </div>

          {/* Entry List */}
          <div className="space-y-4">
            {entries.map((entry) =>
              entry.expanded ? (
                /* Expanded Card */
                <div
                  key={entry.id}
                  className="bg-white rounded-xl border-l-4 border-l-primary border-t border-r border-b border-[#dbdbe6] shadow-lg overflow-hidden transition-all"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-lg font-bold">Edit Custom Entry</h3>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="text-[#616289] hover:text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Title */}
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold mb-2 text-[#111118]">
                          Title
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          type="text"
                          value={entry.title}
                          placeholder="e.g. Volunteer Work, Side Project, Hobby"
                          onChange={(e) =>
                            updateEntry(entry.id, 'title', e.target.value)
                          }
                        />
                      </div>

                      {/* Description */}
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold mb-2 text-[#111118]">
                          Description
                        </label>
                        <textarea
                          className="w-full px-4 py-2.5 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                          rows={3}
                          value={entry.description}
                          placeholder="Describe this activity or achievement..."
                          onChange={(e) =>
                            updateEntry(entry.id, 'description', e.target.value)
                          }
                        />
                      </div>

                      {/* Dates */}
                      <div className="col-span-2">
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#616289] mb-1">
                              Start Date
                            </label>
                            <input
                              className="w-full px-3 py-2 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                              type="month"
                              value={entry.startDate}
                              onChange={(e) =>
                                updateEntry(entry.id, 'startDate', e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#616289] mb-1">
                              End Date
                            </label>
                            <input
                              className="w-full px-3 py-2 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                              type="month"
                              value={entry.endDate}
                              onChange={(e) =>
                                updateEntry(entry.id, 'endDate', e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-[#f0f0f4] flex justify-end gap-3">
                      <button
                        onClick={() => toggleExpand(entry.id)}
                        className="px-6 py-2 text-sm font-bold text-[#616289] hover:bg-[#f0f0f4] rounded-lg transition-colors"
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => toggleExpand(entry.id)}
                        className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all"
                        type="button"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Collapsed Card */
                <div
                  key={entry.id}
                  className="group flex items-center gap-3 bg-white p-4 rounded-xl border border-[#dbdbe6] shadow-sm hover:border-primary/40 transition-all cursor-move"
                >
                  <div className="text-[#dbdbe6]">
                    <span className="material-symbols-outlined">drag_indicator</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-[#111118] truncate">
                          {entry.title || 'Untitled Entry'}
                        </h3>
                        <p className="text-sm text-[#616289] truncate">
                          {entry.description || 'No description'}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-[#616289] hidden sm:block">
                          {formatDateRange(entry.startDate, entry.endDate)}
                        </span>
                        <button
                          onClick={() => toggleExpand(entry.id)}
                          className="p-2 hover:bg-[#f0f0f4] rounded-lg text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* Add Entry Button */}
            <button
              onClick={addEntry}
              className="w-full py-6 border-2 border-dashed border-[#dbdbe6] rounded-xl flex flex-col items-center justify-center gap-2 text-[#616289] hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all group"
              type="button"
            >
              <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">
                add_circle
              </span>
              <span className="font-bold text-sm">Add Custom Entry</span>
            </button>
          </div>
        </div>

        {/* Sticky Bottom Navigation */}
        <footer className="fixed bottom-0 left-64 right-[450px] bg-white/80 backdrop-blur-md border-t border-[#dbdbe6] px-8 py-4 z-10 flex justify-between items-center">
          <button
            onClick={() => router.push('/builder/certificates')}
            className="flex items-center gap-2 text-sm font-bold text-[#111118] hover:bg-[#f0f0f4] px-6 py-2.5 rounded-lg transition-all"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center gap-2 bg-primary text-white px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-[#3235d6] transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save & Continue'}
          </button>
        </footer>
      </main>

      <BuilderPreview />
    </div>
  );
}

function formatDateRange(start: string, end: string): string {
  const formatYear = (dateStr: string) => {
    if (!dateStr) return '';
    return dateStr.split('-')[0];
  };
  const s = formatYear(start);
  const e = formatYear(end);
  if (!s && !e) return '';
  if (!s) return e;
  if (!e) return `${s} - Present`;
  return `${s} - ${e}`;
}
