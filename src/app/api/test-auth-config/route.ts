import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
    publishableKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
    hasSecretKey: !!process.env.STACK_SECRET_SERVER_KEY,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    nodeEnv: process.env.NODE_ENV,
  };

  return NextResponse.json({
    message: 'StackAuth Configuration Check',
    config,
    isConfigured: !!(config.projectId && config.publishableKey && config.hasSecretKey)
  });
}