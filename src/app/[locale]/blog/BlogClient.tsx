"use client";

import { Flex, Heading } from '@/once-ui/components';
import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { baseURL, renderContent } from '@/app/resources';
import { getTranslations } from 'next-intl/server';

interface BlogClientProps {
  posts: any[];
  locale: string;
}

export default function BlogClient({ posts, locale }: BlogClientProps) {
  // Note: getTranslations and renderContent are not async here, so pass content as needed from parent if required
  // For now, fallback to static content or remove if not needed
  // If you need translations, consider passing them as props from the server component
  // This is a minimal client component for MDX rendering

  // Remove server-only logic (like getTranslations) or pass as props
  // For now, just render posts
  return (
    <Flex fillWidth maxWidth="s" direction="column">
      {/* You can add static content or props here if needed */}
      <Heading marginBottom="l" variant="display-strong-s">
        Blog
      </Heading>
      <Flex fillWidth flex={1} direction="column">
        <div className="markdown">
          <Posts posts={posts} range={[1, 3]} locale={locale} thumbnail />
          <Posts posts={posts} range={[4]} columns="2" locale={locale} />
        </div>
      </Flex>
      {/* Newsletter and other content can be added here if needed */}
    </Flex>
  );
} 