'use client';

import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock,
  User,
  Calendar,
  MoreHorizontal,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// --- Mock Data Types ---

type TimesheetEntry = {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string; // YYYY-MM-DD
  hours: number;
  status: 'pending' | 'approved' | 'rejected';
  taskDescription?: string;
};

type Employee = {
  id: string;
  name: string;
  role: string;
  avatar?: string;
};

// --- Helper Functions ---

const getDaysInWeek = (startDate: Date) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }
  return days;
};

const formatDate = (date: Date) => date.toISOString().split('T')[0];

const getIntensityStyles = (hours: number) => {
  if (hours === 0) return 'bg-muted/30 text-muted-foreground/30 border-transparent';
  if (hours <= 2) return 'bg-primary/5 text-primary border-primary/10';
  if (hours <= 4) return 'bg-primary/10 text-primary border-primary/20';
  if (hours <= 6) return 'bg-primary/20 text-primary border-primary/30';
  if (hours <= 8) return 'bg-primary/40 text-primary-foreground border-primary/40';
  return 'bg-primary text-primary-foreground border-primary shadow-sm';
};

// --- Mock Data ---

const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'John Doe', role: 'Software Engineer' },
  { id: '2', name: 'Jane Smith', role: 'UI/UX Designer' },
  { id: '3', name: 'Robert Brown', role: 'Project Manager' },
  { id: '4', name: 'Emily Davis', role: 'Backend Developer' },
  { id: '5', name: 'Michael Wilson', role: 'QA Engineer' },
  { id: '6', name: 'Sarah Miller', role: 'Frontend Developer' },
  { id: '7', name: 'David Taylor', role: 'DevOps Engineer' },
];

const generateMockEntries = (employees: Employee[], startDate: Date): TimesheetEntry[] => {
  const entries: TimesheetEntry[] = [];
  const days = getDaysInWeek(startDate);

  employees.forEach(emp => {
    days.forEach(day => {
      const dateStr = formatDate(day);
      const rand = Math.random();
      const hours = rand > 0.8 ? 0 : rand > 0.2 ? 8 : Math.floor(Math.random() * 10);
      
      entries.push({
        id: `${emp.id}-${dateStr}`,
        employeeId: emp.id,
        employeeName: emp.name,
        date: dateStr,
        hours: hours,
        status: 'pending',
        taskDescription: hours > 0 ? `Working on feature ${Math.floor(Math.random() * 100)}` : undefined
      });
    });
  });
  return entries;
};

export default function TimesheetOversight() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [entries, setEntries] = useState(() => generateMockEntries(MOCK_EMPLOYEES, currentWeekStart));

  const weekDays = useMemo(() => getDaysInWeek(currentWeekStart), [currentWeekStart]);

  const filteredEmployees = MOCK_EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedEntry = useMemo(() => 
    entries.find(e => e.id === selectedEntryId), 
    [entries, selectedEntryId]
  );

  const handleWeekChange = (direction: 'prev' | 'next') => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeekStart(newStart);
    setEntries(generateMockEntries(MOCK_EMPLOYEES, newStart));
    setSelectedEntryId(null);
  };

  const updateEntryStatus = (id: string, status: 'approved' | 'rejected') => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
           <div className="flex items-center gap-3 mb-1">
             <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
               <Clock size={20} />
             </div>
             <Typography variant="h2" display>Timesheet Oversight</Typography>
          </div>
          <Typography variant="p" className="text-muted-foreground mt-1 px-1">
            Monitor organizational productivity and approve billable hours across all teams.
          </Typography>
        </div>

        <div className="flex items-center gap-3">
           <Card className="flex items-center gap-4 p-1.5 border-border bg-muted/30">
              <Button 
                 variant="ghost" 
                 size="icon" 
                 className="h-8 w-8 rounded-lg hover:bg-background shadow-none"
                 onClick={() => handleWeekChange('prev')}
              >
                <ChevronLeft size={18} />
              </Button>
              <Typography variant="small" className="font-bold text-[11px] uppercase tracking-widest min-w-[160px] text-center">
                 {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </Typography>
              <Button 
                 variant="ghost" 
                 size="icon" 
                 className="h-8 w-8 rounded-lg hover:bg-background shadow-none"
                 onClick={() => handleWeekChange('next')}
              >
                <ChevronRight size={18} />
              </Button>
           </Card>
           <Button className="gap-2 px-6 shadow-md h-11">
             <ShieldCheck size={18} />
             Bulk Approval
           </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 saas-card p-4 border border-border/40 bg-muted/5">
        <div className="relative flex-1 min-w-[300px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search by employee name or team..." 
            className="pl-10 h-11 border-border/50 focus:bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 h-11 px-5 border-border/50 shadow-sm font-bold text-xs">
            <Filter size={16} />
            Period Filters
          </Button>
          <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl">
             <MoreHorizontal size={18} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
        {/* Main Grid: Heatmap */}
        <Card className="flex-1 p-0 overflow-hidden border border-border shadow-sm flex flex-col bg-background">
          <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="bg-muted/30 border-b border-border sticky top-0 z-20">
                <tr>
                  <th className="px-6 py-4 bg-muted/50 border-r border-border min-w-[240px] sticky left-0 z-30">
                    <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Collaborator</Typography>
                  </th>
                  {weekDays.map(day => (
                    <th key={day.toISOString()} className="px-2 py-4 text-center border-r border-border/30 last:border-r-0">
                      <div className="flex flex-col items-center">
                         <Typography variant="small" className="text-[10px] font-bold text-muted-foreground/60 uppercase">{day.toLocaleDateString('en-US', { weekday: 'short' })}</Typography>
                         <Typography variant="small" className="font-bold text-sm tracking-tight">{day.getDate()}</Typography>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredEmployees.map(emp => (
                  <tr key={emp.id} className="group hover:bg-muted/5 transition-colors">
                    <td className="px-6 py-4 border-r border-border sticky left-0 bg-background z-10 group-hover:bg-background transition-colors shadow-[4px_0_10px_-5px_rgba(0,0,0,0.05)]">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-bold shadow-inner">
                            {emp.name.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                             <Typography variant="small" className="font-bold text-foreground leading-none mb-1">{emp.name}</Typography>
                             <Typography variant="small" className="text-[10px] text-muted-foreground font-medium">{emp.role}</Typography>
                          </div>
                       </div>
                    </td>
                    {weekDays.map(day => {
                       const dateStr = formatDate(day);
                       const entry = entries.find(e => e.employeeId === emp.id && e.date === dateStr);
                       const isSelected = selectedEntryId === entry?.id;
                       
                       return (
                         <td 
                           key={dateStr} 
                           onClick={() => entry && setSelectedEntryId(entry.id)}
                           className="p-1.5 border-r border-border/30 last:border-r-0"
                         >
                           <div className={`h-12 w-full rounded-xl flex flex-col items-center justify-center border-2 transition-all cursor-pointer relative group/cell ${getIntensityStyles(entry?.hours || 0)} ${isSelected ? 'ring-2 ring-primary ring-offset-2 scale-95 shadow-lg border-primary' : 'hover:scale-105 hover:shadow-md'}`}>
                              <span className="text-xs font-bold">{entry?.hours || 0}h</span>
                              {entry?.status === 'approved' && <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500 ring-2 ring-background shadow-sm" />}
                              {entry?.status === 'rejected' && <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-background shadow-sm" />}
                           </div>
                         </td>
                       );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Right Panel: Entry Details */}
        <Card className="w-full lg:w-[360px] p-0 flex flex-col border border-border shadow-xl bg-background shrink-0 animate-in slide-in-from-right-4 duration-500">
           {selectedEntry ? (
             <>
               <div className="p-6 border-b border-border bg-muted/5 flex justify-between items-center">
                  <Typography variant="h4" className="mb-0 text-base tracking-tight">Entry Analytics</Typography>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setSelectedEntryId(null)}>
                    <ChevronRight size={20} />
                  </Button>
               </div>
               
               <CardContent className="p-8 space-y-8 flex-1 overflow-y-auto">
                  <div className="flex items-center gap-4 bg-muted/20 p-4 rounded-2xl border border-border/40">
                     <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20">
                        {selectedEntry.employeeName.charAt(0)}
                     </div>
                     <div>
                        <Typography variant="small" className="font-bold text-sm block tracking-tight">{selectedEntry.employeeName}</Typography>
                        <Typography variant="small" className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">Emp-ID: {selectedEntry.employeeId}</Typography>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1 p-3 rounded-xl bg-background border border-border shadow-sm">
                        <Typography variant="small" className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Log Date</Typography>
                        <Typography variant="small" className="font-bold text-xs block">{new Date(selectedEntry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Typography>
                     </div>
                     <div className="space-y-1 p-3 rounded-xl bg-background border border-border shadow-sm">
                        <Typography variant="small" className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Total Hours</Typography>
                        <div className="flex items-center gap-2">
                           <Clock size={12} className="text-primary" />
                           <Typography variant="small" className="font-bold text-xs block">{selectedEntry.hours} hrs</Typography>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <Typography variant="small" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Engagement Description</Typography>
                     <div className="bg-muted/10 p-4 rounded-xl border border-dashed border-border/80 text-xs font-medium leading-relaxed italic text-foreground/70 min-h-[100px]">
                        "{selectedEntry.taskDescription || 'No description provided for this work period.'}"
                     </div>
                  </div>

                  <div className="space-y-3">
                     <Typography variant="small" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Verification Status</Typography>
                     <div className="flex items-center gap-3">
                        {selectedEntry.status === 'pending' ? (
                          <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-[10px] font-bold border border-orange-200">
                             <Activity size={14} />
                             Awaiting Approval
                          </div>
                        ) : selectedEntry.status === 'approved' ? (
                          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-[10px] font-bold border border-green-200">
                             <CheckCircle2 size={14} />
                             System Approved
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-[10px] font-bold border border-red-200">
                             <XCircle size={14} />
                             Rejected Entry
                          </div>
                        )}
                     </div>
                  </div>

                  <div className="pt-6 mt-auto flex flex-col gap-3">
                     <Button 
                        className="w-full h-12 font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/10 gap-2"
                        onClick={() => updateEntryStatus(selectedEntry.id, 'approved')}
                        disabled={selectedEntry.status === 'approved'}
                     >
                        <CheckCircle2 size={18} />
                        Authorize Period
                     </Button>
                     <Button 
                        variant="outline"
                        className="w-full h-12 font-bold border-red-200 text-red-600 hover:bg-red-50 gap-2"
                        onClick={() => updateEntryStatus(selectedEntry.id, 'rejected')}
                        disabled={selectedEntry.status === 'rejected'}
                     >
                        <XCircle size={18} />
                        Dispute Log
                     </Button>
                  </div>
               </CardContent>
             </>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center p-10 text-center opacity-30">
                <Activity size={64} className="mb-6 stroke-[1px]" />
                <Typography variant="h4" className="tracking-tight">Global Insights</Typography>
                <Typography variant="small" className="mt-2 italic font-medium leading-relaxed">Select a heatmap cell to drill down into specific labor metrics and perform verification actions.</Typography>
             </div>
           )}
        </Card>
      </div>
    </div>
  );
}
