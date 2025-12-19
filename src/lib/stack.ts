import { StackServerApp, StackClientApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  secretServerKey: process.env.STACK_SECRET_SERVER_KEY!,
  // Add debug mode in development
  ...(process.env.NODE_ENV === 'development' && {
    debug: true
  })
});

export const stackClientApp = new StackClientApp({
  baseUrl: process.env.NEXT_PUBLIC_STACK_URL || "https://api.stack-auth.com",
  projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
  publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY!,
});