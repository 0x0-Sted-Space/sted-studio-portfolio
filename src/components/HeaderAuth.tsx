'use client';

import { Flex, Button } from '@/once-ui/components';
import { useState } from 'react';
import { StudioMenu } from './StudioMenu';
import { useUser } from '@hexclave/next';
import { hexclaveClientApp } from '@/hexclave/client';

export function HeaderAuth() {
  const [isStudioMenuOpen, setIsStudioMenuOpen] = useState(false);
  const user = useUser();

  const toggleStudioMenu = () => {
    setIsStudioMenuOpen(!isStudioMenuOpen);
  };

  const closeStudioMenu = () => {
    setIsStudioMenuOpen(false);
  };

  return (
    <>
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

        {/* Contact button */}
        <Button
          onClick={() => window.location.href = '/#contact'}
          variant="tertiary"
          size="s"
        >
          Contact
        </Button>

        {/* Studio Menu Burger Button */}
        <Button
          variant="tertiary"
          size="s"
          prefixIcon="menu"
          onClick={toggleStudioMenu}
          style={{
            padding: '8px',
            minWidth: 'auto'
          }}
        />
      </Flex>
      
      {/* Studio Menu Sidebar */}
      <StudioMenu 
        isOpen={isStudioMenuOpen}
        onClose={closeStudioMenu}
      />
    </>
  );
}