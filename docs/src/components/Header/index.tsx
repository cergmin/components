import Link from 'next/link';
import clsx from 'clsx';
import s from './Header.module.css';

function isCurrentPage(
  targetPathname: string,
  currentPathname: string,
): boolean {
  const regexp = new RegExp(`^((${targetPathname}/)|(${targetPathname}$))`);
  return regexp.test(currentPathname);
}

interface HeaderProps {
  logoUrl: string;
  navLinks: {
    text: string;
    url: string;
    urlPathname: string;
  }[];
  iconLinks: {
    icon: string;
    url: string;
  }[];
  currentPathname: string;
}

const Header = ({
  logoUrl,
  navLinks,
  iconLinks,
  currentPathname,
}: HeaderProps) => {
  return (
    <header className={s.header}>
      <div className="wrapper">
        <div className={s.headerLayout}>
          <Link href="/">
            <a className={s.logoLink}>
              <img className={s.logoImage} src={logoUrl} alt="Logo" />
            </a>
          </Link>

          <nav className={s.nav}>
            <ul className={s.navList}>
              {navLinks.map((link) => (
                <li className={s.navListItem} key={link.url}>
                  <Link href={link.url}>
                    <a
                      className={clsx(
                        s.navLink,
                        isCurrentPage(link.urlPathname, currentPathname) &&
                          s.selected,
                      )}>
                      {link.text}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className={s.iconList}>
            {iconLinks.map((link) => (
              <li className={s.iconListItem} key={link.url}>
                <Link href={link.url}>
                  <a
                    className={s.iconLink}
                    target="_blank"
                    rel="noopener noreferrer">
                    <img className={s.iconImage} src={link.icon} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
export default Header;
