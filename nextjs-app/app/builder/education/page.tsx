'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import BuilderSidebar, { BUILDER_STEPS, StepItem } from '@/components/BuilderSidebar';
import BuilderPreview from '@/components/BuilderPreview';

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
  const [educations, setEducations] = useState<Education[]>([
    {
      id: '1',
      institution: 'Stanford University',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2018-09',
      endDate: '2022-05',
      currentlyStudying: false,
      description:
        'GPA 3.9/4.0. Relevant coursework: Data Structures, Machine Learning, Operating Systems. Recipient of the Academic Excellence Award in 2021.',
      expanded: false,
    },
    {
      id: '2',
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      currentlyStudying: false,
      description: '',
      expanded: true,
    },
  ]);

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    setEducations((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const toggleExpand = (id: string) => {
    setEducations((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, expanded: !edu.expanded } : edu))
    );
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

  const steps: StepItem[] = useMemo(
    () =>
      BUILDER_STEPS.map((step) => ({
        ...step,
        completed: ['Profile', 'Personal Info'].includes(step.label),
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
                          Institution
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          type="text"
                          value={edu.institution}
                          placeholder="e.g. Stanford University"
                          onChange={(e) =>
                            updateEducation(edu.id, 'institution', e.target.value)
                          }
                        />
                      </div>

                      {/* Degree */}
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-[#111118]">
                          Degree
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          type="text"
                          value={edu.degree}
                          placeholder="e.g. Bachelor of Science"
                          onChange={(e) =>
                            updateEducation(edu.id, 'degree', e.target.value)
                          }
                        />
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
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1 grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#616289] mb-1">
                                Start Date
                              </label>
                              <input
                                className="w-full px-3 py-2 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                type="month"
                                value={edu.startDate}
                                onChange={(e) =>
                                  updateEducation(edu.id, 'startDate', e.target.value)
                                }
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#616289] mb-1">
                                End Date
                              </label>
                              <input
                                className={`w-full px-3 py-2 rounded-lg border border-[#dbdbe6] outline-none transition-all ${
                                  edu.currentlyStudying
                                    ? 'bg-gray-50 text-[#616289]'
                                    : 'bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary'
                                }`}
                                type="month"
                                value={edu.endDate}
                                disabled={edu.currentlyStudying}
                                onChange={(e) =>
                                  updateEducation(edu.id, 'endDate', e.target.value)
                                }
                              />
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
                        onClick={() => toggleExpand(edu.id)}
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
        <footer className="fixed bottom-0 left-64 right-[450px] bg-white/80 backdrop-blur-md border-t border-[#dbdbe6] px-8 py-4 z-10 flex justify-between items-center">
          <button
            onClick={() => router.push('/builder/personal')}
            className="flex items-center gap-2 text-sm font-bold text-[#111118] hover:bg-[#f0f0f4] px-6 py-2.5 rounded-lg transition-all"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>
          <button
            onClick={() => router.push('/builder/experience')}
            className="flex items-center gap-2 bg-primary text-white px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-[#3235d6] transition-all"
          >
            Save &amp; Continue
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
