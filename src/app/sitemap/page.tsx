"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, 
  Map, 
  UserCircle, 
  Settings, 
  ShieldCheck, 
  Briefcase, 
  Users, 
  ExternalLink,
  ChevronRight,
  Zap
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Route Data
const ROUTES = {
  "Public & Shared": [
    { name: "Landing Page", path: "/" },
    { name: "Login", path: "/login" },
    { name: "Signup", path: "/signup" },
    { name: "Unauthorized", path: "/unauthorized" },
  ],
  "Admin Portal": [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "User Management", path: "/admin/users" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Timesheets", path: "/admin/timesheets" },
    { name: "Payroll", path: "/admin/payroll" },
    { name: "Recruitment", path: "/admin/recruitment" },
    { name: "Analytics", path: "/admin/analytics" },
    { name: "Billing", path: "/admin/billing" },
    { name: "Chat Moderation", path: "/admin/chat-moderation" },
    { name: "Departments", path: "/admin/departments" },
    { name: "Discussions", path: "/admin/discussions" },
    { name: "Integrations", path: "/admin/integrations" },
    { name: "Leaves", path: "/admin/leaves" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Settings", path: "/admin/settings" },
    { name: "Task Review", path: "/admin/task-review" },
    { name: "Tasks", path: "/admin/tasks" },
    { name: "Help", path: "/admin/help" },
  ],
  "Super Admin Portal": [
    { name: "Dashboard", path: "/super-admin/dashboard" },
    { name: "Audit Logs", path: "/super-admin/audit-logs" },
    { name: "Billing", path: "/super-admin/billing" },
    { name: "System Configuration", path: "/super-admin/system-config" },
    { name: "Company Management", path: "/super-admin/company-management" },
    { name: "Roles & Permissions", path: "/super-admin/roles-permissions" },
    { name: "System Health", path: "/super-admin/system-health" },
    { name: "Admin List", path: "/super-admin/admin-list" },
    { name: "Create Admin", path: "/super-admin/create-admin" },
    { name: "API Keys", path: "/super-admin/api-keys" },
    { name: "Change Password", path: "/super-admin/change-password" },
  ],
  "Manager Portal": [
    { name: "Dashboard", path: "/manager/dashboard" },
    { name: "My Team", path: "/manager/team" },
    { name: "Projects", path: "/manager/projects" },
    { name: "Task Review", path: "/manager/task-review" },
    { name: "Assign Tasks", path: "/manager/assign-task" },
    { name: "Timesheet Approval", path: "/manager/timesheet-approval" },
    { name: "Team Monitoring", path: "/manager/team-monitoring" },
    { name: "Performance", path: "/manager/performance" },
    { name: "Shifts", path: "/manager/shifts" },
    { name: "Approvals", path: "/manager/approvals" },
    { name: "Reports", path: "/manager/reports" },
  ],
  "Employee Portal": [
    { name: "Dashboard", path: "/employee/dashboard" },
    { name: "My Tasks", path: "/employee/tasks" },
    { name: "My Timesheet", path: "/employee/timesheet" },
    { name: "Submit Timesheet", path: "/employee/submit-timesheet" },
    { name: "Payslips", path: "/employee/payslips" },
    { name: "Benefits", path: "/employee/benefits" },
    { name: "AI Helper", path: "/employee/ai-helper" },
    { name: "Time Off", path: "/employee/time-off" },
    { name: "Goals", path: "/employee/goals" },
    { name: "Directory", path: "/employee/directory" },
    { name: "Training", path: "/employee/training" },
  ]
};

const CATEGORY_ICONS = {
  "Public & Shared": Zap,
  "Admin Portal": ShieldCheck,
  "Super Admin Portal": Settings,
  "Manager Portal": Users,
  "Employee Portal": UserCircle
};

export default function MasterSitemap() {
  const [search, setSearch] = useState("");

  const filteredRoutes = useMemo(() => {
    if (!search) return ROUTES;
    
    const result: any = {};
    Object.entries(ROUTES).forEach(([category, routes]) => {
      const filtered = routes.filter(r => 
        r.name.toLowerCase().includes(search.toLowerCase()) || 
        r.path.toLowerCase().includes(search.toLowerCase())
      );
      if (filtered.length > 0) {
        result[category] = filtered;
      }
    });
    return result;
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-200 pb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-2">
              <Map size={14} />
              Navigation Hub
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Master Project <span className="text-primary italic">Sitemap</span>
            </h1>
            <p className="text-gray-500 max-w-xl text-lg">
              Direct access to all 100+ organized routes across the NoteFlow ERP ecosystem.
            </p>
          </div>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search routes or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-12 pr-6 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-hidden focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Stats Summary */}
        {!search && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(ROUTES).map(([cat, routes]) => (
              <div key={cat} className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-tighter">{cat.replace(" Portal", "")}</p>
                <p className="text-2xl font-bold text-gray-900">{routes.length} <span className="text-sm font-normal text-gray-400 italic">routes</span></p>
              </div>
            ))}
          </div>
        )}

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(filteredRoutes).map(([category, routes]: [string, any]) => {
            const Icon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || Briefcase;
            
            return (
              <div key={category} className="flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 px-2">
                  <div className="p-2 rounded-lg bg-white border border-gray-200 shadow-xs text-primary">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-xl text-gray-800">{category}</h3>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                  {routes.map((route: any) => (
                    <Link 
                      key={route.path} 
                      href={route.path}
                      className="group flex items-center justify-between p-4 hover:bg-primary/[0.02] transition-all"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors text-ellipsis overflow-hidden">
                          {route.name}
                        </span>
                        <code className="text-[10px] text-gray-400 font-mono mt-0.5 italic">
                          {route.path}
                        </code>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all text-primary">
                        <ChevronRight size={16} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {Object.keys(filteredRoutes).length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="p-4 rounded-full bg-gray-50 text-gray-400">
              <Search size={40} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">No matching routes found</h4>
              <p className="text-gray-500 mt-1">Try adjusting your search terms or browsing categories.</p>
            </div>
            <button 
              onClick={() => setSearch("")}
              className="text-primary font-bold hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-medium shadow-xl">
            <Zap size={16} className="text-yellow-400 fill-yellow-400" />
            Designed for Instant Navigation & Discovery
          </div>
          <p className="mt-6 text-gray-400 text-xs uppercase tracking-widest font-bold">
            NoteFlow ERP Navigation System • v2.4.0
          </p>
        </div>
      </div>
    </div>
  );
}
