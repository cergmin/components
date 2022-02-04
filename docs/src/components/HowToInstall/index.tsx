import clsx from 'clsx';
import s from './HowToInstall.module.css';

interface HowToInstallProps {
  className: string;
}

const HowToInstall = ({ className }: HowToInstallProps) => {
  return (
    <section className={clsx(s.install, className)}>
      <h2 className={s.title}>Installation</h2>
      <p className={s.description}>Install the library via npm or pnpm.</p>
      <div className={s.codeList}>
        <code
          className={s.code}
          aria-label="Script to install the library via npm"
          tabIndex={0}>
          npm install @cergmin/components
        </code>
        <code
          className={s.code}
          aria-label="Script to install the library via pnpm (performant npm)"
          tabIndex={0}>
          pnpm add @cergmin/components
        </code>
      </div>
    </section>
  );
};
export default HowToInstall;
