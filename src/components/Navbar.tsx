"use client";

import React from "react";
import { Search, Bell, User, MessageCircle, HelpCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavbarProps {
  role?: "admin" | "manager" | "employee";
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
    <header className="h-16 sticky top-0 z-40 bg-white border-b border-border px-6 flex items-center justify-between shrink-0">
      {/* Left */}
      <div className="flex items-center gap-6 flex-1">
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            {getPageTitle()}
          </h1>
        </div>

        <div className="relative max-w-sm w-full hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 bg-background border border-border pl-10 pr-4 rounded-lg text-sm placeholder:text-muted-foreground/50 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors"
          />
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
