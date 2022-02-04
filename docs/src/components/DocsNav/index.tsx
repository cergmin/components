import { MouseEvent } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import s from './DocsNav.module.css';

export interface IDocsNavSection {
  title: string;
  key: string;
  articles: {
    title: string;
    url: string;
  }[];
}

interface DocsNavProps {
  sections: IDocsNavSection[];
  currentPathname: string;
}

const DocsNav = ({ sections, currentPathname }: DocsNavProps) => {
  function handleSectionClick(e: MouseEvent<HTMLButtonElement>) {
    const sectionButton = e.currentTarget;
    const isExpanded = sectionButton.getAttribute('aria-expanded') === 'true';
    sectionButton.setAttribute('aria-expanded', (!isExpanded).toString());
  }

  return (
    <nav className={s.docNav} aria-label="Docs navigation">
      <ul className={s.list}>
        {sections.map((section) => (
          <li className={s.listItem} key={section.key}>
            <button
              className={clsx(s.link, s.sectionLink)}
              aria-expanded="true"
              onClick={handleSectionClick}>
              {section.title}
            </button>

            <ul className={clsx(s.list, s.sublist)}>
              {section.articles.map((article) => (
                <li className={s.listItem} key={article.url}>
                  <Link href={article.url}>
                    <a
                      className={clsx(
                        s.link,
                        article.url === currentPathname && s.selected,
                      )}>
                      {article.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default DocsNav;
