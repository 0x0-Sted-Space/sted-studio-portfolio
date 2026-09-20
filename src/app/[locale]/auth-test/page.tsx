'use client';

import { useUser } from '@hexclave/next';
import { Flex, Text, Button } from '@/once-ui/components';
import { useParams } from 'next/navigation';
import { hexclaveClientApp } from '@/hexclave/client';

export default function AuthTestPage() {
  const user = useUser();
  const params = useParams();
  const locale = params?.locale || 'en';

  return (
    <Flex
      direction="column"
      gap="16"
      padding="32"
      maxWidth="600"
      alignItems="center"
    >
      <Text variant="heading-strong-xl">Hexclave Auth Test</Text>

      <Flex direction="column" gap="8" fillWidth>
        <Text variant="heading-strong-m">Configuration Status</Text>
        <Flex direction="column" gap="4">
          <Text>
            <strong>Current Locale:</strong> {locale}
          </Text>
          <Text>
            <strong>User Status:</strong> {user ? `✅ Authenticated as ${user.displayName || user.primaryEmail}` : '❌ Not authenticated'}
          </Text>
        </Flex>
      </Flex>

      {!user && (
        <Flex direction="column" gap="8" fillWidth>
          <Text variant="heading-strong-m">Authentication Actions</Text>
          <Flex gap="8">
            <Button
              onClick={() => hexclaveClientApp.redirectToSignIn()}
              variant="secondary"
            >
              Test Sign In
            </Button>
            <Button
              onClick={() => hexclaveClientApp.redirectToSignUp()}
              variant="primary"
            >
              Test Sign Up
            </Button>
          </Flex>
        </Flex>
      )}

      {user && (
        <Flex direction="column" gap="8" fillWidth>
          <Text variant="heading-strong-m">User Information</Text>
          <Flex direction="column" gap="2">
            <Text><strong>Display Name:</strong> {user.displayName || 'Not set'}</Text>
            <Text><strong>Email:</strong> {user.primaryEmail || 'Not set'}</Text>
            <Text><strong>Profile Image:</strong> {user.profileImageUrl ? '✅ Set' : '❌ Not set'}</Text>
          </Flex>
          <Button
            onClick={() => user.signOut()}
            variant="danger"
          >
            Sign Out
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
