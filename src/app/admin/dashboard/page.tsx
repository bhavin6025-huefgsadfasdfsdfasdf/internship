"use client";

import React from "react";
import {
  Users,
  Briefcase,
  Zap,
  Activity,
  Plus,
  TrendingUp,
  Layers,
} from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AdminDashboard() {
  const metrics = [
    { label: "Total Personnel", value: "1,284", trend: "+12.5%", positive: true, icon: Users },
    { label: "Active Projects", value: "42", trend: "+8.2%", positive: true, icon: Briefcase },
    { label: "System Efficiency", value: "94%", trend: "-2.1%", positive: false, icon: Zap },
    { label: "Node Uptime", value: "99.9%", trend: "Stable", positive: true, icon: Activity },
  ];

  const recentActivity = [
    { user: "Alex Rivera", action: "System Update Deployment", time: "2m ago", initial: "AR" },
    { user: "Sarah Chen", action: "Project Budget Approval", time: "15m ago", initial: "SC" },
    { user: "James Wilson", action: "Resource Allocation", time: "1h ago", initial: "JW" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Operational Overview</h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back. All company systems are currently <span className="text-primary font-medium">synchronized</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">Export Report</Button>
          <Button size="sm" className="gap-2">
            <Plus size={16} />
            Create Project
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <Card key={idx}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                <metric.icon size={18} />
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                metric.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {metric.trend}
              </span>
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{metric.label}</p>
            <h3 className="text-2xl font-semibold text-foreground">{metric.value}</h3>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Chart Area */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="h-[420px]">
            <CardHeader className="flex flex-row justify-between items-center border-b border-border/50 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Layers size={16} />
                </div>
                <div>
                  <CardTitle>Project Throughput</CardTitle>
                  <CardDescription className="text-xs">Real-time operational monitoring</CardDescription>
                </div>
              </div>
              <div className="flex bg-secondary p-1 rounded-lg">
                {['Live', '24h', '7d'].map((t) => (
                  <button key={t} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    t === 'Live' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}>
                    {t}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-[300px]">
              <div className="w-16 h-16 rounded-full border-2 border-primary/20 flex items-center justify-center">
                <TrendingUp size={24} className="text-primary" />
              </div>
              <h4 className="text-sm font-medium text-foreground mt-4">System Ready</h4>
              <p className="text-xs text-gray-400 mt-2 max-w-xs text-center">
                Aggregating real-time data from all company branches.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Stream */}
        <div className="col-span-12 lg:col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Activity Stream</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((log, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                    {log.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{log.user}</p>
                    <p className="text-xs text-gray-400 truncate">{log.action}</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{log.time}</span>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                View All Logs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Banner */}
      <Card className="bg-primary p-5 text-primary-foreground border-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium opacity-80 mb-1">Company Performance Score</p>
            <h4 className="text-2xl font-semibold">Excellent (+24.8%)</h4>
          </div>
          <div className="flex-1 max-w-md w-full">
            <div className="flex justify-between text-xs font-medium mb-2 opacity-80">
              <span>Infrastructure Utilization</span>
              <span>85%</span>
            </div>
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white w-[85%] rounded-full" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
