"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "admin" | "manager" | "employee";
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans selection:bg-primary/20 selection:text-primary">
      {/* Sidebar - Positioned for zero-layout-shift */}
      <Sidebar role={role} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen relative bg-background">
        {/* Decorative Grid Overlay (Subtle) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        
        {/* Top Navbar */}
        <Navbar role={role} />

        {/* Page Content with Smooth Entry Animation */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={role} // Re-animate if role changes
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="p-6 md:p-8 lg:p-10"
            >
              <div className="max-w-[1400px] mx-auto">
                {children}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Enterprise Footer */}
        <footer className="px-10 py-4 bg-white/50 backdrop-blur-md border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-medium text-muted-foreground/60 uppercase tracking-[0.2em] shrink-0">
          <div className="flex items-center gap-4">
            <span>© 2026 NoteFlow Neural Systems</span>
            <span className="w-1 h-1 bg-primary/20 rounded-full" />
            <span>Operational Integrity: High</span>
          </div>
          <div className="flex gap-8">
            <span className="hover:text-primary cursor-pointer transition-colors duration-300">Privacy Protocol</span>
            <span className="hover:text-primary cursor-pointer transition-colors duration-300">System Logs</span>
            <span className="text-primary/40">v4.2.0-stable</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
