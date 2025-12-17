'use client';

import { useUser } from '@stackframe/stack';
import { Flex, Heading, Text, Button } from '@/once-ui/components';

export default function AuthTestPage() {
  const user = useUser();

  return (
    <Flex
      fillWidth
      paddingY="l"
      direction="column"
      alignItems="center"
      gap="m"
    >
      <Heading variant="display-strong-s">
        StackAuth Test Page
      </Heading>
      
      {user ? (
        <Flex direction="column" alignItems="center" gap="s">
          <Text variant="body-default-m">
            ✅ Authentication Working!
          </Text>
          <Text variant="body-default-s">
            Welcome, {user.displayName || user.primaryEmail}
          </Text>
          <Text variant="body-default-xs">
            User ID: {user.id}
          </Text>
          <Button
            onClick={() => user.signOut()}
            variant="secondary"
            size="m"
          >
            Sign Out
          </Button>
        </Flex>
      ) : (
        <Flex direction="column" alignItems="center" gap="s">
          <Text variant="body-default-m">
            🔒 Not authenticated
          </Text>
          <Flex gap="s">
            <Button
              onClick={() => user?.signIn()}
              variant="primary"
              size="m"
            >
              Sign In
            </Button>
            <Button
              onClick={() => user?.signUp()}
              variant="secondary"
              size="m"
            >
              Sign Up
            </Button>
          </Flex>
        </Flex>
      )}
      
      <Text variant="body-default-xs" style={{ marginTop: '2rem' }}>
        Environment Check:
      </Text>
      <Text variant="body-default-xs">
        Project ID: {process.env.NEXT_PUBLIC_STACK_PROJECT_ID ? '✅ Set' : '❌ Missing'}
      </Text>
      <Text variant="body-default-xs">
        Client Key: {process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY ? '✅ Set' : '❌ Missing'}
      </Text>
    </Flex>
  );
}