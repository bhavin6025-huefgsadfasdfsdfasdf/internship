"use client";

import React from "react";
import {
  Shield,
  Users,
  GitPullRequest,
  Activity,
  ArrowRight,
  AlertTriangle,
  Info,
  Server,
  Layers,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function SuperAdminDashboard() {
  const metrics = [
    { label: "Global Entities", value: "142", trend: "+12%", positive: true, icon: Layers },
    { label: "Active Nodes", value: "54", trend: "+5%", positive: true, icon: Server },
    { label: "Critical Actions", value: "12", trend: "-2%", positive: false, icon: GitPullRequest },
    { label: "System Health", value: "99.9%", trend: "Optimal", positive: true, icon: Activity },
  ];

  const recentRegistrations = [
    { name: "John Doe", email: "john@techcorp.com", company: "TechCorp", status: "Verified", date: "Today, 10:45 AM" },
    { name: "Sarah Smith", email: "sarah@startup.io", company: "Startup.io", status: "Pending", date: "Yesterday, 02:15 PM" },
    { name: "Mike Johnson", email: "mike@enterprise.net", company: "Enterprise Net", status: "Verified", date: "Mar 28, 09:00 AM" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Network Control</h1>
          <p className="text-sm text-gray-600 mt-1">
            Overview of <span className="text-primary font-medium">multi-tenant infrastructure</span> and security posture.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">Audit Logs</Button>
          <Button size="sm" className="gap-2">
            <Shield size={16} />
            Global Settings
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
        {/* Table */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row justify-between items-center pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Users size={16} />
                </div>
                <div>
                  <CardTitle>Recent Entities</CardTitle>
                  <CardDescription className="text-xs">Company onboarding queue</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                All Entities <ArrowRight size={14} />
              </Button>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary border-y border-border/50">
                  <tr>
                    <th className="px-5 py-3 text-xs font-medium text-muted-foreground text-left">Admin User</th>
                    <th className="px-5 py-3 text-xs font-medium text-muted-foreground text-left">Company</th>
                    <th className="px-5 py-3 text-xs font-medium text-muted-foreground text-left">Status</th>
                    <th className="px-5 py-3 text-xs font-medium text-muted-foreground text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {recentRegistrations.map((user, idx) => (
                    <tr key={idx} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-5 py-3">
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm text-foreground">{user.company}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          user.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span className="text-xs text-gray-400">{user.date}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card className="bg-primary p-5 text-primary-foreground border-none overflow-hidden">
            <h3 className="text-lg font-medium text-primary-foreground mb-1">Security Posture</h3>
            <p className="text-xs text-primary-foreground/60 mb-4">Infrastructure Hardened</p>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold">Level 4</span>
              <div className="h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[92%] rounded-full" />
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader className="flex flex-row justify-between items-center pb-4">
              <CardTitle className="text-sm">System Health</CardTitle>
              <Activity size={14} className="text-primary" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg space-y-1">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={14} className="text-rose-500" />
                  <span className="text-sm font-medium text-foreground">Database Load Critical</span>
                </div>
                <p className="text-xs text-gray-600">
                  Server DB-01 at 92% capacity. Scaling priority: High.
                </p>
              </div>
              <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg space-y-1">
                <div className="flex items-center gap-2">
                  <Info size={14} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Update Scheduled</span>
                </div>
                <p className="text-xs text-gray-600">
                  Version 2.4.1 deploying at 02:00 AM.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
