"use client";

import React from "react";
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Search, 
  Filter, 
  MoreHorizontal,
  ArrowRight,
  TrendingUp,
  Layout
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

const USERS = [
  { name: "John Doe", email: "john.doe@company.com", role: "Manager", dept: "Engineering", status: "Active" },
  { name: "Jane Smith", email: "jane.smith@company.com", role: "Employee", dept: "Marketing", status: "Active" },
  { name: "Robert Johnson", email: "robert.j@company.com", role: "Manager", dept: "Sales", status: "On Leave" },
  { name: "Michael Brown", email: "m.brown@company.com", role: "Employee", dept: "Support", status: "Active" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">User Management</h1>
          <p className="text-muted-foreground">Administer and oversee all user accounts across the enterprise.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link href="/admin/users/create-manager" className="flex-1 md:flex-none">
            <Button variant="outline" className="w-full gap-2 h-11 border-primary/20 hover:bg-primary/5 text-primary">
              <ShieldCheck size={18} />
              Add Manager
            </Button>
          </Link>
          <Link href="/admin/users/create-employee" className="flex-1 md:flex-none">
            <Button className="w-full gap-2 h-11 shadow-lg shadow-primary/20">
              <UserPlus size={18} />
              Add Employee
            </Button>
          </Link>
        </div>
      </div>

      {/* Basic Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={80} />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Workforce</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,248</div>
            <p className="text-xs text-emerald-500 font-medium flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden group border-primary/10">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-primary">
            <ShieldCheck size={80} />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Management Tier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">42</div>
            <p className="text-xs text-muted-foreground mt-1">Across 8 departments</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Layout size={80} />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">98.2%</div>
            <p className="text-xs text-emerald-500 font-medium mt-1">Optimal system engagement</p>
          </CardContent>
        </Card>
      </div>

      {/* Directory Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 w-4 h-4 group-focus-within:text-primary transition-colors" />
          <Input placeholder="Search directory..." className="pl-10 h-11 bg-white" />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar pb-2 sm:pb-0">
          <Button variant="ghost" size="sm" className="gap-2 shrink-0">
            <Filter size={16} /> Filters
          </Button>
          <div className="h-4 w-[1px] bg-border mx-2 shrink-0 hidden sm:block" />
          <Button variant="secondary" size="sm" className="bg-white border text-xs shrink-0">All Users</Button>
          <Button variant="ghost" size="sm" className="text-xs shrink-0">Managers</Button>
          <Button variant="ghost" size="sm" className="text-xs shrink-0">Employees</Button>
        </div>
      </div>

      {/* User Table (Simplified with Card Layout) */}
      <Card className="overflow-hidden border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-secondary/30">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Identity</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Department</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Role</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-center">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {USERS.map((user, i) => (
                <tr key={i} className="hover:bg-secondary/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0 border border-orange-100/50">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground/80">{user.dept}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       {user.role === "Manager" ? <ShieldCheck size={14} className="text-primary" /> : <Users size={14} className="text-muted-foreground" />}
                       <span className="text-sm font-medium text-foreground/90">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span className={cn(
                        "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest",
                        user.status === "Active" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-orange-50 text-orange-600 border border-orange-100"
                      )}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 pr-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs font-bold text-primary gap-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                        Profile <ArrowRight size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
