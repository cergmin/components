import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '@cergmin/components';
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
        <Link href="/docs/getting-started/introduction/" passHref>
          <Button className={s.button} size="large">
            Get started
          </Button>
        </Link>
        <Link href="https://github.com/cergmin/components" passHref>
          <Button
            className={s.button}
            size="large"
            appearance="secondary"
            target="_blank">
            GitHub
          </Button>
        </Link>
      </div>
    </section>
  );
};
export default Intro;
