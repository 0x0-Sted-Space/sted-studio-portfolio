import { Flex, Heading } from '@/once-ui/components';
import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { baseURL, renderContent } from '@/app/resources';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }) {
	const { locale } = await params;
	const t = await getTranslations();
	const { blog } = renderContent(t);
	const title = blog.title;
	const description = blog.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}/blog`,
			images: [
				{
					url: ogImage,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

import { getPosts, markdownToHtml } from '@/app/utils/utils';

export default async function Blog({ params }: { params: { locale: string } }) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations();
	const { person, blog, newsletter } = renderContent(t);
	const posts = getPosts(['src', 'app', locale, 'blog', 'posts']);
	const postsWithHtml = await Promise.all(posts.map(async (post) => ({
		...post,
		html: await markdownToHtml(post.content),
	})));
	return (
		<Flex fillWidth maxWidth="s" direction="column">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Blog',
						headline: blog.title,
						description: blog.description,
						url: `https://${baseURL}/blog`,
						image: `${baseURL}/og?title=${encodeURIComponent(blog.title)}`,
						author: {
							'@type': 'Person',
							name: person.name,
							image: {
								'@type': 'ImageObject',
								url: `${baseURL}${person.avatar}`,
							},
						},
					}),
				}}
			/>
			<Heading marginBottom="l" variant="display-strong-s">
				{blog.title}
			</Heading>
			<Flex fillWidth flex={1} direction="column">
				<Posts posts={postsWithHtml} range={[1, 3]} locale={locale} thumbnail />
				<Posts posts={postsWithHtml} range={[4]} columns="2" locale={locale} />
			</Flex>
			{newsletter.display && <Mailchimp newsletter={newsletter} />}
		</Flex>
	);
}