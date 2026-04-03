"use client";

import React from "react";
import {
  Users,
  Briefcase,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  MoreVertical,
  ArrowRight,
  ShieldAlert,
  Bot,
  PlayCircle,
  TestTube,
  FileCheck
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ManagerDashboard() {
  const stats = [
    { label: "Team Velocity", value: "84%", change: "+5%", icon: TrendingUp },
    { label: "Active Projects", value: "12", change: "Stable", icon: Briefcase },
    { label: "Pending Approvals", value: "7", change: "-2", icon: Clock },
    { label: "Low Hours (Alert)", value: "3", change: "Attention", icon: ShieldAlert, alert: true },
  ];

  const taskBreakdown = [
    { label: "Open Tasks", count: 24, icon: PlayCircle, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "In Working", count: 18, icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "In Test", count: 12, icon: TestTube, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Completed", count: 142, icon: FileCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  const timesheetCompliance = [
    { name: "John Doe", status: "Late Submission", hours: 32, avatar: "JD", color: "text-rose-600", bg: "bg-rose-50" },
    { name: "Jane Smith", status: "Low Hours", hours: 28, avatar: "JS", color: "text-orange-600", bg: "bg-orange-50" },
    { name: "Robert J.", status: "Missing Logs", hours: 0, avatar: "RJ", color: "text-rose-600", bg: "bg-rose-50" },
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
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Managerial Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Operational analysis and team performance monitoring.</p>
        </div>
        <Button size="sm" className="gap-2 h-10 shadow-lg shadow-primary/20">
          <Bot size={16} />
          Consult AI Advisor
        </Button>
      </div>

      {/* Basic Metrics Loop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className={stat.alert ? "border-rose-100 bg-rose-50/10" : ""}>
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.alert ? "bg-rose-100 text-rose-600" : "bg-primary/10 text-primary"}`}>
                  <stat.icon size={20} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${stat.alert ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-bold text-foreground mt-1">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Task Velocity Board */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card className="border-border/40 overflow-hidden">
            <CardHeader className="bg-secondary/20 border-b border-border/40 py-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Task Lifecycle Board</CardTitle>
                <CardDescription className="text-xs italic">Velocity tracking per pipeline stage</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical size={16} />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {taskBreakdown.map((item, i) => (
                  <div key={i} className={`flex flex-col items-center justify-center p-6 rounded-2xl border border-border/20 ${item.bg} group hover:border-primary/20 transition-all cursor-pointer`}>
                    <item.icon size={24} className={`${item.color} mb-3 group-hover:scale-110 transition-transform`} />
                    <span className="text-2xl font-bold text-foreground">{item.count}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-border/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Phase Completion</span>
                  <span className="text-xs font-bold text-primary">78% Target Met</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[78%] rounded-full shadow-[0_0_12px_rgba(var(--primary),0.3)]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance & Late Submissions */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card className="border-rose-100/50">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert size={18} className="text-rose-500" />
                <CardTitle className="text-base">Timesheet Compliance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {timesheetCompliance.map((person, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-xl border border-border/20 ${person.bg} transition-all hover:translate-x-1`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/80 flex items-center justify-center text-xs font-bold shadow-sm border border-border/10">
                      {person.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{person.name}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${person.color}`}>{person.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-foreground">{person.hours}h</p>
                    <p className="text-[9px] text-muted-foreground italic">Logged</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs font-bold text-primary gap-1 group mt-2">
                View Full Audit <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform">
              <Bot size={120} />
            </div>
            <CardHeader>
              <CardTitle className="text-sm">Manager Intelligence</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-xs leading-relaxed opacity-90">
                "3 team members have critical timesheet gaps for this sprint. I recommend automated reminders before the 5 PM cutoff."
              </p>
              <Button size="sm" className="bg-white text-primary hover:bg-secondary mt-4 w-full text-xs font-bold">
                Deploy System Reminders
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
