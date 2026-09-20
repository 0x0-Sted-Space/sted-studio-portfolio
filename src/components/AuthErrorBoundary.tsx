'use client';

import React, { Component, ReactNode } from 'react';
import { Flex, Text, Button } from '@/once-ui/components';

interface AuthErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  retryCount: number;
}

interface AuthErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  maxRetries?: number;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

class AuthErrorBoundary extends Component<AuthErrorBoundaryProps, AuthErrorBoundaryState> {
  private retryTimeoutId: NodeJS.Timeout | null = null;

  constructor(props: AuthErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<AuthErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Authentication Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log authentication-specific errors
    if (this.isAuthenticationError(error)) {
      console.error('Authentication-specific error detected:', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      });
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  private isAuthenticationError(error: Error): boolean {
    const authErrorPatterns = [
      /stack.*auth/i,
      /authentication/i,
      /unauthorized/i,
      /token/i,
      /session/i,
      /sign.*in/i,
      /sign.*up/i,
      /login/i,
    ];

    return authErrorPatterns.some(pattern => 
      pattern.test(error.message) || 
      pattern.test(error.name) ||
      pattern.test(error.stack || '')
    );
  }

  private handleRetry = () => {
    const { maxRetries = 3 } = this.props;
    const { retryCount } = this.state;

    if (retryCount < maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prevState.retryCount + 1,
      }));
    }
  };

  private handleAutoRetry = () => {
    const { maxRetries = 3 } = this.props;
    const { retryCount } = this.state;

    if (retryCount < maxRetries) {
      this.retryTimeoutId = setTimeout(() => {
        this.handleRetry();
      }, 2000); // Auto-retry after 2 seconds
    }
  };

  private handleReload = () => {
    window.location.reload();
  };

  private getErrorMessage(): string {
    const { error } = this.state;
    
    if (!error) return 'An unknown error occurred';

    // Provide user-friendly messages for common authentication errors
    if (error.message.includes('Network Error') || error.message.includes('fetch')) {
      return 'Unable to connect to authentication service. Please check your internet connection.';
    }
    
    if (error.message.includes('token') || error.message.includes('unauthorized')) {
      return 'Your session has expired. Please sign in again.';
    }
    
    if (error.message.includes('stack') && error.message.includes('auth')) {
      return 'Authentication service is temporarily unavailable. Please try again.';
    }

    return 'An authentication error occurred. Please try again.';
  }

  render() {
    const { hasError, retryCount } = this.state;
    const { children, fallback, maxRetries = 3 } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Default error UI
      return (
        <Flex
          direction="column"
          gap="16"
          padding="32"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '200px' }}
        >
          <Flex direction="column" gap="8" alignItems="center">
            <Text variant="heading-strong-l" style={{ color: 'var(--neutral-on-background-weak)' }}>
              Authentication Error
            </Text>
            <Text 
              variant="body-default-m" 
              style={{ 
                textAlign: 'center', 
                maxWidth: '400px',
                color: 'var(--neutral-on-background-medium)'
              }}
            >
              {this.getErrorMessage()}
            </Text>
          </Flex>

          <Flex gap="12" alignItems="center">
            {retryCount < maxRetries && (
              <Button
                onClick={this.handleRetry}
                variant="primary"
                size="m"
              >
                Try Again ({maxRetries - retryCount} attempts left)
              </Button>
            )}
            
            <Button
              onClick={this.handleReload}
              variant="secondary"
              size="m"
            >
              Reload Page
            </Button>
          </Flex>

          {retryCount >= maxRetries && (
            <Text 
              variant="body-default-s" 
              style={{ 
                color: 'var(--neutral-on-background-weak)',
                textAlign: 'center',
                maxWidth: '400px'
              }}
            >
              If the problem persists, please contact support or try again later.
            </Text>
          )}

          {/* Auto-retry for transient errors */}
          {retryCount < maxRetries && this.isAuthenticationError(this.state.error!) && (
            <>
              {this.handleAutoRetry()}
              <Text 
                variant="body-default-s" 
                style={{ color: 'var(--neutral-on-background-weak)' }}
              >
                Automatically retrying in 2 seconds...
              </Text>
            </>
          )}
        </Flex>
      );
    }

    return children;
  }
}

export default AuthErrorBoundary;