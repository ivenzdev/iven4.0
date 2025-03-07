import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/style/normalize.css';
import '@/app/style/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
