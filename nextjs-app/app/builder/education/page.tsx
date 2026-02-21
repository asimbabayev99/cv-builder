'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BuilderSidebar, { BUILDER_STEPS, StepItem } from '@/components/BuilderSidebar';
import { useResume } from '@/contexts/ResumeContext';

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
  description: string;
  expanded: boolean;
}

export default function BuilderEducationPage() {
  const router = useRouter();
  const { resume, saveSection, loading } = useResume();
  const [educations, setEducations] = useState<Education[]>([]);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});

  const validateEntry = (edu: Education): Record<string, string> => {
    const entryErrors: Record<string, string> = {};
    if (!edu.institution.trim()) {
      entryErrors.institution = 'Institution is required';
    }
    if (!edu.degree.trim()) {
      entryErrors.degree = 'Degree is required';
    }
    if (!edu.startDate) {
      entryErrors.startDate = 'Start date is required';
    }
    if (!edu.currentlyStudying && !edu.endDate) {
      entryErrors.endDate = 'End date is required';
    }
    return entryErrors;
  };

  const validateAllEntries = (): boolean => {
    const allErrors: Record<string, Record<string, string>> = {};
    let isValid = true;

    educations.forEach((edu) => {
      const entryErrors = validateEntry(edu);
      if (Object.keys(entryErrors).length > 0) {
        allErrors[edu.id] = entryErrors;
        isValid = false;
      }
    });

    setErrors(allErrors);
    return isValid;
  };

  // Populate from loaded resume
  useEffect(() => {
    if (!resume) return;
    if (resume.educations && resume.educations.length > 0) {
      setEducations(
        resume.educations.map((edu: Record<string, unknown>, i: number) => ({
          id: String(edu.id ?? i),
          institution: (edu.institution as string) ?? '',
          degree: (edu.degree as string) ?? '',
          fieldOfStudy: (edu.field_of_study as string) ?? '',
          startDate: (edu.start_date as string) ?? '',
          endDate: (edu.end_date as string) ?? '',
          currentlyStudying: (edu.currently_studying as boolean) ?? false,
          description: (edu.description as string) ?? '',
          expanded: false,
        }))
      );
    }
  }, [resume]);

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    setEducations((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const toggleExpand = (id: string) => {
    setEducations((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, expanded: !edu.expanded } : edu))
    );
    // Clear errors for this entry when collapsing
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const saveEntry = (id: string) => {
    const edu = educations.find((e) => e.id === id);
    if (!edu) return;

    const entryErrors = validateEntry(edu);
    if (Object.keys(entryErrors).length > 0) {
      setErrors((prev) => ({ ...prev, [id]: entryErrors }));
      return;
    }

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
    toggleExpand(id);
  };

  const deleteEducation = (id: string) => {
    setEducations((prev) => prev.filter((edu) => edu.id !== id));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      currentlyStudying: false,
      description: '',
      expanded: true,
    };
    setEducations((prev) => [...prev, newEdu]);
  };

  const handleSave = async () => {
    // Only validate entries that have some data
    const filledEntries = educations.filter(
      (edu) => edu.institution.trim() || edu.degree.trim() || edu.startDate || edu.endDate
    );

    if (filledEntries.length > 0 && !validateAllEntries()) {
      // Expand the first entry with errors
      const firstErrorId = Object.keys(errors)[0] || filledEntries.find((edu) => {
        const entryErrors = validateEntry(edu);
        return Object.keys(entryErrors).length > 0;
      })?.id;

      if (firstErrorId) {
        setEducations((prev) =>
          prev.map((edu) => ({
            ...edu,
            expanded: edu.id === firstErrorId,
          }))
        );
      }
      return;
    }

    setSaving(true);
    try {
      await saveSection(
        'education',
        educations
          .filter((edu) => edu.institution.trim())
          .map((edu, i) => ({
            institution: edu.institution,
            degree: edu.degree || null,
            field_of_study: edu.fieldOfStudy || null,
            start_date: edu.startDate || null,
            end_date: edu.endDate || null,
            currently_studying: edu.currentlyStudying,
            description: edu.description || null,
            sort_order: i,
          }))
      );
      router.push('/builder/experience');
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
        completed: ['Personal Info'].includes(step.label),
        active: step.label === 'Education',
      })),
    []
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <BuilderSidebar steps={steps} progress={30} />

      {/* Center: Education Form */}
      <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 py-12 pb-32">
          {/* Page Heading */}
          <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <h2 className="text-4xl font-black leading-tight tracking-tight">
                Education
              </h2>
              <p className="text-[#616289] text-base">
                Add your academic background and certifications.
              </p>
            </div>
          </div>

          {/* Education List */}
          <div className="space-y-4">
            {educations.map((edu) =>
              edu.expanded ? (
                /* Expanded Card */
                <div
                  key={edu.id}
                  className="bg-white rounded-xl border-l-4 border-l-primary border-t border-r border-b border-[#dbdbe6] shadow-lg overflow-hidden transition-all"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-lg font-bold">Edit Education Entry</h3>
                      <button
                        onClick={() => deleteEducation(edu.id)}
                        className="text-[#616289] hover:text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Institution */}
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold mb-2 text-[#111118]">
                          Institution <span className="text-red-500">*</span>
                        </label>
                        <input
                          className={`w-full px-4 py-2.5 rounded-lg border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                            errors[edu.id]?.institution ? 'border-red-500' : 'border-[#dbdbe6]'
                          }`}
                          type="text"
                          value={edu.institution}
                          placeholder="e.g. Stanford University"
                          onChange={(e) =>
                            updateEducation(edu.id, 'institution', e.target.value)
                          }
                        />
                        {errors[edu.id]?.institution && (
                          <p className="text-xs text-red-500 mt-1">{errors[edu.id].institution}</p>
                        )}
                      </div>

                      {/* Degree */}
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-[#111118]">
                          Degree <span className="text-red-500">*</span>
                        </label>
                        <input
                          className={`w-full px-4 py-2.5 rounded-lg border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                            errors[edu.id]?.degree ? 'border-red-500' : 'border-[#dbdbe6]'
                          }`}
                          type="text"
                          value={edu.degree}
                          placeholder="e.g. Bachelor of Science"
                          onChange={(e) =>
                            updateEducation(edu.id, 'degree', e.target.value)
                          }
                        />
                        {errors[edu.id]?.degree && (
                          <p className="text-xs text-red-500 mt-1">{errors[edu.id].degree}</p>
                        )}
                      </div>

                      {/* Field of Study */}
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-[#111118]">
                          Field of Study
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          type="text"
                          value={edu.fieldOfStudy}
                          placeholder="e.g. Computer Science"
                          onChange={(e) =>
                            updateEducation(edu.id, 'fieldOfStudy', e.target.value)
                          }
                        />
                      </div>

                      {/* Dates */}
                      <div className="col-span-2">
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          <div className="flex-1 grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#616289] mb-1">
                                Start Date <span className="text-red-500">*</span>
                              </label>
                              <input
                                className={`w-full px-3 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                                  errors[edu.id]?.startDate ? 'border-red-500' : 'border-[#dbdbe6]'
                                }`}
                                type="month"
                                value={edu.startDate}
                                onChange={(e) =>
                                  updateEducation(edu.id, 'startDate', e.target.value)
                                }
                              />
                              {errors[edu.id]?.startDate && (
                                <p className="text-xs text-red-500 mt-1">{errors[edu.id].startDate}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#616289] mb-1">
                                End Date {!edu.currentlyStudying && <span className="text-red-500">*</span>}
                              </label>
                              <input
                                className={`w-full px-3 py-2 rounded-lg border outline-none transition-all ${
                                  edu.currentlyStudying
                                    ? 'bg-gray-50 text-[#616289] border-[#dbdbe6]'
                                    : errors[edu.id]?.endDate
                                      ? 'border-red-500 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary'
                                      : 'border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary'
                                }`}
                                type="month"
                                value={edu.endDate}
                                disabled={edu.currentlyStudying}
                                onChange={(e) =>
                                  updateEducation(edu.id, 'endDate', e.target.value)
                                }
                              />
                              {errors[edu.id]?.endDate && (
                                <p className="text-xs text-red-500 mt-1">{errors[edu.id].endDate}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-4 md:mt-6">
                            <input
                              className="rounded text-primary focus:ring-primary h-4 w-4"
                              id={`current-${edu.id}`}
                              type="checkbox"
                              checked={edu.currentlyStudying}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  'currentlyStudying',
                                  e.target.checked
                                )
                              }
                            />
                            <label
                              className="text-sm font-medium text-[#616289]"
                              htmlFor={`current-${edu.id}`}
                            >
                              Currently studying
                            </label>
                          </div>
                        </div>
                      </div>


                    </div>

                    <div className="mt-6 pt-6 border-t border-[#f0f0f4] flex justify-end gap-3">
                      <button
                        onClick={() => toggleExpand(edu.id)}
                        className="px-6 py-2 text-sm font-bold text-[#616289] hover:bg-[#f0f0f4] rounded-lg transition-colors"
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveEntry(edu.id)}
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
                  key={edu.id}
                  className="group flex items-center gap-3 bg-white p-4 rounded-xl border border-[#dbdbe6] shadow-sm hover:border-primary/40 transition-all cursor-move"
                >
                  <div className="text-[#dbdbe6]">
                    <span className="material-symbols-outlined">drag_indicator</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-[#111118] truncate">
                          {edu.institution || 'Institution'}
                        </h3>
                        <p className="text-sm text-[#616289] truncate">
                          {edu.degree && edu.fieldOfStudy
                            ? `${edu.degree} in ${edu.fieldOfStudy}`
                            : edu.degree || edu.fieldOfStudy || 'Degree'}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-[#616289] hidden sm:block">
                          {formatDateRange(edu.startDate, edu.endDate)}
                        </span>
                        <button
                          onClick={() => toggleExpand(edu.id)}
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

            {/* Add Education Button */}
            <button
              onClick={addEducation}
              className="w-full py-6 border-2 border-dashed border-[#dbdbe6] rounded-xl flex flex-col items-center justify-center gap-2 text-[#616289] hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all group"
              type="button"
            >
              <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">
                add_circle
              </span>
              <span className="font-bold text-sm">Add Education Entry</span>
            </button>
          </div>
        </div>

        {/* Sticky Bottom Navigation */}
        <footer className="fixed bottom-0 left-64 right-0 bg-white/80 backdrop-blur-md border-t border-[#dbdbe6] px-8 py-4 z-10 flex justify-between items-center">
          <button
            onClick={() => router.push('/builder/personal')}
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
