import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define a fixed token for admin authentication
const ADMIN_TOKEN = 'admin-authenticated';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip middleware for login page and API routes
    if (
      request.nextUrl.pathname === '/admin/login' ||
      request.nextUrl.pathname.startsWith('/api/')
    ) {
      return NextResponse.next();
    }

    // Check for admin token in cookies
    const adminToken = request.cookies.get('admin_token')?.value;
    
    // If no token, redirect to login
    if (!adminToken) {
      console.log('No admin token found, redirecting to login');
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Simple validation: token must match expected value
    if (adminToken !== ADMIN_TOKEN) {
      console.log('Invalid admin token, redirecting to login');
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    console.log('Admin token valid, allowing access');
  }

  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ['/admin/:path*'],
}; 