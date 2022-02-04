import Link from 'next/link';
import clsx from 'clsx';
import s from './Showcase.module.css';

interface ShowcaseProps {
  className: string;
  items: {
    title: string;
    previewImage: string;
    url: string;
  }[];
}

const Showcase = ({ className, items }: ShowcaseProps) => {
  return (
    <section className={clsx(s.showcase, className)}>
      <h2 className={s.title}>Showcase</h2>
      <ul className={s.list}>
        {items.map((item) => (
          <li className={s.listItem} key={item.url}>
            <Link href={item.url}>
              <a className={s.card}>
                <div className={s.cardPreview}>
                  <img
                    className={s.cardPreviewImage}
                    alt={`${item.title} component preview image`}
                    src={item.previewImage}
                  />
                </div>
                <h3 className={s.cardTitle}>{item.title}</h3>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Showcase;
