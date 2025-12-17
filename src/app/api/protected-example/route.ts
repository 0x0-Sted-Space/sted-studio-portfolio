import { NextResponse } from 'next/server';
import { stackServerApp } from '@/lib/stack';

export async function GET() {
  try {
    const user = await stackServerApp.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: 'Protected data accessed successfully',
      user: {
        id: user.id,
        email: user.primaryEmail,
        displayName: user.displayName
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}