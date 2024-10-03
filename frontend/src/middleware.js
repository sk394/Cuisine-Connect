// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  // Get the token if available
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const signInUrl = new URL('/auth/signin', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Allow the request to proceed if user is authenticated
  return NextResponse.next();
}

// Apply middleware to these routes
export const config = {
  matcher: ['/dashboard/:path*'],  // Protecting the dashboard routes
};
