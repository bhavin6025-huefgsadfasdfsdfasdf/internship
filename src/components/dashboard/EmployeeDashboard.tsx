"use client";

import React from "react";
import {
  CheckSquare,
  Clock,
  Plus,
  FileUp,
  Calendar,
  ArrowRight,
  TrendingUp,
  Layout,
  Bot,
  MessageSquare,
  Zap,
  Target
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function EmployeeDashboard() {
  const stats = [
    { label: "Completion Rate", value: "94%", change: "+2%", icon: Target },
    { label: "Hours logged", value: "38.5h", change: "On Track", icon: Clock },
    { label: "Active Tasks", value: "6", change: "-2", icon: CheckSquare },
    { label: "AI Insights", value: "3 New", change: "Alert", icon: Bot, alert: true },
  ];

  const todayTasks = [
    { title: "Update project documentation", deadline: "Today, 5:00 PM", status: "In Progress" },
    { title: "Submit weekly timesheet", deadline: "Tomorrow, 10:00 AM", status: "Pending" },
    { title: "Review team feedback", deadline: "Oct 5, 2:00 PM", status: "Upcoming" },
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
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Personal Workspace</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back. You have <span className="text-primary font-bold">3 priority tasks</span> in your workflow.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 h-10 border-primary/20 text-primary">
            <Layout size={16} />
            My Planner
          </Button>
          <Button size="sm" className="gap-2 h-10 shadow-lg shadow-primary/20">
            <Plus size={16} />
            Create Task
          </Button>
        </div>
      </div>

      {/* Basic Metrics Loop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className={stat.alert ? "border-primary/20 bg-primary/5" : "bg-white"}>
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.alert ? "bg-primary/20 text-primary" : "bg-secondary/50 text-muted-foreground"}`}>
                  <stat.icon size={20} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${stat.alert ? "bg-primary text-white" : "bg-emerald-100 text-emerald-600"}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-bold text-foreground mt-1">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Task Board */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <Card className="border-border/40 overflow-hidden">
             <CardHeader className="bg-secondary/20 border-b border-border/40 py-4 flex flex-row justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <CheckSquare size={16} />
                </div>
                <div>
                  <CardTitle className="text-base text-foreground">Priority Tasks</CardTitle>
                  <CardDescription className="text-xs italic mt-0">Personal operational pipeline</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs font-bold text-primary gap-1">
                View Schedule <ArrowRight size={14} />
              </Button>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {todayTasks.map((task, i) => (
                <div key={i} className="flex justify-between items-center p-4 rounded-xl border border-border/20 hover:bg-secondary/20 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white border border-border/10 text-primary shadow-sm group-hover:scale-110 transition-transform">
                      <CheckSquare size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{task.title}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5 font-bold flex items-center gap-1">
                        <Clock size={10} /> {task.deadline}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                    task.status === "In Progress" ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                  }`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* My Efficiency & AI Insights */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <Card className="text-center bg-white border-border/40 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <TrendingUp size={80} />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Target size={18} className="text-primary" />
                   <CardTitle className="text-sm font-bold uppercase tracking-widest">Efficiency Index</CardTitle>
                </div>
                <Zap size={16} className="text-amber-500 fill-amber-500" />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-4 pb-6">
              <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="10" className="text-secondary" />
                  <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 70}
                    strokeDashoffset={2 * Math.PI * 70 * (1 - 0.75)}
                    strokeLinecap="round"
                    className="text-primary shadow-lg"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-foreground tracking-tighter">75%</span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Optimal</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic max-w-[260px]">
                "You are <span className="text-primary font-bold">exceeding benchmarks</span> for this cycle. Complete current blockers to hit 80%."
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground border-none shadow-xl shadow-primary/20 overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
               <Bot size={100} />
             </div>
             <CardHeader className="pb-2">
               <div className="flex items-center gap-2">
                 <Bot size={18} />
                 <CardTitle className="text-sm text-primary-foreground font-bold uppercase tracking-widest leading-none">AI Workflow Buddy</CardTitle>
               </div>
             </CardHeader>
             <CardContent className="space-y-4">
               <p className="text-xs opacity-90 leading-relaxed font-medium">
                 "I've analyzed your upcoming 'Project Specs' task. Based on previous cycles, I recommend starting before noon for optimal focus."
               </p>
               <div className="flex items-center gap-2">
                 <Button className="flex-1 bg-white text-primary hover:bg-secondary font-bold text-xs h-9">
                   Plan Session
                 </Button>
                 <Button variant="ghost" className="h-9 w-9 p-0 bg-white/10 hover:bg-white/20 text-white">
                   <MessageSquare size={16} />
                 </Button>
               </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
