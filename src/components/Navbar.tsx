"use client";

import React from "react";
import { Search, Bell, User, MessageCircle, HelpCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavbarProps {
  role?: "admin" | "manager" | "employee" | "super-admin";
  userName?: string;
}

export default function Navbar({ role = "admin", userName = "Enterprise User" }: NavbarProps) {
  const pathname = usePathname();

  const getPageTitle = () => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length <= 1) return "Dashboard";
    
    const relevantParts = parts.filter(p => !["admin", "manager", "employee", "super-admin"].includes(p));
    const lastPart = relevantParts[relevantParts.length - 1] || "Dashboard";
    
    return lastPart
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <header className="h-[64px] sticky top-0 z-40 bg-white/50 backdrop-blur-xl border-b border-border/40 px-8 flex items-center justify-between shrink-0 shadow-[0_1px_16px_-8px_rgba(0,0,0,0.03)] font-sans">
      {/* Left */}
      <div className="flex items-center gap-10 flex-1">
        <div className="flex flex-col">
          <h1 className="text-[17px] font-bold tracking-tight text-foreground/90 antialiased">
            {getPageTitle()}
          </h1>
          <div className="flex items-center gap-1.5 -mt-0.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
            <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest leading-none">System Operational</span>
          </div>
        </div>

        <div className="relative max-w-sm w-full hidden xl:block group">
          <div className="absolute inset-0 bg-primary/5 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-all duration-700" />
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 w-3.5 h-3.5 transition-colors group-focus-within:text-primary" />
            <input
              type="text"
              placeholder="Search secure terminal..."
              className="w-full h-10 bg-secondary/30 border border-border/10 pl-11 pr-4 rounded-xl text-[13px] placeholder:text-muted-foreground/30 focus:outline-hidden focus:ring-0 focus:border-primary/30 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1 pr-4 border-r border-border mr-2">
          <button className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors relative">
            <MessageCircle size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white" />
          </button>
          <button className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>
          <button className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <HelpCircle size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">{roleLabel}</p>
          </div>
          
          <button className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
