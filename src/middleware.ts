import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionRole = request.cookies.get('session-role')?.value;

  // Optimized redirection for the Root Path (/)
  if (pathname === '/') {
    if (sessionRole) {
      if (sessionRole === 'super-admin') {
        return NextResponse.redirect(new URL('/super-admin/dashboard', request.url));
      } else if (sessionRole === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } else if (sessionRole === 'manager') {
        return NextResponse.redirect(new URL('/manager/dashboard', request.url));
      } else if (sessionRole === 'employee') {
        return NextResponse.redirect(new URL('/employee', request.url));
      }
    }
    // Fallback if no cookie is present (could also redirect to /login)
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Ensure middleware only runs on specific sensitive paths for performance
export const config = {
  matcher: ['/'],
};
