"use client";

import React from "react";
import {
  Briefcase,
  Users,
  CheckSquare,
  Clock,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Plus,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ManagerDashboard() {
  const metrics = [
    { label: "Managed Projects", value: "7", status: "1 at risk", icon: Briefcase, warn: false },
    { label: "Team Allocation", value: "24", status: "3 OOO today", icon: Users, warn: false },
    { label: "Assigned Tasks", value: "86", status: "14 high priority", icon: CheckSquare, warn: false },
    { label: "Time Approvals", value: "5", status: "Action Required", icon: Clock, warn: true },
  ];

  const recentTasks = [
    { id: "TSK-128", title: "API Integration Layer", assignee: "Alex R.", status: "In Progress", priority: "High" },
    { id: "TSK-129", title: "Authentication Flow UI", assignee: "Sarah M.", status: "Review", priority: "Medium" },
    { id: "TSK-130", title: "Data Migration Script", assignee: "John D.", status: "Pending", priority: "Critical" },
    { id: "TSK-131", title: "Core Navigation Bug", assignee: "Emma W.", status: "Completed", priority: "Low" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Manager Console</h1>
          <p className="text-sm text-gray-600 mt-1">
            Team synchronization and <span className="text-primary font-medium">milestone velocity</span> overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Clock size={16} />
            Approvals
          </Button>
          <Button size="sm" className="gap-2">
            <Plus size={16} />
            Assign Task
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
                metric.warn ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
              }`}>
                {metric.status}
              </span>
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{metric.label}</p>
            <h3 className="text-2xl font-semibold text-foreground">{metric.value}</h3>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Backlog Table */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row justify-between items-center pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <AlertCircle size={16} />
                </div>
                <div>
                  <CardTitle>Priority Backlog</CardTitle>
                  <CardDescription className="text-xs">Resource allocation monitoring</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                Full Backlog <ArrowRight size={14} />
              </Button>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary border-y border-border/50">
                  <tr>
                    <th className="px-5 py-3 text-xs font-medium text-muted-foreground text-left">ID</th>
                    <th className="px-5 py-3 text-xs font-medium text-muted-foreground text-left">Task</th>
                    <th className="px-5 py-3 text-xs font-medium text-muted-foreground text-left">Assignee</th>
                    <th className="px-5 py-3 text-xs font-medium text-muted-foreground text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {recentTasks.map((task, idx) => (
                    <tr key={idx} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-5 py-3 text-xs text-gray-400">{task.id}</td>
                      <td className="px-5 py-3">
                        <p className="text-sm font-medium text-foreground">{task.title}</p>
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded mt-1 inline-block ${
                          task.priority === 'Critical' ? 'bg-rose-50 text-rose-600' :
                          task.priority === 'High' ? 'bg-amber-50 text-amber-600' : 'bg-primary/10 text-primary'
                        }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                            {task.assignee.charAt(0)}
                          </div>
                          <span className="text-sm text-foreground">{task.assignee}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span className="text-xs font-medium text-foreground bg-secondary px-2 py-1 rounded">{task.status}</span>
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
            <h3 className="text-lg font-medium text-primary-foreground mb-1">Team Performance</h3>
            <p className="text-xs text-primary-foreground/60 mb-4">Quarterly benchmark analysis</p>
            <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white text-xs h-9">
              Access Analytics <ExternalLink size={14} className="ml-2" />
            </Button>
          </Card>

          <Card>
            <CardHeader className="flex flex-row justify-between items-center pb-4">
              <CardTitle className="text-sm">Active Alerts</CardTitle>
              <span className="flex items-center justify-center w-5 h-5 rounded bg-rose-500 text-white text-xs font-medium">1</span>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-secondary border border-border/50 rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">Timesheet Approval</span>
                  </div>
                  <span className="text-xs text-gray-400">2h ago</span>
                </div>
                <p className="text-xs text-gray-600">
                  Alex R. submitted 40 hours for the Integration project.
                </p>
                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm" className="flex-1">Review</Button>
                  <Button size="sm" className="flex-1">Approve</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
