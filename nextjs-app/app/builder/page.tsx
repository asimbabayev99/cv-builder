'use client';

import { useState, useMemo } from 'react';
import BuilderSidebar, { BUILDER_STEPS, StepItem } from '@/components/BuilderSidebar';
import BuilderPreview from '@/components/BuilderPreview';

interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  currentlyWorking: boolean;
  description: string;
  expanded: boolean;
}

export default function BuilderPage() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      jobTitle: 'Senior Product Designer',
      company: 'TechCorp Inc.',
      startDate: '2022-01',
      endDate: '',
      location: 'San Francisco, CA',
      currentlyWorking: true,
      description:
        '• Led the redesign of the core SaaS platform, resulting in a 25% increase in user engagement.\n• Collaborated with cross-functional teams of engineers and product managers to deliver high-quality design solutions.\n• Mentored junior designers and established a new design system that improved production speed by 40%.',
      expanded: true,
    },
    {
      id: '2',
      jobTitle: 'Product Designer',
      company: 'DesignStudio',
      startDate: '2019-06',
      endDate: '2021-12',
      location: 'New York, NY',
      currentlyWorking: false,
      description:
        '• Designed mobile-first interfaces for a variety of FinTech clients.\n• Reduced project turnaround time by 15% through optimized prototyping workflows.',
      expanded: false,
    },
  ]);

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
      startDate: '',
      endDate: '',
      location: '',
      currentlyWorking: false,
      description: '',
      expanded: true,
    };
    setExperiences((prev) => [newExp, ...prev]);
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
      <BuilderSidebar steps={steps} progress={60} />

      {/* Center: Work Experience Form */}
      <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 py-12 pb-32">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-black leading-tight tracking-tight">
                Work Experience
              </h2>
              <p className="text-[#616289] text-base">
                Tell us about your professional background. Start with your most recent role.
              </p>
            </div>
            <button
              onClick={addExperience}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg font-bold text-sm hover:bg-primary/20 transition-all"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                add
              </span>
              <span>Add Position</span>
            </button>
          </div>

          {/* Experience Cards */}
          <div className="space-y-8">
            {experiences.map((exp) =>
              exp.expanded ? (
                /* Expanded Card */
                <div
                  key={exp.id}
                  className="p-6 rounded-xl border border-[#dbdbe6] bg-white shadow-sm space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#616289]">
                      {exp.currentlyWorking ? 'Current Position' : 'Previous Position'}
                    </span>
                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="text-[#616289] hover:text-red-500 transition-colors"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                        delete
                      </span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-[#111118]">Job Title</span>
                      <input
                        className="w-full px-4 py-3 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        type="text"
                        value={exp.jobTitle}
                        onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-[#111118]">Company</span>
                      <input
                        className="w-full px-4 py-3 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-semibold text-[#111118]">Start Date</span>
                        <input
                          className="w-full px-4 py-3 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        />
                      </label>
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-semibold text-[#111118]">End Date</span>
                        <input
                          className={`w-full px-4 py-3 rounded-lg border border-[#dbdbe6] outline-none transition-all ${
                            exp.currentlyWorking
                              ? 'bg-gray-50 text-[#616289]'
                              : 'bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary'
                          }`}
                          type="month"
                          value={exp.endDate}
                          disabled={exp.currentlyWorking}
                          placeholder="Present"
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        />
                      </label>
                    </div>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-[#111118]">Location</span>
                      <input
                        className="w-full px-4 py-3 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.currentlyWorking}
                      onChange={(e) =>
                        updateExperience(exp.id, 'currentlyWorking', e.target.checked)
                      }
                      className="w-4 h-4 text-primary border-[#dbdbe6] rounded focus:ring-primary"
                    />
                    <label
                      htmlFor={`current-${exp.id}`}
                      className="text-sm font-medium text-[#616289]"
                    >
                      I currently work here
                    </label>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold text-[#111118]">Description</span>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#4245f0] to-[#8b5cf6] text-white rounded-full text-xs font-bold shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                          auto_fix_high
                        </span>
                        <span>AI Rewrite</span>
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute top-2 left-2 flex gap-1 bg-white/80 backdrop-blur-sm p-1 rounded border border-[#dbdbe6]">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <span className="material-symbols-outlined text-[18px]">
                            format_bold
                          </span>
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <span className="material-symbols-outlined text-[18px]">
                            format_list_bulleted
                          </span>
                        </button>
                      </div>
                      <textarea
                        className="w-full pt-12 px-4 py-3 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm leading-relaxed"
                        placeholder="Describe your key responsibilities and achievements..."
                        rows={6}
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Collapsed Card */
                <div
                  key={exp.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-[#dbdbe6] bg-[#fbfbfd]"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-white border border-[#dbdbe6] rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#616289]">business</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#111118]">{exp.jobTitle}</h4>
                      <p className="text-xs text-[#616289]">
                        {exp.company} | {formatDateRange(exp.startDate, exp.endDate)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleExpand(exp.id)}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* Sticky Bottom Navigation */}
        <footer className="fixed bottom-0 left-64 right-[450px] bg-white/80 backdrop-blur-md border-t border-[#dbdbe6] px-8 py-4 z-10 flex justify-between items-center">
          <button className="px-6 py-2.5 text-[#111118] font-bold text-sm hover:bg-[#f0f0f4] rounded-lg transition-all">
            Back
          </button>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 text-[#616289] font-bold text-sm hover:text-primary transition-all">
              Skip for now
            </button>
            <button className="px-8 py-2.5 bg-primary text-white font-bold text-sm rounded-lg shadow-lg shadow-primary/20 hover:bg-[#3235d6] transition-all">
              Save &amp; Continue
            </button>
          </div>
        </footer>
      </main>

      <BuilderPreview />
    </div>
  );
}

function formatDateRange(start: string, end: string, currentlyWorking?: boolean): string {
  const formatMonth = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
  };

  const s = formatMonth(start);
  const e = currentlyWorking ? 'Present' : formatMonth(end);

  if (!s && !e) return '';
  if (!s) return e;
  if (!e) return s;
  return `${s} - ${e}`;
}
