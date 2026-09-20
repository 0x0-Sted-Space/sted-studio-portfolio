import { HexclaveHandler } from '@hexclave/next';
import { hexclaveServerApp } from '@/hexclave/server';

// Catch-all route that renders every Hexclave auth screen in-app
// (sign-in, sign-up, OAuth callback, password reset, account settings...).
// Without this route the client app has nowhere to land after an auth
// redirect, which shows up as a redirect loop ending in a crash.
export default function Handler(props: {
  params: { stack: string[] };
  searchParams: Record<string, string>;
}) {
  return <HexclaveHandler fullPage app={hexclaveServerApp} routeProps={props} />;
}
