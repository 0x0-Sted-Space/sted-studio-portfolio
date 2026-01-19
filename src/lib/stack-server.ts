import 'server-only';
import { StackServerApp } from "@stackframe/stack";

// Check if StackAuth is configured
const isStackAuthConfigured = !!(
  process.env.NEXT_PUBLIC_STACK_PROJECT_ID && 
  process.env.STACK_SECRET_SERVER_KEY
);

// Simple StackAuth server configuration (only if env vars are present)
export const stackServerApp = isStackAuthConfigured 
  ? new StackServerApp({
      tokenStore: "nextjs-cookie",
      projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
      secretServerKey: process.env.STACK_SECRET_SERVER_KEY!,
    })
  : null;

export { isStackAuthConfigured };
