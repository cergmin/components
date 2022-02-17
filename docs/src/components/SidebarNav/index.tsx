import {
  AnimationEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
  MutableRefObject,
} from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import isCurrentPage from '@/utilities/isCurrentPage';
import getScrollbarWidth from '@/utilities/getScrollbarWidth';
import s from './SidebarNav.module.css';

interface SidebarItemLink {
  type: 'link';
  title: string;
  url: string;
}

interface SidebarItemGroup {
  type: 'group';
  title: string;
  items: (SidebarItemLink | SidebarItemGroup)[];
}

export type ISidebarItems = (SidebarItemLink | SidebarItemGroup)[];

interface SidebarNavProps {
  className?: string;
  items: ISidebarItems;
  currentPathname: string;
  open?: boolean;
  onClose?: () => void;
}

const getItemsList = (
  items: ISidebarItems,
  currentPathname: string,
  closeHandler: () => void,
  ref: MutableRefObject<HTMLUListElement> | undefined,
  className = '',
  nestingLevel = 0,
): ReactNode => {
  return (
    <ul
      className={clsx(s.list, className)}
      data-nesting-level={nestingLevel}
      ref={ref}>
      {items.map((item) => {
        if (item.type === 'link') {
          return (
            <li className={s.listItem}>
              <Link href={item.url}>
                <a
                  className={clsx(
                    s.listLink,
                    isCurrentPage(item.url, currentPathname) && s.selected,
                  )}
                  onClick={closeHandler}>
                  {item.title}
                </a>
              </Link>
            </li>
          );
        }

        if (item.type === 'group') {
          return (
            <li className={s.listItem}>
              <span className={s.listTitle}>{item.title}</span>
              {getItemsList(
                item.items,
                currentPathname,
                closeHandler,
                undefined,
                '',
                nestingLevel + 1,
              )}
            </li>
          );
        }
      })}
    </ul>
  );
};

const SidebarNav = ({
  className,
  items,
  currentPathname,
  open,
  onClose,
}: SidebarNavProps) => {
  const [isVisisible, setIsVisible] = useState(false);
  const closeButtonRef = useRef(null);
  const contentBlockRef = useRef(null);

  const closeHandler = () => {
    if (onClose) {
      onClose();
    }
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    const { code } = e;
    if (code === 'Escape') {
      closeHandler();
    }
  };

  const animationEndHandler: AnimationEventHandler = () => {
    if (!open) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    setIsVisible(true);

    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open]);

  useEffect(() => {
    if (!isVisisible) {
      return;
    }

    window.addEventListener('keydown', keyDownHandler);
    closeButtonRef.current.focus();

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [isVisisible]);

  if (!isVisisible) {
    return <></>;
  }

  return (
    <>
      <div
        className={clsx(
          s.sidebarShade,
          open ? s.animationFadeEnter : s.animationFadeLeave,
        )}
        onClick={closeHandler}
      />
      <nav
        className={clsx(
          s.sidebar,
          open ? s.animationSlideEnter : s.animationSlideLeave,
          className,
        )}
        role="dialog"
        aria-label="Sidebar"
        onAnimationEnd={animationEndHandler}>
        <div
          className={s.focusTrap}
          tabIndex={0}
          aria-hidden="true"
          onFocus={() => {
            const contentLinks = contentBlockRef.current.querySelectorAll('a');

            if (contentLinks.length === 0) {
              return;
            }

            const lastContentLink = contentLinks[contentLinks.length - 1];

            lastContentLink.focus();
          }}
        />
        <div className={s.topBar}>
          <h2 className={s.title}>Navigation</h2>
          <button
            className={s.menuCloseButton}
            onClick={closeHandler}
            aria-label="Close menu"
            ref={closeButtonRef}>
            <svg
              className={s.menuCloseButtonIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512">
              {/*
                Font Awesome Pro 6.0.0 by @fontawesome https://fontawesome.com
                License https://fontawesome.com/license (Commercial License)
                Copyright 2022 Fonticons, Inc.
              */}
              <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
            </svg>
          </button>
        </div>
        {getItemsList(
          items,
          currentPathname,
          closeHandler,
          contentBlockRef,
          s.content,
        )}
        <div
          className={s.focusTrap}
          tabIndex={0}
          aria-hidden="true"
          onFocus={() => closeButtonRef.current.focus()}
        />
      </nav>
    </>
  );
};
export default SidebarNav;
