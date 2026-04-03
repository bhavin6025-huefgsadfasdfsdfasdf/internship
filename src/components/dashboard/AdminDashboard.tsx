"use client";

import React from "react";
import {
  Users,
  Briefcase,
  TrendingUp,
  FileText,
  ShieldCheck,
  Bot,
  Activity,
  ArrowRight,
  Plus,
  PlayCircle,
  Clock,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Workforce", value: "1,248", change: "+12%", icon: Users },
    { label: "Organization Velocity", value: "92%", change: "+3%", icon: TrendingUp },
    { label: "Open Requisitions", value: "14", change: "New", icon: Briefcase },
    { label: "Critical Alerts", value: "3", change: "System", icon: AlertTriangle, alert: true },
  ];

  const operationalOverview = [
    { label: "Hiring Pipeline", value: 85, color: "bg-blue-500" },
    { label: "Payroll Readiness", value: 94, color: "bg-emerald-500" },
    { label: "Task Compliance", value: 72, color: "bg-amber-500" },
    { label: "System Uptime", value: 99.9, color: "bg-primary" },
  ];

  return (
    <div className="space-y-6 relative pb-20 animate-in fade-in duration-700">
      {/* AI Helper Floating Trigger */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button className="w-14 h-14 rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center p-0 group">
          <Bot size={28} className="group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
        </Button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Administration Console</h1>
          <p className="text-sm text-muted-foreground mt-1">Enterprise-level operations and resource management.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/users/create-employee">
            <Button size="sm" className="gap-2 h-10 shadow-lg shadow-primary/20">
              <Plus size={16} />
              New Registration
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="gap-2 h-10 border-primary/20 text-primary">
            <Bot size={16} />
            Ask AI Assistant
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className={stat.alert ? "border-rose-100 bg-rose-50/10" : "bg-white"}>
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.alert ? "bg-rose-100 text-rose-600" : "bg-primary/10 text-primary"}`}>
                  <stat.icon size={20} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${stat.alert ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest leading-none">{stat.label}</p>
              <h3 className="text-2xl font-bold text-foreground mt-1 tracking-tight">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      {/* Basic Analysis Sections */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left: Workforce Metrics */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card className="border-border/40 overflow-hidden">
            <CardHeader className="bg-secondary/20 border-b border-border/40 py-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Operational Readiness</CardTitle>
                <CardDescription className="text-xs italic">Organization-wide performance indicators</CardDescription>
              </div>
              <Activity size={18} className="text-primary/40 animate-pulse" />
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {operationalOverview.map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                      <span>{item.label}</span>
                      <span className="text-foreground">{item.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full shadow-[0_0_12px_rgba(var(--primary),0.2)]`} 
                        style={{ width: `${item.value}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-5 rounded-2xl bg-secondary/20 border border-border/20 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Compliance Guard</span>
                    <p className="text-xs text-foreground/80 font-medium">96% of enterprise profiles are in active compliance.</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs font-bold text-primary group gap-1">
                  Full Audit <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Quick Management */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card className="border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Administrative Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3">
              <Link href="/admin/users/create-manager">
                <Button variant="outline" className="w-full justify-between h-12 bg-white text-sm font-medium hover:bg-primary/5 hover:border-primary/20 group">
                  <span className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-primary" />
                    Initialize Manager
                  </span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
              <Link href="/admin/users/create-employee">
                <Button variant="outline" className="w-full justify-between h-12 bg-white text-sm font-medium hover:bg-primary/5 hover:border-primary/20 group">
                  <span className="flex items-center gap-3">
                    <Users size={18} className="text-primary" />
                    Register Employee
                  </span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-between h-12 bg-white text-sm font-medium hover:bg-primary/5 hover:border-primary/20 group">
                <span className="flex items-center gap-3">
                  <Clock size={18} className="text-primary" />
                  Audit Timesheets
                </span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </CardContent>
          </Card>

          {/* Org Pulse */}
          <Card className="bg-secondary/30 relative overflow-hidden group border-border/40">
             <div className="absolute top-0 right-0 p-4 rotate-12 opacity-5 scale-150">
               <TrendingUp size={100} />
             </div>
             <CardHeader>
               <CardTitle className="text-sm font-bold text-foreground">Operational Pulse</CardTitle>
             </CardHeader>
             <CardContent className="pt-0">
               <div className="flex items-center gap-4 py-3 border-b border-border/20 last:border-0">
                 <PlayCircle size={20} className="text-blue-500" />
                 <div className="flex-1">
                   <p className="text-xs font-bold text-foreground">Q3 Goal Setting</p>
                   <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-0.5">85% Complete</p>
                 </div>
               </div>
               <div className="flex items-center gap-4 py-3 border-b border-border/20 last:border-0">
                 <CheckCircle2 size={20} className="text-emerald-500" />
                 <div className="flex-1">
                   <p className="text-xs font-bold text-foreground">Annual Review Cycle</p>
                   <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-0.5">Final Phase</p>
                 </div>
               </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
