import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

// In a real app, you would use environment variables for this
// This is a simple example - for production, use a proper auth system
const ADMIN_PASSWORD = 'admingwapo';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    
    console.log('Received password:', password);
    console.log('Expected password:', ADMIN_PASSWORD);
    
    // Ensure exact string comparison
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Simple token for demonstration
    const token = 'admin-authenticated';
    
    // Set auth cookie
    const cookie = serialize('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
      sameSite: 'strict',
    });
    
    // Make tokens available globally
    if (!global.ADMIN_TOKENS) {
      global.ADMIN_TOKENS = new Set();
    }
    global.ADMIN_TOKENS.add(token);
    
    const response = NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );
    
    response.headers.set('Set-Cookie', cookie);
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    );
  }
} 