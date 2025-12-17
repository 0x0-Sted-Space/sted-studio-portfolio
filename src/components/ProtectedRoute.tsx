'use client';

import { useUser } from '@stackframe/stack';
import { ReactNode } from 'react';
import { Flex, Heading, Button } from '@/once-ui/components';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ProtectedRoute({ 
  children, 
  fallback 
}: ProtectedRouteProps) {
  const user = useUser();

  if (!user) {
    return (
      fallback || (
        <Flex fillWidth paddingY="128" maxWidth={24} gap="24"
          justifyContent="center" direction="column" alignItems="center">
          <Heading align="center" wrap="balance">
            Authentication Required
          </Heading>
          <p className="text-center text-neutral-600">
            Please sign in to access this page
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => user?.signIn()}
              size="l"
              variant="primary"
            >
              Sign In
            </Button>
            <Button
              onClick={() => user?.signUp()}
              size="l"
              variant="secondary"
            >
              Sign Up
            </Button>
          </div>
        </Flex>
      )
    );
  }

  return <>{children}</>;
}