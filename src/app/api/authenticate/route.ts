import { NextResponse } from 'next/server';

// Auth temporarily disabled - portfolio is public
export async function GET() {
  return NextResponse.json({ authenticated: false }, { status: 503 });
}
