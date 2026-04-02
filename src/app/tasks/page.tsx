'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Pencil, 
  Trash2, 
  X,
  MoreVertical,
  ChevronDown,
  Calendar,
  User,
  CheckCircle,
  MessageSquare,
  Send,
  Flag,
  CheckCircle2,
  Clock,
  LayoutGrid
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import TaskModal from '@/components/tasks/TaskModal';
import UpdateTaskStatusDrawer from '@/components/tasks/UpdateTaskStatusDrawer';

interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
}

interface Task {
  id: number;
  title: string;
  status: 'In Progress' | 'Completed' | 'To Do' | 'Review';
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  assignedUser: string;
  deadline: string;
  comments: Comment[];
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Finalize Project Documentation',
    status: 'In Progress',
    priority: 'High',
    description: 'Complete the technical documentation for the new API endpoints and ensure all edge cases are covered.',
    assignedUser: 'John Doe',
    deadline: '2025-10-15',
    comments: [
      { id: 1, user: 'Alice Smith', avatar: 'AS', text: 'I updated the authentication section yesterday.', timestamp: '2 hours ago' },
      { id: 2, user: 'Bob Johnson', avatar: 'BJ', text: 'Great, I will review it by EOD.', timestamp: '1 hour ago' }
    ]
  },
  {
    id: 2,
    title: 'UI/UX Design Review',
    status: 'Review',
    priority: 'Medium',
    description: 'Review the latest designs for the dashboard and provide feedback on the color palette and typography.',
    assignedUser: 'Sarah Wilson',
    deadline: '2025-10-18',
    comments: [
      { id: 3, user: 'Michael Brown', avatar: 'MB', text: 'Consider using a more vibrant primary color.', timestamp: '3 hours ago' }
    ]
  },
  {
    id: 3,
    title: 'Optimize Database Queries',
    status: 'To Do',
    priority: 'Low',
    description: 'The response time for report generation is slow. Need to optimize the SQL queries and add necessary indexes.',
    assignedUser: 'David Chen',
    deadline: '2025-10-22',
    comments: []
  },
  {
    id: 4,
    title: 'Implement Authentication Flow',
    status: 'Completed',
    priority: 'High',
    description: 'Set up JWT authentication and protected routes for the super admin dashboard.',
    assignedUser: 'John Doe',
    deadline: '2025-10-10',
    comments: [
      { id: 4, user: 'System', avatar: 'SY', text: 'Task marked as completed.', timestamp: 'Yesterday' }
    ]
  },
  {
    id: 5,
    title: 'Customer Feedback Analysis',
    status: 'To Do',
    priority: 'Medium',
    description: 'Analyze the recent customer feedback survey results and identify key pain points.',
    assignedUser: 'Emma Davis',
    deadline: '2025-10-25',
    comments: []
  }
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(tasks[0].id);
  const [newComment, setNewComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'High': return "text-red-600 bg-red-100 border-red-200";
      case 'Medium': return "text-orange-600 bg-orange-100 border-orange-200";
      case 'Low': return "text-green-600 bg-green-100 border-green-200";
      default: return "text-muted-foreground bg-muted border-border";
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'In Progress': return "bg-blue-100 text-blue-700 border-blue-200";
      case 'Completed': return "bg-green-100 text-green-700 border-green-200";
      case 'Review': return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const handleUpdateTask = (id: number, field: keyof Task, value: any) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedTask) return;
    const comment: Comment = {
      id: Date.now(),
      user: 'Super Admin',
      avatar: 'SA',
      text: newComment,
      timestamp: 'Just now'
    };
    handleUpdateTask(selectedTaskId as number, 'comments', [...selectedTask.comments, comment]);
    setNewComment('');
  };

  const handleSaveStatus = (taskId: number, status: string, progress: number, comment: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newComments = [...task.comments];
    if (comment.trim()) {
      newComments.push({
        id: Date.now(),
        user: 'Super Admin',
        avatar: 'SA',
        text: `Status updated to ${status} (${progress}%). ${comment}`,
        timestamp: 'Just now'
      });
    }

    setTasks(tasks.map(t => t.id === taskId ? { 
      ...t, 
      status: status as any,
      comments: newComments
    } : t));
    showSuccess("Task status updated");
  };

  const confirmDeleteTask = () => {
    const remainingTasks = tasks.filter(t => t.id !== selectedTaskId);
    setTasks(remainingTasks);
    if (remainingTasks.length > 0) {
      setSelectedTaskId(remainingTasks[0].id);
    } else {
      setSelectedTaskId(null);
    }
    setIsDeleteModalOpen(false);
    showSuccess("Task deleted successfully");
  };

  const handleCreateTask = (taskData: any) => {
    const newTask: Task = {
      id: tasks.length + 1,
      title: taskData.title,
      status: 'In Progress',
      priority: taskData.priority,
      description: taskData.description,
      assignedUser: taskData.assignedTo[0]?.name || 'Unassigned',
      deadline: taskData.deadline,
      comments: []
    };
    setTasks([newTask, ...tasks]);
    setSelectedTaskId(newTask.id);
    showSuccess("Task created successfully");
  };

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.assignedUser.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-140px)]">
      {successMessage && (
        <div className="fixed top-24 right-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3 z-50 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={20} className="text-green-500" />
          <span className="font-bold text-sm tracking-tight">{successMessage}</span>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <Typography variant="h2" display>Task Management</Typography>
          <Typography variant="p" className="text-muted-foreground mt-1">
            Organize, track, and manage your team projects and individual tasks.
          </Typography>
        </div>
        <Button className="gap-2 px-6 shadow-md" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Create Task
        </Button>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Left Panel: Task List */}
        <Card className="w-[400px] flex flex-col p-0 overflow-hidden shrink-0 border border-border bg-muted/5">
          <div className="p-4 border-b border-border bg-muted/10">
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search tasks..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 text-xs shadow-none border-border/50 focus:bg-background"
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest px-1">
                Active Tasks ({filteredTasks.length})
              </Typography>
              <div className="flex gap-1">
                 <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                  <Filter size={14} />
                </Button>
                 <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                  <LayoutGrid size={13} />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2 divide-y divide-transparent">
            {filteredTasks.map(task => {
              const isActive = selectedTaskId === task.id;
              return (
                <div 
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border border-transparent hover:bg-muted/50 ${isActive ? 'bg-background shadow-md border-border ring-1 ring-black/5' : ''}`}
                >
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <Typography variant="small" className={`font-bold text-xs leading-snug flex-1 tracking-tight ${isActive ? 'text-primary' : 'text-foreground'}`}>
                      {task.title}
                    </Typography>
                    <div className={`w-2 h-2 rounded-full shrink-0 mt-1 shadow-sm ${
                      task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-orange-500' : 'bg-green-500'
                    }`} />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border ${getStatusStyles(task.status)}`}>
                      {task.status}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
                      <Calendar size={12} className="text-muted-foreground/60" />
                      {task.deadline}
                    </span>
                  </div>
                </div>
              );
            })}
            {filteredTasks.length === 0 && (
              <div className="py-20 text-center opacity-40">
                <Typography variant="small" className="italic">No tasks found matching your search.</Typography>
              </div>
            )}
          </div>
        </Card>

        {/* Right Panel: Task Details */}
        <Card className="flex-1 flex flex-col p-0 overflow-hidden border border-border shadow-sm">
          {selectedTask ? (
            <>
              {/* Detail Toolbar */}
              <div className="p-6 border-b border-border bg-background flex justify-between items-start shrink-0">
                 <div className="flex-1 pr-10">
                    <Typography variant="h3" className="mb-3 leading-tight tracking-tight">{selectedTask.title}</Typography>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="h-8 gap-2 bg-primary/5 text-primary border-primary/10 hover:bg-primary/10 font-bold"
                        onClick={() => setIsUpdateDrawerOpen(true)}
                      >
                         <Activity size={14} />
                         Update Progress
                      </Button>
                      <div className="h-4 w-px bg-border/50" />
                      <div className="flex items-center gap-2 text-xs font-bold text-foreground/70">
                         <User size={14} className="text-primary" />
                         {selectedTask.assignedUser}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-foreground/70">
                         <Calendar size={14} className="text-primary" />
                         Due {selectedTask.deadline}
                      </div>
                    </div>
                 </div>
                 <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setIsDeleteModalOpen(true)}>
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                    <Button size="icon" className="h-9 w-9">
                      <MoreVertical size={18} />
                    </Button>
                 </div>
              </div>

              {/* Detail Content */}
              <div className="flex-1 overflow-y-auto p-10 bg-muted/5">
                <div className="max-w-4xl mx-auto space-y-10">
                  
                  {/* Metadata Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase opacity-60 tracking-widest px-1">Task Status</Typography>
                       <div className="relative group">
                          <select 
                            value={selectedTask.status}
                            onChange={(e) => handleUpdateTask(selectedTask.id, 'status', e.target.value)}
                            className="w-full h-11 px-4 pr-10 rounded-xl border border-border bg-background text-sm font-bold shadow-sm appearance-none outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                          >
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Review</option>
                            <option>Completed</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase opacity-60 tracking-widest px-1">Priority Level</Typography>
                       <div className="relative group">
                          <select 
                            value={selectedTask.priority}
                            onChange={(e) => handleUpdateTask(selectedTask.id, 'priority', e.target.value)}
                            className="w-full h-11 px-4 pr-10 rounded-xl border border-border bg-background text-sm font-bold shadow-sm appearance-none outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                          >
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                       </div>
                    </div>
                  </div>

                  {/* Description Box */}
                  <section className="space-y-4">
                    <Typography variant="small" className="font-bold text-muted-foreground tracking-widest uppercase text-[10px] mb-2 block underline decoration-primary/30 underline-offset-4">Project Brief & Requirements</Typography>
                    <div className="bg-background rounded-2xl border border-border p-8 shadow-sm group hover:border-primary/20 transition-all">
                      <textarea 
                        value={selectedTask.description}
                        onChange={(e) => handleUpdateTask(selectedTask.id, 'description', e.target.value)}
                        className="w-full min-h-[160px] bg-transparent border-none outline-none resize-none text-sm leading-relaxed text-foreground/80 font-medium"
                        placeholder="Enter task detailed description..."
                      />
                    </div>
                  </section>

                  {/* Footer Stats/Actions */}
                  <div className="flex justify-between items-center bg-background p-4 rounded-xl border border-border shadow-sm">
                    <div className="flex gap-6 items-center px-2">
                        <div className="flex flex-col">
                           <Typography variant="small" className="text-[9px] uppercase font-bold text-muted-foreground">Assigned User</Typography>
                           <Typography variant="small" className="font-bold text-xs">{selectedTask.assignedUser}</Typography>
                        </div>
                        <div className="h-6 w-px bg-border" />
                        <div className="flex flex-col">
                           <Typography variant="small" className="text-[9px] uppercase font-bold text-muted-foreground">Internal Deadline</Typography>
                           <Typography variant="small" className="font-bold text-xs">{selectedTask.deadline}</Typography>
                        </div>
                    </div>
                    <Button 
                      className="gap-2 bg-green-600 hover:bg-green-700 font-bold px-8 shadow-md"
                      onClick={() => {
                        handleUpdateTask(selectedTask.id, 'status', 'Completed');
                        showSuccess("Task marked as complete");
                      }}
                    >
                      <CheckCircle2 size={18} />
                      Complete Task
                    </Button>
                  </div>

                  {/* Comments Section */}
                  <section className="space-y-6 pb-32">
                    <div className="flex items-center gap-3">
                       <MessageSquare size={18} className="text-primary" />
                       <Typography variant="h4" className="mb-0">Team Discussion ({selectedTask.comments.length})</Typography>
                    </div>

                    <div className="space-y-6">
                      {selectedTask.comments.map(comment => (
                        <div key={comment.id} className="flex gap-4">
                          <div className="w-9 h-9 rounded-full bg-primary/10 border-2 border-background shadow-sm flex items-center justify-center text-xs font-bold text-primary">
                            {comment.avatar}
                          </div>
                          <div className="flex-1 bg-background p-4 rounded-2xl border border-border/70 shadow-sm relative group hover:border-primary/20 transition-all">
                             <div className="flex justify-between items-center mb-1">
                               <span className="font-bold text-xs text-foreground/90">{comment.user}</span>
                               <span className="text-[10px] text-muted-foreground font-medium">{comment.timestamp}</span>
                             </div>
                             <Typography variant="small" className="text-muted-foreground leading-snug">{comment.text}</Typography>
                          </div>
                        </div>
                      ))}
                      {selectedTask.comments.length === 0 && (
                        <div className="py-12 text-center rounded-2xl border-2 border-dashed border-border/50 bg-muted/5 opacity-60">
                           <Typography variant="small" className="text-muted-foreground italic font-medium">No messages posted in this thread.</Typography>
                        </div>
                      )}
                    </div>

                    {/* New Comment Input */}
                    <div className="bg-background/80 backdrop-blur-md sticky bottom-0 py-4 ring-[30px] ring-background z-20">
                       <div className="flex gap-4 items-center max-w-4xl">
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground shadow-lg ring-4 ring-primary/5">
                            SA
                          </div>
                          <div className="flex-1 relative group">
                            <input 
                              type="text" 
                              placeholder="Write a message to your team..." 
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                              className="w-full h-12 px-6 rounded-full border border-border bg-muted/20 outline-none focus:bg-background focus:border-primary transition-all text-sm font-medium pr-14"
                            />
                            <Button 
                              size="icon" 
                              className="absolute right-1 top-1 h-10 w-10 rounded-full shadow-md transition-transform active:scale-95"
                              disabled={!newComment.trim()}
                              onClick={handleAddComment}
                            >
                              <Send size={16} />
                            </Button>
                          </div>
                       </div>
                    </div>
                  </section>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-muted/5 opacity-20">
               <Flag size={100} className="mb-6 stroke-[1px]" />
               <Typography variant="h3">No Task Selected</Typography>
               <Typography variant="small" className="mt-2 italic font-bold">Please select an item from the left sidebar tracker</Typography>
            </div>
          )}
        </Card>
      </div>

      {/* Modals & Drawers */}
      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateTask} 
      />

      <UpdateTaskStatusDrawer 
        isOpen={isUpdateDrawerOpen}
        onClose={() => setIsUpdateDrawerOpen(false)}
        task={selectedTask || null}
        onSave={handleSaveStatus}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-8 border border-border shadow-2xl space-y-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2 border border-red-100">
                <Trash2 size={32} />
              </div>
              <Typography variant="h3" className="mb-0">Permanent Deletion?</Typography>
              <Typography variant="p" className="text-muted-foreground text-sm leading-relaxed">
                You are about to delete <strong>{selectedTask?.title}</strong>. This action is irreversible and will remove all associated comments and history.
              </Typography>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 font-bold" onClick={() => setIsDeleteModalOpen(false)}>No, cancel</Button>
              <Button variant="destructive" className="flex-1 font-bold bg-red-600 hover:bg-red-700 shadow-md" onClick={confirmDeleteTask}>Yes, delete task</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
