'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bell, 
  Search, 
  ChevronDown,
  User,
  LogOut,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

interface ManagerNavbarProps {
  title: string;
}

export default function ManagerNavbar({ title }: ManagerNavbarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/manager/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-40 shrink-0">
      {/* Left: Page Title */}
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-lg mx-8 relative group">
        <Search 
          size={18} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
        />
        <input 
          type="text" 
          placeholder="Search team performance, projects..." 
          className="w-full h-10 bg-background border border-border rounded-lg pl-10 pr-4 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchSubmit}
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Team Stats Shortcut */}
        <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
          <TrendingUp size={16} />
          <span>Team Analytics</span>
        </button>

        {/* Notification Icon */}
        <button className="relative p-2 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white" />
        </button>

        {/* Profile Avatar Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-secondary border border-transparent hover:border-border/50 transition-all"
          >
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-sm font-medium text-foreground leading-none">Sarah Jenkins</span>
              <span className="text-xs text-muted-foreground">Project Manager</span>
            </div>
            <div className="w-9 h-9 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-sm">
              SJ
            </div>
            <ChevronDown size={14} className={`text-muted-foreground transition-transform ${showProfile ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-border/50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-border/30 mb-1">
                <p className="text-xs text-muted-foreground font-medium">Signed in as Manager</p>
                <p className="text-sm font-bold text-foreground truncate">s.jenkins@company.com</p>
              </div>
              <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors">
                <User size={16} /> My Team Profile
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors">
                <ShieldCheck size={16} /> Approval Settings
              </button>
              <div className="border-t border-border/30 mt-1 pt-1">
                <Link href="/login" className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut size={16} /> Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
