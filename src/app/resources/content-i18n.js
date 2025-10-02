import { InlineCode } from "@/once-ui/components";

const createI18nContent = (t) => {
    const person = {
        firstName: 'Shiva',
        lastName:  'Karan',
        get name() {
            return `${this.firstName} ${this.lastName}`;
        },
        role:      t("person.role"),
        avatar:    '/images/avatar.jpeg',
        location:  'Vizag',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
        languages: ['English']  // optional: Leave the array empty if you don't want to display languages
    }

    const newsletter = {
        display: true,
        title: <>{t("newsletter.title", {firstName: person.firstName})}</>,
        description: <>{t("newsletter.description")}</>
    }

    const social = [
        // Links are automatically displayed.
        // Import new icons in /once-ui/icons.ts
        {
            name: 'GitHub',
            icon: 'github',
            link: 'https://github.com/shiva-karan-k',
        },
        {
            name: 'LinkedIn',
            icon: 'linkedin',
            link: 'https://www.linkedin.com/in/shiva-karan/',
        },
        {
            name: 'X',
            icon: 'x',
            link: 'https://x.com/Shiva_KaranK',
        },
        {
            name: 'Email',
            icon: 'email',
            link: 'mailto:example@gmail.com',
        },
    ]

    const home = {
        label: t("home.label"),
        title: t("home.title", {name: person.name}),
        description: t("home.description", {role: person.role}),
        headline: <>{t("home.headline")}</>,
        subline: <>{t("home.subline")}</>
    }

    const about = {
        label: t("about.label"),
        title: t("about.title"),
        description: t("about.description", {name: person.name, role: person.role, location: person.location}),
        tableOfContent: {
            display: true,
            subItems: true
        },
        avatar: {
            display: true
        },
        calendar: {
            display: true,
            link: 'https://cal.com'
        },
        intro: {
            display: true,
            title: t("about.intro.title"),
            description: <>{t("about.intro.description")}</>
        },
        work: {
            display: true, // set to false to hide this section
            title: t("about.work.title"),
            experiences: [
                {
                    company: 'FLY',
                    timeframe: t("about.work.experiences.FLY.timeframe"),
                    role: t("about.work.experiences.FLY.role"),
                    achievements: t("about.work.experiences.FLY.achievements").split(";"),
                    images: [ // optional: leave the array empty if you don't want to display images
                        {
                            src: '/images/projects/project-01/cover-01.jpg',
                            alt: 'Once UI Project',
                            width: 16,
                            height: 9
                        }
                    ]
                },
                {
                    company: 'Creativ3',
                    timeframe: t("about.work.experiences.Creativ3.timeframe"),
                    role: t("about.work.experiences.Creativ3.role"),
                    achievements: t("about.work.experiences.Creativ3.achievements").split(";"),
                    images: [ ]
                }
            ]
        },
        studies: {
            display: true, // set to false to hide this section
            title: 'Studies',
            institutions: [
                {
                    name: 'University of Jakarta',
                    description: <>{t(`about.studies.institutions.University of Jakarta.description`)}</>,
                },
                {
                    name: 'Build the Future',
                    description: <>{t("about.studies.institutions.Build the Future.description")}</>,
                }
            ]
        },
        technical: {
            display: true, // set to false to hide this section
            title: t("about.technical.title"),
            skills: [
                {
                    title: 'Figma',
                    description: <>{t("about.technical.skills.Figma.description")}</>,
                    images: [
                        {
                            src: '/images/projects/project-01/cover-02.jpg',
                            alt: 'Project image',
                            width: 16,
                            height: 9
                        },
                        {
                            src: '/images/projects/project-01/cover-03.jpg',
                            alt: 'Project image',
                            width: 16,
                            height: 9
                        },
                    ]
                },
                {
                    title: 'Next.js',
                    description: <>{t("about.technical.skills.Nextjs.description")}</>, // "." not accepted in next-intl namespace
                    images: [
                        {
                            src: '/images/projects/project-01/cover-04.jpg',
                            alt: 'Project image',
                            width: 16,
                            height: 9
                        },
                    ]
                }
            ]
        }
    }

    const blog = {
        label: t("blog.label"),
        title: t("blog.title"),
        description: t("blog.description", {name: person.name})
        // Create new blog posts by adding a new .mdx file to app/blog/posts
        // All posts will be listed on the /blog route
    }

    const work = {
        label: t("work.label"),
        title: t("work.title"),
        description: t("work.description", {name: person.name})
        // Create new project pages by adding a new .mdx file to app/blog/posts
        // All projects will be listed on the /home and /work routes
    }

    const products = {
        label: 'Products',
        title: 'Our Products',
        description: 'Innovative solutions crafted by Sted Studio',
        headline: 'Building Tomorrow\'s Solutions',
        subline: 'From Web3 innovations to AI-powered tools, we create products that solve real-world problems and drive sustainable development.',
        items: [
            {
                title: 'Enhance42',
                description: 'AI-powered learning platform for skill development',
                image: '/images/projects/project-01/enhance42.png',
                status: 'Live',
                tags: ['AI', 'Education', 'Learning'],
                url: 'https://enhance42.com'
            },
            {
                title: 'AI Karyashala',
                description: 'AI workshop and training platform for professionals',
                image: '/images/projects/project-01/aikaryashala.png',
                status: 'Live',
                tags: ['AI', 'Workshop', 'Training'],
                url: 'https://aikaryashala.com'
            },
            {
                title: 'STED Space',
                description: 'Maker space and community hub in Vizag',
                image: '/images/projects/project-01/sted-space.png',
                status: 'Live',
                tags: ['Community', 'Maker Space', 'Innovation'],
                url: 'https://sted.space'
            },
            {
                title: 'Studio STED',
                description: 'Creative studio and design services platform',
                image: '/images/projects/project-01/studio-sted.png',
                status: 'Live',
                tags: ['Design', 'Studio', 'Creative'],
                url: 'https://studio.sted.space'
            },
            {
                title: 'AddonProp',
                description: 'Property management and real estate solutions',
                image: '/images/projects/project-01/addonprop.png',
                status: 'Live',
                tags: ['Real Estate', 'Property', 'Management'],
                url: 'https://addonprop.xyz'
            },
            {
                title: 'StudentChakra',
                description: 'Student community and educational platform',
                image: '/images/projects/project-01/studentchakra.png',
                status: 'Live',
                tags: ['Education', 'Students', 'Community'],
                url: 'https://studentchakra.com'
            },
            {
                title: 'DPSLEC',
                description: 'Digital learning and educational content platform',
                image: '/images/projects/project-01/dpslec.png',
                status: 'Live',
                tags: ['Education', 'Digital Learning', 'Content'],
                url: 'https://dpslec.com'
            },
            {
                title: 'Basics',
                description: 'Fundamental learning and skill development platform',
                image: '/images/projects/project-01/basics.png',
                status: 'Live',
                tags: ['Learning', 'Basics', 'Skills'],
                url: '#'
            },
            {
                title: 'Vizag Startups',
                description: 'Startup ecosystem and networking platform for Vizag',
                image: '/images/projects/project-01/vizag-startups.png',
                status: 'Live',
                tags: ['Startups', 'Networking', 'Ecosystem'],
                url: '#'
            },
            {
                title: 'OGBG',
                description: 'Gaming and entertainment platform',
                image: '/images/projects/project-01/ogbg.png',
                status: 'Live',
                tags: ['Gaming', 'Entertainment', 'Community'],
                url: '#'
            },
            {
                title: 'YOMM',
                description: 'Youth-oriented social and networking platform',
                image: '/images/projects/project-01/yomm.png',
                status: 'Live',
                tags: ['Social', 'Youth', 'Networking'],
                url: '#'
            },
            {
                title: 'Viola Now',
                description: 'Music and creative arts platform',
                image: '/images/projects/project-01/viola-now.png',
                status: 'Live',
                tags: ['Music', 'Arts', 'Creative'],
                url: '#'
            }
        ]
    }

    const web2Services = {
        label: 'Web2 Services',
        title: 'Web2 Solutions',
        description: 'Traditional web development and business solutions',
        headline: 'From Idea to Impact',
        subline: 'We help creators, freelancers, startups, and wannapreneurs navigate their 0-1 journey with expert guidance and cutting-edge solutions.',
        consultationCard: {
            title: 'Client & Requirements Understanding Call',
            description: 'Let\'s discuss your vision, requirements, and goals to determine the best path forward for your project. Whether you\'re a content creator, founder, entrepreneur, or anyone looking to clear work debts fast - we\'re here to help.',
            features: [
                'Free 30-minute consultation call',
                'Requirements analysis and project scoping',
                'Technology stack recommendations',
                'Timeline and budget estimation',
                'Strategic guidance for your 0-1 journey',
                'Clear next steps and action plan'
            ],
            ctaText: 'Schedule Now',
            ctaUrl: 'https://wa.me/7382047877',
            icon: 'phone'
        },
        offerings: [
            {
                title: 'Concept Creation',
                description: 'Strategic foundation and research for your project',
                icon: 'lightbulb',
                features: [
                    'Market Research',
                    'Mapping Purpose',
                    'Problem Definition',
                    'Solution Architecture',
                    'Ecosystem Design',
                    'Technology Architecture',
                    'Regulatory Landscape',
                    'Competitor Analysis'
                ],
                pricing: '₹2,50,000-₹4,00,000'
            },
            {
                title: 'Branding',
                description: 'Complete brand identity and visual design system',
                icon: 'palette',
                features: [
                    'Brand Strategy',
                    'Brand Identity',
                    'Branding Guidelines',
                    'Messaging Framework',
                    'Content Strategy',
                    'Brand Audits',
                    'Visual Identity Design',
                    'Branding Kit'
                ],
                pricing: '₹2,80,000-₹3,60,000'
            },
            {
                title: 'PR & Marketing',
                description: 'Comprehensive marketing and public relations strategy',
                icon: 'megaphone',
                features: [
                    'Media Kit',
                    'Social Media Content',
                    'Media Relations (Press Releases, Interviews)',
                    'Content Marketing (Newsletters, Collabs)',
                    'Influencer Marketing',
                    'Email Marketing',
                    'Ad Assets',
                    'Paid Advertising',
                    'Analytics & Reporting'
                ],
                pricing: '₹4,00,000-₹8,00,000'
            },
            {
                title: 'System Setups',
                description: 'Complete technical infrastructure and system configuration',
                icon: 'server',
                features: [
                    'Cloud Infrastructure Setup',
                    'Database Configuration',
                    'CI/CD Pipeline Setup',
                    'Security Implementation',
                    'Performance Optimization',
                    'Monitoring & Analytics',
                    'Backup & Recovery',
                    'Scalability Planning'
                ],
                pricing: '₹1,50,000-₹3,00,000'
            },
            {
                title: 'Content',
                description: 'Strategic content creation and management solutions',
                icon: 'document',
                features: [
                    'Content Strategy',
                    'Copywriting',
                    'Blog Writing',
                    'Social Media Content',
                    'Video Scripts',
                    'Email Campaigns',
                    'SEO Content',
                    'Content Calendar'
                ],
                pricing: '₹1,00,000-₹2,50,000'
            },
            {
                title: 'Design & Development',
                description: 'End-to-end design and development services',
                icon: 'code',
                features: [
                    'UI/UX Design',
                    'Frontend Development',
                    'Backend Development',
                    'Mobile App Development',
                    'API Development',
                    'Database Design',
                    'Testing & QA',
                    'Deployment & Maintenance'
                ],
                pricing: '₹5,00,000-₹15,00,000'
            },
            {
                title: 'Agentic AI',
                description: 'AI-powered automation and intelligent systems',
                icon: 'robot',
                features: [
                    'AI Strategy & Planning',
                    'Custom AI Model Development',
                    'Chatbot Development',
                    'Process Automation',
                    'Data Analysis & Insights',
                    'Machine Learning Integration',
                    'AI Training & Fine-tuning',
                    'AI Performance Monitoring'
                ],
                pricing: '₹3,00,000-₹8,00,000'
            },
            {
                title: 'Community',
                description: 'Community building and engagement strategies',
                icon: 'users',
                features: [
                    'Community Guidelines',
                    'Management Plan',
                    'Engagement Plan',
                    'Rewards Program',
                    'Governance Framework',
                    'Monitoring & Moderation',
                    'Analytics & Reporting'
                ],
                pricing: '₹4,00,000-₹6,00,000'
            },
            {
                title: 'Legal',
                description: 'Comprehensive legal framework and compliance solutions',
                icon: 'scale',
                features: [
                    'Regulatory Compliance',
                    'Legal Framework',
                    'Contract Drafting',
                    'IP Protection',
                    'Privacy Policy',
                    'Data Protection',
                    'Terms & Conditions',
                    'Legal Opinion Letter'
                ],
                pricing: '₹4,00,000-₹6,00,000'
            }
        ]
    }

    const web3Services = {
        label: 'Web3 Services',
        title: 'Web3 Solutions',
        description: 'Blockchain and decentralized technology solutions',
        headline: 'From Idea to Impact',
        subline: 'We help creators, freelancers, startups, and wannapreneurs navigate their 0-1 journey with expert guidance and cutting-edge Web3 solutions.',
        offerings: [
            {
                title: 'Concept Creation',
                description: 'Strategic foundation and research for your Web3 project',
                icon: 'lightbulb',
                features: [
                    'Market Research',
                    'Mapping Purpose',
                    'Problem Definition',
                    'Solution Architecture',
                    'Ecosystem Design',
                    'Technology Architecture',
                    'Regulatory Landscape',
                    'Competitor Analysis'
                ],
                pricing: '$75,000-$125,000'
            },
            {
                title: 'Tokenomics',
                description: 'Complete token economy design and implementation',
                icon: 'coins',
                features: [
                    'Mapping Economics',
                    'Supply, Demand & Price Dynamics',
                    'Best Multi-token Framework',
                    'Utility Tokens & Security Tokens',
                    'Liquidity Breakdowns for Optimal Flows',
                    'Governance',
                    'Distribution Mechanisms'
                ],
                pricing: '$100,000-$150,000'
            },
            {
                title: 'Branding',
                description: 'Complete brand identity and visual design system for Web3',
                icon: 'palette',
                features: [
                    'Brand Strategy',
                    'Brand Identity',
                    'Branding Guidelines',
                    'Messaging Framework',
                    'Content Strategy',
                    'Brand Audits',
                    'Visual Identity Design',
                    'Branding Kit'
                ],
                pricing: '$85,000-$110,000'
            },
            {
                title: 'PR & Marketing',
                description: 'Comprehensive Web3 marketing and public relations strategy',
                icon: 'megaphone',
                features: [
                    'Media Kit',
                    'Social Media Content',
                    'Media Relations (Press Releases, Interviews)',
                    'Content Marketing (Newsletters, Collabs)',
                    'Influencer Marketing',
                    'Email Marketing',
                    'Ad Assets',
                    'Paid Advertising',
                    'Analytics & Reporting'
                ],
                pricing: '$120,000-$200,000'
            },
            {
                title: 'System Setups',
                description: 'Complete blockchain infrastructure and system configuration',
                icon: 'server',
                features: [
                    'Blockchain Infrastructure Setup',
                    'Smart Contract Deployment',
                    'DApp Configuration',
                    'Security Implementation',
                    'Performance Optimization',
                    'Monitoring & Analytics',
                    'Backup & Recovery',
                    'Scalability Planning'
                ],
                pricing: '$60,000-$100,000'
            },
            {
                title: 'Content',
                description: 'Strategic Web3 content creation and management solutions',
                icon: 'document',
                features: [
                    'Content Strategy',
                    'Technical Writing',
                    'Whitepaper Creation',
                    'Social Media Content',
                    'Video Scripts',
                    'Email Campaigns',
                    'SEO Content',
                    'Content Calendar'
                ],
                pricing: '$40,000-$75,000'
            },
            {
                title: 'Design & Development',
                description: 'End-to-end Web3 design and development services',
                icon: 'code',
                features: [
                    'DApp UI/UX Design',
                    'Smart Contract Development',
                    'Frontend Development',
                    'Backend Development',
                    'Mobile DApp Development',
                    'API Development',
                    'Testing & Auditing',
                    'Deployment & Maintenance'
                ],
                pricing: '$150,000-$400,000'
            },
            {
                title: 'Agentic AI',
                description: 'AI-powered automation and intelligent Web3 systems',
                icon: 'robot',
                features: [
                    'AI Strategy & Planning',
                    'Custom AI Model Development',
                    'AI-powered DApps',
                    'Process Automation',
                    'Data Analysis & Insights',
                    'Machine Learning Integration',
                    'AI Training & Fine-tuning',
                    'AI Performance Monitoring'
                ],
                pricing: '$80,000-$180,000'
            },
            {
                title: 'Community',
                description: 'Web3 community building and engagement strategies',
                icon: 'users',
                features: [
                    'Community Guidelines',
                    'Management Plan',
                    'Engagement Plan',
                    'Rewards Program',
                    'DAO Governance Framework',
                    'Monitoring & Moderation',
                    'Analytics & Reporting'
                ],
                pricing: '$100,000-$150,000'
            },
            {
                title: 'Legal',
                description: 'Comprehensive Web3 legal framework and compliance solutions',
                icon: 'scale',
                features: [
                    'Regulatory Compliance',
                    'Legal Framework',
                    'Smart Contract Audit',
                    'IP Protection',
                    'Privacy Policy',
                    'Data Protection',
                    'Terms & Conditions',
                    'Legal Opinion Letter'
                ],
                pricing: '$120,000-$180,000'
            }
        ]
    }

    const gallery = {
        label: t("gallery.label"),
        title: t("gallery.title"),
        description: t("gallery.description", {name: person.name}),
        // Images from https://pexels.com
        images: [
            {
                src: '/images/gallery/img-01.jpg',
                alt: 'image',
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-02.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            { 
                src: '/images/gallery/img-03.jpg',
                alt: 'image',
                orientation: 'vertical'
            },
            { 
                src: '/images/gallery/img-04.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-05.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-06.jpg',
                alt: 'image',
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-07.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-08.jpg',
                alt: 'image',
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-09.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-10.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            { 
                src: '/images/gallery/img-11.jpg',
                alt: 'image',
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-12.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-13.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            { 
                src: '/images/gallery/img-14.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
        ]
    }
    return {
        person,
        social,
        newsletter,
        home,
        about,
        blog,
        work,
        products,
        web2Services,
        web3Services,
        gallery
    }
};

export { createI18nContent };