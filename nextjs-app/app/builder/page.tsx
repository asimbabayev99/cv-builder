'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Preserve query params (e.g. ?template=modern&id=5) when redirecting
    const params = searchParams.toString();
    const query = params ? `?${params}` : '';
    router.replace(`/builder/photo${query}`);
  }, [router, searchParams]);

  return null;
}
