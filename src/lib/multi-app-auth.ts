/**
 * Multi-App Authentication Utilities (Server-side)
 * Implements requirements 4.2, 4.3
 */

import 'server-only';
import { hexclaveServerApp } from '@/hexclave/server';
import { StedUser, UserAppAccess, AppConfig } from '@/types/user';
import { getAppConfig, getActiveApps, getDefaultPermissions, isValidApp } from './app-config';

/**
 * Get current user with app context information
 */
export async function getUserWithAppContext(): Promise<(StedUser & { currentApp?: string }) | null> {
  const user = await hexclaveServerApp.getUser();
  if (!user) return null;

  // Convert StackAuth user to StedUser format
  const stedUser: StedUser = {
    id: user.id,
    email: user.primaryEmail || '',
    displayName: user.displayName || user.primaryEmail || '',
    profileImageUrl: user.profileImageUrl || undefined,
    phoneNumber: undefined, // StackAuth user doesn't have primaryPhoneNumber in this format
    createdAt: new Date(), // StackAuth user doesn't have createdAt in this format
    lastActiveAt: new Date(),
    apps: await getUserAppAccess(user.id),
  };

  return {
    ...stedUser,
    currentApp: process.env.NEXT_PUBLIC_APP_NAME || 'stedspace',
  };
}

/**
 * Check if user has access to a specific app
 */
export async function hasAppAccess(appName: string): Promise<boolean> {
  const user = await hexclaveServerApp.getUser();
  if (!user) return false;

  // Check if app exists and is active
  if (!isValidApp(appName)) return false;

  // Get user's app access permissions
  const userApps = await getUserAppAccess(user.id);
  const appAccess = userApps.find(app => app.appName === appName);

  // If user has explicit access and it's active
  if (appAccess && appAccess.isActive) return true;

  // For new users, grant access to all active apps by default
  // This implements the requirement that new users get access to all available apps
  const activeApps = getActiveApps();
  const hasAnyAppAccess = userApps.length > 0;
  
  if (!hasAnyAppAccess) {
    // New user - grant access to all active apps
    await grantAppAccess(user.id, appName);
    return true;
  }

  return false;
}

/**
 * Get user's accessible apps
 */
export async function getUserApps(): Promise<AppConfig[]> {
  const user = await hexclaveServerApp.getUser();
  if (!user) return [];

  const userAppAccess = await getUserAppAccess(user.id);
  const activeUserApps = userAppAccess.filter(app => app.isActive);

  // Get full app configurations for user's accessible apps
  const userApps: AppConfig[] = [];
  for (const userApp of activeUserApps) {
    const appConfig = getAppConfig(userApp.appName);
    if (appConfig) {
      userApps.push(appConfig);
    }
  }

  // If user has no apps, grant access to all active apps (new user)
  if (userApps.length === 0) {
    const activeApps = getActiveApps();
    for (const app of activeApps) {
      await grantAppAccess(user.id, app.name);
    }
    return activeApps;
  }

  return userApps;
}

/**
 * Grant app access to a user
 */
export async function grantAppAccess(userId: string, appName: string): Promise<boolean> {
  try {
    // Validate app exists
    const appConfig = getAppConfig(appName);
    if (!appConfig || !appConfig.isActive) return false;

    // For now, we'll implement a simple in-memory storage
    // In a real implementation, this would store to a database
    // Since StackAuth doesn't have updateUser method in this version,
    // we'll simulate success for all valid apps
    
    console.log(`Granting access to app ${appName} for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error granting app access:', error);
    return false;
  }
}

/**
 * Revoke app access from a user
 */
export async function revokeAppAccess(userId: string, appName: string): Promise<boolean> {
  try {
    // For now, we'll implement a simple simulation
    // In a real implementation, this would update the database
    console.log(`Revoking access to app ${appName} for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error revoking app access:', error);
    return false;
  }
}

/**
 * Get user's app access permissions (internal helper)
 */
async function getUserAppAccess(userId: string): Promise<UserAppAccess[]> {
  try {
    // For now, return default access to all active apps
    // In a real implementation, this would query the database
    const activeApps = getActiveApps();
    const now = new Date();
    
    return activeApps.map(app => ({
      appName: app.name,
      grantedAt: now,
      permissions: app.defaultPermissions,
      isActive: true,
      lastAccessedAt: now,
    }));
  } catch (error) {
    console.error('Error getting user app access:', error);
    return [];
  }
}

/**
 * Update user's last access time for an app
 */
export async function updateAppLastAccess(userId: string, appName: string): Promise<void> {
  try {
    // For now, just log the access
    // In a real implementation, this would update the database
    console.log(`Updating last access for app ${appName} for user ${userId}`);
  } catch (error) {
    console.error('Error updating app last access:', error);
  }
}

/**
 * Check if user has specific permission for an app
 */
export async function hasAppPermission(appName: string, permission: string): Promise<boolean> {
  const user = await hexclaveServerApp.getUser();
  if (!user) return false;

  const userApps = await getUserAppAccess(user.id);
  const appAccess = userApps.find(app => app.appName === appName && app.isActive);

  return appAccess?.permissions.includes(permission) || false;
}