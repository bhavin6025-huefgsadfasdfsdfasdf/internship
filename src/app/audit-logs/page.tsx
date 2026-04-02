'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Settings, 
  Download, 
  Table as TableIcon, 
  List, 
  ChevronDown,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  User,
  Activity
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const users = ['All Users', 'Admin John', 'Admin Sarah', 'System', 'Security', 'User Mike'];
const actionTypes = ['All Actions', 'Login', 'Logout', 'Create Company', 'Update Settings', 'Delete User', 'Backup'];

const mockLogs = [
  { id: 1, timestamp: '2026-03-20 14:30:22', user: 'Admin John', action: 'Created new company: TechFlow Inc.', result: 'Success' },
  { id: 2, timestamp: '2026-03-20 13:15:10', user: 'System', action: 'Daily backup complete', result: 'Success' },
  { id: 3, timestamp: '2026-03-20 12:45:05', user: 'Admin Sarah', action: 'Modified system settings', result: 'Success' },
  { id: 4, timestamp: '2026-03-20 11:20:44', user: 'Security', action: 'Failed login attempt from IP 192.168.1.1', result: 'Failed' },
  { id: 5, timestamp: '2026-03-20 10:05:33', user: 'Admin John', action: 'Deleted inactive user: TestUser', result: 'Success' },
  { id: 6, timestamp: '2026-03-20 09:30:12', user: 'User Mike', action: 'Updated profile information', result: 'Success' },
  { id: 7, timestamp: '2026-03-20 08:15:00', user: 'Security', action: 'Multiple failed login attempts', result: 'Failed' },
  { id: 8, timestamp: '2026-03-20 07:45:22', user: 'System', action: 'Automatic update check', result: 'Success' },
  { id: 9, timestamp: '2026-03-19 23:30:11', user: 'Admin Sarah', action: 'Exported audit logs', result: 'Success' },
  { id: 10, timestamp: '2026-03-19 22:15:05', user: 'Admin John', action: 'Changed password for Admin John', result: 'Success' },
  { id: 11, timestamp: '2026-03-19 21:00:00', user: 'System', action: 'Scheduled task: cleanup', result: 'Success' },
  { id: 12, timestamp: '2026-03-19 20:45:44', user: 'Security', action: 'Blocked suspicious IP', result: 'Success' },
];

export default function AuditLogsPage() {
  const [viewMode, setViewMode] = useState<'table' | 'timeline'>('table');
  const [selectedUser, setSelectedUser] = useState('All Users');
  const [selectedAction, setSelectedAction] = useState('All Actions');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-end">
        <div>
          <Typography variant="h2" display>Audit Logs</Typography>
          <Typography variant="p" className="text-muted-foreground mt-1">
            Track all administrative actions and security events across the platform.
          </Typography>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-muted/30 p-1 rounded-xl border border-border">
             <Button 
                variant="ghost" 
                size="sm" 
                className={`gap-2 h-9 px-4 ${viewMode === 'table' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                onClick={() => setViewMode('table')}
              >
                <TableIcon size={16} />
                Table View
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`gap-2 h-9 px-4 ${viewMode === 'timeline' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                onClick={() => setViewMode('timeline')}
              >
                <List size={16} />
                Timeline View
              </Button>
          </div>
          <Button variant="outline" className="gap-2 font-bold px-6 shadow-sm">
            <Download size={18} />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
        {/* Left Panel - Filters */}
        <Card className="w-full lg:w-72 shrink-0 p-6 flex flex-col gap-8 border border-border bg-muted/5">
          <div className="space-y-4">
             <div className="flex items-center gap-2 mb-2">
                <Filter size={14} className="text-primary" />
                <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Navigation Filters</Typography>
             </div>
             
             <div className="space-y-4">
                <div className="space-y-2">
                  <Typography variant="small" className="font-bold text-[11px] px-1">Search Action</Typography>
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                        placeholder="Search logs..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-10 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Typography variant="small" className="font-bold text-[11px] px-1">Filter by User</Typography>
                  <div className="relative">
                    <select 
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      className="w-full h-10 px-3 pr-10 rounded-xl border border-border bg-background text-xs font-semibold appearance-none outline-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
                    >
                      {users.map(user => <option key={user} value={user}>{user}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Typography variant="small" className="font-bold text-[11px] px-1">Action Type</Typography>
                  <div className="relative">
                    <select 
                      value={selectedAction}
                      onChange={(e) => setSelectedAction(e.target.value)}
                      className="w-full h-10 px-3 pr-10 rounded-xl border border-border bg-background text-xs font-semibold appearance-none outline-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
                    >
                      {actionTypes.map(action => <option key={action} value={action}>{action}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Typography variant="small" className="font-bold text-[11px] px-1">Date Period</Typography>
                  <div className="grid grid-cols-1 gap-2">
                    <Input type="date" className="h-10 text-xs" />
                    <Input type="date" className="h-10 text-xs" />
                  </div>
                </div>
             </div>
          </div>

          <Button className="w-full font-bold shadow-md h-11 mt-auto">Apply Filter Set</Button>
        </Card>

        {/* Right Panel - Content */}
        <Card className="flex-1 border border-border flex flex-col p-0 overflow-hidden shadow-sm">
          {viewMode === 'table' ? (
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-muted/30 border-b border-border sticky top-0 z-10">
                    <th className="px-6 py-4">
                      <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Event Timestamp</Typography>
                    </th>
                    <th className="px-6 py-4">
                      <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Initiator</Typography>
                    </th>
                    <th className="px-6 py-4">
                      <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Description</Typography>
                    </th>
                    <th className="px-6 py-4">
                      <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Status / Result</Typography>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-muted/5 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-muted-foreground" />
                          <Typography variant="small" className="text-muted-foreground font-medium">{log.timestamp}</Typography>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/10">
                             {log.user[0]}
                           </div>
                           <Typography variant="small" className="font-bold">{log.user}</Typography>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Typography variant="small" className="font-medium text-foreground/80 line-clamp-1">{log.action}</Typography>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          log.result === 'Success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                        }`}>
                          {log.result === 'Success' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                          {log.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-10 bg-muted/5">
              <div className="max-w-3xl mx-auto relative pl-10 space-y-12">
                {/* Timeline vertical line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-px bg-border group" />
                
                {mockLogs.map((log, i) => (
                  <div key={log.id} className="relative group">
                    {/* Timeline circle indicator */}
                    <div className={`absolute -left-[10px] top-1.5 w-5 h-5 rounded-full z-10 border-4 border-background shadow-md transition-transform group-hover:scale-125 ${
                      log.result === 'Success' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    
                    <div className="space-y-2">
                       <div className="flex items-center justify-between">
                         <Typography variant="h4" className="mb-0 text-base flex items-center gap-3">
                           {log.action}
                           <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase border ${log.result === 'Success' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                             {log.result}
                           </span>
                         </Typography>
                         <Typography variant="small" className="text-muted-foreground font-medium text-[11px] bg-muted/50 px-2 py-1 rounded-lg">
                           {log.timestamp}
                         </Typography>
                       </div>
                       <div className="flex items-center gap-4 text-muted-foreground">
                          <div className="flex items-center gap-1.5 font-bold text-xs">
                             <User size={14} className="text-primary/70" />
                             Initiated by {log.user}
                          </div>
                          <div className="text-xs opacity-40">/</div>
                          <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-tighter">
                             <Activity size={14} className="text-primary/70" />
                             System Event
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
