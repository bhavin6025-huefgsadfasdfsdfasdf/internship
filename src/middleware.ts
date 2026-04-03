import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionRole = request.cookies.get('session-role')?.value;

  // 1. Root Path (/) Redirection
  if (pathname === '/') {
    if (sessionRole) {
      const redirectUrl = sessionRole === 'employee' ? '/employee' : `/${sessionRole}/dashboard`;
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    return NextResponse.next();
  }

  // 2. Auth Exception: Allow access to login/signup forms for all roles
  const isAuthForm = pathname.endsWith('/login') || pathname.endsWith('/signup');
  if (isAuthForm) return NextResponse.next();

  // 3. Role-Based Route Protection
  const protectedRoutes = ['/admin', '/manager', '/employee', '/super-admin'];
  const currentPathPrefix = protectedRoutes.find(route => pathname.startsWith(route));

  if (currentPathPrefix) {
    // If no session, redirect to login
    if (!sessionRole) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Role Mismatch Protection: Ensure user of one role cannot access another's routes
    // e.g., 'employee' role cannot access '/admin/*'
    const requiredRole = currentPathPrefix.replace('/', '');
    
    // special handling for 'employee' dashboard vs others
    if (sessionRole !== requiredRole) {
      // If super-admin is hitting admin, it might be allowed depending on app logic,
      // but for strict ERP, we enforce the specific role portal.
      const fallbackUrl = sessionRole === 'employee' ? '/employee' : `/${sessionRole}/dashboard`;
      return NextResponse.redirect(new URL(fallbackUrl, request.url));
    }
  }

  return NextResponse.next();
}

// Ensure middleware runs on all role-based paths for absolute protection
export const config = {
  matcher: ['/', '/admin/:path*', '/manager/:path*', '/employee/:path*', '/super-admin/:path*'],
};
