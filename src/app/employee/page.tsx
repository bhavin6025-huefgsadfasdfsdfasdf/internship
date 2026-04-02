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
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function EmployeeDashboard() {
  const todayTasks = [
    { title: "Update project documentation", deadline: "Today, 5:00 PM", status: "In Progress" },
    { title: "Submit weekly timesheet", deadline: "Tomorrow, 10:00 AM", status: "Pending" },
    { title: "Review team feedback", deadline: "Oct 5, 2:00 PM", status: "Upcoming" },
  ];

  const recentActivity = [
    { user: "JD", action: 'Uploaded "Project_Specs.pdf"', time: "2 hours ago" },
    { user: "JD", action: 'Completed task "UI Mockups"', time: "4 hours ago" },
    { user: "JD", action: "Added 8 hours to timesheet", time: "Yesterday" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Personal Workspace</h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back. You have <span className="text-primary font-medium">3 priority tasks</span> in your workflow.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Layout size={16} />
            My Planner
          </Button>
          <Button size="sm" className="gap-2">
            <Plus size={16} />
            Create Task
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left — Tasks */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <CheckSquare size={16} />
                </div>
                <div>
                  <CardTitle>Priority Tasks</CardTitle>
                  <CardDescription className="text-xs">Today&apos;s scheduled operations</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                View Schedule <ArrowRight size={14} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayTasks.map((task, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary text-primary">
                      <CheckSquare size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{task.title}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Clock size={10} /> {task.deadline}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    task.status === "In Progress" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                  }`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right — Progress & Actions */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          {/* Weekly Progress */}
          <Card className="text-center">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" />
                <CardTitle className="text-sm">Weekly Progress</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="72" cy="72" r="60" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-secondary" />
                  <circle cx="72" cy="72" r="60" fill="transparent" stroke="currentColor" strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 60}
                    strokeDashoffset={2 * Math.PI * 60 * (1 - 0.75)}
                    strokeLinecap="round"
                    className="text-primary"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-semibold text-foreground">75%</span>
                  <span className="text-xs text-gray-400">Efficiency</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 max-w-[260px]">
                You&apos;re <span className="text-primary font-medium">ahead of schedule</span>. Complete 2 more tasks to hit your weekly benchmark.
              </p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="flex flex-col items-center p-4 gap-2 hover:bg-secondary/50 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-secondary text-primary rounded-lg flex items-center justify-center">
                <Calendar size={20} />
              </div>
              <span className="text-xs font-medium text-foreground">Timesheet</span>
            </Card>
            <Card className="flex flex-col items-center p-4 gap-2 hover:bg-secondary/50 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-secondary text-primary rounded-lg flex items-center justify-center">
                <FileUp size={20} />
              </div>
              <span className="text-xs font-medium text-foreground">Upload File</span>
            </Card>
          </div>

          {/* Activity Feed */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-sm">Activity Feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center text-xs font-medium shrink-0">
                    {item.user}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.action}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
