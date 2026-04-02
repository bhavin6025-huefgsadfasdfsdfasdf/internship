'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  ChevronDown,
  User,
  LogOut,
  Calendar,
  Layers,
  Settings
} from 'lucide-react';
import Link from 'next/link';

interface EmployeeTopbarProps {
  title: string;
}

export default function EmployeeTopbar({ title }: EmployeeTopbarProps) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-40 shrink-0">
      {/* Left: Page Title & Welcome */}
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold -mt-0.5">NoteFlow Employee Portal</p>
      </div>

      {/* Center: Quick Links / Stats (Optional, keeping it clean) */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors group">
          <Calendar size={16} className="text-muted-foreground group-hover:text-primary" />
          <span className="font-medium">March 2024</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors group">
          <Layers size={16} className="text-muted-foreground group-hover:text-primary" />
          <span className="font-medium">4 Projects Active</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <button className="relative p-2 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white" />
        </button>

        {/* Profile Avatar Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-secondary border border-transparent hover:border-border/50 transition-all"
          >
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-sm font-semibold text-foreground leading-none">John Doe</span>
              <span className="text-[11px] text-muted-foreground font-medium">Product Intern</span>
            </div>
            <div className="w-9 h-9 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-sm">
              JD
            </div>
            <ChevronDown size={14} className={`text-muted-foreground transition-transform ${showProfile ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-border/50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-border/50 mb-1">
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">My Account</p>
                <p className="text-sm font-bold text-foreground truncate">j.doe@noteflow.ai</p>
              </div>
              <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors">
                <User size={16} /> My Profile
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors">
                <Settings size={16} /> Preferences
              </button>
              <div className="border-t border-border/50 mt-1 pt-1">
                <Link href="/login" className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut size={16} /> Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

