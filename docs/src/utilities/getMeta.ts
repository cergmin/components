import { join } from 'path';
import { readFileSync, existsSync } from 'fs';

export interface IMeta {
  name?: string;
  order: 'lexical' | string | string[];
}

export async function getMeta(folderPath: string): Promise<IMeta> {
  let meta: IMeta = {
    order: 'lexical',
  };
  const metaPath = join(folderPath, 'meta.json');

  // Read section meta if exists
  if (existsSync(metaPath)) {
    const sectionMetaJSON = readFileSync(metaPath, 'utf-8');

    try {
      meta = JSON.parse(sectionMetaJSON);
    } catch (e) {
      console.error(e);
    }
  }

  meta.order = meta.order || 'lexical';

  return meta;
}

export function sortByMetaOrder(array: string[], meta: IMeta): string[] {
  if (meta.order === 'lexical') {
    array.sort();
  } else if (Array.isArray(meta.order)) {
    const newArray = [];

    for (const item of meta.order) {
      const itemIndex = array.indexOf(item);

      if (itemIndex !== -1) {
        newArray.push(array[itemIndex]);
        array[itemIndex] = null;
      }
    }

    for (const item of array) {
      if (item) {
        newArray.push(item);
      }
    }

    array = newArray;
  }

  return array;
}
