import { stackServerApp } from './stack';

export async function getCurrentUser() {
  try {
    return await stackServerApp.getUser();
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

export async function hasRole(requiredRole: string) {
  const user = await stackServerApp.getUser();
  if (!user) return false;
  
  // Implement your role checking logic
  // This could be from user metadata, database, etc.
  return user.selectedTeam?.permissions?.includes(requiredRole) || false;
}

export async function requireRole(role: string) {
  const hasPermission = await hasRole(role);
  if (!hasPermission) {
    throw new Error(`Role '${role}' required`);
  }
}