'use client';

import { ReactNode } from "react";

interface StackAuthProviderProps {
  children: ReactNode;
}

// Simple passthrough - StackAuth disabled for now
// Portfolio pages are public, auth will be added later for client interactions
export default function StackAuthProvider({ children }: StackAuthProviderProps) {
  return <>{children}</>;
}