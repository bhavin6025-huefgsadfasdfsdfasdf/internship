'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type Role = 'super-admin' | 'admin' | 'manager' | 'employee' | null;

interface AuthContextType {
  user: any;
  role: Role;
  login: (role: Role, userData: any) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<Role>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check local storage for auth on mount
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth && storedAuth.trim() !== '') {
      try {
        const parsed = JSON.parse(storedAuth);
        setUser(parsed.user);
        setRole(parsed.role);
      } catch (e) {
        localStorage.removeItem('auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (role: Role, userData: any) => {
    setUser(userData);
    setRole(role);
    localStorage.setItem('auth', JSON.stringify({ user: userData, role }));
    
    // Set cookie for middleware redirection (expires in 7 days)
    if (typeof document !== 'undefined') {
      document.cookie = `session-role=${role}; path=/; max-age=${7 * 24 * 60 * 60}`;
    }

    // Redirect based on role
    if (role === 'super-admin') {
      router.push('/super-admin/dashboard');
    } else if (role === 'admin') {
      router.push('/admin/dashboard');
    } else if (role === 'manager') {
      router.push('/manager/dashboard');
    } else if (role === 'employee') {
      router.push('/employee');
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('auth');
    
    // Clear session-role cookie
    if (typeof document !== 'undefined') {
      document.cookie = 'session-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
    
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
