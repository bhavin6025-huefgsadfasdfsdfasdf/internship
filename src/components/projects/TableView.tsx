'use client';

import React from 'react';
import { Project } from '@/app/projects/page';
import { MoreVertical, Trash2, Pencil } from 'lucide-react';

interface TableViewProps {
  projects: Project[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export default function TableView({ projects, onDelete, onEdit }: TableViewProps) {
  const getStatusStyle = (status: Project['status']) => {
    switch (status) {
      case 'TODO':
        return { color: '#6B7280', backgroundColor: '#F3F4F6' };
      case 'IN PROGRESS':
        return { color: '#5B6CFF', backgroundColor: '#EEF0FF' };
      case 'COMPLETED':
        return { color: '#10B981', backgroundColor: '#ECFDF5' };
      default:
        return { color: '#6B7280', backgroundColor: '#F3F4F6' };
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>PROJECT NAME</th>
            <th>MANAGER</th>
            <th>TEAM SIZE</th>
            <th>STATUS</th>
            <th>DEADLINE</th>
            <th>PROGRESS</th>
            <th style={{ textAlign: 'right' }}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{project.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{project.description.substring(0, 40)}...</div>
              </td>
              <td>{project.manager}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    backgroundColor: '#F3F4F6',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}>
                    {project.teamSize} members
                  </div>
                </div>
              </td>
              <td>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  ...getStatusStyle(project.status)
                }}>
                  {project.status}
                </span>
              </td>
              <td>{project.deadline}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '120px' }}>
                  <div style={{
                    flex: 1,
                    height: '6px',
                    backgroundColor: '#E5E7EB',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${project.progress}%`,
                      height: '100%',
                      backgroundColor: 'var(--primary)',
                      borderRadius: '3px'
                    }}></div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '500', width: '35px' }}>{project.progress}%</span>
                </div>
              </td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button 
                    onClick={() => onEdit?.(project.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Pencil size={16} />
                  </button>
                  <button 
                    onClick={() => onDelete?.(project.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#EF4444',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                No projects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
