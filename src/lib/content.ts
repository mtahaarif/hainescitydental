import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getContentFiles(folder: string) {
  const folderPath = path.join(contentDirectory, folder);
  
  if (!fs.existsSync(folderPath)) {
    return [];
  }
  
  const files = fs.readdirSync(folderPath);
  return files.filter(file => file.endsWith('.md') || file.endsWith('.json'));
}

export function getContentBySlug(folder: string, slug: string) {
  const realSlug = slug.replace(/\.md$/, '').replace(/\.json$/, '');
  const folderPath = path.join(contentDirectory, folder);
  
  // Try .md first
  let fullPath = path.join(folderPath, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    // Try .json
    fullPath = path.join(folderPath, `${realSlug}.json`);
  }
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  if (fullPath.endsWith('.json')) {
    return JSON.parse(fileContents);
  }
  
  const { data, content } = matter(fileContents);
  return { ...data, content, slug: realSlug };
}

export function getAllContent(folder: string) {
  const files = getContentFiles(folder);
  
  const content = files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '').replace(/\.json$/, '');
      return getContentBySlug(folder, slug);
    })
    .filter(Boolean)
    .sort((a: any, b: any) => {
      // Sort by order if available
      if (a.order && b.order) {
        return a.order - b.order;
      }
      return 0;
    });
  
  return content;
}

export function getSettings(settingName: string) {
  return getContentBySlug('settings', settingName);
}
