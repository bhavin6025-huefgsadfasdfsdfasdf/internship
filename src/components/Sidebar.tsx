"use client";

import React, { useState } from "react";
import { Leaf, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ADMIN_NAV_ITEMS, 
  MANAGER_NAV_ITEMS, 
  EMPLOYEE_NAV_ITEMS, 
  SUPER_ADMIN_NAV_ITEMS,
  ADMIN_SUPPORT_ITEMS,
  COMMON_SUPPORT_ITEMS 
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  role?: "admin" | "manager" | "employee" | "super-admin";
}

export default function Sidebar({ role = "admin" }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const mainItems = 
    role === "admin" ? ADMIN_NAV_ITEMS : 
    role === "manager" ? MANAGER_NAV_ITEMS : 
    role === "super-admin" ? SUPER_ADMIN_NAV_ITEMS :
    EMPLOYEE_NAV_ITEMS;

  const supportItems = 
    role === "admin" || role === "super-admin" ? ADMIN_SUPPORT_ITEMS : 
    COMMON_SUPPORT_ITEMS;

  // Faster active route detection
  const isRouteActive = (itemPath: string) => {
    return pathname === itemPath || (itemPath !== "/" && pathname.startsWith(itemPath));
  };

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(0, 3).substring(1);

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 flex flex-col bg-white/70 backdrop-blur-xl border-r border-border/40 shrink-0 transition-all duration-500 ease-[0.33, 1, 0.68, 1] z-50 shadow-[4px_0_24px_-10px_rgba(0,0,0,0.05)]",
        collapsed ? "w-[88px]" : "w-[260px]"
      )}
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* Logo */}
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-5 border-b border-border/50",
            collapsed ? "justify-center px-2" : "justify-start"
          )}
        >
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shrink-0">
            <Leaf size={20} />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-base font-semibold text-foreground">
                NoteFlow
              </span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                ERP {roleLabel}
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-x-hidden overflow-y-auto no-scrollbar py-4 space-y-6">
          {/* Main Group */}
          <div className="space-y-1 px-3">
            {!collapsed && (
              <span className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 block">
                Main Menu
              </span>
            )}
            {mainItems.map((item: any) => {
              const isActive = isRouteActive(item.path);
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon
                    size={18}
                    className={cn(
                      isActive ? "text-primary-foreground" : "text-muted-foreground"
                    )}
                  />
                  {!collapsed && (
                    <span
                      className={cn(
                        "text-sm whitespace-nowrap",
                        isActive ? "font-medium" : "font-normal"
                      )}
                    >
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Support Group */}
          <div className="space-y-1 px-3 pt-4 border-t border-border/50">
            {!collapsed && (
              <span className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 block">
                Support
              </span>
            )}
            {supportItems.map((item: any) => {
              const isActive = isRouteActive(item.path);
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon
                    size={18}
                    className={cn(
                      isActive ? "text-primary-foreground" : "text-muted-foreground"
                    )}
                  />
                  {!collapsed && (
                    <span
                      className={cn(
                        "text-sm whitespace-nowrap",
                        isActive ? "font-medium" : "font-normal"
                      )}
                    >
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer / Toggle */}
        <div className="p-3 border-t border-border/50">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
          >
            <ChevronLeft
              size={16}
              className={cn(
                "transition-transform duration-300",
                collapsed ? "rotate-180" : ""
              )}
            />
            {!collapsed && (
              <span className="text-sm">Collapse</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
