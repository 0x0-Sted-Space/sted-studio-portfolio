'use client';

import { Flex, Button } from '@/once-ui/components';
import { useUser } from '@hexclave/next';
import { hexclaveClientApp } from '@/hexclave/client';

export function HeaderAuth() {
  const user = useUser();

  return (
    <Flex gap="8" alignItems="center">
      {user ? (
        <Button onClick={() => user.signOut()} variant="secondary" size="s">
          Sign Out
        </Button>
      ) : (
        <>
          <Button
            onClick={() => hexclaveClientApp.redirectToSignIn()}
            variant="secondary"
            size="s"
          >
            Sign In
          </Button>
          <Button
            onClick={() => hexclaveClientApp.redirectToSignUp()}
            variant="primary"
            size="s"
          >
            Sign Up
          </Button>
        </>
      )}
    </Flex>
  );
}
