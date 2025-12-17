import { NextResponse } from 'next/server';
import { stackServerApp } from '@/lib/stack';

export async function GET() {
    try {
        const user = await stackServerApp.getUser();
        
        if (user) {
            return NextResponse.json({ 
                authenticated: true,
                user: {
                    id: user.id,
                    email: user.primaryEmail,
                    displayName: user.displayName
                }
            });
        } else {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }
    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
