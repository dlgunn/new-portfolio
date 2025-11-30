import fs from 'fs';
import path from 'path';
import { getPostData } from '@/lib/posts'

const postsDir = path.join(process.cwd(), 'mdposts');

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

interface PostMetadata {
    id: string;
    title: string;
    date: string;
    author: string;
    [key: string]: any;
}

export async function generateStaticParams() {
    const files = fs.readdirSync(postsDir);

    return files
        .filter(file => file.endsWith('.md'))
        .map(file => ({
            slug: file.replace(/\.md$/, ''),
        }));
}

export default async function BlogPost({ params }: PageProps) {
    const { slug } = await params;
    const data = await getPostData(slug)
    return <article className='prose prose-lg mx-auto max-w-2xl px-4 py-6'>
        <div dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
    </article>

}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const data = await getPostData(slug)
    if (!slug) {
        return {
            title: "Post not found",
            description: "No such post exists",
        };
    }

    return {
        title: data.title,
        description: data.description,
    };
}