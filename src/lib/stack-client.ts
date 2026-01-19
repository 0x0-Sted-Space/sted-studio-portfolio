'use client';
import { StackClientApp } from "@stackframe/stack";

// Check if StackAuth is configured
const isStackAuthConfigured = !!(
  process.env.NEXT_PUBLIC_STACK_PROJECT_ID && 
  process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY
);

// Get the base URL for the application
const getAppUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
};

// Simple StackAuth client configuration (only if env vars are present)
export const stackClientApp = isStackAuthConfigured 
  ? new StackClientApp({
      tokenStore: "nextjs-cookie",
      projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
      publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY!,
      urls: {
        signIn: '/handler/sign-in',
        signUp: '/handler/sign-up',
        afterSignIn: '/',
        afterSignUp: '/',
        afterSignOut: '/',
        home: '/',
      },
    })
  : null;

export { isStackAuthConfigured };
