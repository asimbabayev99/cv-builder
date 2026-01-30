'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BuilderSidebar, { BUILDER_STEPS, StepItem } from '@/components/BuilderSidebar';
import BuilderPreview from '@/components/BuilderPreview';
import { useResume } from '@/contexts/ResumeContext';

interface Language {
  id: string;
  name: string;
  proficiency: string;
}

const PROFICIENCY_LEVELS = [
  'Native',
  'Fluent',
  'Advanced',
  'Intermediate',
  'Beginner',
];

const SUGGESTED_LANGUAGES = ['Spanish', 'French', 'German', 'Chinese', 'Japanese'];

export default function BuilderLanguagesPage() {
  const router = useRouter();
  const { resume, saveSection, loading } = useResume();
  const [searchValue, setSearchValue] = useState('');
  const [languages, setLanguages] = useState<Language[]>([]);
  const [saving, setSaving] = useState(false);

  // Populate from loaded resume
  useEffect(() => {
    if (!resume) return;
    if (resume.languages && resume.languages.length > 0) {
      setLanguages(
        resume.languages.map((l: Record<string, unknown>, i: number) => ({
          id: String(l.id ?? i),
          name: (l.name as string) ?? '',
          proficiency: (l.proficiency as string) ?? 'Beginner',
        }))
      );
    }
  }, [resume]);

  const addLanguage = (name: string) => {
    if (!name.trim()) return;
    if (languages.some((l) => l.name.toLowerCase() === name.trim().toLowerCase())) return;
    setLanguages((prev) => [
      ...prev,
      { id: Date.now().toString(), name: name.trim(), proficiency: 'Beginner' },
    ]);
    setSearchValue('');
  };

  const removeLanguage = (id: string) => {
    setLanguages((prev) => prev.filter((l) => l.id !== id));
  };

  const updateProficiency = (id: string, proficiency: string) => {
    setLanguages((prev) =>
      prev.map((l) => (l.id === id ? { ...l, proficiency } : l))
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addLanguage(searchValue);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSection(
        'languages',
        languages.map((l, i) => ({
          name: l.name,
          proficiency: l.proficiency.toLowerCase(),
          sort_order: i,
        }))
      );
      router.push('/builder/certificates');
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
        ].includes(step.label),
        active: step.label === 'Languages',
      })),
    []
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <BuilderSidebar steps={steps} progress={70} />

      {/* Center: Languages Form */}
      <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 py-12 pb-32">
          {/* Heading */}
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-4xl font-black leading-tight tracking-tight">
              Languages
            </h2>
            <p className="text-[#616289] text-base">
              Add languages you speak and select your proficiency level for each.
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
                  We&apos;ve analyzed your profile to suggest relevant languages.
                </p>
              </div>
            </div>
            <button
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all"
              type="button"
            >
              <span>Suggest Languages</span>
              <span className="material-symbols-outlined text-[20px]">
                auto_awesome
              </span>
            </button>
          </div>

          {/* Search & Input Area */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-[#111118] text-base font-bold">
                Quick Add Languages
              </label>
              <div className="relative flex w-full items-stretch">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#616289]">
                  search
                </span>
                <input
                  className="flex w-full min-w-0 flex-1 rounded-lg text-[#111118] border border-[#dbdbe6] bg-white h-14 pl-12 pr-4 text-base focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  placeholder="e.g., Spanish, French, German..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={() => addLanguage(searchValue)}
                  className="ml-2 bg-primary hover:bg-primary/90 text-white px-6 rounded-lg font-bold flex items-center justify-center transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
              {/* Suggestions */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs text-[#616289] uppercase font-bold tracking-wider">
                  Suggested:
                </span>
                {SUGGESTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => addLanguage(lang)}
                    className="text-xs font-semibold px-2 py-1 rounded bg-white border border-[#dbdbe6] hover:border-primary hover:text-primary transition-colors"
                    type="button"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Current Languages */}
          <div>
            <h3 className="text-[#111118] text-lg font-bold leading-tight flex items-center gap-2 pb-4">
              Your Languages
              <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                {languages.length}
              </span>
            </h3>
            <div className="space-y-3">
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  className="flex items-center justify-between bg-white border border-[#dbdbe6] px-4 py-3 rounded-xl hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#616289]">
                      translate
                    </span>
                    <span className="text-sm font-bold text-[#111118]">
                      {lang.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={lang.proficiency}
                      onChange={(e) =>
                        updateProficiency(lang.id, e.target.value)
                      }
                      className="text-sm font-medium px-3 py-1.5 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    >
                      {PROFICIENCY_LEVELS.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeLanguage(lang.id)}
                      className="text-[#616289] hover:text-red-500 flex items-center transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        close
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Bottom Navigation */}
        <footer className="fixed bottom-0 left-64 right-[450px] bg-white/80 backdrop-blur-md border-t border-[#dbdbe6] px-8 py-4 z-10 flex justify-between items-center">
          <button
            onClick={() => router.push('/builder/skills')}
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
