import Link from 'next/link';
import clsx from 'clsx';
import s from './Footer.module.css';

interface FooterProps {
  columns: {
    title: string;
    links: {
      text: string;
      url: string;
      external?: boolean;
    }[];
  }[];
  libVersion: string;
}

const Footer = ({ columns, libVersion }: FooterProps) => {
  return (
    <footer className={s.footer}>
      <h2 className="visually-hidden">Footer</h2>

      <div className="wrapper">
        <div className={s.layout}>
          <div className={s.layoutLeft}>
            <div className={s.column}>
              <p className={s.description}>
                Designed and built
                <br />
                by&nbsp;
                <Link href="https://github.com/cergmin">
                  <a
                    className={clsx(s.link, s.highlighted)}
                    target="_blank"
                    rel="noopener noreferrer">
                    Sergey&nbsp;Minakov
                  </a>
                </Link>
                .
              </p>
              <p className={s.description}>
                Code licensed&#160;
                <Link href="https://github.com/cergmin/components/blob/main/LICENSE">
                  <a
                    className={clsx(s.link, s.highlighted)}
                    target="_blank"
                    rel="noopener noreferrer">
                    MIT
                  </a>
                </Link>
                .
              </p>
              <p className={s.description}>Current version: {libVersion}.</p>
            </div>
          </div>
          <div className={s.layoutRight}>
            {columns.map((column) => (
              <div className={s.column} key={column.title}>
                <h3 className={s.columnTitle}>{column.title}</h3>
                <ul className={s.list}>
                  {column.links.map((link) => (
                    <li className={s.listItem} key={link.url}>
                      <Link href={link.url}>
                        <a
                          className={s.link}
                          target={link.external && '_blank'}
                          rel={link.external && 'noopener noreferrer'}>
                          {link.text}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
