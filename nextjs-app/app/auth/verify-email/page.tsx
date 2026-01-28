'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [resent, setResent] = useState(false);

  return (
    <>
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-50 relative items-center justify-center p-12 overflow-hidden border-r border-slate-200">
        {/* Dot pattern background */}
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(#4245f0 0.5px, transparent 0.5px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-lg">
          {/* Resume mockup card */}
          <div className="aspect-square bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 flex flex-col gap-6">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">
                  badge
                </span>
              </div>
              <div>
                <div className="h-4 w-32 bg-slate-200 rounded-full mb-2" />
                <div className="h-3 w-20 bg-slate-100 rounded-full" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-slate-50 rounded-full" />
              <div className="h-4 w-full bg-slate-50 rounded-full" />
              <div className="h-4 w-3/4 bg-slate-50 rounded-full" />
            </div>
            <div className="mt-auto pt-6 flex justify-between items-end">
              <div className="space-y-2">
                <div className="h-3 w-24 bg-slate-100 rounded-full" />
                <div className="h-3 w-16 bg-slate-100 rounded-full" />
              </div>
              <div className="w-24 h-24 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-300 text-4xl">
                  add_photo_alternate
                </span>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="mt-12 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
              One last step.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Verify your email to unlock all features and start building your
              professional resume.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[440px]">
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary text-white p-2 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined !text-2xl">
                  description
                </span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                ResumePro
              </h1>
            </div>

            {/* Content */}
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-primary text-4xl">
                  forward_to_inbox
                </span>
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
                Check Your Email
              </h2>
              <p className="text-slate-500 leading-relaxed mb-2">
                We&apos;ve sent an activation link to
              </p>
              <p className="text-slate-900 font-bold mb-8">
                john.doe@example.com
              </p>

              {/* Steps */}
              <div className="bg-slate-50 rounded-xl p-5 text-left space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-bold">1</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Open the email from{' '}
                    <span className="font-semibold text-slate-900">
                      ResumePro
                    </span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-bold">2</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Click the{' '}
                    <span className="font-semibold text-slate-900">
                      activation link
                    </span>{' '}
                    in the email
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-bold">3</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Start building your{' '}
                    <span className="font-semibold text-slate-900">
                      professional resume
                    </span>
                  </p>
                </div>
              </div>

              {/* Resend */}
              <div className="space-y-4">
                {resent ? (
                  <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 py-3 rounded-xl">
                    <span className="material-symbols-outlined !text-lg">
                      check_circle
                    </span>
                    <span className="text-sm font-semibold">
                      Email resent successfully
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => setResent(true)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition-all text-sm"
                    type="button"
                  >
                    Resend Activation Email
                  </button>
                )}

                <Link
                  href="/auth/signin"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
                >
                  Go to Log In
                  <span className="material-symbols-outlined !text-xl group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>

              {/* Help note */}
              <p className="text-slate-400 text-xs mt-6 leading-relaxed">
                Can&apos;t find the email? Check your spam folder or{' '}
                <a
                  className="text-primary font-semibold hover:underline"
                  href="#"
                >
                  contact support
                </a>
                .
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-12 flex items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <a
              className="hover:text-slate-600 transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <a
              className="hover:text-slate-600 transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <a
              className="hover:text-slate-600 transition-colors"
              href="#"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
