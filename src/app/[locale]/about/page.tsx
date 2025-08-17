"use client";
import { Avatar, Button, Flex, Heading, Icon, IconButton, SmartImage, Tag, Text } from '@/once-ui/components';
import { baseURL, renderContent } from '@/app/resources';
import TableOfContents from '@/components/about/TableOfContents';
import styles from '@/components/about/about.module.scss'
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

interface AboutCV {
  display: boolean;
  title: string;
  images: Array<{ src: string; alt: string; width: number; height: number }>;
}

interface About {
  label: string;
  title: string;
  description: string;
  tableOfContent: { display: boolean; subItems: boolean };
  avatar: { display: boolean };
  calendar: { display: boolean; link: string };
  intro: { display: boolean; title: string; description: React.ReactNode };
  work: any;
  studies: any;
  technical: any;
  cv: AboutCV;
}

export default function About({ params }: { params: any }) {
    const { locale } = React.use(params);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const t = useTranslations();
    const {person, about, social } = renderContent(t);
    let aboutTyped: any = about;
    // Defensive logging
    console.log('aboutTyped:', aboutTyped);
    console.log('person:', person);
    console.log('social:', social);
    let errorMsg = null;
    try {
        if (!aboutTyped) throw new Error('aboutTyped is undefined');
        if (!person) throw new Error('person is undefined');
        if (!social) throw new Error('social is undefined');
        if (!aboutTyped.work || !Array.isArray(aboutTyped.work.experiences)) throw new Error('aboutTyped.work.experiences is missing or not an array');
        if (!aboutTyped.studies || !Array.isArray(aboutTyped.studies.institutions)) throw new Error('aboutTyped.studies.institutions is missing or not an array');
        if (!aboutTyped.technical || !Array.isArray(aboutTyped.technical.skills)) throw new Error('aboutTyped.technical.skills is missing or not an array');
        if (!aboutTyped.cv || !Array.isArray(aboutTyped.cv.images)) throw new Error('aboutTyped.cv.images is missing or not an array');
    } catch (err: any) {
        errorMsg = err.message;
    }
    if (errorMsg) {
        return (
            <div style={{padding: 40, color: 'red', background: '#fff'}}>
                <h2>Something went wrong loading the About page</h2>
                <pre>{errorMsg}</pre>
            </div>
        );
    }
    const structure = [
        { 
            title: aboutTyped.intro.title,
            display: aboutTyped.intro.display,
            items: []
        },
        { 
            title: aboutTyped.work.title,
            display: aboutTyped.work.display,
            items: aboutTyped.work.experiences.map((experience: any) => experience.company)
        },
        { 
            title: aboutTyped.studies.title,
            display: aboutTyped.studies.display,
            items: aboutTyped.studies.institutions.map((institution: any) => institution.name)
        },
        { 
            title: aboutTyped.technical.title,
            display: aboutTyped.technical.display,
            items: aboutTyped.technical.skills.map((skill: any) => skill.title)
        },
        {
            title: aboutTyped.cv.title,
            display: aboutTyped.cv.display,
            items: []
        }
    ]
    return (
        <>
            <Flex
                fillWidth maxWidth="m"
                direction="column">
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Person',
                            name: person.name,
                            jobTitle: person.role,
                            description: aboutTyped.intro.description,
                            url: `https://${baseURL}/about`,
                            image: `${baseURL}/images/${person.avatar}`,
                            sameAs: social
                                .filter((item) => item.link && !item.link.startsWith('mailto:')) // Filter out empty links and email links
                                .map((item) => item.link),
                            worksFor: {
                                '@type': 'Organization',
                                name: aboutTyped.work.experiences[0].company || ''
                            },
                        }),
                    }}
                />
                { aboutTyped.tableOfContent.display && (
                    <Flex
                        style={{ left: '0', top: '50%', transform: 'translateY(-50%)' }}
                        position="fixed"
                        paddingLeft="24" gap="32"
                        direction="column" hide="s">
                        <TableOfContents
                            structure={structure}
                            about={aboutTyped} />
                    </Flex>
                )}
                <Flex
                    fillWidth
                    mobileDirection="column" justifyContent="center">
                    { aboutTyped.avatar.display && (
                        <Flex
                            minWidth="160" paddingX="l" paddingBottom="xl" gap="m"
                            flex={3} direction="column" alignItems="center">
                            <Avatar
                                src={person.avatar}
                                size="xl"/>
                            <Flex
                                gap="8"
                                alignItems="center">
                                <Icon
                                    onBackground="accent-weak"
                                    name="globe"/>
                                {person.location}
                            </Flex>
                            { person.languages.length > 0 && (
                                <Flex
                                    wrap
                                    gap="8">
                                    {person.languages.map((language, index) => (
                                        <Tag
                                            key={index}
                                            size="l">
                                            {language}
                                        </Tag>
                                    ))}
                                </Flex>
                            )}
                        </Flex>
                    )}
                    <Flex
                        className={styles.blockAlign}
                        fillWidth flex={9} maxWidth={40} direction="column">
                        <Flex
                            id={aboutTyped.intro.title}
                            fillWidth minHeight="160"
                            direction="column" justifyContent="center"
                            marginBottom="32">
                            {aboutTyped.calendar.display && (
                                <Flex
                                    className={styles.blockAlign}
                                    style={{
                                        backdropFilter: 'blur(var(--static-space-1))',
                                        border: '1px solid var(--brand-alpha-medium)',
                                        width: 'fit-content'
                                    }}
                                    alpha="brand-weak" radius="full"
                                    fillWidth padding="4" gap="8" marginBottom="m"
                                    alignItems="center">
                                    <Flex paddingLeft="12">
                                        <Icon
                                            name="calendar"
                                            onBackground="brand-weak"/>
                                    </Flex>
                                    <Flex
                                        paddingX="8">
                                        Schedule a call
                                    </Flex>
                                    <IconButton
                                        href={aboutTyped.calendar.link}
                                        data-border="rounded"
                                        variant="tertiary"
                                        icon="chevronRight"/>
                                </Flex>
                            )}
                            <Heading
                                className={styles.textAlign}
                                variant="display-strong-xl">
                                {person.name}
                            </Heading>
                            <Text
                                className={styles.textAlign}
                                variant="display-default-xs"
                                onBackground="neutral-weak">
                                {person.role}
                            </Text>
                            {social.length > 0 && (
                                <Flex
                                    className={styles.blockAlign}
                                    paddingTop="20" paddingBottom="8" gap="8" wrap>
                                    {social.map((item) => (
                                        item.link && (
                                            <Button
                                                key={item.name}
                                                href={item.link}
                                                prefixIcon={item.icon}
                                                label={item.name}
                                                size="s"
                                                variant="tertiary"/>
                                        )
                                    ))}
                                </Flex>
                            )}
                        </Flex>

                        { aboutTyped.intro.display && (
                            <Flex
                                direction="column"
                                textVariant="body-default-l"
                                fillWidth gap="m" marginBottom="xl">
                                {aboutTyped.intro.description}
                            </Flex>
                        )}

                        { aboutTyped.work.display && (
                            <>
                                <Heading
                                    as="h2"
                                    id={aboutTyped.work.title}
                                    variant="display-strong-s"
                                    marginBottom="m">
                                    {aboutTyped.work.title}
                                </Heading>
                                <Flex
                                    direction="column"
                                    fillWidth gap="l" marginBottom="40">
                                    {aboutTyped.work.experiences.map((experience: any, index: number) => (
                                        <Flex
                                            key={`${experience.company}-${experience.role}-${index}`}
                                            fillWidth
                                            direction="column">
                                            <Flex
                                                fillWidth
                                                justifyContent="space-between"
                                                alignItems="flex-end"
                                                marginBottom="4">
                                                <Text
                                                    id={experience.company}
                                                    variant="heading-strong-l">
                                                    {experience.company}
                                                </Text>
                                                <Text
                                                    variant="heading-default-xs"
                                                    onBackground="neutral-weak">
                                                    {experience.timeframe}
                                                </Text>
                                            </Flex>
                                            <Text
                                                variant="body-default-s"
                                                onBackground="brand-weak"
                                                marginBottom="m">
                                                {experience.role}
                                            </Text>
                                            <Flex
                                                as="ul"
                                                direction="column" gap="16">
                                                {experience.achievements.map((achievement: string, index: any) => (
                                                    <Text
                                                        as="li"
                                                        variant="body-default-m"
                                                        key={`${experience.company}-${index}`}>
                                                        {achievement}
                                                    </Text>
                                                ))}
                                            </Flex>
                                            {experience.images.length > 0 && (
                                                <Flex
                                                    fillWidth paddingTop="m" paddingLeft="40"
                                                    wrap
                                                    style={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}
                                                >
                                                    {experience.images.map((image: any, index: number) => (
                                                        <Flex
                                                            key={index}
                                                            style={{
                                                                width: '100%',
                                                                maxWidth: 700,
                                                                background: 'none',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                overflow: 'hidden',
                                                                marginLeft: 0,
                                                                border: 'none',
                                                                boxShadow: 'none',
                                                                padding: '0 12px 16px 0', // right space between images, bottom space for stacking
                                                            }}
                                                        >
                                                            <img
                                                                alt={image.alt}
                                                                src={image.src}
                                                                style={{
                                                                    objectFit: 'contain',
                                                                    width: '100%',
                                                                    maxWidth: '100%',
                                                                    height: 'auto',
                                                                    borderRadius: 'var(--radius-m)',
                                                                    cursor: 'pointer',
                                                                    boxShadow: 'none',
                                                                    border: 'none',
                                                                    background: 'none',
                                                                    display: 'block',
                                                                    margin: '0 auto',
                                                                }}
                                                                className="cv-image-hover almora-image-responsive"
                                                                onClick={() => setPreviewImage(image.src)}
                                                            />
                                                        </Flex>
                                                    ))}
                                                </Flex>
                                            )}
                                        </Flex>
                                    ))}
                                </Flex>
                            </>
                        )}

                        { aboutTyped.studies.display && (
                            <>
                                <Heading
                                    as="h2"
                                    id={aboutTyped.studies.title}
                                    variant="display-strong-s"
                                    marginBottom="m">
                                    {aboutTyped.studies.title}
                                </Heading>
                                <Flex
                                    direction="column"
                                    fillWidth gap="l" marginBottom="40">
                                    {aboutTyped.studies.institutions.map((institution: any, index: number) => (
                                        <Flex
                                            key={`${institution.name}-${index}`}
                                            fillWidth gap="4"
                                            direction="column">
                                            <Text
                                                id={institution.name}
                                                variant="heading-strong-l">
                                                {institution.name}
                                            </Text>
                                            <Text
                                                variant="heading-default-xs"
                                                onBackground="neutral-weak">
                                                {institution.description}
                                            </Text>
                                        </Flex>
                                    ))}
                                </Flex>
                            </>
                        )}

                        { aboutTyped.technical.display && (
                            <>
                                <Heading
                                    as="h2"
                                    id={aboutTyped.technical.title}
                                    variant="display-strong-s" marginBottom="40">
                                    {aboutTyped.technical.title}
                                </Heading>
                                <Flex
                                    direction="column"
                                    fillWidth gap="l">
                                    {aboutTyped.technical.skills.map((skill: any, index: number) => (
                                        <Flex
                                            key={`${skill}-${index}`}
                                            fillWidth gap="4"
                                            direction="column">
                                            <Text
                                                variant="heading-strong-l">
                                                {skill.title}
                                            </Text>
                                            {skill.description && (
                                                <Text
                                                    variant="body-default-m"
                                                    onBackground="neutral-weak">
                                                    {skill.description}
                                                </Text>
                                            )}
                                            {skill.images.length > 0 && (
                                                <Flex
                                                    fillWidth paddingTop="m" gap="12"
                                                    wrap>
                                                    {skill.images.map((image: any, index: number) => (
                                                        <Flex
                                                            key={index}
                                                            border="neutral-medium"
                                                            borderStyle="solid-1"
                                                            radius="m"
                                                            style={{ width: '100%', maxWidth: 700, background: '#fff', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', overflow: 'hidden', marginLeft: 0 }}
                                                        >
                                                            <img
                                                                alt={image.alt}
                                                                src={image.src}
                                                                style={{ objectFit: 'contain', width: '100%', height: 'auto', borderRadius: 'var(--radius-m)', cursor: 'pointer' }}
                                                                className={skill.title === 'CV' ? 'cv-image-hover' : ''}
                                                                onClick={() => setPreviewImage(image.src)}
                                                            />
                                                        </Flex>
                                                    ))}
                                                </Flex>
                                            )}
                                        </Flex>
                                    ))}
                                </Flex>
                            </>
                        )}
                        {/* CV Section */}
                        {aboutTyped.cv && aboutTyped.cv.display && (
                            <>
                                <Heading
                                    as="h2"
                                    id={aboutTyped.cv.title}
                                    variant="display-strong-s"
                                    marginBottom="40"
                                    style={{ marginTop: '64px' }}
                                >
                                    {aboutTyped.cv.title}
                                </Heading>
                                <Flex
                                    direction="column"
                                    fillWidth gap="l">
                                    {aboutTyped.cv.images.map((image: any, index: number) => (
                                        <Flex
                                            key={index}
                                            border="neutral-medium"
                                            borderStyle="solid-1"
                                            radius="m"
                                            style={{ width: '100%', maxWidth: 700, background: '#fff', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', overflow: 'hidden', marginLeft: 0 }}
                                        >
                                            <img
                                                alt={image.alt}
                                                src={image.src}
                                                style={{ objectFit: 'contain', width: '100%', height: 'auto', borderRadius: 'var(--radius-m)', cursor: 'pointer' }}
                                                className="cv-image-hover"
                                                onClick={() => setPreviewImage(image.src)}
                                            />
                                        </Flex>
                                    ))}
                                </Flex>
                            </>
                        )}
                    </Flex>
                </Flex>
            </Flex>
            {/* Modal for image preview */}
            {previewImage && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0,0,0,0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        cursor: 'pointer',
                    }}
                    onClick={() => setPreviewImage(null)}
                >
                    <img
                        src={previewImage}
                        alt="Preview"
                        style={{
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            objectFit: 'contain',
                            borderRadius: 'var(--radius-l)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                        }}
                    />
                </div>
            )}
            <style>{`
            @media (max-width: 600px) {
                .almora-image-responsive {
                    display: block !important;
                    margin-left: auto !important;
                    margin-right: auto !important;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    max-width: 95vw !important;
                }
            }
            `}</style>
        </>
    );
}