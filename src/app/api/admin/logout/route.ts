import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  try {
    // Get the current token
    const token = req.cookies.get('admin_token')?.value;
    
    // Remove token from global set
    if (token && global.ADMIN_TOKENS) {
      global.ADMIN_TOKENS.delete(token);
    }
    
    // Clear the cookie
    const cookie = serialize('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), // Expire immediately
      path: '/',
      sameSite: 'strict',
    });
    
    const response = NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );
    
    response.headers.set('Set-Cookie', cookie);
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Logout failed' },
      { status: 500 }
    );
  }
} 