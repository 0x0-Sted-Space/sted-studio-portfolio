'use client';

import { useUser } from '@stackframe/stack';

export default function AuthButton() {
  const user = useUser();

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">Welcome, {user.displayName || user.primaryEmail}</span>
        <button
          onClick={() => user.signOut()}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => user?.signIn()}
        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Sign In
      </button>
      <button
        onClick={() => user?.signUp()}
        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        Sign Up
      </button>
    </div>
  );
}