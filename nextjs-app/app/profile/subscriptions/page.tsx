'use client';

import ProfileSidebar from '@/components/ProfileSidebar';
import AppHeader from '@/components/AppHeader';

const BILLING_HISTORY = [
  {
    date: 'Sep 24, 2023',
    plan: 'Premium Plan (Monthly)',
    amount: '$19.99',
  },
  {
    date: 'Aug 24, 2023',
    plan: 'Premium Plan (Monthly)',
    amount: '$19.99',
  },
  {
    date: 'Jul 24, 2023',
    plan: 'Free Trial Activation',
    amount: '$0.00',
  },
];

export default function SubscriptionsPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc]">
      <AppHeader />

      {/* Main Content */}
      <main className="flex-1 flex justify-center py-8">
        <div className="flex flex-col lg:flex-row w-full max-w-[1200px] px-4 md:px-10 gap-8">
          <ProfileSidebar />

          <div className="flex-1 flex flex-col">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap gap-2 py-2 mb-4">
              <a
                className="text-gray-500 text-sm font-medium leading-normal hover:underline"
                href="/profile"
              >
                Account
              </a>
              <span className="text-gray-400 text-sm font-medium leading-normal">
                /
              </span>
              <span className="text-[#0e0d1b] text-sm font-medium leading-normal">
                Subscription
              </span>
            </nav>

            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-[#0e0d1b] text-4xl font-black leading-tight tracking-[-0.033em]">
                  Subscription &amp; Billing
                </h1>
                <p className="text-gray-500 text-base font-normal leading-normal">
                  Manage your plan, payment methods, and billing history.
                </p>
              </div>
              <button
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm"
                type="button"
              >
                Change Plan
              </button>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              {/* Current Plan Card */}
              <div className="bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-primary text-xs font-bold tracking-widest uppercase">
                      Current Plan
                    </p>
                    <h3 className="text-[#0e0d1b] text-2xl font-bold leading-tight">
                      Premium Plan
                    </h3>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
                    ACTIVE
                  </span>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-500">
                    <span className="material-symbols-outlined text-primary">
                      calendar_today
                    </span>
                    <p className="text-sm">
                      Renews on Oct 24, 2023{' '}
                      <span className="font-semibold text-[#0e0d1b]">
                        ($19.99/mo)
                      </span>
                    </p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-6 justify-between items-center">
                      <p className="text-[#0e0d1b] text-sm font-semibold leading-normal">
                        AI Suggestions Used
                      </p>
                      <p className="text-primary text-sm font-bold leading-normal">
                        45 / 100
                      </p>
                    </div>
                    <div className="rounded-full bg-[#d0cfe7] h-2.5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: '45%' }}
                      />
                    </div>
                    <p className="text-gray-500 text-xs font-medium leading-normal">
                      55 suggestions remaining this month
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Methods Card */}
              <div className="bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-[#0e0d1b] text-lg font-bold">
                    Payment Methods
                  </p>
                  <button
                    className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">
                      add
                    </span>{' '}
                    Add New
                  </button>
                </div>
                <div className="space-y-4 flex-grow">
                  {/* Saved Card */}
                  <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-primary/50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center overflow-hidden border border-gray-200">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          credit_card
                        </span>
                      </div>
                      <div>
                        <p className="text-[#0e0d1b] font-bold text-sm">
                          Visa ending in 4242
                        </p>
                        <p className="text-gray-500 text-xs">
                          Expiry 12/2026 •{' '}
                          <span className="text-primary font-medium">
                            Primary
                          </span>
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      type="button"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <p className="text-gray-500 text-xs">
                    Payment information is secured with 256-bit SSL encryption.
                  </p>
                </div>
              </div>
            </div>

            {/* Billing History Table */}
            <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-[#0e0d1b] text-lg font-bold">
                  Billing History
                </h3>
                <button
                  className="text-gray-500 text-sm font-medium flex items-center gap-2 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">
                    filter_list
                  </span>{' '}
                  Filter
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Plan</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {BILLING_HISTORY.map((item, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-[#0e0d1b] font-medium">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {item.plan}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#0e0d1b] font-bold">
                          {item.amount}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-xs font-bold text-green-600">
                              Paid
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            className="text-primary hover:text-primary/70"
                            type="button"
                          >
                            <span className="material-symbols-outlined">
                              picture_as_pdf
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-100 flex justify-center">
                <button
                  className="text-primary text-sm font-bold hover:underline"
                  type="button"
                >
                  View All History
                </button>
              </div>
            </div>

            {/* Upsell Banner */}
            <div className="mt-12 mb-20 p-8 rounded-xl bg-gradient-to-r from-primary to-[#8b89f8] text-white relative overflow-hidden flex flex-col items-center text-center">
              <div className="relative z-10 max-w-2xl">
                <h3 className="text-2xl font-black mb-4 tracking-tight">
                  Save 20% by switching to Yearly Billing
                </h3>
                <p className="text-white/80 mb-6 text-base font-medium">
                  Join 50,000+ professionals using our advanced AI features to
                  land their dream jobs. Cancel anytime.
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
                    type="button"
                  >
                    Switch to Yearly
                  </button>
                  <button
                    className="bg-transparent border-2 border-white/40 hover:border-white text-white px-8 py-3 rounded-lg font-bold transition-all"
                    type="button"
                  >
                    Learn More
                  </button>
                </div>
              </div>
              {/* Abstract background shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10" />
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
