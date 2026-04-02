'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function RootPage() {
  const router = useRouter();
  const { user, role, isLoading } = useAuth();

  useEffect(() => {
    // Middleware now handles the primary redirect from '/'
    // This client-side check remains as a fallback for initial cookie-less states
    if (!isLoading) {
      if (!user) {
        router.replace('/login');
      } else if (role) {
        // Redirection based on role
        const path = role === 'employee' ? '/employee' : `/${role}/dashboard`;
        // Guard against double navigation
        if (window.location.pathname === '/') {
          router.replace(path);
        }
      }
    }
  }, [user, role, isLoading, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-sm text-muted-foreground">Redirecting...</p>
    </div>
  );
}
