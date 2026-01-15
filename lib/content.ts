import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getAllContent(contentType: string): Promise<any[]> {
  try {
    const contentDir = path.join(process.cwd(), 'content', contentType);
    
    if (!fs.existsSync(contentDir)) {
      return [];
    }

    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
    
    const content = files.map(file => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content: markdown } = matter(fileContent);
      
      return {
        ...data,
        slug: file.replace('.md', ''),
      };
    });

    return content;
  } catch (error) {
    console.error(`Error reading ${contentType} content:`, error);
    return [];
  }
}

export async function getContentBySlug(contentType: string, slug: string): Promise<any | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', contentType, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content: markdown } = matter(fileContent);
    
    return {
      ...data,
      slug,
      content: markdown,
    };
  } catch (error) {
    console.error(`Error reading ${contentType}/${slug}:`, error);
    return null;
  }
}
