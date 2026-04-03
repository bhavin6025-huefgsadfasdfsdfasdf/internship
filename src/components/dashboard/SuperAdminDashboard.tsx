"use client";

import React from "react";
import {
  Shield,
  Activity,
  Lock,
  Users,
  Grid,
  Bot,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  Key,
  Globe
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function SuperAdminDashboard() {
  const stats = [
    { label: "Active Nodes", value: "24", change: "Stable", icon: Globe },
    { label: "System Health", value: "99.9%", change: "Optimal", icon: Activity },
    { label: "Admin Tier", value: "8", change: "+1", icon: Shield },
    { label: "API Throttling", value: "0%", change: "Clear", icon: Zap },
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
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
             <Shield className="text-primary" size={28} />
             Global Oversight
          </h1>
          <p className="text-sm text-muted-foreground mt-1 italic font-medium">Root level system control and enterprise compliance.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 h-10 border-primary/20 text-primary">
            <Key size={16} />
            Key Mgmt
          </Button>
          <Button size="sm" className="gap-2 h-10 shadow-lg shadow-primary/20">
            <Plus size={16} />
            Authorize Admin
          </Button>
        </div>
      </div>

      {/* Stats Loop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:border-primary/20 transition-colors">
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-primary/70">
                  <stat.icon size={20} />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest bg-emerald-100 text-emerald-600">
                  {stat.change}
                </span>
              </div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">{stat.label}</p>
              <h3 className="text-2xl font-bold text-foreground mt-1">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Core Infrastructure Analysis */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="border-border/40 overflow-hidden">
            <CardHeader className="bg-secondary/10 border-b border-border/40 py-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Enterprise Health Index</CardTitle>
                <CardDescription className="text-xs">Real-time infrastructure and security metrics</CardDescription>
              </div>
              <Activity size={18} className="text-emerald-500 animate-[pulse_2s_ease-in-out_infinite]" />
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-2xl bg-secondary/30 border border-border/20 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3">
                    <CheckCircle2 size={24} className="text-emerald-500" />
                  </div>
                  <span className="text-2xl font-bold text-foreground">100%</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Auth Uptime</span>
                </div>
                <div className="p-4 rounded-2xl bg-secondary/30 border border-border/20 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3">
                     <Lock size={24} className="text-blue-500" />
                  </div>
                  <span className="text-2xl font-bold text-foreground">Active</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Global SSL</span>
                </div>
                <div className="p-4 rounded-2xl bg-secondary/30 border border-border/20 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3">
                     <Users size={24} className="text-amber-500" />
                  </div>
                  <span className="text-2xl font-bold text-foreground">1,248</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Node Users</span>
                </div>
              </div>

               <div className="mt-8 pt-6 border-t border-border/20">
                 <div className="flex justify-between items-center mb-3">
                   <div className="flex items-center gap-2">
                     <AlertTriangle size={14} className="text-primary" />
                     <span className="text-xs font-bold text-muted-foreground uppercase">System Load Propagation</span>
                   </div>
                   <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-widest">Minimal</span>
                 </div>
                 <div className="h-4 w-full bg-secondary rounded-lg overflow-hidden flex gap-1 p-1">
                   {[...Array(20)].map((_, i) => (
                      <div key={i} className={`flex-1 rounded-sm ${i < 4 ? "bg-primary animate-pulse" : "bg-white/50"}`} />
                   ))}
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Global Controls */}
        <div className="col-span-12 lg:col-span-4">
           <Card className="h-full bg-foreground text-background">
             <CardHeader className="pb-4">
               <CardTitle className="text-base text-background flex items-center gap-2">
                 <Grid size={18} />
                 Terminal Actions
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-3">
               <Button variant="ghost" className="w-full justify-between text-background/80 hover:bg-white/10 h-12 text-sm">
                 <span className="flex items-center gap-3">
                   <Shield size={18} />
                   Security Audit
                 </span>
                 <ArrowRight size={14} />
               </Button>
               <Button variant="ghost" className="w-full justify-between text-background/80 hover:bg-white/10 h-12 text-sm">
                 <span className="flex items-center gap-3">
                   <Activity size={18} />
                   Audit Protocol
                 </span>
                 <ArrowRight size={14} />
               </Button>
               <Button variant="ghost" className="w-full justify-between text-background/80 hover:bg-white/10 h-12 text-sm">
                 <span className="flex items-center gap-3">
                   <Key size={18} />
                   Token Reissue
                 </span>
                 <ArrowRight size={14} />
               </Button>
               
               <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                 <div className="flex items-start gap-3">
                   <Bot size={20} className="text-primary shrink-0" />
                   <div>
                     <p className="text-xs font-medium text-background/90 italic leading-relaxed">
                       "All systems operational. No unauthorized intrusions detected in the last rolling 24-hour cycle. Global safety index: 1.0"
                     </p>
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
