'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  MoreVertical, 
  X, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  ExternalLink,
  Send
} from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  avatar?: string;
  text: string;
  timestamp: string;
}

interface Task {
  id: number;
  name: string;
  project: string;
  deadline: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'To Do' | 'In Progress' | 'Done';
  description: string;
  comments: Comment[];
}

const mockTasks: Task[] = [
  { 
    id: 1, 
    name: 'Update API Documentation', 
    project: 'SaaS Platform', 
    deadline: '2026-04-10', 
    priority: 'High', 
    status: 'In Progress',
    description: 'Update the REST API documentation to include the new authentication endpoints and rate limiting headers.',
    comments: [
      { id: 1, user: 'Sarah Miller', text: 'I started working on the auth endpoints section.', timestamp: '2 hours ago' },
      { id: 2, user: 'Manager', text: 'Please ensure you cover the rate limiting headers as well.', timestamp: '1 hour ago' }
    ]
  },
  { 
    id: 2, 
    name: 'Design System Audit', 
    project: 'Internal Tools', 
    deadline: '2026-04-12', 
    priority: 'Medium', 
    status: 'To Do',
    description: 'Review the current design system components for accessibility compliance and consistency across the app.',
    comments: []
  },
  { 
    id: 3, 
    name: 'Implement Unit Tests', 
    project: 'Core Engine', 
    deadline: '2026-04-05', 
    priority: 'Low', 
    status: 'Done',
    description: 'Write unit tests for the data processing pipeline to ensure 90% code coverage.',
    comments: [
      { id: 3, user: 'John Doe', text: 'Unit tests for the storage layer are complete.', timestamp: 'Yesterday' }
    ]
  },
  { 
    id: 4, 
    name: 'Fix Login Bug', 
    project: 'SaaS Platform', 
    deadline: '2026-04-02', 
    priority: 'High', 
    status: 'To Do',
    description: 'Investigate and fix the reported issue where users are occasionally logged out after refreshing the page.',
    comments: []
  },
  { 
    id: 5, 
    name: 'Refactor Utility Classes', 
    project: 'Shared Library', 
    deadline: '2026-04-15', 
    priority: 'Medium', 
    status: 'In Progress',
    description: 'Refactor the utility classes into a more modular structure to reduce the bundle size.',
    comments: []
  }
];

export default function EmployeeTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'To Do': return { bg: '#F3F4F6', color: '#4B5563' };
      case 'In Progress': return { bg: '#DBEAFE', color: '#1E40AF' };
      case 'Done': return { bg: '#D1FAE5', color: '#065F46' };
      default: return { bg: '#F3F4F6', color: '#4B5563' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const handleOpenTask = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedTask) return;
    
    const comment: Comment = {
      id: Date.now(),
      user: 'John Doe',
      text: newComment,
      timestamp: 'Just now'
    };

    const updatedTask = {
      ...selectedTask,
      comments: [...selectedTask.comments, comment]
    };

    setTasks(prev => prev.map(t => t.id === selectedTask.id ? updatedTask : t));
    setSelectedTask(updatedTask);
    setNewComment('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header with Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="page-title">My Tasks</h1>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Status Filter */}
          <div style={{ position: 'relative' }}>
            <Filter size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
            <select 
              className="btn-secondary"
              style={{ paddingLeft: '36px', width: '160px', height: '40px', appearance: 'none' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '11px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search tasks or projects..." 
              className="search-input"
              style={{ width: '300px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Task Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>TASK NAME</th>
              <th>PROJECT</th>
              <th>DEADLINE</th>
              <th>PRIORITY</th>
              <th>STATUS</th>
              <th style={{ textAlign: 'right' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr 
                key={task.id} 
                onClick={() => handleOpenTask(task)}
                style={{ height: '52px', cursor: 'pointer', transition: 'background-color 0.2s' }}
              >
                <td style={{ fontWeight: '600', color: 'var(--text-main)' }}>{task.name}</td>
                <td style={{ color: 'var(--text-muted)' }}>{task.project}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                    <Calendar size={14} />
                    {task.deadline}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getPriorityColor(task.priority) }} />
                    <span style={{ fontSize: '13px' }}>{task.priority}</span>
                  </div>
                </td>
                <td>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    backgroundColor: getStatusStyle(task.status).bg,
                    color: getStatusStyle(task.status).color,
                    textTransform: 'uppercase'
                  }}>
                    {task.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="btn-primary" 
                    style={{ height: '32px', fontSize: '12px', padding: '0 12px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenTask(task);
                    }}
                  >
                    OPEN
                  </button>
                </td>
              </tr>
            ))}
            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                  No tasks found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Task Detail Drawer */}
      {isDrawerOpen && selectedTask && (
        <>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 1000,
              animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={() => setIsDrawerOpen(false)}
          />
          <div style={{
            position: 'fixed',
            right: 0,
            top: 0,
            bottom: 0,
            width: '450px',
            backgroundColor: 'white',
            boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.1)',
            zIndex: 1001,
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideInRight 0.3s ease-out'
          }}>
            {/* Drawer Header */}
            <div style={{ 
              padding: '24px', 
              borderBottom: '1px solid var(--border-color)', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              backgroundColor: '#F9FAFB'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Task Details</h2>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Task Name</label>
                <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)' }}>{selectedTask.name}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Project</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '500' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>P</div>
                    {selectedTask.project}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Deadline</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '500', color: '#EF4444' }}>
                    <Clock size={16} />
                    {selectedTask.deadline}
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Description</label>
                <div style={{ 
                  padding: '12px', 
                  backgroundColor: '#F9FAFB', 
                  borderRadius: '8px', 
                  fontSize: '13px', 
                  lineHeight: '1.5',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-color)'
                }}>
                  {selectedTask.description}
                </div>
              </div>

              {/* Comments Section */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>Comments ({selectedTask.comments.length})</label>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '16px', 
                  overflowY: 'auto', 
                  paddingBottom: '20px',
                  flex: 1
                }}>
                  {selectedTask.comments.map(comment => (
                    <div key={comment.id} style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ 
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '50%', 
                        backgroundColor: comment.user === 'Manager' ? 'var(--primary)' : '#E5E7EB',
                        color: comment.user === 'Manager' ? 'white' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: '700',
                        flexShrink: 0
                      }}>
                        {comment.user[0]}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                          <span style={{ fontWeight: '600', fontSize: '13px' }}>{comment.user}</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{comment.timestamp}</span>
                        </div>
                        <div style={{ 
                          fontSize: '13px', 
                          color: 'var(--text-main)', 
                          lineHeight: '1.4',
                          backgroundColor: '#F3F4F6',
                          padding: '8px 12px',
                          borderRadius: '0 12px 12px 12px'
                        }}>
                          {comment.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  {selectedTask.comments.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '12px', fontStyle: 'italic' }}>
                      No comments yet.
                    </div>
                  )}
                </div>

                {/* Comment Input */}
                <div style={{ 
                  marginTop: '12px', 
                  display: 'flex', 
                  gap: '8px', 
                  alignItems: 'center',
                  backgroundColor: 'white',
                  padding: '8px',
                  borderRadius: '24px',
                  border: '1px solid var(--border-color)',
                  position: 'sticky',
                  bottom: 0
                }}>
                  <input 
                    type="text" 
                    placeholder="Write a comment..." 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      fontSize: '13px',
                      paddingLeft: '8px'
                    }}
                  />
                  <button 
                    onClick={handleAddComment}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button className="btn-primary" style={{ width: '100%', height: '40px', gap: '10px', fontSize: '13px' }}>
                  <CheckCircle2 size={16} />
                  Mark as Complete
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        tr:hover td {
          background-color: #F9FAFB !important;
        }
      `}</style>
    </div>
  );
}
