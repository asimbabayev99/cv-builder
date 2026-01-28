'use client';

import ProfileSidebar from '@/components/ProfileSidebar';
import AppHeader from '@/components/AppHeader';

const RESUMES = [
  {
    id: '1',
    title: 'Senior Product Designer',
    updatedAt: 'Updated 2 hours ago',
    score: 85,
    status: 'Ready to Send',
    statusColor: 'bg-green-100 text-green-700',
    suggestions: [
      {
        icon: 'lightbulb',
        iconColor: 'text-primary',
        text: (
          <>
            Add <span className="font-bold text-[#0f172a]">2 more skills</span>{' '}
            (Figma, Prototyping) to match typical Lead Designer roles.
          </>
        ),
      },
      {
        icon: 'trending_up',
        iconColor: 'text-amber-500',
        text: (
          <>
            Quantify your impact in the &quot;Amazon&quot; role using{' '}
            <span className="font-bold text-[#0f172a]">
              metric-driven results
            </span>{' '}
            (e.g., +20% conversion).
          </>
        ),
      },
    ],
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    updatedAt: 'Updated Oct 12, 2023',
    score: 62,
    status: 'Improvements Needed',
    statusColor: 'bg-amber-100 text-amber-700',
    suggestions: [
      {
        icon: 'report',
        iconColor: 'text-red-500',
        text: (
          <>
            Summary is too generic. Rewrite to highlight{' '}
            <span className="font-bold text-[#0f172a]">
              Cloud Architecture
            </span>{' '}
            expertise.
          </>
        ),
      },
      {
        icon: 'link',
        iconColor: 'text-primary',
        text: (
          <>
            Missing{' '}
            <span className="font-bold text-[#0f172a]">GitHub link</span>. Tech
            resumes with Portfolio links are 40% more likely to get responses.
          </>
        ),
      },
    ],
  },
];

export default function MyResumesPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc]">
      <AppHeader />

      {/* Main Content */}
      <main className="flex-1 flex justify-center py-8">
        <div className="flex flex-col lg:flex-row w-full max-w-[1200px] px-4 md:px-10 gap-8">
          <ProfileSidebar />

          <div className="flex-1 flex flex-col gap-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-[#0f172a] text-3xl font-black tracking-tight">
                  My Resumes
                </h1>
                <p className="text-gray-500 text-base">
                  Optimize your professional presence with AI-powered insights.
                </p>
              </div>
              <button
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined">add</span>
                <span>Create New Resume</span>
              </button>
            </div>

            {/* Resume Cards */}
            <div className="flex flex-col gap-6">
              {RESUMES.map((resume) => (
                <div
                  key={resume.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 flex flex-col md:flex-row hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)]"
                >
                  {/* Left: Resume Info */}
                  <div className="p-6 md:w-2/5 flex gap-5 border-b md:border-b-0 md:border-r border-gray-100">
                    {/* Thumbnail Mock */}
                    <div className="w-24 h-32 shrink-0 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden relative group">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">
                          visibility
                        </span>
                      </div>
                      <div className="p-2 space-y-1">
                        <div className="h-1.5 w-3/4 bg-gray-200 rounded-full" />
                        <div className="h-1 w-full bg-gray-100 rounded-full" />
                        <div className="h-1 w-5/6 bg-gray-100 rounded-full" />
                        <div className="pt-2 space-y-1">
                          <div className="h-1 w-full bg-gray-200 rounded-full" />
                          <div className="h-1 w-full bg-gray-100 rounded-full" />
                        </div>
                      </div>
                    </div>
                    {/* Details */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-[#0f172a]">
                          {resume.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            calendar_today
                          </span>
                          {resume.updatedAt}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                        <button
                          className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            download
                          </span>
                        </button>
                        <button
                          className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            more_horiz
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: AI Insights */}
                  <div className="flex-1 p-6 bg-gray-50/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary fill-1 text-[20px]">
                          auto_awesome
                        </span>
                        <span className="text-sm font-bold uppercase tracking-wider text-gray-700">
                          AI Score: {resume.score}/100
                        </span>
                      </div>
                      <span
                        className={`px-2.5 py-1 ${resume.statusColor} text-[11px] font-bold rounded-full`}
                      >
                        {resume.status}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {resume.suggestions.map((suggestion, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100"
                        >
                          <span
                            className={`material-symbols-outlined ${suggestion.iconColor} text-[18px] mt-0.5`}
                          >
                            {suggestion.icon}
                          </span>
                          <p className="text-sm text-gray-600">
                            {suggestion.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Draft Card */}
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden transition-all duration-300 flex flex-col md:flex-row hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)]">
                <div className="p-6 md:w-full flex items-center justify-center gap-4 text-gray-400 py-12 cursor-pointer">
                  <span className="material-symbols-outlined text-[32px]">
                    post_add
                  </span>
                  <div className="text-center">
                    <p className="font-bold">Start another draft</p>
                    <p className="text-xs">
                      Tailor your profile for a specific company or role
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-[#e7e7f3] flex flex-col items-center gap-4 bg-white">
        <div className="flex gap-6 text-gray-400">
          <a className="hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined">
              social_leaderboard
            </span>
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined">hub</span>
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined">mail</span>
          </a>
        </div>
        <p className="text-sm text-gray-400">
          © 2023 CV Builder Professional. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
