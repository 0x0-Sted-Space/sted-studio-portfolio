"use client";

import { useEffect, useState } from 'react';
import { usePathname } from '@/i18n/routing';
import { routes, protectedRoutes } from '@/app/resources';
import { Flex, Spinner } from '@/once-ui/components';
import dynamic from 'next/dynamic';

// Dynamically import ProtectedRoute to avoid SSR issues
const ProtectedRoute = dynamic(() => import('./ProtectedRoute'), {
    ssr: false,
    loading: () => (
        <Flex fillWidth paddingY="128" justifyContent="center">
            <Spinner />
        </Flex>
    )
});

interface RouteGuardProps {
    children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
    const pathname = usePathname();
    const [isRouteEnabled, setIsRouteEnabled] = useState(false);
    const [isProtectedRoute, setIsProtectedRoute] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const performChecks = () => {
            setLoading(true);

            const checkRouteEnabled = () => {
                if (!pathname) return false;

                if (pathname in routes) {
                    return routes[pathname as keyof typeof routes];
                }

                const dynamicRoutes = ['/blog', '/work'] as const;
                for (const route of dynamicRoutes) {
                    if (pathname?.startsWith(route) && routes[route]) {
                        return true;
                    }
                }

                return false;
            };

            const routeEnabled = checkRouteEnabled();
            setIsRouteEnabled(routeEnabled);

            // Check if this route requires authentication
            const isProtected = protectedRoutes[pathname as keyof typeof protectedRoutes] || false;
            setIsProtectedRoute(isProtected);

            setLoading(false);
        };

        performChecks();
    }, [pathname]);

    if (loading) {
        return (
            <Flex fillWidth paddingY="128" justifyContent="center">
                <Spinner />
            </Flex>
        );
    }

    if (!isRouteEnabled) {
        return (
            <Flex fillWidth paddingY="128" justifyContent="center">
                <Spinner />
            </Flex>
        );
    }

    // If route is protected, wrap with ProtectedRoute component
    if (isProtectedRoute) {
        return (
            <ProtectedRoute>
                {children}
            </ProtectedRoute>
        );
    }

    return <>{children}</>;
};

export { RouteGuard };