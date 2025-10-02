import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

type Team = {
    name: string;
    role: string;
    avatar: string;
    linkedIn: string;
};

type Metadata = {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    images: string[];
    tag?: string;
    team: Team[];
};

function getMarkdownFiles(dir: string) {
    if (!fs.existsSync(dir)) {
        return [];
    }
    return fs.readdirSync(dir).filter((file) => ['.md', '.mdx'].includes(path.extname(file)));
}

function readMarkdownFile(filePath: string) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(rawContent);
    const metadata: Metadata = {
        title: data.title || '',
        publishedAt: data.publishedAt,
        summary: data.summary || '',
        image: data.image || '',
        images: data.images || [],
        tag: data.tag || [],
        team: data.team || [],
    };
    return { metadata, content };
}

async function markdownToHtml(markdown: string) {
    const result = await remark().use(html).process(markdown);
    return result.toString();
}

function getMarkdownData(dir: string) {
    const mdFiles = getMarkdownFiles(dir);
    return mdFiles.map((file) => {
        const { metadata, content } = readMarkdownFile(path.join(dir, file));
        const slug = path.basename(file, path.extname(file));
        return {
            metadata,
            slug,
            content,
        };
    });
}

export function getPosts(customPath = ['', '', '', '']) {
    const postsDir = path.join(process.cwd(), ...customPath);
    return getMarkdownData(postsDir);
}

export { markdownToHtml };
