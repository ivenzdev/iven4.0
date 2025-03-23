import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

import '@/app/style/normalize.css';
import '@/app/style/globals.css';

export const metadata: Metadata = {
  title: 'Iven Zhang | Software Engineer',
  description:
    'Experienced software engineer with expertise in building startups from 0 to 1. Specializing in React, Next.js, and full-stack development to create innovative, scalable products that drive business growth. View my portfolio and connect for collaboration opportunities.',
  openGraph: {
    title: 'Iven Zhang | Software Engineer',
    description:
      'Experienced software engineer with expertise in building startups from 0 to 1. Specializing in React, Next.js, and full-stack development to create innovative, scalable products that drive business growth. View my portfolio and connect for collaboration opportunities.',
    images: [
      {
        url: 'https://ivenzhang.com/profile.png',
        width: 630,
        height: 630,
        alt: 'Iven Zhang - Software Engineer',
      },
    ],
    url: 'https://ivenzhang.com',
    siteName: 'Iven Zhang Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Iven Zhang | Software Engineer',
    description:
      'Experienced software engineer with expertise in building startups from 0 to 1. Specializing in React, Next.js, and full-stack development to create innovative, scalable products that drive business growth. View my portfolio and connect for collaboration opportunities.',
    images: ['https://ivenzhang.com/profile.png'],
  },
  alternates: {
    canonical: 'https://ivenzhang.com',
  },
  icons: {
    icon: './favicon.ico',
  },
  verification: {
    google: 'vnqJ0AEpZJj7dQ66et7F1aAfDUQrUaqv-7_uqINU6xg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      {process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId='G-F2VQ070RJY' />}
      <body>{children}</body>
    </html>
  );
}
