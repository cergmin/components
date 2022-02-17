import { useRef, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import isCurrentPage from '@/utilities/isCurrentPage';
import SidebarNav, { ISidebarItems } from '@/components/SidebarNav';
import s from './Header.module.css';

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
  sidebarItems: ISidebarItems;
  currentPathname: string;
}

const Header = ({
  logoUrl,
  navLinks,
  iconLinks,
  sidebarItems,
  currentPathname,
}: HeaderProps) => {
  const [isSidebarNavOpen, setIsSidebarNavOpen] = useState(false);
  const openSidebarNavButtonRef = useRef(null);

  return (
    <>
      <SidebarNav
        items={sidebarItems}
        currentPathname={currentPathname}
        open={isSidebarNavOpen}
        onClose={() => {
          setIsSidebarNavOpen(false);
          openSidebarNavButtonRef.current.focus();
        }}
      />
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

            <button
              className={s.menuOpenButton}
              aria-label="Open menu"
              onClick={() => setIsSidebarNavOpen(true)}
              ref={openSidebarNavButtonRef}>
              <svg
                className={s.menuOpenButtonIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512">
                {/*
                Font Awesome Pro 6.0.0 by @fontawesome https://fontawesome.com
                License https://fontawesome.com/license (Commercial License)
                Copyright 2022 Fonticons, Inc.
              */}
                <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
