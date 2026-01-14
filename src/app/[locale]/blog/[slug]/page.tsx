import { notFound } from 'next/navigation'
import { Tag } from '@/once-ui/components/Tag';
import { Button } from '@/once-ui/components/Button';
import { baseURL, renderContent } from '@/app/resources'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { formatDate } from '@/app/utils/formatDate'
import { getPosts, markdownToHtml } from '@/app/utils/utils';
import path from 'path';

interface BlogParams {
    params: { 
        slug: string;
		locale: string;
    };
}

function renderWithButton(html: string) {
  // Replace <Button>...</Button> blocks with a real button
  return html.replace(
    /<Button[^>]*>([\s\S]*?)<\/Button>/g,
    (_, inner) => `<button class="blog-md-btn">${inner.trim()}</button>`
  );
}

function addBrAfterParagraphs(html: string) {
  return html.replace(/<\/p>/g, '</p><br>');
}

export default async function Blog({ params }: BlogParams) {
	const { locale, slug } = await params;
	setRequestLocale(locale);
	const posts = getPosts(['src', 'app', locale, 'blog', 'posts']);
	const post = posts.find((p) => p.slug === slug);
	if (!post) return notFound();
	let html = await markdownToHtml(post.content);
	html = renderWithButton(html);
	html = addBrAfterParagraphs(html);
	return (
		<div style={{
			margin: 'auto',
			padding: '3rem 0 4rem 0',
			maxWidth: '56rem'
		}}>
			<h1 style={{ marginBottom: '2.5rem', fontSize: '2.5rem', fontWeight: 700 }}>
				{post.metadata.title}
			</h1>
			<div style={{
				display: 'flex',
				alignItems: 'center',
				marginBottom: '2rem'
			}}>
				<span style={{ color: '#bbb', marginRight: '1.5rem', fontSize: '1.1rem' }}>
					{formatDate(post.metadata.publishedAt)}
				</span>
				{post.metadata.tag && (
					<Tag label={post.metadata.tag} variant="neutral" size="s" style={{ marginLeft: '1.5rem', marginRight: '1.5rem' }} />
				)}
			</div>
			{post.metadata.image && (
				<img
					src={post.metadata.image}
					alt={post.metadata.title}
					style={{
					maxWidth: '100%',
					borderRadius: '12px',
					marginBottom: '3rem',
					marginTop: '1rem'
				}}
				/>
			)}
			<div
				className="markdown"
				style={{ marginTop: '2.5rem', fontSize: '1.15rem', lineHeight: 1.8 }}
				dangerouslySetInnerHTML={{ __html: html }}
			/>
			<style>{`
				.blog-md-btn {
					display: inline-block;
					background: var(--brand, #e83e8c);
					color: #fff;
					border: none;
					border-radius: 6px;
					padding: 0.6em 1.5em;
					font-size: 1.1em;
					font-weight: 500;
					margin: 2rem 0;
					cursor: pointer;
					transition: background 0.2s;
				}
				.blog-md-btn:hover {
					background: #b81e6a;
				}
			`}</style>
		</div>
	);
}

export async function generateStaticParams() {
  // Get all locales
  const locales = routing.locales || ['en'];
  // Collect all slugs for all locales
  let params = [];
  for (const locale of locales) {
    const posts = getPosts(['src', 'app', locale, 'blog', 'posts']);
    params.push(...posts.map(post => ({ slug: post.slug, locale })));
  }
  return params;
}