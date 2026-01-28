'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

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
              Almost there.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Set a new password and you&apos;ll be back to crafting your
              perfect resume in no time.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Reset Password Form */}
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

            {submitted ? (
              <>
                {/* Success State */}
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-green-600 text-3xl">
                      check_circle
                    </span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
                    Password Reset
                  </h2>
                  <p className="text-slate-500 mb-8 leading-relaxed">
                    Your password has been successfully updated. You can now log
                    in with your new password.
                  </p>
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
              </>
            ) : (
              <>
                {/* Heading */}
                <div className="mb-8">
                  <h2 className="text-3xl font-extrabold text-slate-900">
                    Reset Password
                  </h2>
                  <p className="text-slate-500 mt-2">
                    Enter your new password below.
                  </p>
                </div>

                {/* Form */}
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div>
                    <label
                      className="block text-sm font-semibold text-slate-700 mb-2"
                      htmlFor="password"
                    >
                      New Password
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                      id="password"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold text-slate-700 mb-2"
                      htmlFor="confirmPassword"
                    >
                      Confirm New Password
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                      id="confirmPassword"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>

                  {/* Password requirements */}
                  <div className="bg-slate-50 rounded-xl p-4 space-y-2.5">
                    <p className="text-xs font-semibold text-slate-700 mb-1">
                      Password must contain:
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-300 !text-base">
                        check_circle
                      </span>
                      <span className="text-xs text-slate-500">
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-300 !text-base">
                        check_circle
                      </span>
                      <span className="text-xs text-slate-500">
                        One uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-300 !text-base">
                        check_circle
                      </span>
                      <span className="text-xs text-slate-500">
                        One number or special character
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
                    type="submit"
                  >
                    Reset Password
                    <span className="material-symbols-outlined !text-xl group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </form>

                {/* Back to Login */}
                <div className="mt-8 text-center">
                  <Link
                    href="/auth/signin"
                    className="inline-flex items-center gap-2 text-slate-500 text-sm font-medium hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined !text-lg">
                      arrow_back
                    </span>
                    Back to Log In
                  </Link>
                </div>
              </>
            )}
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
