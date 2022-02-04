import process from 'process';
import { join } from 'path';
import { readFileSync, existsSync, lstatSync } from 'fs';
// import matter from 'gray-matter';

export async function getContent(
  path: string,
  filename?: string,
): Promise<string> {
  filename = filename || 'index.mdx';
  const docPath = join(process.env.ROOT_PATH, 'src/content', path, filename);

  if (!existsSync(docPath)) {
    console.error(`Article ${docPath} does not exists!`);
    return '';
  }

  if (!lstatSync(docPath).isFile()) {
    console.error(`Article ${docPath} is not a file!`);
    return '';
  }

  const content = readFileSync(docPath, 'utf-8');
  // const { data } = matter(articleMarkdown);

  return content;
}
