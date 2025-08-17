import { Heading, Flex, Text, Button,  Avatar, RevealFx, Arrow } from '@/once-ui/components';
import { Projects } from '@/components/work/Projects';
import { getPosts, markdownToHtml } from '@/app/utils/utils';

import { baseURL, routes, renderContent } from '@/app/resources'; 
import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Carousel } from '@/once-ui/components/Carousel';
import { Tag, SmartLink } from '@/once-ui/components';
import ProfileTeamSection from '@/components/ProfileTeamSection';
import styles from './Home.module.css';

const profiles = [
	{
		name: 'Shiva',
		avatar: '/images/projects/project-01/avatar-01.png',
		tags: ['Founder', 'Engineer'],
		skills: ['Next.js', 'Figma', 'AI'],
		profile: 'https://www.linkedin.com/in/shiva-karan/',
		github: 'https://github.com/shiva-karan-k',
	},
	{
		name: 'Nakamoto',
		avatar: '/images/projects/project-01/avatar-02.png',
		tags: ['Blockchain', 'Visionary'],
		skills: ['Bitcoin', 'Crypto', 'Security'],
		profile: 'https://en.wikipedia.org/wiki/Satoshi_Nakamoto',
		github: 'https://github.com/satoshin',
	},
	{
		name: 'Chan',
		avatar: '/images/projects/project-01/avatar-03.png',
		tags: ['Designer', 'UX'],
		skills: ['UI/UX', 'Branding', 'Web'],
		profile: '#',
		github: '#',
	},
	{
		name: 'Loki',
		avatar: '/images/projects/project-01/avatar-04.png',
		tags: ['Dev', 'Ops'],
		skills: ['DevOps', 'Cloud', 'Automation'],
		profile: '#',
		github: '#',
	},
	{
		name: 'SK',
		avatar: '/images/projects/project-01/avatar-05.png',
		tags: ['Mentor', 'Lead'],
		skills: ['Leadership', 'Strategy', 'Growth'],
		profile: '#',
		github: '#',
	},
	{
		name: 'HK',
		avatar: '/images/gallery/img-01.jpg',
		tags: ['Fullstack', 'Builder'],
		skills: ['React', 'Node.js', 'APIs'],
		profile: '#',
		github: '#',
	},
	{
		name: 'Bharat',
		avatar: '/images/gallery/img-02.jpg',
		tags: ['AI', 'ML'],
		skills: ['Python', 'ML', 'Data'],
		profile: '#',
		github: '#',
	},
	{
		name: 'Bhargav',
		avatar: '/images/gallery/img-03.jpg',
		tags: ['Research', 'Tech'],
		skills: ['Research', 'Tech Writing', 'Docs'],
		profile: '#',
		github: '#',
	},
	{
		name: 'Ram',
		avatar: '/images/gallery/img-04.jpg',
		tags: ['Backend', 'API'],
		skills: ['Node.js', 'Express', 'DB'],
		profile: '#',
		github: '#',
	},
	{
		name: 'Loki jr',
		avatar: '/images/gallery/img-05.jpg',
		tags: ['Frontend', 'UI'],
		skills: ['React', 'CSS', 'UX'],
		profile: '#',
		github: '#',
	},
	{
		name: 'Hari',
		avatar: '/images/gallery/img-06.jpg',
		tags: ['QA', 'Test'],
		skills: ['Testing', 'Automation', 'Cypress'],
		profile: '#',
		github: '#',
	},
	{
		name: 'Dutt',
		avatar: '/images/gallery/img-07.jpg',
		tags: ['Infra', 'Cloud'],
		skills: ['AWS', 'Docker', 'K8s'],
		profile: '#',
		github: '#',
	},
];

export async function generateMetadata({ params }: { params: { locale: string } }) {
	const { locale } = await params;
	const t = await getTranslations();
	const { home } = renderContent(t);
	const title = home.title;
	const description = home.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}`,
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

export default async function Home({ params }: { params: { locale: string } }) {
	const { locale } = await params;
	unstable_setRequestLocale(locale);
	const t = await getTranslations();
	const { home, about, person, newsletter } = renderContent(t);
	const allProjects = getPosts(['src', 'app', '[locale]', 'work', 'projects', 'en']);
	const allBlogs = getPosts(['src', 'app', locale, 'blog', 'posts']);
	const allBlogsWithHtml = await Promise.all(allBlogs.map(async (post) => ({
		...post,
		html: await markdownToHtml(post.content),
	})));
	return (
		<Flex
			fillWidth gap="xl"
			direction="column" alignItems="center" style={{paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0}}>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: home.title,
						description: home.description,
						url: `https://${baseURL}`,
						image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
						publisher: {
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
			<Flex
				fillWidth
				direction="column"
				paddingY="l" gap="m">
				<Flex
					direction="column"
					fillWidth maxWidth="s" gap="m">
					<RevealFx
						translateY="4">
						<Heading
							wrap="balance"
							variant="display-strong-l"
							className={styles.headline}
						>
							{home.headline}
						</Heading>
					</RevealFx>
					<RevealFx
						translateY="8" delay={0.2}>
						<Flex fillWidth>
							<Text
								wrap="balance"
								onBackground="neutral-weak"
								variant="heading-default-xl">
								{home.subline}
							</Text>
						</Flex>
					</RevealFx>
					<RevealFx translateY="12" delay={0.4}>
						<Flex fillWidth gap="8">
							<Button
								id="about"
								data-border="rounded"
								href={`/${locale}/about`}
								variant="tertiary"
								size="m">
								<Flex
									gap="8"
									alignItems="center">
									{about.avatar.display && (
										<Avatar
											style={{marginLeft: '-0.75rem', marginRight: '0.25rem'}}
											src={person.avatar}
											size="m"/>
									)}
									{t("about.title")}
									<Arrow trigger="#about"/>
								</Flex>
							</Button>
							<Button
								id="about"
								data-border="rounded"
								href={`https://sted-studio-contact-form.vercel.app`}
								variant="tertiary"
								size="m">
								<Flex
									marginLeft="12"
									alignItems="center">
										Fill Form
										<Arrow trigger="#about"/>
									</Flex>
							</Button>
						</Flex>
					</RevealFx>
				</Flex>
			</Flex>

			{/* Meet the Team section - now imported as a client component */}
			<ProfileTeamSection />

			<RevealFx translateY="16" delay={0.6}>
				<Projects projects={allProjects} range={[1,1]} />
			</RevealFx>
			{routes['/blog'] && (
				<Flex
					fillWidth gap="24"
					mobileDirection="column">
					<Flex flex={1} paddingLeft="l">
						<Heading
							as="h2"
							variant="display-strong-xs"
							wrap="balance">
							Latest from the blog
						</Heading>
					</Flex>
					<Flex
						flex={3} paddingX="20">
						<Posts posts={allBlogsWithHtml} range={[1,2]} columns="2" />
					</Flex>
				</Flex>
			)}
			<Projects projects={allProjects} range={[2]} />
			{ newsletter.display &&
				<Mailchimp newsletter={newsletter} />
			}
		</Flex>
	);
}
