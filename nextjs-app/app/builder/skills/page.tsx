'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BuilderSidebar, { BUILDER_STEPS, StepItem } from '@/components/BuilderSidebar';
import BuilderPreview from '@/components/BuilderPreview';
import { useResume } from '@/contexts/ResumeContext';

interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft';
}

const SUGGESTED_SKILLS = ['UI Design', 'Figma', 'User Research'];

export default function BuilderSkillsPage() {
  const router = useRouter();
  const { resume, saveSection, loading } = useResume();
  const [searchValue, setSearchValue] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [saving, setSaving] = useState(false);

  // Populate from loaded resume
  useEffect(() => {
    if (!resume) return;
    if (resume.skills && resume.skills.length > 0) {
      setSkills(
        resume.skills.map((s: Record<string, unknown>, i: number) => ({
          id: String(s.id ?? i),
          name: (s.name as string) ?? '',
          category: ((s.category as string) ?? 'technical') as 'technical' | 'soft',
        }))
      );
    }
  }, [resume]);

  const technicalSkills = skills.filter((s) => s.category === 'technical');
  const softSkills = skills.filter((s) => s.category === 'soft');

  const addSkill = (name: string, category: 'technical' | 'soft' = 'technical') => {
    if (!name.trim()) return;
    if (skills.some((s) => s.name.toLowerCase() === name.trim().toLowerCase())) return;
    setSkills((prev) => [
      ...prev,
      { id: Date.now().toString(), name: name.trim(), category },
    ]);
    setSearchValue('');
  };

  const removeSkill = (id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(searchValue);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSection(
        'skills',
        skills.map((s, i) => ({
          name: s.name,
          category: s.category,
          sort_order: i,
        }))
      );
      router.push('/builder/languages');
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
        completed: ['Profile', 'Personal Info', 'Education', 'Work Experience'].includes(
          step.label
        ),
        active: step.label === 'Skills',
      })),
    []
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <BuilderSidebar steps={steps} progress={60} />

      {/* Center: Skills Form */}
      <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 py-12 pb-32">
          {/* Heading */}
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-4xl font-black leading-tight tracking-tight">
              Highlight Your Expertise
            </h2>
            <p className="text-[#616289] text-base">
              Add relevant skills to your resume. Use AI to find industry-specific keywords
              that pass ATS filters.
            </p>
          </div>

          {/* AI Suggestion Prompt */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-3xl">
                auto_awesome
              </span>
              <div>
                <p className="font-bold text-[#111118]">
                  Get Smarter Recommendations
                </p>
                <p className="text-sm text-[#616289]">
                  We&apos;ve analyzed your &quot;Senior Product Designer&quot; role.
                </p>
              </div>
            </div>
            <button
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all"
              type="button"
            >
              <span>Suggest Skills</span>
              <span className="material-symbols-outlined text-[20px]">
                auto_awesome
              </span>
            </button>
          </div>

          {/* Search & Input Area */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-[#111118] text-base font-bold">
                Quick Add Skills
              </label>
              <div className="relative flex w-full items-stretch">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#616289]">
                  search
                </span>
                <input
                  className="flex w-full min-w-0 flex-1 rounded-lg text-[#111118] border border-[#dbdbe6] bg-white h-14 pl-12 pr-4 text-base focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  placeholder="e.g., Project Management, React, French..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={() => addSkill(searchValue)}
                  className="ml-2 bg-primary hover:bg-primary/90 text-white px-6 rounded-lg font-bold flex items-center justify-center transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
              {/* Autocomplete Preview */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs text-[#616289] uppercase font-bold tracking-wider">
                  Suggested:
                </span>
                {SUGGESTED_SKILLS.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => addSkill(skill)}
                    className="text-xs font-semibold px-2 py-1 rounded bg-white border border-[#dbdbe6] hover:border-primary hover:text-primary transition-colors"
                    type="button"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Current Skills Sections */}
          <div className="space-y-6">
            {/* Technical Skills */}
            <div>
              <h3 className="text-[#111118] text-lg font-bold leading-tight flex items-center gap-2 pb-4">
                Technical Skills
                <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                  {technicalSkills.length}
                </span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {technicalSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-2 bg-white border border-primary/40 px-3 py-2 rounded-lg group hover:border-primary transition-all"
                  >
                    <span className="text-sm font-medium">{skill.name}</span>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="text-[#616289] hover:text-red-500 flex items-center"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        close
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h3 className="text-[#111118] text-lg font-bold leading-tight flex items-center gap-2 pb-4">
                Soft Skills
                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
                  {softSkills.length}
                </span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {softSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-2 bg-white border border-[#dbdbe6] px-3 py-2 rounded-lg group hover:border-primary transition-all"
                  >
                    <span className="text-sm font-medium">{skill.name}</span>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="text-[#616289] hover:text-red-500 flex items-center"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        close
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Navigation */}
        <footer className="fixed bottom-0 left-64 right-[450px] bg-white/80 backdrop-blur-md border-t border-[#dbdbe6] px-8 py-4 z-10 flex justify-between items-center">
          <button
            onClick={() => router.push('/builder/experience')}
            className="flex items-center gap-2 text-sm font-bold text-[#111118] hover:bg-[#f0f0f4] px-6 py-2.5 rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">
              arrow_back
            </span>
            Back
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="bg-primary hover:bg-[#3235d6] text-white px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save & Continue'}
          </button>
        </footer>
      </main>

      <BuilderPreview />
    </div>
  );
}
