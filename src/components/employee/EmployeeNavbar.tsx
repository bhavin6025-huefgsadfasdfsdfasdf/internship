'use client';

import React from 'react';
import { 
  Bell, 
  Search, 
  ChevronDown,
  User
} from 'lucide-react';

interface NavbarProps {
  title: string;
}

export default function EmployeeNavbar({ title }: NavbarProps) {
  return (
    <header className="h-16 sticky top-0 z-40 bg-white border-b border-border px-6 flex items-center justify-between shrink-0">
      {/* Left: Page Title */}
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>

      {/* Center: Search Bar */}
      <div className="relative max-w-sm w-full hidden lg:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search for tasks or files..." 
          className="w-full h-10 bg-background border border-border pl-10 pr-4 rounded-lg text-sm placeholder:text-muted-foreground/50 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Notification Icon */}
        <button className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Profile Avatar Dropdown */}
        <div className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-secondary border border-transparent hover:border-border/50 transition-all cursor-pointer">
          <div className="text-right hidden sm:block">
            <span className="text-sm font-medium text-foreground leading-none block">John Doe</span>
            <span className="text-xs text-muted-foreground">Senior Developer</span>
          </div>
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
            <User size={18} />
          </div>
          <ChevronDown size={14} className="text-muted-foreground mr-1" />
        </div>
      </div>
    </header>
  );
}
