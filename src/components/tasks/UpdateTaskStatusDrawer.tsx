'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface UpdateTaskStatusDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: number;
    title: string;
    status: string;
  } | null;
  onSave: (taskId: number, status: string, progress: number, comment: string) => void;
}

const UpdateTaskStatusDrawer: React.FC<UpdateTaskStatusDrawerProps> = ({ isOpen, onClose, task, onSave }) => {
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (task) {
      setStatus(task.status);
      // For demo purposes, let's assume random progress if not provided
      setProgress(task.status === 'Completed' ? 100 : task.status === 'In Progress' ? 45 : 0);
      setComment('');
    }
  }, [task]);

  const handleSave = () => {
    if (task) {
      onSave(task.id, status, progress, comment);
      onClose();
    }
  };

  if (!task) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1000,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'all 0.3s ease-in-out'
        }}
      />
      
      {/* Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: isOpen ? 0 : '-400px',
        width: '400px',
        height: '100vh',
        backgroundColor: 'white',
        boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
        zIndex: 1001,
        transition: 'right 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-main)', margin: 0 }}>
            {task.title}
          </h2>
          <button 
            onClick={onClose}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              borderRadius: '50%',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>
              STATUS
            </label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                width: '100%',
                height: '42px',
                padding: '0 12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '14px',
                backgroundColor: 'white',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>
                PROGRESS
              </label>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--primary)' }}>{progress}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              step="1"
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value))}
              style={{
                width: '100%',
                cursor: 'pointer',
                accentColor: 'var(--primary)'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>
              ADD COMMENT
            </label>
            <textarea 
              placeholder="Enter task updates or comments..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '14px',
                resize: 'none',
                outline: 'none',
                lineHeight: '1.5'
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)' }}>
          <button 
            onClick={handleSave}
            className="btn-primary"
            style={{ width: '100%', height: '48px', fontSize: '15px' }}
          >
            Save Status
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateTaskStatusDrawer;
