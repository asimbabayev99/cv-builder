'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BuilderSidebar, { BUILDER_STEPS, StepItem } from '@/components/BuilderSidebar';
import BuilderPreview from '@/components/BuilderPreview';
import { useResume } from '@/contexts/ResumeContext';

interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  location: string;
  currentlyWorking: boolean;
  description: string;
  expanded: boolean;
}

export default function BuilderExperiencePage() {
  const router = useRouter();
  const { resume, saveSection, loading } = useResume();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [saving, setSaving] = useState(false);

  // Populate from loaded resume
  useEffect(() => {
    if (!resume) return;
    if (resume.experiences && resume.experiences.length > 0) {
      setExperiences(
        resume.experiences.map((exp: Record<string, unknown>, i: number) => ({
          id: String(exp.id ?? i),
          jobTitle: (exp.job_title as string) ?? '',
          company: (exp.company as string) ?? '',
          employmentType: (exp.employment_type as string) ?? 'Full-time',
          startDate: (exp.start_date as string) ?? '',
          endDate: (exp.end_date as string) ?? '',
          location: (exp.location as string) ?? '',
          currentlyWorking: (exp.currently_working as boolean) ?? false,
          description: (exp.description as string) ?? '',
          expanded: false,
        }))
      );
    }
  }, [resume]);

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const toggleExpand = (id: string) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, expanded: !exp.expanded } : exp))
    );
  };

  const deleteExperience = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      employmentType: 'Full-time',
      startDate: '',
      endDate: '',
      location: '',
      currentlyWorking: false,
      description: '',
      expanded: true,
    };
    setExperiences((prev) => [...prev, newExp]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSection(
        'experience',
        experiences
          .filter((exp) => exp.jobTitle.trim())
          .map((exp, i) => ({
            job_title: exp.jobTitle,
            company: exp.company || null,
            employment_type: exp.employmentType || null,
            location: exp.location || null,
            start_date: exp.startDate || null,
            end_date: exp.endDate || null,
            currently_working: exp.currentlyWorking,
            description: exp.description || null,
            sort_order: i,
          }))
      );
      router.push('/builder/skills');
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
        completed: ['Profile', 'Personal Info', 'Education'].includes(step.label),
        active: step.label === 'Work Experience',
      })),
    []
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <BuilderSidebar steps={steps} progress={50} />

      {/* Center: Work Experience Form */}
      <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 py-12 pb-32">
          {/* Page Heading */}
          <div className="mb-8">
            <h2 className="text-4xl font-black leading-tight tracking-tight mb-2">
              Work Experience
            </h2>
            <p className="text-[#616289] text-base">
              Detail your professional journey. Use our AI to turn simple duties into
              performance-driven results.
            </p>
          </div>

          {/* Work Experience List */}
          <div className="space-y-6">
            {experiences.map((exp) =>
              exp.expanded ? (
                /* Expanded Entry (Active Form) */
                <div
                  key={exp.id}
                  className="rounded-xl border-2 border-primary bg-white shadow-xl overflow-hidden"
                >
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#111118]">
                          Job Title
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
                          type="text"
                          value={exp.jobTitle}
                          placeholder="e.g. Senior Product Designer"
                          onChange={(e) =>
                            updateExperience(exp.id, 'jobTitle', e.target.value)
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#111118]">
                          Company
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
                          type="text"
                          value={exp.company}
                          placeholder="e.g. TechFlow Inc."
                          onChange={(e) =>
                            updateExperience(exp.id, 'company', e.target.value)
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#111118]">
                          Employment Type
                        </label>
                        <select
                          className="w-full px-4 py-2.5 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
                          value={exp.employmentType}
                          onChange={(e) =>
                            updateExperience(exp.id, 'employmentType', e.target.value)
                          }
                        >
                          <option>Full-time</option>
                          <option>Part-time</option>
                          <option>Contract</option>
                          <option>Freelance</option>
                          <option>Internship</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#111118]">
                          Location
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
                          type="text"
                          value={exp.location}
                          placeholder="e.g. San Francisco, CA"
                          onChange={(e) =>
                            updateExperience(exp.id, 'location', e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#111118]">
                          Start Date
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
                          type="month"
                          value={exp.startDate}
                          onChange={(e) =>
                            updateExperience(exp.id, 'startDate', e.target.value)
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#111118]">
                          End Date
                        </label>
                        <input
                          className={`w-full px-4 py-2.5 rounded-lg border border-[#dbdbe6] outline-none transition-all text-sm ${
                            exp.currentlyWorking
                              ? 'bg-gray-50 text-[#616289] opacity-50'
                              : 'bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary'
                          }`}
                          type="month"
                          value={exp.endDate}
                          disabled={exp.currentlyWorking}
                          onChange={(e) =>
                            updateExperience(exp.id, 'endDate', e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={exp.currentlyWorking}
                        onChange={(e) =>
                          updateExperience(exp.id, 'currentlyWorking', e.target.checked)
                        }
                        className="rounded border-[#dbdbe6] text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-[#616289] group-hover:text-primary transition-colors font-medium">
                        I am currently working in this role
                      </span>
                    </label>

                    {/* Description Area */}
                    <div className="mt-8 space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-[#111118]">
                          Job Description &amp; Achievements
                        </label>
                        <button
                          className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-bold rounded-full transition-all border border-primary/20"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-sm">
                            auto_awesome
                          </span>
                          Generate AI Bullet Points
                        </button>
                      </div>
                      <div className="border border-[#dbdbe6] rounded-lg p-4 bg-[#fbfbfd]">
                        <div className="flex gap-2 mb-3 border-b border-[#dbdbe6] pb-2">
                          <button
                            className="p-1 hover:bg-gray-100 rounded"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-lg">
                              format_bold
                            </span>
                          </button>
                          <button
                            className="p-1 hover:bg-gray-100 rounded"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-lg">
                              format_italic
                            </span>
                          </button>
                          <button
                            className="p-1 hover:bg-gray-100 rounded"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-lg">
                              format_list_bulleted
                            </span>
                          </button>
                        </div>
                        <textarea
                          className="w-full bg-transparent border-none focus:ring-0 text-sm outline-none resize-none"
                          placeholder="e.g. Led the redesign of the mobile app and increased conversion by 20%..."
                          rows={4}
                          value={exp.description}
                          onChange={(e) =>
                            updateExperience(exp.id, 'description', e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-[#f0f0f4]">
                      <button
                        onClick={() => deleteExperience(exp.id)}
                        className="px-4 py-2 text-[#616289] font-bold text-sm hover:text-red-500 transition-colors"
                        type="button"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => toggleExpand(exp.id)}
                        className="px-6 py-2 bg-primary text-white font-bold text-sm rounded-lg hover:shadow-lg transition-all"
                        type="button"
                      >
                        Save Entry
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Collapsed Entry */
                <div
                  key={exp.id}
                  className="p-4 rounded-xl border border-[#dbdbe6] bg-white flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-lg bg-[#f0f0f4] flex items-center justify-center text-[#616289] group-hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">
                        business_center
                      </span>
                    </div>
                    <div>
                      <p className="text-[#111118] font-bold">{exp.jobTitle || 'Job Title'}</p>
                      <p className="text-[#616289] text-sm">
                        {exp.company || 'Company'} &bull;{' '}
                        {formatDateRange(exp.startDate, exp.endDate, exp.currentlyWorking)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleExpand(exp.id)}
                    className="text-[#616289]"
                  >
                    <span className="material-symbols-outlined">expand_more</span>
                  </button>
                </div>
              )
            )}

            {/* Add More Button */}
            <button
              onClick={addExperience}
              className="w-full py-4 border-2 border-dashed border-[#dbdbe6] rounded-xl flex items-center justify-center gap-2 text-[#616289] hover:text-primary hover:border-primary transition-all font-bold"
              type="button"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Add Work Experience
            </button>
          </div>
        </div>

        {/* Sticky Bottom Navigation */}
        <footer className="fixed bottom-0 left-64 right-[450px] bg-white/80 backdrop-blur-md border-t border-[#dbdbe6] px-8 py-4 z-10 flex justify-between items-center">
          <button
            onClick={() => router.push('/builder/education')}
            className="flex items-center gap-2 px-6 py-2.5 text-[#111118] font-bold text-sm hover:bg-[#f0f0f4] rounded-lg transition-all"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="px-8 py-2.5 bg-primary text-white font-bold text-sm rounded-lg shadow-lg shadow-primary/20 hover:bg-[#3235d6] transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save & Continue'}
          </button>
        </footer>
      </main>

      <BuilderPreview />
    </div>
  );
}

function formatDateRange(start: string, end: string, currentlyWorking?: boolean): string {
  const formatYear = (dateStr: string) => {
    if (!dateStr) return '';
    return dateStr.split('-')[0];
  };
  const s = formatYear(start);
  const e = currentlyWorking ? 'Present' : formatYear(end);
  if (!s && !e) return '';
  if (!s) return e;
  if (!e) return s;
  return `${s} - ${e}`;
}
