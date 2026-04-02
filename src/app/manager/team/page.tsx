'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Activity, 
  Clock, 
  CheckCircle2, 
  X, 
  MoreVertical,
  Search,
  Filter,
  ChevronRight,
  TrendingUp,
  LayoutGrid,
  List,
  Mail,
  User as UserIcon,
  ShieldCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface UserActivity {
  id: number;
  user: string;
  action: string;
  time: string;
  avatar?: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  activeTasks: number;
  status: 'Online' | 'Offline';
  lastActive: string;
  email: string;
  department: string;
  performance: number;
}

const mockTeam: TeamMember[] = [
  { id: 1, name: 'Sarah Miller', role: 'UI/UX Designer', activeTasks: 4, status: 'Online', lastActive: 'Just now', email: 'sarah.m@techflow.com', department: 'Design', performance: 92 },
  { id: 2, name: 'Alex Johnson', role: 'Backend Developer', activeTasks: 2, status: 'Online', lastActive: 'Just now', email: 'alex.j@techflow.com', department: 'Engineering', performance: 88 },
  { id: 3, name: 'Michael Chen', role: 'Fullstack Dev', activeTasks: 5, status: 'Offline', lastActive: '2 hours ago', email: 'm.chen@techflow.com', department: 'Engineering', performance: 85 },
  { id: 4, name: 'Emma Wilson', role: 'Technical Writer', activeTasks: 1, status: 'Online', lastActive: 'Just now', email: 'emma.w@techflow.com', department: 'Content', performance: 95 },
  { id: 5, name: 'David Park', role: 'Security Analyst', activeTasks: 3, status: 'Offline', lastActive: '5 hours ago', email: 'd.park@techflow.com', department: 'Security', performance: 78 },
  { id: 6, name: 'Lisa Ray', role: 'Frontend Developer', activeTasks: 4, status: 'Online', lastActive: 'Just now', email: 'lisa.r@techflow.com', department: 'Engineering', performance: 90 },
];

const mockActivities: UserActivity[] = [
  { id: 1, user: 'Sarah Miller', action: 'Updated Header component', time: '10:45 AM' },
  { id: 2, user: 'Alex Johnson', action: 'Fixed Auth API bug', time: '10:30 AM' },
  { id: 3, user: 'Emma Wilson', action: 'Published API docs', time: '09:15 AM' },
  { id: 4, user: 'Sarah Miller', action: 'Started on Login screen', time: '08:45 AM' },
  { id: 5, user: 'Lisa Ray', action: 'Merged PR #124', time: 'Yesterday' },
];

export default function TeamMonitoring() {
  const [selectedUser, setSelectedUser] = useState<TeamMember | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <Typography variant="h2" display>Team Monitoring</Typography>
          <Typography variant="p" className="text-muted-foreground mt-1">
            Real-time overview of your team's availability and performance.
          </Typography>
        </div>
        <div className="flex gap-2">
           <Button variant="secondary" size="sm" className="gap-2">
            <Mail size={16} />
            Bulk Message
          </Button>
          <Button variant="primary" size="sm" className="gap-2">
            <Users size={16} />
            Add Member
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Members', value: '12', icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Online Now', value: '8', icon: Activity, color: 'text-green-600', bg: 'bg-green-100/50' },
          { label: 'Active Tasks', value: '45', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100/50' },
          { label: 'Avg Efficiency', value: '91%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100/50' },
        ].map((stat, i) => (
          <Card key={i} className="flex items-center gap-4 p-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={22} />
            </div>
            <div>
              <Typography variant="small" className="text-muted-foreground font-semibold uppercase text-[10px] tracking-wider">{stat.label}</Typography>
              <Typography variant="h3" className="mt-0">{stat.value}</Typography>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[600px]">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap justify-between items-center gap-4 saas-card p-4">
            <div className="relative flex-1 min-w-[280px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search team members..." className="pl-10 h-10" />
            </div>
            <div className="flex gap-3 items-center">
              <Button variant="secondary" size="sm" className="gap-2">
                <Filter size={16} />
                Filters
              </Button>
              <div className="flex bg-muted/30 p-1 rounded-lg border border-border">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`w-8 h-8 ${viewMode === 'grid' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`w-8 h-8 ${viewMode === 'list' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockTeam.map(member => (
              <Card 
                key={member.id} 
                className="group relative cursor-pointer hover:border-primary/30 hover:shadow-md transition-all duration-200"
                onClick={() => setSelectedUser(member)}
              >
                <CardContent className="p-6">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical size={16} />
                  </Button>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary border-4 border-background shadow-sm ring-1 ring-border">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${member.status === 'Online' ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                    </div>

                    <Typography variant="h4" className="mb-0.5">{member.name}</Typography>
                    <Typography variant="small" className="text-muted-foreground font-medium mb-4">{member.role}</Typography>

                    <div className="grid grid-cols-2 w-full p-3 bg-muted/20 rounded-xl mb-4 border border-border/50">
                      <div className="text-center border-r border-border/50">
                        <Typography variant="small" className="font-bold text-foreground block">{member.activeTasks}</Typography>
                        <Typography variant="small" className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Tasks</Typography>
                      </div>
                      <div className="text-center">
                        <Typography variant="small" className="font-bold text-foreground block">{member.performance}%</Typography>
                        <Typography variant="small" className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Efficiency</Typography>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full h-9 text-xs font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Activity Feed */}
        <div className="w-full lg:w-80 bg-background saas-card p-0 flex flex-col h-fit sticky top-0 border border-border">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <Typography variant="h4" className="text-sm flex items-center gap-2 mb-0">
              <Activity size={18} className="text-primary" />
              Live Activity
            </Typography>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <div className="p-6 flex-1 overflow-y-auto max-h-[500px]">
            <div className="flex flex-col gap-6 relative">
               {/* Timeline line */}
               <div className="absolute left-[15px] top-4 bottom-4 w-px bg-border" />
               
              {mockActivities.map((activity, i) => (
                <div key={activity.id} className="flex gap-3 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-[10px] font-bold text-primary shadow-sm">
                    {activity.user[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-bold text-xs">{activity.user}</span>
                      <span className="text-[10px] text-muted-foreground">{activity.time}</span>
                    </div>
                    <Typography variant="small" className="text-muted-foreground text-xs leading-snug">{activity.action}</Typography>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="ghost" size="sm" className="w-full mt-6 text-xs text-muted-foreground border border-dashed border-border py-6 hover:bg-muted/30">
              View Feed History
            </Button>
          </div>
        </div>
      </div>

      {/* User Details Slidepanel (Drawer) */}
      {selectedUser && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] transition-opacity"
            onClick={() => setSelectedUser(null)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-[420px] bg-background shadow-2xl z-[101] flex flex-col animate-in slide-in-from-right duration-300 ring-1 ring-border">
            <div className="p-6 flex items-center justify-between border-b border-border bg-muted/10">
              <Typography variant="h3" className="mb-0">Member Profile</Typography>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSelectedUser(null)}
                className="rounded-full h-8 w-8 text-muted-foreground"
              >
                <X size={20} />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8">
              <div className="text-center mb-8">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary border-4 border-background ring-1 ring-border shadow-md">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-background ${selectedUser.status === 'Online' ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                </div>
                <Typography variant="h2" className="mb-1">{selectedUser.name}</Typography>
                <Typography variant="p" className="text-muted-foreground font-medium mb-4">{selectedUser.role}</Typography>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full border border-border">
                  <ShieldCheck size={14} className="text-primary" />
                  <Typography variant="small" className="font-bold text-[10px] uppercase tracking-wider">{selectedUser.department} Team</Typography>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="p-4 bg-muted/10 text-center border-border shadow-sm">
                  <Typography variant="h3" className="mb-0 text-primary">{selectedUser.activeTasks}</Typography>
                  <Typography variant="small" className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Active Tasks</Typography>
                </Card>
                <Card className="p-4 bg-muted/10 text-center border-border shadow-sm">
                  <Typography variant="h3" className="mb-0 text-green-600">{selectedUser.performance}%</Typography>
                  <Typography variant="small" className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Productivity</Typography>
                </Card>
              </div>

              <div className="space-y-6">
                <div>
                  <Typography variant="small" className="font-bold text-muted-foreground tracking-widest uppercase mb-4 block underline decoration-primary/30 underline-offset-4">Contact Info</Typography>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-semibold text-foreground flex items-center gap-2">
                        <Mail size={14} className="text-muted-foreground" />
                        {selectedUser.email}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <span className={`font-bold flex items-center gap-2 ${selectedUser.status === 'Online' ? 'text-green-600' : 'text-muted-foreground'}`}>
                        <div className={`w-2 h-2 rounded-full ${selectedUser.status === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'}`} />
                        {selectedUser.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Last Active</span>
                      <span className="font-semibold text-foreground">{selectedUser.lastActive}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <Typography variant="small" className="font-bold text-muted-foreground tracking-widest uppercase mb-4 block underline decoration-primary/30 underline-offset-4">Performance Score</Typography>
                  <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden mb-3 border border-border/50">
                    <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${selectedUser.performance}%` }} />
                  </div>
                  <Typography variant="small" className="text-muted-foreground block leading-relaxed">
                    Consistent high performer. <strong>Top 10%</strong> of the engineering department in Q3.
                  </Typography>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-border bg-muted/10 grid grid-cols-2 gap-3 mt-auto">
              <Button className="w-full font-bold">Message</Button>
              <Button variant="outline" className="w-full font-bold bg-background">Assign Task</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
