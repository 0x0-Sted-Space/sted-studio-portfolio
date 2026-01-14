'use client';

import { Flex, Button } from '@/once-ui/components';
import { useState } from 'react';
import { StudioMenu } from './StudioMenu';

// Simple header auth - no StackAuth for now
// Portfolio is public, auth will be added later for client interactions
export function HeaderAuth() {
  const [isStudioMenuOpen, setIsStudioMenuOpen] = useState(false);

  const toggleStudioMenu = () => {
    setIsStudioMenuOpen(!isStudioMenuOpen);
  };

  const closeStudioMenu = () => {
    setIsStudioMenuOpen(false);
  };

  return (
    <>
      <Flex gap="8" alignItems="center">
        {/* Contact button instead of auth for now */}
        <Button
          onClick={() => window.location.href = '/#contact'}
          variant="primary"
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