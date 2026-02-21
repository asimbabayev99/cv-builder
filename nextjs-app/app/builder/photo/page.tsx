'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page is deprecated - profile photo is now part of Personal Info page
// Redirect to personal info page
export default function BuilderPhotoPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/builder/personal');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-[#616289]">Redirecting...</p>
      </div>
    </div>
  );
}
