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
        router.push('/login');
      } else {
        if (role === 'employee') router.push('/employee');
        else if (role === 'manager') router.push('/manager/dashboard');
        else if (role === 'admin') router.push('/admin/dashboard');
        else if (role === 'super-admin') router.push('/super-admin/dashboard');
      }
    }
  }, [user, role, isLoading, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-sm text-muted-foreground">Redirecting...</p>
    </div>
  );
}
