import React from 'react';
import { getSections, ISections } from '@/utilities/getSections';
import Intro from '@/components/Intro';
import HowToInstall from '@/components/HowToInstall';
import Showcase from '@/components/Showcase';
import s from '@/resources/styles/pages/home.module.css';

interface HomePageProps {
  sections: ISections;
}

function HomePage({ sections }: HomePageProps) {
  const showcaseItems = sections.components.articles.map((article) => ({
    title: article.title,
    previewImage: `/resources/images/preview/${article.key}.svg`,
    url: `/docs/components/${article.key}`,
  }));

  return (
    <main>
      <div className="wrapper">
        <div className={s.home}>
          <Intro className={s.intro} />
          <HowToInstall className={s.install} />
          <Showcase className={s.showcase} items={showcaseItems} />
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  return { props: { sections: await getSections() } };
}

export default HomePage;
