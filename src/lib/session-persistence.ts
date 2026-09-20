import 'server-only';
import { cookies } from 'next/headers';
import { hexclaveServerApp } from '@/hexclave/server';
import { AuthError, createAuthError, normalizeError, logAuthError } from './auth-errors';
import { retryAuth } from './auth-retry';
import { logAuthEvent, AuthEventType } from './session-monitoring';

// Session persistence configuration
export const PERSISTENCE_CONFIG = {
  // 30-day session persistence as per requirement 2.5
  DEFAULT_MAX_AGE: 30 * 24 * 60 * 60, // 30 days in seconds
  // Short session for users who don't select "remember me"
  SHORT_SESSION_MAX_AGE: 24 * 60 * 60, // 1 day in seconds
  // Cookie name for remember me preference
  REMEMBER_ME_COOKIE: 'sted-remember-me',
  // Cookie name for session metadata
  SESSION_METADATA_COOKIE: 'sted-session-meta',
} as const;

export interface SessionMetadata {
  createdAt: number;
  lastActivityAt: number;
  rememberMe: boolean;
  userId?: string;
  expiresAt: number;
}

/**
 * Sets up session persistence with optional "remember me" functionality
 * Implements requirement 2.5 - 30-day session persistence with error handling
 */
export async function setupSessionPersistence(rememberMe: boolean = true): Promise<void> {
  try {
    const user = await retryAuth(
      () => hexclaveServerApp.getUser(),
      { source: 'setupSessionPersistence' }
    );
    
    if (!user) {
      throw createAuthError.sessionExpired();
    }

    const cookieStore = await cookies();
    const maxAge = rememberMe ? 
      PERSISTENCE_CONFIG.DEFAULT_MAX_AGE : 
      PERSISTENCE_CONFIG.SHORT_SESSION_MAX_AGE;

    const now = Date.now();
    const metadata: SessionMetadata = {
      createdAt: now,
      lastActivityAt: now,
      rememberMe,
      userId: user.id,
      expiresAt: now + (maxAge * 1000),
    };

    const cookieOptions = {
      maxAge,
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? '.stedspace.xyz' : undefined,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax' as const,
    };

    // Set session metadata cookie
    cookieStore.set(PERSISTENCE_CONFIG.SESSION_METADATA_COOKIE, JSON.stringify(metadata), cookieOptions);

    // Set remember me preference cookie
    cookieStore.set(PERSISTENCE_CONFIG.REMEMBER_ME_COOKIE, rememberMe ? '1' : '0', cookieOptions);

    // Log successful session setup
    await logAuthEvent(AuthEventType.SIGN_IN, {
      userId: user.id,
      success: true,
      metadata: {
        source: 'setupSessionPersistence',
        rememberMe,
        maxAge,
        expiresAt: new Date(metadata.expiresAt).toISOString(),
      },
    });

    console.log(`Session persistence configured: rememberMe=${rememberMe}, maxAge=${maxAge}s`);

  } catch (error) {
    const authError = normalizeError(error);
    logAuthError(authError, { source: 'setupSessionPersistence', rememberMe });

    // Log failed session setup
    await logAuthEvent(AuthEventType.FAILED_AUTHENTICATION, {
      success: false,
      errorMessage: authError.message,
      metadata: {
        source: 'setupSessionPersistence',
        errorType: authError.type,
        rememberMe,
      },
    });

    throw authError;
  }
}

/**
 * Gets the current session metadata with error handling
 */
export async function getSessionMetadata(): Promise<SessionMetadata | null> {
  try {
    const cookieStore = await cookies();
    const metadataCookie = cookieStore.get(PERSISTENCE_CONFIG.SESSION_METADATA_COOKIE);
    
    if (!metadataCookie) {
      return null;
    }

    const metadata: SessionMetadata = JSON.parse(metadataCookie.value);
    
    // Validate metadata structure
    if (!metadata.createdAt || !metadata.expiresAt || !metadata.userId) {
      throw createAuthError.configurationError('Invalid session metadata structure');
    }

    return metadata;

  } catch (error) {
    const authError = normalizeError(error);
    logAuthError(authError, { source: 'getSessionMetadata' });

    // If it's a JSON parsing error, clear the invalid cookie
    if (error instanceof SyntaxError) {
      try {
        const cookieStore = await cookies();
        cookieStore.set(PERSISTENCE_CONFIG.SESSION_METADATA_COOKIE, '', { maxAge: 0 });
      } catch (clearError) {
        console.error('Failed to clear invalid session metadata cookie:', clearError);
      }
    }

    return null;
  }
}

/**
 * Updates the last activity timestamp to keep session alive
 */
export async function updateSessionActivity(): Promise<void> {
  try {
    const metadata = await getSessionMetadata();
    
    if (!metadata) {
      return;
    }

    // Update last activity timestamp
    metadata.lastActivityAt = Date.now();

    const cookieStore = await cookies();
    const maxAge = metadata.rememberMe ? 
      PERSISTENCE_CONFIG.DEFAULT_MAX_AGE : 
      PERSISTENCE_CONFIG.SHORT_SESSION_MAX_AGE;

    cookieStore.set(PERSISTENCE_CONFIG.SESSION_METADATA_COOKIE, JSON.stringify(metadata), {
      maxAge,
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? '.stedspace.xyz' : undefined,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
    });
  } catch (error) {
    console.error('Error updating session activity:', error);
  }
}

/**
 * Checks if the session has expired based on metadata
 */
export async function isSessionExpired(): Promise<boolean> {
  try {
    const metadata = await getSessionMetadata();
    
    if (!metadata) {
      return true;
    }

    const now = Date.now();
    return now > metadata.expiresAt;
  } catch (error) {
    console.error('Error checking session expiration:', error);
    return true;
  }
}

/**
 * Gets the remember me preference for the current session
 */
export async function getRememberMePreference(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const rememberMeCookie = cookieStore.get(PERSISTENCE_CONFIG.REMEMBER_ME_COOKIE);
    
    if (!rememberMeCookie) {
      return false;
    }

    return rememberMeCookie.value === '1';
  } catch (error) {
    console.error('Error getting remember me preference:', error);
    return false;
  }
}

/**
 * Extends the session expiration time (sliding expiration)
 * Called on user activity to keep long-lived sessions active
 */
export async function extendSession(): Promise<void> {
  try {
    const metadata = await getSessionMetadata();
    
    if (!metadata || !metadata.rememberMe) {
      // Don't extend sessions without remember me
      return;
    }

    const now = Date.now();
    const timeSinceLastActivity = now - metadata.lastActivityAt;
    
    // Only extend if there has been significant time since last activity (e.g., 1 hour)
    const EXTENSION_THRESHOLD = 60 * 60 * 1000; // 1 hour
    
    if (timeSinceLastActivity < EXTENSION_THRESHOLD) {
      return;
    }

    // Extend the session by resetting the expiration
    metadata.lastActivityAt = now;
    metadata.expiresAt = now + (PERSISTENCE_CONFIG.DEFAULT_MAX_AGE * 1000);

    const cookieStore = await cookies();
    cookieStore.set(PERSISTENCE_CONFIG.SESSION_METADATA_COOKIE, JSON.stringify(metadata), {
      maxAge: PERSISTENCE_CONFIG.DEFAULT_MAX_AGE,
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? '.stedspace.xyz' : undefined,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
    });

    console.log('Session extended for user:', metadata.userId);
  } catch (error) {
    console.error('Error extending session:', error);
  }
}

/**
 * Cleans up session data on sign-out
 * Implements requirement 2.5 - Handle session cleanup on sign-out
 */
export async function cleanupSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    
    const cookieOptions = {
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? '.stedspace.xyz' : undefined,
      maxAge: 0, // Expire immediately
    };

    // Clear session metadata
    cookieStore.set(PERSISTENCE_CONFIG.SESSION_METADATA_COOKIE, '', cookieOptions);
    
    // Clear remember me preference
    cookieStore.set(PERSISTENCE_CONFIG.REMEMBER_ME_COOKIE, '', cookieOptions);

    console.log('Session cleanup completed');
  } catch (error) {
    console.error('Error cleaning up session:', error);
    throw error;
  }
}

/**
 * Gets session information for display or debugging
 */
export async function getSessionInfo(): Promise<{
  isActive: boolean;
  rememberMe: boolean;
  createdAt: Date | null;
  expiresAt: Date | null;
  lastActivityAt: Date | null;
  timeRemaining: number | null;
}> {
  try {
    const metadata = await getSessionMetadata();
    const user = await hexclaveServerApp.getUser();
    
    if (!metadata || !user) {
      return {
        isActive: false,
        rememberMe: false,
        createdAt: null,
        expiresAt: null,
        lastActivityAt: null,
        timeRemaining: null,
      };
    }

    const now = Date.now();
    const timeRemaining = Math.max(0, metadata.expiresAt - now);

    return {
      isActive: true,
      rememberMe: metadata.rememberMe,
      createdAt: new Date(metadata.createdAt),
      expiresAt: new Date(metadata.expiresAt),
      lastActivityAt: new Date(metadata.lastActivityAt),
      timeRemaining,
    };
  } catch (error) {
    console.error('Error getting session info:', error);
    return {
      isActive: false,
      rememberMe: false,
      createdAt: null,
      expiresAt: null,
      lastActivityAt: null,
      timeRemaining: null,
    };
  }
}