import { InlineCode } from "@/once-ui/components";

const person = {
    firstName: 'Shiva Karan',
    lastName:  'K',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      'Sustainable Dev Guy',
    avatar:    '/images/avatar.jpeg',
    location:  'Vizag',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ['English']  // optional: Leave the array empty if you don't want to display languages
}

const newsletter = {
    display: true,
    title: `Subscribe to ${person.firstName}'s Newsletter`,
    description: "We occasionally write about design, technology, and share thoughts on the intersection of creativity and engineering for Sustainable Development"
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
        link: 'mailto:lucky3aeon@yahoo.com',
    },
]

const home = {
    label: 'Home',
    title: `${person.name}'s Portfolio`,
    description: `Portfolio website showcasing my work as a ${person.role}`,
    headline: 'Holaaa!',
    subline: `I'm Shiva, an education engineer at Enhance42, where I craft intuitive user experiences across training & hiring systems while toying around with Gen-AI tools & Web 3 Tech. I run this micro Product Studio which helps people with their 0-1 Journey's. Creators, Freelancers, Startups or wannapreneurs, drop us a line. See you on the other side.`
}

const about = {
    label: 'About',
    title: 'About me',
    description: `Meet ${person.name}, ${person.role} from ${person.location}`,
    tableOfContent: {
        display: true,
        subItems: false
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
        title: 'Introduction',
        description: 'Sted Studio is a Vizag-based Product Studio with a passion for transforming complex challenges into simple, elegant design solutions. Our work spans digital interfaces, interactive experiences, and the convergence of design and technology for Sustainable Development.'
    },
    work: {
        display: true, // set to false to hide this section
        title: 'Work Experience',
        experiences: [
            {
                company: 'Enhance42',
                timeframe: '2019 - Present',
                role: 'Jr Education Engineer',
                achievements: [
                    'Redesigning how current day engineers build, ship & scale.',
                    'Spearheaded the integration of AI tools into design & dev workflows, enabling engineers to iterate 50% faster on ideas.'
                ],
                images: [
                    {
                        src: '/images/projects/project-01/cover-01.png',
                        alt: 'Enhance42',
                        width: 16,
                        height: 9
                    }
                ]
            },
            {
                company: 'Almora',
                timeframe: '2017 - 2018',
                role: 'Entrepreneur In Residence',
                achievements: [
                    'At an investment bank which handled about 50BTC Fund, we brewed about 5 interesting tokens Gladage, Griffex.co, Decubes, Enblick, ThecryptoUpdates & many more interesting things in web 3 space.',
                    'Led a cross-functional teams to launch a new product lines, with couple of projects getting $3MN underwriting.'
                ],
                images: [ 
                    {src: '/images/projects/project-01/cover-021.png', alt: 'GriffexPOC', width: 16, height: 9},
                    {src: '/images/projects/project-01/cover-022.png', alt: 'Enblick', width: 16, height: 9},
                    {src: '/images/projects/project-01/cover-023.jpg', alt: 'Decubes', width: 16, height: 9}
                ]
            }
        ]
    },
    studies: {
        display: true, // set to false to hide this section
        title: 'Studies',
        institutions: [
            { name: 'University of Life', description: 'Civil Engineer by profession, sustainable architect by passion. Homegrown innovators by vizag startups, enhance42, vizag volunteers.' },
            { name: 'Internet University', description: 'From wine making to content creation, from idea to product.' },
            { name: 'E42 University', description: 'From 0-1 Journey of becoming a developer' }
        ]
    },
    technical: {
        display: true, // set to false to hide this section
        title: 'Technical skills',
        skills: [
            {
                title: 'Figma',
                description: 'Able to prototype in Figma with Once UI with unnatural speed.',
                images: [
                    { src: '/images/projects/project-01/cover-02.jpg', alt: 'Figma Project 1', width: 16, height: 9 },
                    { src: '/images/projects/project-01/cover-03.jpg', alt: 'Figma Project 2', width: 16, height: 9 }
                ]
            },
            {
                title: 'Next.js',
                description: 'Building next gen apps with Next.js + Once UI + Supabase.',
                images: [
                    { src: '/images/projects/project-01/cover-04.jpg', alt: 'Next.js Project', width: 16, height: 9 }
                ]
            }
        ]
    },
    cv: {
        display: true,
        title: 'CV',
        images: [
            { src: '/images/Karan.jpeg', alt: 'CV - Karan', width: 16, height: 9 }
        ]
    }
}

const blog = {
    label: 'Blog',
    title: 'Writing about Web 3, Gen AI, Design and Jugaad...',
    description: `Read what ${person.name} has been up to recently`
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
}

const work = {
    label: 'Work',
    title: 'My projects',
    description: `Design and dev projects by ${person.name}`
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
            title: 'EthSkies',
            description: 'A decentralized platform for sustainable aviation solutions',
            image: '/images/projects/project-01/1EthSkies - web 3.png',
            status: 'In Development',
            tags: ['Web3', 'Sustainability', 'Aviation']
        },
        {
            title: 'Griffex.co',
            description: 'Advanced trading platform with AI-powered analytics',
            image: '/images/projects/project-01/Griffex.png',
            status: 'Beta',
            tags: ['FinTech', 'AI', 'Trading']
        },
        {
            title: 'GitMatch',
            description: 'Smart developer matching platform for open source projects',
            image: '/images/projects/project-01/GitMatch.png',
            status: 'Live',
            tags: ['Developer Tools', 'Open Source', 'Collaboration']
        },
        {
            title: 'Recify',
            description: 'Automated code review and optimization platform',
            image: '/images/projects/project-01/Recify Landing Page.png',
            status: 'Coming Soon',
            tags: ['DevTools', 'AI', 'Code Quality']
        }
    ]
}

const web2Services = {
    label: 'Web2 Services',
    title: 'Web2 Solutions',
    description: 'Traditional web development and business solutions',
    headline: 'From Idea to Impact',
    subline: 'We help creators, freelancers, startups, and wannapreneurs navigate their 0-1 journey with expert guidance and cutting-edge solutions.',
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
    label: 'Gallery',
    title: 'My photo gallery',
    description: `A photo collection by ${person.name}`,
    // Images from https://pexels.com
    images: [
        // Logos
        {
            src: '/images/projects/project-01/Sted Space Logo.png',
            alt: 'Sted Space Logo',
            orientation: 'horizontal',
            category: 'logos'
        },
        {
            src: '/images/projects/project-01/Nisa Logo Full copy.png',
            alt: 'Nisa Logo',
            orientation: 'horizontal',
            category: 'logos'
        },
        // Branding
        {
            src: '/images/projects/project-01/Arth.Bhumi -1.png',
            alt: 'Arth Bhumi Branding',
            orientation: 'horizontal',
            category: 'branding'
        },
        {
            src: '/images/projects/project-01/Biji Biji.png',
            alt: 'Biji Biji Branding',
            orientation: 'horizontal',
            category: 'branding'
        },
        // UX/UI
        {
            src: '/images/projects/project-01/Recify Landing Page.png',
            alt: 'Recify UI Design',
            orientation: 'horizontal',
            category: 'uxui'
        },
        {
            src: '/images/projects/project-01/GitMatch.png',
            alt: 'GitMatch UI',
            orientation: 'horizontal',
            category: 'uxui'
        },
        // Photos
        {
            src: '/images/gallery/img-01.jpg',
            alt: 'Gallery Photo 1',
            orientation: 'vertical',
            category: 'photos'
        },
        {
            src: '/images/gallery/img-02.jpg',
            alt: 'Gallery Photo 2',
            orientation: 'horizontal',
            category: 'photos'
        },
        // Posters
        {
            src: '/images/projects/project-01/web 3 letters.png',
            alt: 'Web3 Poster',
            orientation: 'vertical',
            category: 'posters'
        },
        {
            src: '/images/projects/project-01/1EthSkies - web 3.png',
            alt: 'EthSkies Poster',
            orientation: 'vertical',
            category: 'posters'
        },
        // AI Artworks
        {
            src: '/images/projects/project-01/Cave Life.png',
            alt: 'AI Generated Cave Life',
            orientation: 'horizontal',
            category: 'ai-artworks'
        },
        {
            src: '/images/projects/project-01/Add on Prop.png',
            alt: 'AI Generated Prop',
            orientation: 'horizontal',
            category: 'ai-artworks'
        },
        {
            src: '/images/gallery/img-03.jpg',
            alt: 'Gallery Photo 3',
            orientation: 'vertical',
            category: 'photos'
        },
        // Videos
        {
            src: '/images/projects/project-01/video-01.mp4',
            alt: 'Project Video',
            orientation: 'horizontal',
            category: 'videos',
            type: 'video'
        },
        {
            src: '/images/gallery/img-04.jpg',
            alt: 'Gallery Photo 4',
            orientation: 'horizontal',
            category: 'photos'
        },
        {
            src: '/images/gallery/img-05.jpg',
            alt: 'Gallery Photo 5',
            orientation: 'horizontal',
            category: 'photos'
        },
        // More Branding
        {
            src: '/images/projects/project-01/Botclub.jpg',
            alt: 'Botclub Branding',
            orientation: 'horizontal',
            category: 'branding'
        },
        {
            src: '/images/projects/project-01/Decubes.png',
            alt: 'Decubes Branding',
            orientation: 'horizontal',
            category: 'branding'
        },
        // More UX/UI
        {
            src: '/images/projects/project-01/Enblick.png',
            alt: 'Enblick UI Design',
            orientation: 'horizontal',
            category: 'uxui'
        },
        {
            src: '/images/projects/project-01/Griffex.png',
            alt: 'Griffex UI Design',
            orientation: 'horizontal',
            category: 'uxui'
        },
        // More Logos
        {
            src: '/images/projects/project-01/Lenspost.png',
            alt: 'Lenspost Logo',
            orientation: 'horizontal',
            category: 'logos'
        },
        {
            src: '/images/projects/project-01/Richmint.png',
            alt: 'Richmint Logo',
            orientation: 'horizontal',
            category: 'logos'
        },
        // More AI Artworks
        {
            src: '/images/projects/project-01/Role coin.png',
            alt: 'AI Generated Role Coin',
            orientation: 'horizontal',
            category: 'ai-artworks'
        },
        {
            src: '/images/projects/project-01/Steamrole.png',
            alt: 'AI Generated Steam Role',
            orientation: 'horizontal',
            category: 'ai-artworks'
        },
        // More Posters
        {
            src: '/images/projects/project-01/Student Chakra.png',
            alt: 'Student Chakra Poster',
            orientation: 'horizontal',
            category: 'posters'
        },
    ]
}

export { person, social, newsletter, home, about, blog, work, products, web2Services, web3Services, gallery };