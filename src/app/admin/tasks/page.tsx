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
  CheckCircle2
} from 'lucide-react';
import TaskModal from '@/components/tasks/TaskModal';
import UpdateTaskStatusDrawer from '@/components/tasks/UpdateTaskStatusDrawer';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';


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

  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#EF4444'; // Red
      case 'Medium': return '#F59E0B'; // Orange
      case 'Low': return '#10B981'; // Green
      default: return '#6B7280';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'In Progress': return '#DBEAFE';
      case 'Completed': return '#D1FAE5';
      case 'To Do': return '#F3F4F6';
      case 'Review': return '#FEF3C7';
      default: return '#F3F4F6';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'In Progress': return '#1E40AF';
      case 'Completed': return '#065F46';
      case 'To Do': return '#374151';
      case 'Review': return '#92400E';
      default: return '#374151';
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

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h2" display>Task Management</Typography>
      </div>
      
      {successMessage && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', backgroundColor: '#ECFDF5', border: '1px solid #10B981', color: '#065F46', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 9999, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <CheckCircle2 size={20} color="#10B981" />
          <span style={{ fontWeight: '500', fontSize: '14px' }}>{successMessage}</span>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden saas-card p-0">
        {/* Left Panel: Task List (40%) */}
        <div style={{
          width: '40%',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#F9FAFB'
        }}>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Tasks</h2>
              <button 
                className="btn-primary" 
                style={{ padding: '0 12px', height: '36px', fontSize: '13px' }}
                onClick={() => setIsModalOpen(true)}
              >
                <Plus size={16} /> New Task
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search tasks..." 
                className="search-input"
                style={{ width: '100%', paddingLeft: '36px', height: '36px', fontSize: '13px', backgroundColor: '#F3F4F6' }}
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            {tasks.map(task => (
              <div 
                key={task.id}
                onClick={() => setSelectedTaskId(task.id)}
                style={{
                  padding: '16px',
                  backgroundColor: selectedTaskId === task.id ? 'white' : 'transparent',
                  borderRadius: '10px',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  border: selectedTaskId === task.id ? '1px solid var(--border-color)' : '1px solid transparent',
                  boxShadow: selectedTaskId === task.id ? 'var(--shadow-light)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: selectedTaskId === task.id ? 'var(--primary)' : 'var(--text-main)', flex: 1, marginRight: '10px' }}>
                    {task.title}
                  </h3>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getPriorityColor(task.priority), marginTop: '4px' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: getStatusBgColor(task.status),
                    color: getStatusTextColor(task.status),
                    textTransform: 'uppercase'
                  }}>
                    {task.status}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} /> {task.deadline}
                  </span>
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>No tasks found.</div>
            )}
          </div>
        </div>

        {/* Right Panel: Task Details (60%) */}
        <div style={{
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white'
        }}>
          {selectedTask ? (
            <>
              <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
                {/* Editable Title */}
                <input 
                  type="text" 
                  value={selectedTask.title}
                  onChange={(e) => handleUpdateTask(selectedTask.id, 'title', e.target.value)}
                  style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    marginBottom: '24px',
                    color: '#111827'
                  }}
                />

                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <button 
                    onClick={() => setIsUpdateDrawerOpen(true)}
                    className="btn-primary"
                    style={{ 
                      backgroundColor: '#EEF2FF', 
                      color: 'var(--primary)',
                      border: '1px solid #E0E7FF',
                      fontSize: '13px',
                      height: '36px'
                    }}
                  >
                    Update Progress
                  </button>
                </div>


                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                  {/* Status Dropdown */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>STATUS</label>
                    <div style={{ position: 'relative' }}>
                      <select 
                        value={selectedTask.status}
                        onChange={(e) => handleUpdateTask(selectedTask.id, 'status', e.target.value)}
                        style={{
                          width: '100%',
                          height: '42px',
                          padding: '0 16px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'white',
                          appearance: 'none',
                          fontSize: '14px'
                        }}
                      >
                        <option>To Do</option>
                        <option>In Progress</option>
                        <option>Review</option>
                        <option>Completed</option>
                      </select>
                      <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '13px', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                    </div>
                  </div>

                  {/* Priority */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>PRIORITY</label>
                    <div style={{ position: 'relative' }}>
                      <select 
                        value={selectedTask.priority}
                        onChange={(e) => handleUpdateTask(selectedTask.id, 'priority', e.target.value)}
                        style={{
                          width: '100%',
                          height: '42px',
                          padding: '0 16px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'white',
                          appearance: 'none',
                          fontSize: '14px'
                        }}
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                      <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '13px', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                    </div>
                  </div>

                  {/* Assigned User */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>ASSIGNED TO</label>
                    <div style={{ 
                      height: '42px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      padding: '0 16px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px'
                    }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#E5E7EB', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                        <User size={14} />
                      </div>
                      <span style={{ fontSize: '14px' }}>{selectedTask.assignedUser}</span>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>DEADLINE</label>
                    <input 
                      type="date" 
                      value={selectedTask.deadline}
                      onChange={(e) => handleUpdateTask(selectedTask.id, 'deadline', e.target.value)}
                      style={{
                        width: '100%',
                        height: '42px',
                        padding: '0 16px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '40px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '0.05em' }}>DESCRIPTION</label>
                  <textarea 
                    value={selectedTask.description}
                    onChange={(e) => handleUpdateTask(selectedTask.id, 'description', e.target.value)}
                    style={{
                      width: '100%',
                      minHeight: '120px',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: 'var(--text-main)',
                      resize: 'vertical',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Bottom Actions */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  paddingBottom: '40px',
                  borderBottom: '1px solid var(--border-color)',
                  marginBottom: '40px'
                }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn-primary" onClick={() => showSuccess("Changes saved successfully")} style={{ padding: '0 24px' }}>
                      Save Changes
                    </button>
                    <button 
                      onClick={() => {
                        handleUpdateTask(selectedTask.id, 'status', 'Completed');
                        showSuccess("Task marked as complete");
                      }}
                      style={{
                        height: '40px',
                        padding: '0 16px',
                        borderRadius: '8px',
                        border: '1px solid #D1FAE5',
                        backgroundColor: '#D1FAE5',
                        color: '#065F46',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <CheckCircle size={18} /> Mark Complete
                    </button>
                  </div>
                  <button 
                    onClick={() => setIsDeleteModalOpen(true)}
                    style={{
                      height: '40px',
                      padding: '0 16px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#FEF2F2',
                      color: '#DC2626',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={18} /> Delete Task
                  </button>
                </div>

                {/* Comments Section */}
                <div style={{ marginBottom: '80px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                    <MessageSquare size={20} color="var(--text-muted)" />
                    <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Comments</h3>
                    <span style={{ 
                      marginLeft: '8px', 
                      backgroundColor: '#F3F4F6', 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'var(--text-muted)'
                    }}>
                      {selectedTask.comments.length}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {selectedTask.comments.map(comment => (
                      <div key={comment.id} style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ 
                          width: '36px', 
                          height: '36px', 
                          borderRadius: '50%', 
                          backgroundColor: '#EFF6FF', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: '700',
                          color: '#2563EB',
                          flexShrink: 0
                        }}>
                          {comment.avatar}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontWeight: '600', fontSize: '14px' }}>{comment.user}</span>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{comment.timestamp}</span>
                          </div>
                          <div style={{ 
                            padding: '12px 16px', 
                            backgroundColor: '#F9FAFB', 
                            borderRadius: '0 12px 12px 12px', 
                            fontSize: '14px',
                            color: 'var(--text-main)',
                            border: '1px solid var(--border-color)'
                          }}>
                            {comment.text}
                          </div>
                        </div>
                      </div>
                    ))}
                    {selectedTask.comments.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                        <MessageSquare size={32} style={{ opacity: 0.2, marginBottom: '8px' }} />
                        <p style={{ fontSize: '14px' }}>No comments yet. Start the conversation!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Fixed Comment Input Box at Bottom */}
              <div style={{ 
                padding: '20px 32px', 
                borderTop: '1px solid var(--border-color)', 
                backgroundColor: 'white',
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}>
                <div style={{ 
                  flex: 1, 
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <input 
                    type="text" 
                    placeholder="Write a comment..." 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                    style={{
                      width: '100%',
                      height: '46px',
                      padding: '0 48px 0 16px',
                      borderRadius: '24px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: '#F9FAFB',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  <button 
                    onClick={handleAddComment}
                    style={{
                      position: 'absolute',
                      right: '6px',
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.1s'
                    }}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <Flag size={48} style={{ opacity: 0.1, marginBottom: '16px' }} />
              <p>No task selected. Select a task to view details.</p>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            backdropFilter: 'blur(2px)'
          }}>
            <div className="card" style={{
              width: '400px',
              padding: '24px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#111827' }}>Delete Task</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                Are you sure you want to delete <strong>{selectedTask?.title}</strong>? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  style={{
                    padding: '0 16px',
                    height: '36px',
                    backgroundColor: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    color: 'var(--text-main)',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDeleteTask}
                  style={{
                    padding: '0 16px',
                    height: '36px',
                    backgroundColor: '#EF4444',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx global>{`
          .search-input:focus {
            background-color: white !important;
            border-color: var(--primary) !important;
            box-shadow: 0 0 0 2px rgba(91, 108, 255, 0.1);
          }
          textarea:focus {
            border-color: var(--primary) !important;
            box-shadow: 0 0 0 2px rgba(91, 108, 255, 0.1);
          }
          select:focus {
            border-color: var(--primary) !important;
          }
          input[type="date"]:focus {
            border-color: var(--primary) !important;
          }
        `}</style>
      </div>

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
    </div>
  );
}
