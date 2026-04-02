'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  Check,
  X,
  User,
  Calendar,
  MessageSquare,
  Clock,
  MoreVertical
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Comment {
  id: number;
  user: string;
  text: string;
  timestamp: string;
}

interface TaskSubmission {
  id: number;
  taskName: string;
  employee: string;
  employeeEmail: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedDate: string;
  description: string;
  comments: Comment[];
}

const mockSubmissions: TaskSubmission[] = [
  {
    id: 1,
    taskName: 'Homepage Redesign - Mobile Hero Section',
    employee: 'Sarah Miller',
    employeeEmail: 'sarah.m@company.com',
    status: 'Pending',
    submittedDate: 'Oct 24, 2025, 10:45 AM',
    description: 'Updated the hero section for mobile view to include the new CTA and adjusted the font sizes for better readability. The images have been optimized for faster loading.',
    comments: [
      { id: 1, user: 'Sarah Miller', text: 'Ready for review. Let me know if further adjustments are needed.', timestamp: '2 hours ago' }
    ]
  },
  {
    id: 2,
    taskName: 'API Integration - Payment Gateway',
    employee: 'Alex Johnson',
    employeeEmail: 'alex.j@company.com',
    status: 'Approved',
    submittedDate: 'Oct 23, 2025, 03:15 PM',
    description: 'Integrated the Stripe payment gateway. Handles basic transactions and webhooks. Unit tests are passing.',
    comments: [
      { id: 2, user: 'Admin', text: 'Great job on the error handling.', timestamp: 'Yesterday' }
    ]
  },
  {
    id: 3,
    taskName: 'Database Schema Update - User Profiles',
    employee: 'Michael Chen',
    employeeEmail: 'm.chen@company.com',
    status: 'Rejected',
    submittedDate: 'Oct 22, 2025, 09:30 AM',
    description: 'Added optional fields for social media links to the user profile schema. Migration script is included.',
    comments: [
      { id: 3, user: 'Admin', text: 'Schema needs adjustment. Please refer to the updated design docs.', timestamp: '1 day ago' }
    ]
  },
  {
    id: 4,
    taskName: 'Documentation - Onboarding Guide',
    employee: 'Emma Wilson',
    employeeEmail: 'emma.w@company.com',
    status: 'Pending',
    submittedDate: 'Oct 25, 2025, 11:20 AM',
    description: 'Completed the first draft of the intern onboarding guide. Covers setup, environment, and basic workflows.',
    comments: []
  }
];

export default function TaskReviewPage() {
  const [submissions, setSubmissions] = useState<TaskSubmission[]>(mockSubmissions);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleRow = (id: number) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (id: number, newStatus: 'Approved' | 'Rejected') => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status: newStatus } : sub
    ));
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Approved': return "bg-green-100 text-green-700 border-green-200";
      case 'Rejected': return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-orange-100 text-orange-700 border-orange-200";
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    const matchesStatus = statusFilter === 'All Status' || sub.status === statusFilter;
    const matchesSearch = sub.taskName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         sub.employee.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography variant="h2" display>Task Review & Approval</Typography>
        <Typography variant="p" className="text-muted-foreground mt-1">
          Review and manage task submissions from your team members.
        </Typography>
      </div>

      <div className="flex flex-wrap items-center gap-4 saas-card p-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search by task or employee..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative min-w-[160px]">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 pl-4 pr-10 rounded-lg border border-border bg-background text-sm appearance-none cursor-pointer w-full outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={14} />
        </div>

        <Input type="date" className="max-w-[180px]" />
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-muted/50">
              <tr className="border-b border-border">
                <th className="w-12 px-4 py-4"></th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider text-xs">Task Name</th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider text-xs">Employee</th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider text-xs">Status</th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider text-xs">Submitted Date</th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSubmissions.map((sub) => {
                const isExpanded = expandedRows.includes(sub.id);
                
                return (
                  <React.Fragment key={sub.id}>
                    <tr 
                      className={`cursor-pointer transition-colors hover:bg-muted/30 ${isExpanded ? 'bg-muted/20' : ''}`}
                      onClick={() => toggleRow(sub.id)}
                    >
                      <td className="px-4 py-4 text-center text-muted-foreground">
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-bold text-foreground">{sub.taskName}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                            {sub.employee.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-xs">{sub.employee}</span>
                            <span className="text-[10px] text-muted-foreground">{sub.employeeEmail}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyles(sub.status)}`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground text-xs">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {sub.submittedDate}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        {sub.status === 'Pending' ? (
                          <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                            <Button 
                              size="icon" 
                              className="w-8 h-8 bg-green-500 hover:bg-green-600 border-none"
                              onClick={() => handleStatusChange(sub.id, 'Approved')}
                            >
                              <Check size={18} />
                            </Button>
                            <Button 
                              size="icon" 
                              className="w-8 h-8 bg-red-500 hover:bg-red-600 border-none"
                              onClick={() => handleStatusChange(sub.id, 'Rejected')}
                            >
                              <X size={18} />
                            </Button>
                          </div>
                        ) : (
                          <Button variant="secondary" size="icon" className="w-8 h-8">
                            <MoreVertical size={18} />
                          </Button>
                        )}
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-muted/10">
                        <td colSpan={6} className="px-6 py-0 pb-6 border-none">
                          <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
                            <div className="mb-6">
                              <Typography variant="small" className="font-bold text-muted-foreground uppercase tracking-widest mb-3 block">Description</Typography>
                              <Typography variant="p" className="leading-relaxed">
                                {sub.description}
                              </Typography>
                            </div>

                            <div>
                              <div className="flex items-center gap-2 mb-4">
                                <MessageSquare size={16} className="text-primary" />
                                <Typography variant="small" className="font-bold text-muted-foreground uppercase tracking-widest">
                                  Comments ({sub.comments.length})
                                </Typography>
                              </div>
                              
                              <div className="space-y-4">
                                {sub.comments.map(comment => (
                                  <div key={comment.id} className="flex gap-3">
                                    <div className="w-7 h-7 rounded-full bg-primary/5 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">
                                      {comment.user[0]}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-xs">{comment.user}</span>
                                        <span className="text-[10px] text-muted-foreground">{comment.timestamp}</span>
                                      </div>
                                      <Typography variant="small" className="text-muted-foreground leading-snug">
                                        {comment.text}
                                      </Typography>
                                    </div>
                                  </div>
                                ))}
                                {sub.comments.length === 0 && (
                                  <Typography variant="small" className="text-muted-foreground italic pl-10">
                                    No comments recorded for this submission.
                                  </Typography>
                                )}
                                
                                <div className="flex gap-2 mt-4 pl-10">
                                  <Input placeholder="Add a review note..." className="flex-1 h-9 text-xs" />
                                  <Button size="sm" className="h-9 px-4">Post</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredSubmissions.length === 0 && (
          <div className="p-20 text-center text-muted-foreground">
            <Search size={48} className="mx-auto mb-4 opacity-10" />
            <Typography variant="p">No submissions found matching your search.</Typography>
          </div>
        )}
      </Card>
    </div>
  );
}
