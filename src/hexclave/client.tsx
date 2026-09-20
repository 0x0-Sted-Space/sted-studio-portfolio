import { HexclaveClientApp } from '@hexclave/next';

export const hexclaveClientApp = new HexclaveClientApp({
  tokenStore: 'nextjs-cookie',
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
