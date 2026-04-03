'use client';

import { Inter } from "next/font/google";
import { Leaf } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const inter = Inter({ subsets: ['latin'] });

export default function RootPage() {
  const { isLoading } = useAuth();

  return (
    <div className={`min-h-screen bg-background flex flex-col items-center justify-center p-6 ${inter.className}`}>
      {/* Premium Loader */}
      <div className="flex flex-col items-center gap-6 animate-pulse">
        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
          <Leaf className="text-primary w-6 h-6 animate-bounce" />
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-sm font-semibold text-foreground tracking-widest uppercase">Initializing NoteFlow</h2>
          <p className="text-xs text-muted-foreground">Connecting to private ERP cluster...</p>
        </div>
      </div>

      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(91,108,255,0.05),transparent_70%)] pointer-events-none" />
    </div>
  );
}
