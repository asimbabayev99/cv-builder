import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Choose Template - CV Builder',
  description: 'Pick from our collection of professionally designed CV templates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Allura|Dancing+Script|Dynalight|Mrs+Saint+Delafield|Fira+Sans|PT+Sans|Saira|Blinker|PT+Sans+Caption|Bodoni+MT|Oswald|Source+Sans+Pro"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/all.min.css" />
        <link rel="stylesheet" href="/css/main-1.0.0.380.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
