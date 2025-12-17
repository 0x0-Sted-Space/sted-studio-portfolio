'use client';

import { useUser } from '@stackframe/stack';
import { useState, useEffect } from 'react';
import { getUserApps, navigateToApp } from '@/lib/multi-app-auth';

interface App {
  name: string;
  url: string;
  displayName: string;
}

export default function AppSwitcher() {
  const user = useUser();
  const [apps, setApps] = useState<App[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      getUserApps().then(setApps);
    }
  }, [user]);

  if (!user || apps.length <= 1) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
      >
        Apps ↓
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg min-w-48 z-50">
          {apps.map((app) => (
            <button
              key={app.name}
              onClick={() => {
                navigateToApp(app.url);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              {app.displayName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}