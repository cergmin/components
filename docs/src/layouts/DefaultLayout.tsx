import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export interface DefaultLayoutProps {
  children: ReactNode;
  libVersion: string;
}

function DefaultLayout({ children, libVersion }: DefaultLayoutProps) {
  const router = useRouter();

  const navLinks = [
    {
      text: 'Home',
      url: '/',
      urlPathname: '/',
    },
    {
      text: 'Docs',
      url: '/docs/getting-started/introduction',
      urlPathname: '/docs',
    },
    {
      text: 'Examples',
      url: '/examples',
      urlPathname: '/examples',
    },
  ];

  const iconLinks = [
    {
      icon: '/resources/images/github.svg',
      url: 'https://github.com/cergmin/components',
    },
  ];

  const footerColumns = [
    {
      title: 'Links',
      links: [
        {
          text: 'Releases',
          url: 'https://github.com/cergmin/components/releases',
          external: true,
        },
        {
          text: 'GitHub',
          url: 'https://github.com/cergmin/components',
          external: true,
        },
        {
          text: 'License',
          url: 'https://github.com/cergmin/components/blob/main/LICENSE',
          external: true,
        },
      ],
    },
    {
      title: 'Contacts',
      links: [
        {
          text: 'Telegram',
          url: 'https://t.me/cergmin',
          external: true,
        },
        {
          text: 'Email',
          url: 'mailto:cergmin@gmail.com',
        },
        {
          text: 'Twitter',
          url: 'https://twitter.com/cergmin',
          external: true,
        },
      ],
    },
    {
      title: 'Technologies',
      links: [
        {
          text: 'Font Awesome',
          url: 'https://fontawesome.com',
          external: true,
        },
        {
          text: 'Next.js',
          url: 'https://nextjs.org',
          external: true,
        },
        {
          text: 'Vercel',
          url: 'https://vercel.com',
          external: true,
        },
      ],
    },
  ];

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Library of React components" />
        <meta name="robots" content="index, follow" />
        <meta name="color-scheme" content="light" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <title>Components</title>

        <link
          rel="icon"
          href="/resources/images/favicons/favicon.ico"
          sizes="any"
        />
        <link
          rel="apple-touch-icon"
          href="/resources/images/favicons/180x180_maskable.png"
        />
        <link
          rel="icon"
          href="/resources/images/favicons/favicon.svg"
          type="image/svg+xml"
        />
        <meta
          name="yandex-tableau-widget"
          content="logo=/resources/images/favicons/512x512.png, color=#024fbf"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,500&display=swap"
          rel="stylesheet"
        />

        <meta property="og:title" content="Components" />
        <meta property="og:description" content="Library of React components"/>
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://components-cergmin.vercel.app/"
        />
      </Head>
      <Header
        logoUrl={'/resources/images/logo.svg'}
        navLinks={navLinks}
        iconLinks={iconLinks}
        currentPathname={router.pathname}
      />
      {children}
      <Footer columns={footerColumns} libVersion={libVersion} />
    </>
  );
}

export default DefaultLayout;
