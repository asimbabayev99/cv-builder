'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const USER_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBsYhtAXQTA7BqKHtOD1kTv0rurbABmYsA6oXZoYfRGG6_eD4arQRa7s04WfDIyARH-gT1vpjIW9Pk5prri1lJCRzB_XkL3J0HyZV77JcADZUJSJ7hd_D1chSHnSfUaBkayuVlS8F7_PCR6zQq33IaKTT-ABBCgEn10leJ_zFiASrS7HtlNgCD01THX02FZKaqgb2MQGMEecAE_ZyrhawSyQ2whrdPO3d1oANrdO9v7V0N2OBplULOJBXnnUu9P8aWgfi2VVyUP82E';

function LogoIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface NavItem {
  label: string;
  href: string;
}

const HOME_NAV: NavItem[] = [
  { label: 'Templates', href: '/templates' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const PROFILE_NAV: NavItem[] = [
  { label: 'Dashboard', href: '/' },
  { label: 'My CVs', href: '/profile/resumes' },
  { label: 'Templates', href: '/templates' },
  { label: 'Personal Data', href: '/profile' },
];

export default function AppHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isProfileSection = pathname.startsWith('/profile');

  const navItems = isProfileSection ? PROFILE_NAV : HOME_NAV;

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f0f0f4] bg-white/80 backdrop-blur-md px-10 py-3 sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-4 text-primary">
        <LogoIcon />
        <h2 className="text-[#111118] text-xl font-bold leading-tight tracking-[-0.015em]">
          ResumePro
        </h2>
      </Link>
      <div className="flex flex-1 justify-end gap-8 items-center">
        <nav className="hidden md:flex items-center gap-9">
          {navItems.map((item) => {
            const isActive =
              item.href === '/profile'
                ? pathname === '/profile'
                : item.href !== '/' &&
                  !item.href.startsWith('#') &&
                  pathname.startsWith(item.href);

            return item.href.startsWith('#') ? (
              <a
                key={item.label}
                href={item.href}
                className="text-[#111118] text-sm font-medium leading-normal hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={
                  isActive
                    ? 'text-primary text-sm font-bold leading-normal'
                    : 'text-[#111118] text-sm font-medium leading-normal hover:text-primary transition-colors'
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        {isProfileSection ? (
          <Link
            href="/profile"
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10 border border-gray-200"
            style={{
              backgroundImage: `url("${session?.user?.image || USER_AVATAR_URL}")`,
            }}
          />
        ) : session ? (
          <Link
            href="/profile"
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10 border border-gray-200"
            style={{
              backgroundImage: `url("${session.user?.image || USER_AVATAR_URL}")`,
            }}
          />
        ) : (
          <Link
            href="/auth/signin"
            className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
          >
            <span className="truncate">Login</span>
          </Link>
        )}
      </div>
    </header>
  );
}
