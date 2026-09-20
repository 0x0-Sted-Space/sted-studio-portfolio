import { HexclaveClientApp } from '@hexclave/next';

export const hexclaveClientApp = new HexclaveClientApp({
  tokenStore: 'nextjs-cookie',
  // Not documented as an automatic env fallback like projectId/keys are,
  // so wire it explicitly for this project's non-default API host.
  baseUrl: process.env.NEXT_PUBLIC_HEXCLAVE_API_URL,
  // Auth screens are served in-app by [locale]/handler/[...stack]/page.tsx.
  // The default 'hosted' mode bounces users out to Hexclave's own domain
  // and back; with no local handler route that ends in a redirect loop.
  urls: {
    handler: '/handler',
    signIn: '/handler/sign-in',
    signUp: '/handler/sign-up',
    afterSignIn: '/',
    afterSignUp: '/',
    afterSignOut: '/',
  },
});
