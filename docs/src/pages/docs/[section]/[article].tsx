import { HTMLAttributeAnchorTarget, ReactNode, useMemo } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import matter from 'gray-matter';
import { getSections, ISections } from '@/utilities/getSections';
import { getContent } from '@/utilities/getContent';
import DocsNav, { IDocsNavSection } from '@/components/DocsNav';
import s from '@/resources/styles/pages/docs.module.css';

import Playground from '@/components/Playground';
import Example, { IExmapleProps } from '@/components/Example';
import Code from '@/components/Code';
import * as components from '@cergmin/components';

interface DocsPageProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  frontMatter: {
    title?: string;
    source?: string;
  };
  section: string;
  article: string;
  sections: ISections;
}

const mdxComponents = {
  ...components,
  Playground,
  Example: (props: IExmapleProps) => (
    <Example {...props} className={s.example} />
  ),
  code: Code,
  a: ({
    children,
    href,
    target,
  }: {
    children: ReactNode;
    href: string;
    target?: HTMLAttributeAnchorTarget;
  }) => (
    <Link href={href}>
      <a className={s.link} target={target} rel="noopener noreferrer">
        {children}
      </a>
    </Link>
  ),
};

function DocsPage({
  source,
  frontMatter,
  section,
  article,
  sections,
}: DocsPageProps) {
  const docsNavSections = useMemo(() => {
    const docsNav: IDocsNavSection[] = [];

    for (const sectionKey in sections) {
      const section = sections[sectionKey];

      docsNav.push({
        title: section.title,
        key: sectionKey,
        articles: section.articles.map((article) => ({
          title: article.title,
          url: `/docs/${sectionKey}/${article.key}`,
        })),
      });
    }

    return docsNav;
  }, [sections]);

  return (
    <div className="wrapper">
      <div className={s.layout}>
        <aside className={s.nav}>
          <DocsNav
            sections={docsNavSections}
            currentPathname={`/docs/${section}/${article}`}
          />
        </aside>
        <main className={s.content}>
          <h1>{frontMatter.title}</h1>
          <MDXRemote {...source} components={mdxComponents} />
        </main>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const sections = await getSections();
  const paths = [];

  for (const sectionKey in sections) {
    const section = sections[sectionKey];
    const articles = section.articles.map((article) => article.key);

    for (const articleKey of articles) {
      paths.push({
        params: {
          section: sectionKey,
          article: articleKey,
        },
      });
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const source = await getContent(`docs/${params.section}/${params.article}`);

  const { content, data } = matter(source);
  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      section: params.section,
      article: params.article,
      sections: await getSections(),
    },
  };
};

export default DocsPage;
