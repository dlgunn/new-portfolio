import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'mdposts');

export interface PostMeta {
    id: string;
    title: string;
    author: string;
    excerpt: string;
    date: string; // stored as string in frontmatter
    [key: string]: any; // allows extra frontmatter fields
}

export function getSortedPostsData(): PostMeta[] {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData: PostMeta[] = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const result = matter(fileContents);
        const data = result.data
        const content = result.content
        if (!data.title) {
            const firstLine = content.split('\n')[0].replace(/^#+\s/, '');
            data.title = firstLine;
            data.exceprt = content.split('\n')[1]
        }
        if (!data.excerpt) {
            const bodyText = content.split('\n')[1].replace(/^#+\s/, '');
            data.excerpt = bodyText + '...';
        }


        return {
            id,
            title: data.title,
            author: data.author,
            excerpt: data.excerpt,
            date: data.date,
            ...(data as Omit<PostMeta, 'id' | 'title' | 'author' | 'data'>),
        };
    });

    return allPostsData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}
