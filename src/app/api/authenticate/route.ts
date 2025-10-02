import { NextRequest, NextResponse } from 'next/server';
import * as cookie from 'cookie';

export async function POST(req: NextRequest) {
    try {
        const { password } = await req.json();
        const correctPassword = 'password';

        if (password === correctPassword) {
            const response = NextResponse.json({ success: true });
            
            response.cookies.set('authToken', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60,
                sameSite: 'strict',
                path: '/',
            });

            return response;
        } else {
            return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }
}
