import 'server-only';
import { NextRequest } from 'next/server';
import { hexclaveServerApp } from '@/hexclave/server';
import { logAuthEvent, AuthEventType, logMiddlewareEvent } from './session-monitoring';
import { validateAndRefreshSession } from './session-validation';
import { updateSessionActivity } from './session-persistence';

/**
 * Authentication middleware for automatic session monitoring
 * Logs authentication events and handles session validation
 */
export async function authMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  try {
    // Skip monitoring for static assets and API routes that don't need auth
    if (shouldSkipAuth(pathname)) {
      return;
    }

    // Log cross-domain access
    const host = request.headers.get('host');
    const referer = request.headers.get('referer');
    
    if (referer && host) {
      const refererHost = new URL(referer).host;
      if (refererHost !== host && refererHost.includes('stedspace.xyz')) {
        await logAuthEvent(AuthEventType.CROSS_DOMAIN_ACCESS, {
          metadata: {
            fromDomain: refererHost,
            toDomain: host,
            pathname,
          },
        });
      }
    }

    // Validate and refresh session
    const sessionValidation = await validateAndRefreshSession();
    
    if (sessionValidation.isValid && sessionValidation.user) {
      // Update session activity for authenticated users
      await updateSessionActivity();
      
      // Log successful authentication validation (only for auth-required routes)
      if (isAuthRequiredRoute(pathname)) {
        await logMiddlewareEvent(
          AuthEventType.TOKEN_REFRESH,
          sessionValidation.user.id,
          true
        );
      }
    } else if (isAuthRequiredRoute(pathname)) {
      // Log failed authentication for protected routes
      await logMiddlewareEvent(
        AuthEventType.INVALID_TOKEN,
        undefined,
        false,
        sessionValidation.error
      );
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    
    // Log middleware errors
    await logAuthEvent(AuthEventType.FAILED_AUTHENTICATION, {
      success: false,
      errorMessage: error instanceof Error ? error.message : 'Middleware error',
      metadata: {
        pathname,
        source: 'middleware',
      },
    });
  }
}

/**
 * Determines if authentication should be skipped for a given pathname
 */
function shouldSkipAuth(pathname: string): boolean {
  const skipPatterns = [
    // Static assets
    /\/_next\//,
    /\/favicon\.ico$/,
    /\/robots\.txt$/,
    /\/sitemap\.xml$/,
    
    // Public assets
    /\/images\//,
    /\/fonts\//,
    /\/icons\//,
    
    // Public API routes
    /\/api\/health$/,
    /\/api\/monitoring\//,
    
    // StackAuth handler routes (they handle their own auth)
    /\/handler\//,
  ];

  return skipPatterns.some(pattern => pattern.test(pathname));
}

/**
 * Determines if a route requires authentication
 */
function isAuthRequiredRoute(pathname: string): boolean {
  const authRequiredPatterns = [
    /\/dashboard/,
    /\/profile/,
    /\/settings/,
    /\/admin/,
    /\/api\/user/,
    /\/api\/session/,
  ];

  return authRequiredPatterns.some(pattern => pattern.test(pathname));
}

/**
 * Enhanced authentication check with automatic logging
 */
export async function requireAuthWithLogging(userId?: string) {
  try {
    const user = await hexclaveServerApp.getUser();
    
    if (!user) {
      await logAuthEvent(AuthEventType.FAILED_AUTHENTICATION, {
        userId,
        success: false,
        errorMessage: 'No authenticated user found',
      });
      throw new Error('Authentication required');
    }

    // Log successful authentication
    await logAuthEvent(AuthEventType.SIGN_IN, {
      userId: user.id,
      success: true,
    });

    return user;
  } catch (error) {
    await logAuthEvent(AuthEventType.FAILED_AUTHENTICATION, {
      userId,
      success: false,
      errorMessage: error instanceof Error ? error.message : 'Authentication failed',
    });
    throw error;
  }
}

/**
 * Logs sign-out events
 */
export async function logSignOut(userId?: string) {
  await logAuthEvent(AuthEventType.SIGN_OUT, {
    userId,
    success: true,
  });
}