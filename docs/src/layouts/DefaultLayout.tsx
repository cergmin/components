import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import { ISidebarItems } from '@/components/SidebarNav';
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
  ];

  const iconLinks = [
    {
      icon: '/resources/images/github.svg',
      url: 'https://github.com/cergmin/components',
    },
  ];

  const sidebarItems: ISidebarItems = [
    {
      type: 'link',
      title: 'Home',
      url: '/',
    },
    {
      type: 'group',
      title: 'Getting Started',
      items: [
        {
          type: 'link',
          title: 'Introduction',
          url: '/docs/getting-started/introduction',
        },
        {
          type: 'link',
          title: 'Contribute',
          url: '/docs/getting-started/contribute',
        },
      ],
    },
    {
      type: 'group',
      title: 'Components',
      items: [
        {
          type: 'link',
          title: 'Button',
          url: '/docs/components/button',
        },
      ],
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
        <title>Components</title>

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

        <link
          rel="icon"
          type="image/png"
          sizes="120x120"
          href="/resources/images/favicons/favicon-120x120.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/resources/images/favicons/android-icon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/resources/images/favicons/apple-touch-icon-180x180.png"
        />
        <link
          rel="mask-icon"
          color="#0f7bff"
          href="/resources/images/favicons/safari-pinned-tab.svg"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/resources/images/favicons/any.svg"
        />
      </Head>
      <Header
        logoUrl={'/resources/images/logo.svg'}
        navLinks={navLinks}
        iconLinks={iconLinks}
        sidebarItems={sidebarItems}
        currentPathname={router.asPath}
      />
      {children}
      <Footer columns={footerColumns} libVersion={libVersion} />
    </>
  );
}

export default DefaultLayout;
