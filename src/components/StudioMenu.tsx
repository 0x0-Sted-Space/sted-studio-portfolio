'use client';

import { useState } from 'react';
import { Flex, Button, Text, Heading, Icon } from '@/once-ui/components';
import '../styles/auth-modal.css';

interface StudioMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StudioMenu({ isOpen, onClose }: StudioMenuProps) {
  if (!isOpen) return null;

  const studioFeatures = [
    {
      category: 'Design Tools',
      items: [
        { label: 'Design System', icon: 'grid', action: () => console.log('Design System') },
        { label: 'Component Library', icon: 'layers', action: () => console.log('Component Library') },
        { label: 'Style Guide', icon: 'palette', action: () => console.log('Style Guide') },
      ]
    },
    {
      category: 'Development',
      items: [
        { label: 'Code Generator', icon: 'code', action: () => console.log('Code Generator') },
        { label: 'API Documentation', icon: 'book', action: () => console.log('API Docs') },
        { label: 'Build Tools', icon: 'settings', action: () => console.log('Build Tools') },
      ]
    },
    {
      category: 'Collaboration',
      items: [
        { label: 'Team Workspace', icon: 'users', action: () => console.log('Team Workspace') },
        { label: 'Project Management', icon: 'folder', action: () => console.log('Project Management') },
        { label: 'Version Control', icon: 'git-branch', action: () => console.log('Version Control') },
      ]
    },
    {
      category: 'Analytics',
      items: [
        { label: 'Performance Metrics', icon: 'trending-up', action: () => console.log('Performance') },
        { label: 'User Analytics', icon: 'bar-chart', action: () => console.log('Analytics') },
        { label: 'Reports', icon: 'file-text', action: () => console.log('Reports') },
      ]
    }
  ];

  return (
    <>
      <div className="studio-menu-overlay" onClick={onClose} />
      <div className={`studio-menu-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <Flex 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center" 
          padding="l"
          background="brand-weak"
        >
          <Heading variant="heading-strong-s" onBackground="brand-strong">
            Sted Studio
          </Heading>
          <Button
            variant="tertiary"
            size="s"
            prefixIcon="close"
            onClick={onClose}
            style={{
              padding: '8px',
              minWidth: 'auto'
            }}
          />
        </Flex>
        
        {/* Menu Content */}
        <Flex direction="column" padding="l" gap="l">
          {studioFeatures.map((category, categoryIndex) => (
            <Flex key={categoryIndex} direction="column" gap="m">
              <Text variant="label-default-s" onBackground="neutral-strong">
                {category.category}
              </Text>
              
              <Flex direction="column" gap="xs">
                {category.items.map((item, itemIndex) => (
                  <Button
                    key={itemIndex}
                    variant="tertiary"
                    onClick={() => {
                      item.action();
                      onClose();
                    }}
                    style={{
                      justifyContent: 'flex-start',
                      padding: '12px',
                      width: '100%'
                    }}
                  >
                    <Flex alignItems="center" gap="m">
                      <Icon name={item.icon as any} size="s" />
                      <Text variant="body-default-s">{item.label}</Text>
                    </Flex>
                  </Button>
                ))}
              </Flex>
            </Flex>
          ))}
          
          {/* Quick Actions */}
          <Flex direction="column" gap="m" paddingTop="l">
            <Text variant="label-default-s" onBackground="neutral-strong">
              Quick Actions
            </Text>
            
            <Flex direction="column" gap="xs">
              <Button
                variant="primary"
                onClick={() => {
                  console.log('New Project');
                  onClose();
                }}
                style={{ width: '100%' }}
              >
                <Flex alignItems="center" gap="s">
                  <Icon name="plus" size="s" />
                  <Text variant="label-default-s">New Project</Text>
                </Flex>
              </Button>
              
              <Button
                variant="secondary"
                onClick={() => {
                  console.log('Import Project');
                  onClose();
                }}
                style={{ width: '100%' }}
              >
                <Flex alignItems="center" gap="s">
                  <Icon name="upload" size="s" />
                  <Text variant="label-default-s">Import Project</Text>
                </Flex>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </>
  );
}