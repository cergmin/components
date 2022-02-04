import Link from 'next/link';
import clsx from 'clsx';
import s from './Intro.module.css';

interface IntroProps {
  className: string;
}

const Intro = ({ className }: IntroProps) => {
  return (
    <section className={clsx(s.intro, className)}>
      <h1 className={s.title}>Components</h1>
      <p className={s.description}>Library of React components.</p>
      <div className={s.buttonList}>
        <Link href="/docs/getting-started/introduction/">
          <a className={s.button}>Get started</a>
        </Link>
        <Link href="https://github.com/cergmin/components">
          <a
            className={clsx(s.button, s.secondary)}
            target="_blank"
            rel="noopener noreferrer">
            GitHub
          </a>
        </Link>
      </div>
    </section>
  );
};
export default Intro;
