'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  User, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  List, 
  GitCommit,
  ChevronDown,
  Terminal,
  Clock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const mockLogs = [
  { id: 1, timestamp: '2026-04-01 10:30:45', user: 'admin@system.com', action: 'Login Success', result: 'Success', details: 'User logged in from 192.168.1.1' },
  { id: 2, timestamp: '2026-04-01 10:35:12', user: 'manager_test@company.com', action: 'Update Company Profile', result: 'Success', details: 'Updated logo and contact info' },
  { id: 3, timestamp: '2026-04-01 10:40:05', user: 'admin@system.com', action: 'Create New Admin', result: 'Failed', details: 'Invalid email format' },
  { id: 4, timestamp: '2026-04-01 11:15:30', user: 'super_admin@master.com', action: 'Delete Backup', result: 'Success', details: 'Manual deletion of old backup' },
  { id: 5, timestamp: '2026-04-01 11:45:22', user: 'admin@system.com', action: 'System Update', result: 'Success', details: 'Applied security patch v2.4' },
  { id: 6, timestamp: '2026-04-01 12:05:10', user: 'john.doe@client.com', action: 'Password Change', result: 'Failed', details: 'Old password incorrect' },
];

export default function SystemLogsPage() {
  const [viewMode, setViewMode] = useState<'table' | 'timeline'>('table');
  const [selectedUser, setSelectedUser] = useState('All Users');
  const [selectedAction, setSelectedAction] = useState('All Actions');

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
               <Terminal size={20} />
             </div>
             <Typography variant="h2" display>System Activity Logs</Typography>
          </div>
          <Typography variant="p" className="text-muted-foreground mt-1 px-1">
            Real-time audit trail of all administrative and system-level events.
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
                <List size={16} />
                Table
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`gap-2 h-9 px-4 ${viewMode === 'timeline' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                onClick={() => setViewMode('timeline')}
              >
                <GitCommit size={16} />
                Timeline
              </Button>
          </div>
          <Button variant="outline" className="gap-2 font-bold px-6 shadow-sm">
            <Download size={18} />
            Export Data
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
        {/* Left Panel - Control Sidebar */}
        <Card className="w-full lg:w-72 shrink-0 p-6 flex flex-col gap-8 border border-border bg-muted/5">
           <div className="space-y-6">
             <div>
                <div className="flex items-center gap-2 mb-4">
                   <Filter size={14} className="text-primary" />
                   <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Query Parameters</Typography>
                </div>
                
                <div className="space-y-4">
                   <div className="space-y-2">
                      <Typography variant="small" className="font-bold text-[11px] px-1">Initiating User</Typography>
                      <div className="relative">
                        <select 
                          value={selectedUser}
                          onChange={(e) => setSelectedUser(e.target.value)}
                          className="w-full h-10 px-3 pr-10 rounded-xl border border-border bg-background text-xs font-semibold appearance-none outline-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
                        >
                          <option>All Users</option>
                          <option>admin@system.com</option>
                          <option>super_admin@master.com</option>
                          <option>john.doe@client.com</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <Typography variant="small" className="font-bold text-[11px] px-1">Action Category</Typography>
                      <div className="relative">
                        <select 
                          value={selectedAction}
                          onChange={(e) => setSelectedAction(e.target.value)}
                          className="w-full h-10 px-3 pr-10 rounded-xl border border-border bg-background text-xs font-semibold appearance-none outline-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
                        >
                          <option>All Actions</option>
                          <option>Login</option>
                          <option>Update Profile</option>
                          <option>Create Record</option>
                          <option>Delete Record</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <Typography variant="small" className="font-bold text-[11px] px-1">Time Range</Typography>
                      <div className="relative">
                         <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                         <Input placeholder="Select period..." className="pl-9 h-10 text-xs read-only:cursor-pointer" readOnly />
                      </div>
                   </div>
                </div>
             </div>

             <div className="pt-4 border-t border-border/50">
               <Typography variant="p" className="text-[11px] text-muted-foreground leading-relaxed italic">
                 Security logs are retained for 365 days. Contact system administrator for archival access.
               </Typography>
             </div>
           </div>

           <Button className="w-full font-bold shadow-md h-11 mt-auto" onClick={() => { setSelectedUser('All Users'); setSelectedAction('All Actions'); }}>
             Reset All Filters
           </Button>
        </Card>

        {/* Right Panel - Log Viewer */}
        <Card className="flex-1 border border-border flex flex-col p-0 overflow-hidden shadow-sm">
           {viewMode === 'table' ? (
             <div className="flex-1 overflow-auto">
               <table className="w-full text-left border-collapse min-w-[800px]">
                 <thead>
                   <tr className="bg-muted/30 border-b border-border sticky top-0 z-10">
                     <th className="px-6 py-4">
                       <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Snapshot Time</Typography>
                     </th>
                     <th className="px-6 py-4">
                       <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Active User</Typography>
                     </th>
                     <th className="px-6 py-4">
                       <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">System Event</Typography>
                     </th>
                     <th className="px-6 py-4">
                       <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Execution Result</Typography>
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
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-xs font-bold text-primary shadow-sm uppercase">
                                {log.user.split('@')[0].slice(0, 2)}
                              </div>
                              <Typography variant="small" className="font-bold text-foreground/80">{log.user}</Typography>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="space-y-0.5">
                             <Typography variant="small" className="font-bold text-foreground block tracking-tight">{log.action}</Typography>
                             <Typography variant="small" className="text-[10px] text-muted-foreground font-medium italic opacity-70">{log.details}</Typography>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border shadow-sm ${
                            log.result === 'Success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                          }`}>
                            {log.result === 'Success' ? <ShieldCheck size={12} /> : <AlertCircle size={12} />}
                            {log.result}
                          </span>
                        </td>
                      </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           ) : (
             <div className="flex-1 overflow-y-auto p-12 bg-muted/5">
                <div className="max-w-4xl mx-auto relative pl-12 space-y-12">
                   {/* Timeline vertical path */}
                   <div className="absolute left-[20px] top-4 bottom-4 w-1 bg-gradient-to-b from-primary/30 via-border to-transparent rounded-full" />
                   
                   {mockLogs.map((log) => (
                      <div key={log.id} className="relative group animate-in slide-in-from-left-4 duration-500">
                         {/* Status node */}
                         <div className={`absolute -left-[14px] top-0 w-7 h-7 rounded-full z-10 border-4 border-background shadow-xl flex items-center justify-center ${
                           log.result === 'Success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                         }`}>
                            {log.result === 'Success' ? <CheckCircle2 size={12} strokeWidth={3} /> : <XCircle size={12} strokeWidth={3} />}
                         </div>

                         <div className="bg-background rounded-2xl border border-border/60 p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 ml-4">
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                               <div className="space-y-1">
                                  <Typography variant="h4" className="mb-0 text-base leading-none tracking-tight">{log.action}</Typography>
                                  <div className="flex items-center gap-2 group-hover:text-primary transition-colors">
                                     <User size={13} className="text-muted-foreground" />
                                     <Typography variant="small" className="text-muted-foreground font-bold text-xs">{log.user}</Typography>
                                  </div>
                               </div>
                               <div className="flex items-center gap-2 bg-muted/30 px-3 py-1.5 rounded-xl border border-border/50 shadow-inner">
                                  <Clock size={13} className="text-muted-foreground" />
                                  <Typography variant="small" className="text-[11px] font-bold text-muted-foreground uppercase">{log.timestamp}</Typography>
                               </div>
                            </div>
                            <div className="bg-muted/10 p-4 rounded-xl border border-dashed border-border/60">
                               <Typography variant="small" className="text-muted-foreground italic font-medium leading-relaxed">
                                  "{log.details}"
                               </Typography>
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
