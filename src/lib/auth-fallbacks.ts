/**
 * Authentication Fallback Flows
 * Implements requirement 6.5 - fallback authentication flows
 */

import { AuthError, AuthErrorType, createAuthError } from './auth-errors';
import { hexclaveServerApp } from '@/hexclave/server';

/**
 * Fallback authentication strategies
 */
export enum FallbackStrategy {
  GUEST_MODE = 'GUEST_MODE',
  CACHED_SESSION = 'CACHED_SESSION',
  OFFLINE_MODE = 'OFFLINE_MODE',
  REDIRECT_TO_AUTH = 'REDIRECT_TO_AUTH',
  RETRY_WITH_REFRESH = 'RETRY_WITH_REFRESH',
}

/**
 * Fallback result
 */
export interface FallbackResult {
  success: boolean;
  strategy: FallbackStrategy;
  user?: any;
  error?: AuthError;
  metadata?: Record<string, any>;
}

/**
 * Fallback configuration
 */
export interface FallbackConfig {
  enableGuestMode: boolean;
  enableCachedSession: boolean;
  enableOfflineMode: boolean;
  autoRedirectToAuth: boolean;
  maxCacheAge: number; // in milliseconds
}

/**
 * Default fallback configuration
 */
export const DEFAULT_FALLBACK_CONFIG: FallbackConfig = {
  enableGuestMode: true,
  enableCachedSession: true,
  enableOfflineMode: false,
  autoRedirectToAuth: true,
  maxCacheAge: 24 * 60 * 60 * 1000, // 24 hours
};

/**
 * Guest user object
 */
const GUEST_USER = {
  id: 'guest',
  email: '',
  displayName: 'Guest User',
  isGuest: true,
  apps: [],
  permissions: ['read'],
};

/**
 * Cache keys for fallback data
 */
const CACHE_KEYS = {
  LAST_VALID_SESSION: 'stedspace_last_valid_session',
  USER_PREFERENCES: 'stedspace_user_preferences',
  OFFLINE_DATA: 'stedspace_offline_data',
};

/**
 * Get cached session data
 */
function getCachedSession(): { user: any; timestamp: number } | null {
  try {
    const cached = localStorage.getItem(CACHE_KEYS.LAST_VALID_SESSION);
    if (!cached) return null;

    const data = JSON.parse(cached);
    return data;
  } catch {
    return null;
  }
}

/**
 * Cache session data
 */
function cacheSession(user: any): void {
  try {
    const data = {
      user,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEYS.LAST_VALID_SESSION, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to cache session:', error);
  }
}

/**
 * Clear cached session
 */
function clearCachedSession(): void {
  try {
    localStorage.removeItem(CACHE_KEYS.LAST_VALID_SESSION);
  } catch (error) {
    console.warn('Failed to clear cached session:', error);
  }
}

/**
 * Check if cached session is still valid
 */
function isCachedSessionValid(cachedData: any, maxAge: number): boolean {
  if (!cachedData || !cachedData.timestamp) return false;
  return Date.now() - cachedData.timestamp < maxAge;
}

/**
 * Guest mode fallback
 */
async function fallbackToGuestMode(): Promise<FallbackResult> {
  return {
    success: true,
    strategy: FallbackStrategy.GUEST_MODE,
    user: GUEST_USER,
    metadata: {
      message: 'Continuing in guest mode',
    },
  };
}

/**
 * Cached session fallback
 */
async function fallbackToCachedSession(config: FallbackConfig): Promise<FallbackResult> {
  const cachedData = getCachedSession();
  
  if (!cachedData || !isCachedSessionValid(cachedData, config.maxCacheAge)) {
    return {
      success: false,
      strategy: FallbackStrategy.CACHED_SESSION,
      error: createAuthError.sessionExpired(),
    };
  }

  return {
    success: true,
    strategy: FallbackStrategy.CACHED_SESSION,
    user: cachedData.user,
    metadata: {
      message: 'Using cached session',
      cachedAt: new Date(cachedData.timestamp).toISOString(),
    },
  };
}

/**
 * Offline mode fallback
 */
async function fallbackToOfflineMode(): Promise<FallbackResult> {
  try {
    const offlineData = localStorage.getItem(CACHE_KEYS.OFFLINE_DATA);
    const data = offlineData ? JSON.parse(offlineData) : null;

    return {
      success: true,
      strategy: FallbackStrategy.OFFLINE_MODE,
      user: data?.user || GUEST_USER,
      metadata: {
        message: 'Operating in offline mode',
        isOffline: true,
      },
    };
  } catch {
    return {
      success: false,
      strategy: FallbackStrategy.OFFLINE_MODE,
      error: createAuthError.unknown(undefined, 'Offline mode unavailable'),
    };
  }
}

/**
 * Redirect to authentication fallback
 */
async function fallbackToAuthRedirect(): Promise<FallbackResult> {
  // In a browser environment, redirect to sign-in page
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;
    const redirectUrl = `/handler/sign-in?redirect=${encodeURIComponent(currentPath)}`;
    
    // Use setTimeout to allow the current operation to complete
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 100);
  }

  return {
    success: false,
    strategy: FallbackStrategy.REDIRECT_TO_AUTH,
    metadata: {
      message: 'Redirecting to authentication',
    },
  };
}

/**
 * Retry with token refresh fallback
 */
async function fallbackToTokenRefresh(): Promise<FallbackResult> {
  try {
    // Attempt to refresh the session
    const user = await hexclaveServerApp.getUser();
    
    if (user) {
      // Cache the refreshed session
      cacheSession(user);
      
      return {
        success: true,
        strategy: FallbackStrategy.RETRY_WITH_REFRESH,
        user,
        metadata: {
          message: 'Session refreshed successfully',
        },
      };
    }

    return {
      success: false,
      strategy: FallbackStrategy.RETRY_WITH_REFRESH,
      error: createAuthError.tokenExpired(),
    };
  } catch (error) {
    return {
      success: false,
      strategy: FallbackStrategy.RETRY_WITH_REFRESH,
      error: createAuthError.unknown(error instanceof Error ? error : undefined),
    };
  }
}

/**
 * Main fallback handler
 */
export async function handleAuthFallback(
  error: AuthError,
  config: Partial<FallbackConfig> = {}
): Promise<FallbackResult> {
  const finalConfig = { ...DEFAULT_FALLBACK_CONFIG, ...config };

  // Determine the best fallback strategy based on the error type
  switch (error.type) {
    case AuthErrorType.TOKEN_EXPIRED:
    case AuthErrorType.REFRESH_TOKEN_EXPIRED:
    case AuthErrorType.SESSION_EXPIRED:
      // Try token refresh first
      const refreshResult = await fallbackToTokenRefresh();
      if (refreshResult.success) return refreshResult;

      // Fall back to cached session
      if (finalConfig.enableCachedSession) {
        const cachedResult = await fallbackToCachedSession(finalConfig);
        if (cachedResult.success) return cachedResult;
      }

      // Fall back to guest mode or redirect
      if (finalConfig.enableGuestMode) {
        return await fallbackToGuestMode();
      } else if (finalConfig.autoRedirectToAuth) {
        return await fallbackToAuthRedirect();
      }
      break;

    case AuthErrorType.NETWORK_ERROR:
    case AuthErrorType.SERVICE_UNAVAILABLE:
      // Try cached session first for network errors
      if (finalConfig.enableCachedSession) {
        const cachedResult = await fallbackToCachedSession(finalConfig);
        if (cachedResult.success) return cachedResult;
      }

      // Fall back to offline mode
      if (finalConfig.enableOfflineMode) {
        return await fallbackToOfflineMode();
      }

      // Fall back to guest mode
      if (finalConfig.enableGuestMode) {
        return await fallbackToGuestMode();
      }
      break;

    case AuthErrorType.INVALID_CREDENTIALS:
    case AuthErrorType.USER_NOT_FOUND:
      // For credential errors, redirect to auth
      if (finalConfig.autoRedirectToAuth) {
        return await fallbackToAuthRedirect();
      }

      // Or fall back to guest mode
      if (finalConfig.enableGuestMode) {
        return await fallbackToGuestMode();
      }
      break;

    case AuthErrorType.APP_ACCESS_DENIED:
    case AuthErrorType.APP_NOT_FOUND:
      // For app access errors, try cached session
      if (finalConfig.enableCachedSession) {
        const cachedResult = await fallbackToCachedSession(finalConfig);
        if (cachedResult.success) return cachedResult;
      }

      // Fall back to guest mode with limited access
      if (finalConfig.enableGuestMode) {
        return await fallbackToGuestMode();
      }
      break;

    default:
      // For unknown errors, try the most conservative approach
      if (finalConfig.enableGuestMode) {
        return await fallbackToGuestMode();
      }
  }

  // If no fallback worked, return the original error
  return {
    success: false,
    strategy: FallbackStrategy.REDIRECT_TO_AUTH,
    error,
  };
}

/**
 * Utility to cache a successful authentication
 */
export function cacheSuccessfulAuth(user: any): void {
  cacheSession(user);
}

/**
 * Utility to clear authentication cache
 */
export function clearAuthCache(): void {
  clearCachedSession();
  try {
    localStorage.removeItem(CACHE_KEYS.USER_PREFERENCES);
    localStorage.removeItem(CACHE_KEYS.OFFLINE_DATA);
  } catch (error) {
    console.warn('Failed to clear auth cache:', error);
  }
}

/**
 * Check if user is in guest mode
 */
export function isGuestUser(user: any): boolean {
  return user?.isGuest === true || user?.id === 'guest';
}

/**
 * Check if user is from cached session
 */
export function isCachedUser(user: any): boolean {
  const cachedData = getCachedSession();
  return cachedData?.user?.id === user?.id;
}

/**
 * Get fallback configuration based on environment
 */
export function getEnvironmentFallbackConfig(): FallbackConfig {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return {
    ...DEFAULT_FALLBACK_CONFIG,
    enableGuestMode: isDevelopment || process.env.NEXT_PUBLIC_ENABLE_GUEST_MODE === 'true',
    enableOfflineMode: isDevelopment || process.env.NEXT_PUBLIC_ENABLE_OFFLINE_MODE === 'true',
    autoRedirectToAuth: process.env.NEXT_PUBLIC_AUTO_REDIRECT_AUTH !== 'false',
  };
}