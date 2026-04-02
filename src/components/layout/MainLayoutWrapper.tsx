"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Layout exclusion for login pages
  const isAuthPage = pathname.includes("/login") || pathname.includes("/signup");
  if (isAuthPage) {
    return (
      <main className="min-h-screen bg-background">
        {children}
      </main>
    );
  }

  // Determine Role
  const isManager = pathname.startsWith("/manager");
  const isEmployee = pathname.startsWith("/employee");
  
  let role: "admin" | "manager" | "employee" = "admin";
  if (isManager) role = "manager";
  if (isEmployee) role = "employee";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Navbar */}
        <Navbar role={role} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background p-6">
          <div className="max-w-[1400px] mx-auto space-y-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-3 bg-white border-t border-border flex justify-between items-center text-xs text-muted-foreground shrink-0">
          <span>© 2026 NoteFlow Systems</span>
          <div className="flex gap-6">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Security</span>
            <span className="text-muted-foreground/60">v2.4.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
