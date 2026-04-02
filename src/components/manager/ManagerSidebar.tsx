"use client";

import React, { useState } from "react";
import {
  Home,
  CheckSquare,
  Clock,
  Users,
  MessageSquare,
  Briefcase,
  Settings,
  HelpCircle,
  Leaf,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const mainItems = [
  { name: "Dashboard", icon: Home, path: "/manager/dashboard" },
  { name: "Projects", icon: Briefcase, path: "/manager/projects" },
  { name: "Tasks", icon: CheckSquare, path: "/manager/tasks" },
  { name: "Timesheet Approval", icon: Clock, path: "/manager/timesheet-approval" },
  { name: "Team Monitoring", icon: Users, path: "/manager/team" },
  { name: "Discussions", icon: MessageSquare, path: "/manager/discussion" },
];

const supportItems = [
  { name: "Settings", icon: Settings, path: "/manager/settings" },
  { name: "Help Center", icon: HelpCircle, path: "/manager/help" },
];

export default function ManagerSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isRouteActive = (itemPath: string) => {
    if (pathname === itemPath) return true;
    if (itemPath !== "/" && pathname.startsWith(itemPath)) return true;
    return false;
  };

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 flex flex-col bg-white border-r border-border shrink-0 transition-all duration-300",
        collapsed ? "w-[80px]" : "w-[240px]"
      )}
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* Logo */}
        <div className={cn("flex items-center gap-3 px-4 py-5 border-b border-border/50", collapsed ? "justify-center px-2" : "")}>
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shrink-0">
            <Leaf size={20} />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-base font-semibold text-foreground">NoteFlow</span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">ERP MGR</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-6">
          <div className="space-y-1 px-3">
            {mainItems.map((item) => {
              const isActive = isRouteActive(item.path);
              return (
                <Link key={item.name} href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon size={18} className={isActive ? "text-primary-foreground" : "text-muted-foreground"} />
                  {!collapsed && <span className={cn("text-sm whitespace-nowrap", isActive ? "font-medium" : "")}>{item.name}</span>}
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 px-3 pt-4 border-t border-border/50">
            {!collapsed && <span className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 block">Support</span>}
            {supportItems.map((item) => {
              const isActive = isRouteActive(item.path);
              return (
                <Link key={item.name} href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon size={18} className={isActive ? "text-primary-foreground" : "text-muted-foreground"} />
                  {!collapsed && <span className={cn("text-sm whitespace-nowrap", isActive ? "font-medium" : "")}>{item.name}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Toggle */}
        <div className="p-3 border-t border-border/50">
          <button onClick={() => setCollapsed(!collapsed)} className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
            <ChevronLeft size={16} className={cn("transition-transform duration-300", collapsed ? "rotate-180" : "")} />
            {!collapsed && <span className="text-sm">Collapse</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
