'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function RootPage() {
  const router = useRouter();
  const { user, role, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace('/login');
      } else {
        switch (role) {
          case 'super-admin':
            router.replace('/super-admin/dashboard');
            break;
          case 'admin':
            router.replace('/admin/dashboard');
            break;
          case 'manager':
            router.replace('/manager/dashboard');
            break;
          case 'employee':
            router.replace('/employee/dashboard');
            break;
          default:
            router.replace('/login');
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
