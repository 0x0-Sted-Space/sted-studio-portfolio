import { stackServerApp } from './stack';

// Multi-app authentication utilities
export async function getUserWithAppContext() {
  const user = await stackServerApp.getUser();
  if (!user) return null;

  return {
    ...user,
    appName: process.env.NEXT_PUBLIC_APP_NAME || 'default',
    appUrl: process.env.NEXT_PUBLIC_APP_URL || '',
  };
}

// Check if user has access to specific app
export async function hasAppAccess(appName: string) {
  const user = await stackServerApp.getUser();
  if (!user) return false;

  // Add your app-specific access logic here
  // For example, check user metadata or team permissions
  
  // Default: all authenticated users have access
  return true;
}

// Get user's accessible apps
export async function getUserApps() {
  const user = await stackServerApp.getUser();
  if (!user) return [];

  // Return list of apps user can access
  // This could come from user metadata, database, or Stack Auth teams
  return [
    {
      name: 'sted-studio-portfolio',
      url: process.env.NEXT_PUBLIC_APP_URL,
      displayName: 'Sted Studio Portfolio'
    },
    // Add other apps here
    // {
    //   name: 'admin-dashboard',
    //   url: 'https://admin.yourdomain.com',
    //   displayName: 'Admin Dashboard'
    // }
  ];
}

// Cross-app navigation helper
export function navigateToApp(appUrl: string, path: string = '/') {
  const fullUrl = `${appUrl}${path}`;
  window.location.href = fullUrl;
}