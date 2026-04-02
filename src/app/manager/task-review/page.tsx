'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Check, 
  X, 
  User, 
  Calendar, 
  MessageSquare, 
  Clock, 
  MoreVertical,
  Edit2,
  Send,
  AlertCircle,
  CheckSquare,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Comment {
  id: number;
  user: string;
  text: string;
  timestamp: string;
}

interface Task {
  id: number;
  title: string;
  employee: string;
  employeeRole: string;
  status: 'Pending' | 'Approved' | 'Changes Requested' | 'Overdue';
  priority: 'High' | 'Medium' | 'Low';
  submittedDate: string;
  description: string;
  comments: Comment[];
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Homepage Redesign - Mobile Hero Section',
    employee: 'Sarah Miller',
    employeeRole: 'UI/UX Designer',
    status: 'Pending',
    priority: 'High',
    submittedDate: 'Oct 24, 2025, 10:45 AM',
    description: 'Updated the hero section for mobile view to include the new CTA and adjusted the font sizes for better readability. The images have been optimized for faster loading.',
    comments: [
      { id: 1, user: 'Sarah Miller', text: 'Ready for review. Let me know if further adjustments are needed.', timestamp: '2 hours ago' }
    ]
  },
  {
    id: 2,
    title: 'API Integration - Payment Gateway',
    employee: 'Alex Johnson',
    employeeRole: 'Backend Developer',
    status: 'Approved',
    priority: 'High',
    submittedDate: 'Oct 23, 2025, 03:15 PM',
    description: 'Integrated the Stripe payment gateway. Handles basic transactions and webhooks. Unit tests are passing.',
    comments: [
      { id: 2, user: 'Manager', text: 'Great job on the error handling.', timestamp: 'Yesterday' }
    ]
  },
  {
    id: 3,
    title: 'Database Schema Update - User Profiles',
    employee: 'Michael Chen',
    employeeRole: 'Fullstack Dev',
    status: 'Changes Requested',
    priority: 'Medium',
    submittedDate: 'Oct 22, 2025, 09:30 AM',
    description: 'Added optional fields for social media links to the user profile schema. Migration script is included.',
    comments: [
      { id: 3, user: 'Manager', text: 'Schema needs adjustment. Please refer to the updated design docs.', timestamp: '1 day ago' }
    ]
  },
  {
    id: 4,
    title: 'Documentation - Onboarding Guide',
    employee: 'Emma Wilson',
    employeeRole: 'Technical Writer',
    status: 'Pending',
    priority: 'Low',
    submittedDate: 'Oct 25, 2025, 11:20 AM',
    description: 'Completed the first draft of the intern onboarding guide. Covers setup, environment, and basic workflows.',
    comments: []
  },
  {
    id: 5,
    title: 'Security Audit - Auth Module',
    employee: 'David Park',
    employeeRole: 'Security Analyst',
    status: 'Overdue',
    priority: 'High',
    submittedDate: 'Oct 20, 2025, 02:00 PM',
    description: 'Initial scan of the authentication module found 3 potential vulnerabilities in the password reset flow.',
    comments: []
  }
];

export default function ManagerTaskReview() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTaskId, setSelectedTaskId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [newComment, setNewComment] = useState('');

  const selectedTask = tasks.find(t => t.id === selectedTaskId) || tasks[0];

  useEffect(() => {
    if (selectedTask) {
      setEditedTitle(selectedTask.title);
    }
  }, [selectedTaskId]);

  const handleTitleSave = () => {
    setTasks(prev => prev.map(t => t.id === selectedTaskId ? { ...t, title: editedTitle } : t));
    setIsEditingTitle(false);
  };

  const handleStatusChange = (status: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === selectedTaskId ? { ...t, status } : t));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now(),
      user: 'Manager',
      text: newComment,
      timestamp: 'Just now'
    };
    setTasks(prev => prev.map(t => t.id === selectedTaskId ? { ...t, comments: [...t.comments, comment] } : t));
    setNewComment('');
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Approved': return "bg-green-100 text-green-700 border-green-200";
      case 'Changes Requested': return "bg-orange-100 text-orange-700 border-orange-200";
      case 'Overdue': return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.employee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-140px)]">
      <div className="flex justify-between items-end">
        <div>
          <Typography variant="h2" display>Task Submissions</Typography>
          <Typography variant="p" className="text-muted-foreground mt-1">
            Review and approve work submitted by your team.
          </Typography>
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Left Panel - Task List */}
        <Card className="w-[380px] flex flex-col p-0 overflow-hidden shrink-0 border border-border">
          <div className="p-4 border-b border-border bg-muted/10">
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search submissions..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
                All Submissions ({filteredTasks.length})
              </Typography>
               <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                <Filter size={14} />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {filteredTasks.map(task => {
              const isActive = task.id === selectedTaskId;
              return (
                <div 
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`p-4 cursor-pointer transition-all border-l-4 hover:bg-muted/30 ${isActive ? 'bg-primary/5 border-primary shadow-sm' : 'border-transparent'}`}
                >
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <Typography variant="small" className={`font-bold text-xs leading-snug flex-1 ${isActive ? 'text-primary' : 'text-foreground'}`}>
                      {task.title}
                    </Typography>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shrink-0 border ${getStatusStyles(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[8px] font-bold text-muted-foreground">
                      {task.employee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-[11px] font-medium text-muted-foreground">{task.employee}</span>
                    <span className="text-muted-foreground/30">•</span>
                    <span className="text-[11px] font-medium text-muted-foreground capitalize">{task.priority}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right Panel - Task Details */}
        <Card className="flex-1 flex flex-col p-0 overflow-hidden border border-border">
          {selectedTask ? (
            <>
              {/* Detail Header */}
              <div className="p-6 border-b border-border bg-background flex justify-between items-start shrink-0">
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-3 mb-3">
                    {isEditingTitle ? (
                      <Input 
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onBlur={handleTitleSave}
                        onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
                        autoFocus
                        className="h-10 text-xl font-bold ring-2 ring-primary/20"
                      />
                    ) : (
                      <>
                        <Typography variant="h3" className="mb-0 leading-tight">{selectedTask.title}</Typography>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setIsEditingTitle(true)}
                          className="h-8 w-8 text-muted-foreground rounded-full"
                        >
                          <Edit2 size={16} />
                        </Button>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <User size={14} className="text-primary" />
                      {selectedTask.employee} <span className="font-medium text-[10px] bg-muted px-2 py-0.5 rounded-full">{selectedTask.employeeRole}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <Calendar size={14} className="text-primary" />
                      Submitted {selectedTask.submittedDate}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="relative min-w-[170px]">
                    <select 
                      value={selectedTask.status}
                      onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
                      className="h-10 w-full pl-3 pr-10 rounded-lg border border-border bg-muted/10 text-xs font-bold appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="Pending">Pending Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Changes Requested">Changes Requested</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <MoreVertical size={18} />
                  </Button>
                </div>
              </div>

              {/* Detail Content */}
              <div className="flex-1 overflow-y-auto p-10 bg-muted/5">
                <div className="max-w-4xl mx-auto space-y-8">
                  <section>
                    <Typography variant="small" className="font-bold text-muted-foreground tracking-widest uppercase mb-4 block underline decoration-primary/30 underline-offset-4">Submission Details</Typography>
                    <div className="bg-background rounded-2xl border border-border p-8 shadow-sm">
                      <Typography variant="p" className="leading-relaxed text-foreground/90 whitespace-pre-wrap">
                        {selectedTask.description}
                      </Typography>
                    </div>
                  </section>

                  <section className="pb-32">
                    <div className="flex items-center gap-2 mb-6">
                      <MessageSquare size={18} className="text-primary" />
                      <Typography variant="h4" className="mb-0">Comments ({selectedTask.comments.length})</Typography>
                    </div>

                    <div className="space-y-6 mb-8">
                      {selectedTask.comments.map(comment => (
                        <div key={comment.id} className="flex gap-4">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 border-background shadow-sm ${comment.user === 'Manager' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                            {comment.user[0]}
                          </div>
                          <div className="flex-1 bg-background p-4 rounded-2xl border border-border/60 shadow-sm relative group hover:border-primary/20 transition-colors">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-xs">{comment.user}</span>
                              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{comment.timestamp}</span>
                            </div>
                            <Typography variant="small" className="text-muted-foreground/90 leading-snug">{comment.text}</Typography>
                          </div>
                        </div>
                      ))}
                      {selectedTask.comments.length === 0 && (
                        <div className="py-12 text-center rounded-2xl border-2 border-dashed border-border/50 bg-muted/10 opacity-60">
                          <Typography variant="small" className="text-muted-foreground italic">No feedback entries yet.</Typography>
                        </div>
                      )}
                    </div>

                    {/* New Comment Input */}
                    <div className="flex gap-4 mt-8 sticky bottom-0 bg-background/80 backdrop-blur-md py-4 ring-[20px] ring-background">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0 shadow-lg ring-4 ring-primary/10">
                        M
                      </div>
                      <div className="flex-1 relative group">
                        <textarea 
                          placeholder="Write your feedback..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="w-full min-h-[44px] h-[44px] max-h-32 px-5 py-3 rounded-full bg-muted/20 border border-border focus:border-primary focus:bg-background outline-none text-sm transition-all pr-12 resize-none overflow-hidden"
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                        />
                        <Button 
                          size="icon" 
                          onClick={handleAddComment}
                          disabled={!newComment.trim()}
                          className="absolute right-1 top-1 h-9 w-9 rounded-full bg-primary hover:bg-primary-hover shadow-md transition-all active:scale-95"
                        >
                          <Send size={16} />
                        </Button>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="p-4 px-10 border-t border-border bg-background/95 backdrop-blur-md flex justify-end gap-3 shrink-0 shadow-[0_-4px_24px_-4px_rgba(0,0,0,0.05)] relative z-20">
                <Button 
                  variant="outline" 
                  className="gap-2 border-orange-200 text-orange-700 bg-orange-50 hover:bg-orange-100 font-bold px-6"
                  onClick={() => handleStatusChange('Changes Requested')}
                >
                  <AlertCircle size={18} />
                  Request Changes
                </Button>
                <Button 
                  className="gap-2 bg-green-600 hover:bg-green-700 font-bold px-8 shadow-md"
                  onClick={() => handleStatusChange('Approved')}
                >
                  <Check size={18} />
                  Approve Submission
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground/40 bg-muted/5">
              <CheckSquare size={80} className="mb-6 opacity-10" />
              <Typography variant="p" className="font-bold text-lg tracking-tight">Select a submission to review</Typography>
              <Typography variant="small" className="mt-1 font-medium italic">Select from the pending tasks on the left panel</Typography>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
