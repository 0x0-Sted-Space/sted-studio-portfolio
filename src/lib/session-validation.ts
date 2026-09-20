import 'server-only';
import { hexclaveServerApp } from '@/hexclave/server';
import { cookies } from 'next/headers';
import { AuthError, createAuthError, normalizeError, logAuthError } from './auth-errors';
import { retryTokenRefresh, authCircuitBreaker } from './auth-retry';
import { handleAuthFallback, cacheSuccessfulAuth } from './auth-fallbacks';
import { logAuthEvent, AuthEventType } from './session-monitoring';

// Session validation result interface
export interface SessionValidationResult {
  isValid: boolean;
  user: any | null;
  needsRefresh: boolean;
  expiresAt: Date | null;
  error?: AuthError;
  fallbackUsed?: boolean;
  strategy?: string;
}

// Session configuration constants
export const SESSION_CONFIG = {
  // 30-day session persistence as per requirements
  MAX_AGE: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  // Refresh token when it has less than 7 days remaining
  REFRESH_THRESHOLD: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  // Cookie names used by StackAuth
  ACCESS_TOKEN_COOKIE: 'stack-access-token',
  REFRESH_TOKEN_COOKIE: 'stack-refresh-token',
} as const;

/**
 * Validates the current user session and returns detailed validation information
 * Implements requirements 2.2, 2.5, 6.4, 6.5
 */
export async function validateSession(): Promise<SessionValidationResult> {
  try {
    // Use circuit breaker to prevent cascading failures
    const result = await authCircuitBreaker.execute(async () => {
      // Get the current user from StackAuth
      const user = await hexclaveServerApp.getUser();
      
      if (!user) {
        throw createAuthError.sessionExpired();
      }

      // Get token information from cookies
      const cookieStore = await cookies();
      const accessToken = cookieStore.get(SESSION_CONFIG.ACCESS_TOKEN_COOKIE);
      
      if (!accessToken) {
        throw createAuthError.invalidToken('access');
      }

      // Validate token expiration
      const tokenExpiration = await getTokenExpiration(accessToken.value);
      const now = new Date();
      
      if (tokenExpiration && tokenExpiration <= now) {
        throw createAuthError.tokenExpired('access');
      }

      // Check if token needs refresh (within refresh threshold)
      const needsRefresh = tokenExpiration ? 
        (tokenExpiration.getTime() - now.getTime()) < SESSION_CONFIG.REFRESH_THRESHOLD : 
        false;

      // Cache successful session
      cacheSuccessfulAuth(user);

      // Log successful validation
      await logAuthEvent(AuthEventType.TOKEN_REFRESH, {
        userId: user.id,
        success: true,
        metadata: {
          source: 'validateSession',
          needsRefresh,
          expiresAt: tokenExpiration?.toISOString(),
        },
      });

      return {
        isValid: true,
        user,
        needsRefresh,
        expiresAt: tokenExpiration,
      };
    });

    return result;

  } catch (error) {
    const authError = normalizeError(error);
    logAuthError(authError, { source: 'validateSession' });

    // Log failed validation
    await logAuthEvent(AuthEventType.INVALID_TOKEN, {
      success: false,
      errorMessage: authError.message,
      metadata: {
        source: 'validateSession',
        errorType: authError.type,
        errorCode: authError.code,
      },
    });

    // Try fallback strategies for certain error types
    if (authError.type === 'TOKEN_EXPIRED' || authError.type === 'SESSION_EXPIRED') {
      const fallbackResult = await handleAuthFallback(authError);
      
      if (fallbackResult.success && fallbackResult.user) {
        return {
          isValid: true,
          user: fallbackResult.user,
          needsRefresh: false,
          expiresAt: null,
          fallbackUsed: true,
          strategy: fallbackResult.strategy,
        };
      }
    }

    return {
      isValid: false,
      user: null,
      needsRefresh: authError.type === 'TOKEN_EXPIRED',
      expiresAt: null,
      error: authError,
    };
  }
}

/**
 * Attempts to refresh the authentication token with comprehensive error handling
 * Returns true if refresh was successful, false otherwise
 */
export async function refreshAuthToken(): Promise<boolean> {
  try {
    const result = await retryTokenRefresh(
      async () => {
        // StackAuth handles token refresh automatically through its tokenStore
        // We just need to make a request that would trigger the refresh
        const user = await hexclaveServerApp.getUser({ tokenStore: 'nextjs-cookie' });
        
        if (!user) {
          throw createAuthError.tokenExpired('refresh');
        }

        return user;
      },
      { source: 'refreshAuthToken' }
    );

    // Cache the refreshed session
    cacheSuccessfulAuth(result);

    // Log successful refresh
    await logAuthEvent(AuthEventType.TOKEN_REFRESH, {
      userId: result.id,
      success: true,
      metadata: { source: 'refreshAuthToken' },
    });

    return true;

  } catch (error) {
    const authError = normalizeError(error);
    logAuthError(authError, { source: 'refreshAuthToken' });

    // Log failed refresh
    await logAuthEvent(AuthEventType.FAILED_AUTHENTICATION, {
      success: false,
      errorMessage: authError.message,
      metadata: {
        source: 'refreshAuthToken',
        errorType: authError.type,
        errorCode: authError.code,
      },
    });

    return false;
  }
}

/**
 * Handles session expiration with comprehensive error handling and fallback strategies
 */
export async function handleSessionExpiration(): Promise<SessionValidationResult> {
  try {
    // Log session expiration event
    await logAuthEvent(AuthEventType.SESSION_EXPIRED, {
      success: false,
      metadata: { source: 'handleSessionExpiration' },
    });

    // First, try to refresh the token
    const refreshSuccess = await refreshAuthToken();
    
    if (refreshSuccess) {
      // Re-validate after successful refresh
      const validation = await validateSession();
      
      if (validation.isValid) {
        await logAuthEvent(AuthEventType.TOKEN_REFRESH, {
          userId: validation.user?.id,
          success: true,
          metadata: { source: 'handleSessionExpiration' },
        });
      }
      
      return validation;
    }
    
    // If refresh failed, try fallback strategies
    const authError = createAuthError.sessionExpired();
    const fallbackResult = await handleAuthFallback(authError);
    
    if (fallbackResult.success && fallbackResult.user) {
      return {
        isValid: true,
        user: fallbackResult.user,
        needsRefresh: false,
        expiresAt: null,
        fallbackUsed: true,
        strategy: fallbackResult.strategy,
      };
    }
    
    // If all strategies failed, clear the session
    await clearInvalidSession();
    
    return {
      isValid: false,
      user: null,
      needsRefresh: false,
      expiresAt: null,
      error: createAuthError.sessionExpired(),
    };

  } catch (error) {
    const authError = normalizeError(error);
    logAuthError(authError, { source: 'handleSessionExpiration' });

    return {
      isValid: false,
      user: null,
      needsRefresh: false,
      expiresAt: null,
      error: authError,
    };
  }
}

/**
 * Clears invalid session data from cookies with error handling
 */
export async function clearInvalidSession(): Promise<void> {
  try {
    // Log session clearing event
    await logAuthEvent(AuthEventType.SIGN_OUT, {
      success: true,
      metadata: { 
        source: 'clearInvalidSession',
        reason: 'invalid_session',
      },
    });

    // Note: In Next.js server components, we can't directly delete cookies
    // This would typically be handled by StackAuth's signOut method
    // The actual cookie clearing happens on the client side or through StackAuth
    
    console.log('Invalid session detected - will be cleared by StackAuth signOut');
    
  } catch (error) {
    const authError = normalizeError(error);
    logAuthError(authError, { source: 'clearInvalidSession' });

    // Log failed session clearing
    await logAuthEvent(AuthEventType.FAILED_AUTHENTICATION, {
      success: false,
      errorMessage: authError.message,
      metadata: {
        source: 'clearInvalidSession',
        errorType: authError.type,
      },
    });
  }
}

/**
 * Gets token expiration time from JWT token
 * This is a simplified version - in production you might want more robust JWT parsing
 */
async function getTokenExpiration(token: string): Promise<Date | null> {
  try {
    // JWT tokens have three parts separated by dots
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    // Decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]));
    
    // JWT exp claim is in seconds since epoch
    if (payload.exp) {
      return new Date(payload.exp * 1000);
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing token expiration:', error);
    return null;
  }
}

/**
 * Validates session and returns user or throws AuthError
 * Useful for API routes that require authentication
 */
export async function requireValidSession() {
  const validation = await validateSession();
  
  if (!validation.isValid) {
    throw validation.error || createAuthError.sessionExpired();
  }
  
  return validation.user;
}

/**
 * Middleware helper to validate session and handle refresh
 * Returns validation result and handles automatic refresh if needed
 */
export async function validateAndRefreshSession(): Promise<SessionValidationResult> {
  const validation = await validateSession();
  
  // If session is valid but needs refresh, attempt refresh
  if (validation.isValid && validation.needsRefresh) {
    console.log('Session needs refresh, attempting automatic refresh...');
    const refreshed = await refreshAuthToken();
    
    if (refreshed) {
      // Re-validate after refresh
      return await validateSession();
    }
  }
  
  // If session is invalid due to expiration, handle it
  if (!validation.isValid && validation.needsRefresh) {
    return await handleSessionExpiration();
  }
  
  return validation;
}