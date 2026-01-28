'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  label: string;
  icon: string;
  href: string;
}

const MENU_ITEMS: MenuItem[] = [
  { label: 'Account', icon: 'person', href: '/profile' },
  { label: 'My Resumes', icon: 'description', href: '/profile/resumes' },
  { label: 'Subscriptions', icon: 'card_membership', href: '/profile/subscriptions' },
];

export default function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="flex flex-col gap-1 sticky top-24">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive
                  ? 'bg-white shadow-sm border border-primary/20'
                  : 'hover:bg-white'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] ${
                  isActive
                    ? 'text-primary fill-1'
                    : 'text-gray-400 group-hover:text-primary'
                }`}
              >
                {item.icon}
              </span>
              <p
                className={`text-sm ${
                  isActive
                    ? 'font-bold text-primary'
                    : 'font-medium text-gray-600 group-hover:text-[#0d0e1b]'
                }`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}

        <div className="h-px bg-gray-200 my-4" />

        <Link
          href="/api/auth/signout"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white transition-all group text-red-500"
        >
          <span className="material-symbols-outlined text-[22px]">logout</span>
          <p className="text-sm font-medium">Logout</p>
        </Link>
      </div>
    </aside>
  );
}
