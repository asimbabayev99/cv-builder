import type { Metadata } from 'next';
import AuthProvider from '@/components/AuthProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'ResumePro - Build a Professional Resume in Minutes',
  description: 'Our AI-powered resume builder helps you create a job-winning CV that passes ATS filters and impresses recruiters instantly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css?family=Allura|Dancing+Script|Dynalight|Mrs+Saint+Delafield|Fira+Sans|PT+Sans|Saira|Blinker|PT+Sans+Caption|Bodoni+MT|Oswald|Source+Sans+Pro&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-display">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
