'use client';

import React from 'react';
import { Project, ProjectStatus } from '@/app/projects/page';
import { Calendar, Users } from 'lucide-react';

interface KanbanViewProps {
  projects: Project[];
  onUpdateStatus: (projectId: string, newStatus: ProjectStatus) => void;
}

export default function KanbanView({ projects, onUpdateStatus }: KanbanViewProps) {
  const columns: ProjectStatus[] = ['TODO', 'IN PROGRESS', 'COMPLETED'];

  const onDragStart = (e: React.DragEvent, projectId: string) => {
    e.dataTransfer.setData('projectId', projectId);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent, status: ProjectStatus) => {
    const projectId = e.dataTransfer.getData('projectId');
    onUpdateStatus(projectId, status);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      alignItems: 'start',
      overflowX: 'auto',
      minHeight: 'calc(100vh - 200px)'
    }}>
      {columns.map((column) => (
        <div
          key={column}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, column)}
          style={{
            backgroundColor: '#F3F4F6',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            minHeight: '500px'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 
                  column === 'TODO' ? '#9CA3AF' : 
                  column === 'IN PROGRESS' ? 'var(--primary)' : '#10B981'
              }}></span>
              {column}
            </h3>
            <span style={{
              backgroundColor: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-color)'
            }}>
              {projects.filter(p => p.status === column).length}
            </span>
          </div>

          {projects.filter(p => p.status === column).map((project) => (
            <div
              key={project.id}
              draggable
              onDragStart={(e) => onDragStart(e, project.id)}
              style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '16px',
                boxShadow: 'var(--shadow-light)',
                cursor: 'grab',
                border: '1px solid transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
            >
              <h4 style={{
                fontSize: '15px',
                fontWeight: '700',
                marginBottom: '8px',
                color: 'var(--text-main)'
              }}>
                {project.name}
              </h4>
              <p style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
                marginBottom: '16px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {project.description}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {project.team.map((avatar, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#E5E7EB',
                        border: '2px solid white',
                        marginLeft: idx === 0 ? '0' : '-8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: '600',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Using text instead of images for now as we don't have real avatars */}
                      {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
                    </div>
                  ))}
                  {project.teamSize > 3 && (
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#F3F4F6',
                      border: '2px solid white',
                      marginLeft: '-8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: '600',
                      color: 'var(--text-muted)'
                    }}>
                      +{project.teamSize - 3}
                    </div>
                  )}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--text-muted)',
                  fontSize: '12px'
                }}>
                  <Calendar size={14} />
                  {project.deadline}
                </div>
              </div>

              <div style={{ marginBottom: '4px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '4px'
                }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Progress</span>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--primary)' }}>{project.progress}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#E5E7EB',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${project.progress}%`,
                    height: '100%',
                    backgroundColor: 'var(--primary)',
                    borderRadius: '3px',
                    transition: 'width 0.3s'
                  }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
