'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ResumeProvider, useResume } from '@/contexts/ResumeContext';

function BuilderInit({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { loadResume, createResume, resumeId } = useResume();
  const searchParams = useSearchParams();
  const initRef = useRef(false);

  useEffect(() => {
    if (status !== 'authenticated' || !session) return;
    if (initRef.current) return;
    initRef.current = true;

    const idParam = searchParams.get('id');
    if (idParam) {
      loadResume(Number(idParam));
    } else if (!resumeId) {
      createResume('Untitled Resume');
    }
  }, [status, session, searchParams, loadResume, createResume, resumeId]);

  return <>{children}</>;
}

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResumeProvider>
      <BuilderInit>{children}</BuilderInit>
    </ResumeProvider>
  );
}
