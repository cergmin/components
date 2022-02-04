import process from 'process';
import { join } from 'path';
import { readdirSync, readFileSync, lstatSync } from 'fs';
import matter from 'gray-matter';
import { getMeta, sortByMetaOrder } from '@/utilities/getMeta';

export interface IArticle {
  title: string;
  key: string;
}

export interface ISections {
  [key: string]: {
    title: string;
    articles: IArticle[];
  };
}

export async function getSections(): Promise<ISections> {
  const sections: ISections = {};

  const docsPath = join(process.env.ROOT_PATH, 'src/content/docs');
  const docsMeta = await getMeta(docsPath);
  const sectionFolders = sortByMetaOrder(readdirSync(docsPath), docsMeta);

  for (const sectionFolder of sectionFolders) {
    const sectionFolderPath = join(docsPath, sectionFolder);
    const sectionMeta = await getMeta(sectionFolderPath);

    // Checks if sectionFolder is directory
    if (!lstatSync(sectionFolderPath).isDirectory()) {
      continue;
    }

    const articleFolders = sortByMetaOrder(
      readdirSync(sectionFolderPath),
      sectionMeta,
    );

    const articles: IArticle[] = [];
    for (const articleFolder of articleFolders) {
      const articleFolderPath = join(docsPath, sectionFolder, articleFolder);

      // Checks if articleFolder is directory
      if (!lstatSync(articleFolderPath).isDirectory()) {
        continue;
      }

      const articleMarkdown = readFileSync(
        join(articleFolderPath, 'index.mdx'),
        'utf-8',
      );

      const { data } = matter(articleMarkdown);

      articles.push({
        title: data.title || '',
        key: articleFolder,
      });
    }

    sections[sectionFolder] = {
      title: sectionMeta.name || sectionFolder,
      articles: articles,
    };
  }

  return sections;
}
