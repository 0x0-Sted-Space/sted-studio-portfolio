import { Suspense } from 'react';
import { HexclaveHandler } from '@hexclave/next';
import { hexclaveServerApp } from '@/hexclave/server';

// Catch-all route that renders every Hexclave auth screen in-app
// (sign-in, sign-up, OAuth callback, password reset, account settings...).
// Without this route the client app has nowhere to land after an auth
// redirect, which shows up as a redirect loop ending in a crash.
//
// HexclaveHandler uses suspending data hooks internally, so it needs its
// own Suspense boundary - without one it hangs on a blank/loading state
// with no error (same issue useUser() has in HeaderAuth).
export default function Handler(props: {
  params: { stack: string[] };
  searchParams: Record<string, string>;
}) {
  return (
    <Suspense fallback={null}>
      <HexclaveHandler fullPage app={hexclaveServerApp} routeProps={props} />
    </Suspense>
  );
}
