import { hexclaveServerApp } from '@/hexclave/server';
import { logAuthEvent, AuthEventType } from './session-monitoring';
import { AuthError, createAuthError, normalizeError } from './auth-errors';
import { retryAuth } from './auth-retry';
import { handleAuthFallback, cacheSuccessfulAuth } from './auth-fallbacks';

export async function getCurrentUser() {
  // If Hexclave is not configured, return null (public mode)
  if (!hexclaveServerApp) {
    return null;
  }

  try {
    const user = await retryAuth(
      () => hexclaveServerApp.getUser(),
      { source: 'getCurrentUser' }
    );
    
    // Cache successful authentication
    if (user) {
      cacheSuccessfulAuth(user);
      
      await logAuthEvent(AuthEventType.SIGN_IN, {
        userId: user.id,
        success: true,
        metadata: { source: 'getCurrentUser' },
      });
    }
    
    return user;
  } catch (error) {
    const authError = normalizeError(error);
    
    // Log failed user retrieval
    await logAuthEvent(AuthEventType.FAILED_AUTHENTICATION, {
      success: false,
      errorMessage: authError.message,
      metadata: { 
        source: 'getCurrentUser',
        errorType: authError.type,
        errorCode: authError.code,
      },
    });
    
    // Try fallback strategies
    const fallbackResult = await handleAuthFallback(authError);
    if (fallbackResult.success && fallbackResult.user) {
      return fallbackResult.user;
    }
    
    return null;
  }
}

export async function requireAuth() {
  // If Hexclave is not configured, throw error
  if (!hexclaveServerApp) {
    throw createAuthError.sessionExpired('Authentication not configured');
  }

  try {
    const user = await getCurrentUser();
    if (!user) {
      throw createAuthError.sessionExpired();
    }
    return user;
  } catch (error) {
    const authError = normalizeError(error);
    
    // Log failed authentication requirement
    await logAuthEvent(AuthEventType.FAILED_AUTHENTICATION, {
      success: false,
      errorMessage: authError.message,
      metadata: { 
        source: 'requireAuth',
        errorType: authError.type,
        errorCode: authError.code,
      },
    });
    
    // Try fallback strategies
    const fallbackResult = await handleAuthFallback(authError);
    if (fallbackResult.success && fallbackResult.user) {
      return fallbackResult.user;
    }
    
    throw authError;
  }
}

export async function hasRole(requiredRole: string) {
  // If Hexclave is not configured, return false
  if (!hexclaveServerApp) {
    return false;
  }

  const user = await hexclaveServerApp.getUser();
  if (!user) return false;
  
  // Implement your role checking logic
  // This could be from user metadata, database, etc.
  // Implement your role checking logic based on your StackAuth setup
  // This could be from user metadata, team roles, or custom permissions
  return false; // Placeholder - implement based on your role system
}

export async function requireRole(role: string) {
  const hasPermission = await hasRole(role);
  if (!hasPermission) {
    throw new Error(`Role '${role}' required`);
  }
}

// Utility function to get user data in a consistent format for API responses
export function formatUserForAPI(user: any) {
  return {
    id: user.id,
    email: user.primaryEmail,
    displayName: user.displayName
  };
}