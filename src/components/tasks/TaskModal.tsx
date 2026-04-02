'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, User, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  avatar: string;
  color: string;
}

const teamMembers: TeamMember[] = [
  { id: 1, name: 'John Doe', avatar: 'JD', color: '#5B6CFF' },
  { id: 2, name: 'Alice Smith', avatar: 'AS', color: '#10B981' },
  { id: 3, name: 'Bob Johnson', avatar: 'BJ', color: '#F59E0B' },
  { id: 4, name: 'Sarah Wilson', avatar: 'SW', color: '#EF4444' },
  { id: 5, name: 'Michael Brown', avatar: 'MB', color: '#8B5CF6' },
];

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: any) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [deadline, setDeadline] = useState('');
  const [assignedTo, setAssignedTo] = useState<number[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDeadline('');
      setAssignedTo([]);
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = 'Task title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!deadline) newErrors.deadline = 'Deadline is required';
    if (assignedTo.length === 0) newErrors.assignedTo = 'Select at least one person';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        title,
        description,
        priority,
        deadline,
        assignedTo: assignedTo.map(id => teamMembers.find(m => m.id === id)),
        status: 'To Do',
        createdAt: new Date().toISOString(),
      });
      onClose();
    }
  };

  const toggleAssignee = (id: number) => {
    setAssignedTo(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create Task</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          {/* Row 1: Task Title */}
          <div className="form-row">
            <label className="form-label">Task Title</label>
            <input 
              type="text" 
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          {/* Row 2: Description */}
          <div className="form-row">
            <label className="form-label">Description</label>
            <textarea 
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              placeholder="Describe the task..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          {/* Row 3: Priority & Deadline */}
          <div className="form-grid">
            <div className="form-row">
              <label className="form-label">Priority</label>
              <div className="custom-select-wrapper">
                <div 
                  className="custom-select" 
                  onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                >
                  <div className="priority-value">
                    <div 
                      className="priority-dot" 
                      style={{ backgroundColor: getPriorityColor(priority) }} 
                    />
                    <span>{priority}</span>
                  </div>
                  <ChevronDown size={16} className={`chevron ${isPriorityOpen ? 'rotate' : ''}`} />
                </div>
                {isPriorityOpen && (
                  <div className="select-dropdown">
                    {(['High', 'Medium', 'Low'] as const).map((p) => (
                      <div 
                        key={p} 
                        className={`select-item ${priority === p ? 'active' : ''}`}
                        onClick={() => {
                          setPriority(p);
                          setIsPriorityOpen(false);
                        }}
                      >
                        <div className="priority-dot" style={{ backgroundColor: getPriorityColor(p) }} />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">Deadline</label>
              <div className="date-input-wrapper">
                <Calendar size={16} className="input-icon" />
                <input 
                  type="date" 
                  className={`form-input icon-padding ${errors.deadline ? 'error' : ''}`}
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
              {errors.deadline && <span className="error-text">{errors.deadline}</span>}
            </div>
          </div>

          {/* Row 4: Assign To */}
          <div className="form-row">
            <label className="form-label">Assign To</label>
            <div className="custom-select-wrapper">
              <div 
                className={`custom-select multi ${errors.assignedTo ? 'error' : ''}`} 
                onClick={() => setIsAssignOpen(!isAssignOpen)}
              >
                <div className="selected-avatars">
                  {assignedTo.length === 0 ? (
                    <span className="placeholder">Select team members</span>
                  ) : (
                    assignedTo.map(id => {
                      const member = teamMembers.find(m => m.id === id);
                      return (
                        <div key={id} className="avatar-chip" title={member?.name}>
                          <div 
                            className="mini-avatar" 
                            style={{ backgroundColor: member?.color }}
                          >
                            {member?.avatar}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="select-actions">
                  {assignedTo.length > 0 && (
                    <span className="count-badge">{assignedTo.length}</span>
                  )}
                  <ChevronDown size={16} className={`chevron ${isAssignOpen ? 'rotate' : ''}`} />
                </div>
              </div>
              {isAssignOpen && (
                <div className="assign-dropdown">
                  <div className="dropdown-search">
                    <User size={14} />
                    <input type="text" placeholder="Search members..." onClick={(e) => e.stopPropagation()} />
                  </div>
                  <div className="members-list">
                    {teamMembers.map((member) => (
                      <div 
                        key={member.id} 
                        className={`member-item ${assignedTo.includes(member.id) ? 'selected' : ''}`}
                        onClick={() => toggleAssignee(member.id)}
                      >
                        <div className="member-info">
                          <div className="member-avatar" style={{ backgroundColor: member.color }}>
                            {member.avatar}
                          </div>
                          <span className="member-name">{member.name}</span>
                        </div>
                        {assignedTo.includes(member.id) && <CheckCircle2 size={16} className="check-icon" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {errors.assignedTo && <span className="error-text">{errors.assignedTo}</span>}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-create">Create Task</button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        .modal-container {
          background: white;
          width: 600px;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          animation: slideUp 0.3s ease-out;
        }

        .modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid #E5E7EB;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #F9FAFB;
        }

        .modal-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: #6B7280;
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #F3F4F6;
          color: #111827;
        }

        .task-form {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
          position: relative;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 500;
          color: #374151;
        }

        .form-input, .form-textarea, .custom-select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.2s;
          outline: none;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: #5B6CFF;
          box-shadow: 0 0 0 3px rgba(91, 108, 255, 0.1);
        }

        .form-input.error, .form-textarea.error, .custom-select.error {
          border-color: #EF4444;
        }

        .error-text {
          color: #EF4444;
          font-size: 12px;
          margin-top: 2px;
        }

        .icon-padding {
          padding-left: 36px;
        }

        .date-input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9CA3AF;
        }

        /* Custom Select Styles */
        .custom-select-wrapper {
          position: relative;
        }

        .custom-select {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 42px;
        }

        .custom-select:hover {
          border-color: #9CA3AF;
        }

        .priority-value {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .priority-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .chevron {
          color: #9CA3AF;
          transition: transform 0.2s;
        }

        .chevron.rotate {
          transform: rotate(180deg);
        }

        .select-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          z-index: 10;
          padding: 4px;
        }

        .select-item {
          padding: 8px 12px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.2s;
        }

        .select-item:hover {
          background: #F3F4F6;
        }

        .select-item.active {
          background: #EFF6FF;
          color: #2563EB;
        }

        /* Multi Select Styles */
        .selected-avatars {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
        }

        .placeholder {
          color: #9CA3AF;
        }

        .avatar-chip {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .mini-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 10px;
          font-weight: 600;
          border: 2px solid white;
          box-shadow: 0 0 0 1px #E5E7EB;
        }

        .select-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .count-badge {
          background: #5B6CFF;
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 10px;
        }

        .assign-dropdown {
          position: absolute;
          bottom: calc(100% + 4px);
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          box-shadow: 0 -10px 15px -3px rgba(0, 0, 0, 0.1);
          z-index: 10;
          max-height: 250px;
          display: flex;
          flex-direction: column;
        }

        .dropdown-search {
          padding: 10px 12px;
          border-bottom: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #9CA3AF;
        }

        .dropdown-search input {
          border: none;
          outline: none;
          font-size: 13px;
          width: 100%;
        }

        .members-list {
          overflow-y: auto;
          padding: 4px;
        }

        .member-item {
          padding: 8px 12px;
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: background 0.2s;
        }

        .member-item:hover {
          background: #F3F4F6;
        }

        .member-item.selected {
          background: #EFF6FF;
        }

        .member-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .member-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 11px;
          font-weight: 600;
        }

        .member-name {
          font-size: 14px;
          color: #111827;
        }

        .check-icon {
          color: #2563EB;
        }

        .modal-footer {
          padding: 16px 24px;
          background: #F9FAFB;
          border-top: 1px solid #E5E7EB;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn-cancel {
          background: white;
          border: 1px solid #D1D5DB;
          color: #374151;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cancel:hover {
          background: #F9FAFB;
          border-color: #9CA3AF;
        }

        .btn-create {
          background: #5B6CFF;
          border: none;
          color: white;
          padding: 10px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 6px -1px rgba(91, 108, 255, 0.2);
        }

        .btn-create:hover {
          background: #4B5AF0;
          transform: translateY(-1px);
          box-shadow: 0 6px 8px -1px rgba(91, 108, 255, 0.3);
        }

        .btn-create:active {
          transform: translateY(0);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default TaskModal;
