'use client';

import { useState } from 'react';
import ProfileSidebar from '@/components/ProfileSidebar';
import AppHeader from '@/components/AppHeader';

export default function ProfilePage() {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 (555) 000-0000');
  const [location, setLocation] = useState('San Francisco, CA');
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc]">
      <AppHeader />

      {/* Main Content */}
      <main className="flex-1 flex justify-center py-8">
        <div className="flex flex-col lg:flex-row w-full max-w-[1100px] px-4 md:px-10 gap-8">
          <ProfileSidebar />

          <div className="flex-1 flex flex-col">
            {/* Breadcrumbs */}
            {/* <div className="flex flex-wrap gap-2 py-2">
              <a
                className="text-primary text-sm font-medium leading-normal flex items-center gap-1"
                href="/"
              >
                <span className="material-symbols-outlined text-sm">home</span>{' '}
                Home
              </a>
              <span className="text-gray-400 text-sm font-medium leading-normal">
                /
              </span>
              <span className="text-gray-500 text-sm font-medium leading-normal">
                Settings
              </span>
              <span className="text-gray-400 text-sm font-medium leading-normal">
                /
              </span>
              <span className="text-[#0d0e1b] text-sm font-bold leading-normal">
                Personal Data
              </span>
            </div> */}

            {/* Page Title */}
            <h1 className="text-[#0d0e1b] tracking-tight text-[32px] font-bold leading-tight pb-6 pt-4">
              Personal Data
            </h1>

            <div className="flex flex-col gap-6">
              {/* Section 1: Profile Picture */}
            <section className="p-6 bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.05)] border border-white">
              <h2 className="text-lg font-bold mb-4">Profile Picture</h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative group">
                  <div
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-md bg-center bg-no-repeat bg-cover"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBVdVlvPCdyiuZwcsI0LMEcVmBo21ieng7-LKb-wn8Pxs5Wy_UxX9ypW8YqShHzEhNpRd0ZMOurFSU35zamoLjaie1LifbYK1oVmyyznu_fVyiZMnLF6K1g_KBnFaQYkvs9sQuJfHetmGqwsGXgV22b6HJmLDuNXGR_LtzEjQRtwIAbrIl4ldsOvVTvhYct1Lja6tf8TIyCEMmeOqfHkYCbDCAeRZeE6yX7ynIVRRfT2NBtZqzfsoXYIVfLDM88bFhxtOUlvJLnjZI")',
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <span className="material-symbols-outlined text-white text-3xl">
                      photo_camera
                    </span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Your profile picture helps employers recognize you.
                    <br className="hidden md:block" />
                    Recommended size: 400x400px. JPG, PNG or GIF.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <button
                      className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold transition-all hover:bg-primary/90"
                      type="button"
                    >
                      Upload new
                    </button>
                    <button
                      className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-transparent border border-gray-200 text-[#0d0e1b] text-sm font-bold transition-all hover:bg-gray-50"
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Personal Information */}
            <section className="p-6 bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.05)] border border-white">
              <h2 className="text-lg font-bold mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm p-2.5 outline-none transition-all"
                    placeholder="Enter your first name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm p-2.5 outline-none transition-all"
                    placeholder="Enter your last name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm p-2.5 outline-none transition-all"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm p-2.5 outline-none transition-all"
                    placeholder="Enter your phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm p-2.5 outline-none transition-all"
                    placeholder="City, Country"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold transition-all hover:bg-primary/90 shadow-sm"
                  type="button"
                >
                  Save Changes
                </button>
              </div>
            </section>

            {/* Section 3: Security */}
            <section className="p-6 bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.05)] border border-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Security</h2>
                <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  Secure
                </span>
              </div>
              <div className="space-y-4">
                {/* Password */}
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <span className="material-symbols-outlined text-gray-500">
                        lock
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold">Password</p>
                      <p className="text-xs text-gray-500">
                        Last changed 3 months ago
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-primary text-sm font-bold hover:underline"
                    type="button"
                  >
                    Change
                  </button>
                </div>

                {/* Two-Factor */}
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <span className="material-symbols-outlined text-gray-500">
                        devices
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold">
                        Two-Factor Authentication
                      </p>
                      <p className="text-xs text-gray-500">
                        Adds an extra layer of security
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      twoFactor ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        twoFactor ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold transition-all hover:bg-primary/90 shadow-sm"
                  type="button"
                >
                  Save Changes
                </button>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="p-6 bg-red-50 rounded-xl border border-red-100 mb-12">
              <h2 className="text-lg font-bold text-red-700 mb-2">
                Delete Account
              </h2>
              <p className="text-sm text-red-600/80 mb-4">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <button
                className="flex items-center justify-center rounded-lg h-10 px-5 border border-red-200 text-red-700 text-sm font-bold transition-all hover:bg-red-100"
                type="button"
              >
                Deactivate Account
              </button>
            </section>
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
