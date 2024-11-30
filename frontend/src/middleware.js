// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  // Get the token if available
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-url', req.url);

  if (!token) {
    const signInUrl = new URL('/auth/signin', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Allow the request to proceed if user is authenticated
  return NextResponse.next({
    req: {
    // Apply new request headers
       headers: requestHeaders,
      }
   });
}

// Apply middleware to these routes
export const config = {
  matcher: ['/dashboard/:path*'],  // Protecting the dashboard routes
};
