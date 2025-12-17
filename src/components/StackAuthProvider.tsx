'use client';

import { StackProvider, StackTheme } from "@stackframe/stack";
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface StackAuthProviderProps {
  children: ReactNode;
}

export default function StackAuthProvider({ children }: StackAuthProviderProps) {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const locale = params?.locale || 'en';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render StackAuth on server side
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <StackProvider
      urls={{
        signIn: `/${locale}/handler/sign-in`,
        signUp: `/${locale}/handler/sign-up`,
        afterSignIn: `/${locale}`,
        afterSignUp: `/${locale}`,
        afterSignOut: `/${locale}`,
      }}
    >
      <StackTheme>
        {children}
      </StackTheme>
    </StackProvider>
  );
}