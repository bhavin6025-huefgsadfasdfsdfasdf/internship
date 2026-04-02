"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Search, Filter, Calendar, Activity, CheckCircle2, XCircle, Clock } from "lucide-react";

// Mock Data
type ActivityStatus = "success" | "error" | "info";

interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  status: ActivityStatus;
  user: string;
  type: string;
}

const mockActivity: ActivityLog[] = [
  {
    id: "1",
    action: "Successfully processed monthly payroll for 45 employees",
    timestamp: "2026-04-01T10:30:00Z",
    status: "success",
    user: "Sarah Jenkins",
    type: "Payroll",
  },
  {
    id: "2",
    action: "Failed to connect to database during batch update",
    timestamp: "2026-04-01T09:15:22Z",
    status: "error",
    user: "System",
    type: "System",
  },
  {
    id: "3",
    action: "New employee profile created: Michael Chang",
    timestamp: "2026-03-31T16:45:00Z",
    status: "success",
    user: "HR Admin",
    type: "User Management",
  },
  {
    id: "4",
    action: "System backup completed successfully",
    timestamp: "2026-03-31T02:00:00Z",
    status: "info",
    user: "System",
    type: "System",
  },
  {
    id: "5",
    action: "Invoice #INV-2026-0034 payment failed (Card declined)",
    timestamp: "2026-03-30T14:20:10Z",
    status: "error",
    user: "Billing System",
    type: "Billing",
  },
  {
    id: "6",
    action: "Project 'Q2 Marketing' status updated to IN PROGRESS",
    timestamp: "2026-03-30T11:05:00Z",
    status: "success",
    user: "David Miller",
    type: "Project Management",
  },
  {
    id: "7",
    action: "Login attempt blocked from unrecognized IP address",
    timestamp: "2026-03-29T23:14:05Z",
    status: "error",
    user: "Security System",
    type: "Security",
  },
  {
    id: "8",
    action: "Weekly performance report generated",
    timestamp: "2026-03-29T17:00:00Z",
    status: "success",
    user: "Analytics Bot",
    type: "Reporting",
  },
];

export default function ActivityHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredActivity = mockActivity.filter((log) => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) || log.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || log.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === "all" || log.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: ActivityStatus) => {
    switch (status) {
      case "success":
        return <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center ring-4 ring-slate-900"><CheckCircle2 className="w-4 h-4" /></div>;
      case "error":
        return <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center ring-4 ring-slate-900"><XCircle className="w-4 h-4" /></div>;
      case "info":
      default:
        return <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center ring-4 ring-slate-900"><Activity className="w-4 h-4" /></div>;
    }
  };

  const getStatusColor = (status: ActivityStatus) => {
    switch (status) {
      case "success":
        return "text-emerald-500";
      case "error":
        return "text-red-500";
      case "info":
      default:
        return "text-blue-500";
    }
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Activity History</h1>
        <p className="text-slate-400">Track all system events, user actions, and security logs.</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <div className="relative min-w-[140px]">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            >
              <option value="all" className="bg-slate-800">All Status</option>
              <option value="success" className="bg-slate-800">Success</option>
              <option value="error" className="bg-slate-800">Error</option>
              <option value="info" className="bg-slate-800">Info</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative min-w-[150px]">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            >
              <option value="all" className="bg-slate-800">All Types</option>
              <option value="System" className="bg-slate-800">System</option>
              <option value="Security" className="bg-slate-800">Security</option>
              <option value="Payroll" className="bg-slate-800">Payroll</option>
              <option value="User Management" className="bg-slate-800">User Management</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-white transition-all whitespace-nowrap">
            <Calendar className="w-4 h-4 text-slate-400" />
            Date Range
          </button>
        </div>
      </div>

      {/* Timeline List */}
      <div className="bg-slate-800/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
        {filteredActivity.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Activity className="w-12 h-12 text-slate-500 mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-white mb-1">No activities found</h3>
            <p className="text-slate-400 text-sm">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[15px] top-4 bottom-4 w-px bg-white/10" />

            <div className="space-y-8 relative max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredActivity.map((log) => (
                <div key={log.id} className="relative flex gap-6 items-start group">
                  {/* Timeline Node */}
                  <div className="relative z-10 mt-1">
                    {getStatusIcon(log.status)}
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 group-hover:border-white/10 rounded-2xl p-4 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                         <span className={`text-xs font-semibold uppercase tracking-wider ${getStatusColor(log.status)} bg-white/5 px-2 py-1 rounded-md`}>
                            {log.type}
                         </span>
                         <span className="text-sm font-medium text-slate-300 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                            {log.user}
                         </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {format(new Date(log.timestamp), "MMM d, yyyy • h:mm a")}
                      </div>
                    </div>
                    
                    <p className={`text-[15px] md:text-base font-medium leading-relaxed ${log.status === 'error' ? 'text-red-200/90' : log.status === 'success' ? 'text-emerald-200/90' : 'text-slate-200'}`}>
                      {log.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
