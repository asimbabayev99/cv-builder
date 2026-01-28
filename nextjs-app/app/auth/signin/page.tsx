'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { authenticate } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-70"
      type="submit"
      disabled={pending}
    >
      {pending ? 'Signing in...' : 'Log In'}
      {!pending && (
        <span className="material-symbols-outlined !text-xl group-hover:translate-x-1 transition-transform">
          arrow_forward
        </span>
      )}
    </button>
  );
}

export default function SignInPage() {
  const [errorMessage, formAction] = useFormState(authenticate, undefined);

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

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
              Build your career story.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Join thousands of professionals using our tools to land their
              dream jobs with AI-optimized resumes.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
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

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900">
                Welcome Back
              </h2>
              <p className="text-slate-500 mt-2">
                Please enter your details to sign in.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
                <span className="material-symbols-outlined text-red-500 !text-lg">
                  error
                </span>
                <p className="text-sm text-red-600 font-medium">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Form */}
            <form className="space-y-5" action={formAction}>
              <div>
                <label
                  className="block text-sm font-semibold text-slate-700 mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  type="email"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="block text-sm font-semibold text-slate-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Link
                    className="text-xs font-semibold text-primary hover:underline"
                    href="/auth/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  required
                />
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                  id="remember"
                  type="checkbox"
                />
                <label
                  className="text-sm text-slate-600 font-medium"
                  htmlFor="remember"
                >
                  Keep me logged in
                </label>
              </div>

              <SubmitButton />
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-medium tracking-widest">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-all text-slate-700 font-semibold text-sm"
              type="button"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-slate-500 mt-8 text-sm">
              Don&apos;t have an account?{' '}
              <Link
                className="text-primary font-bold hover:underline"
                href="/auth/signup"
              >
                Sign Up
              </Link>
            </p>
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
