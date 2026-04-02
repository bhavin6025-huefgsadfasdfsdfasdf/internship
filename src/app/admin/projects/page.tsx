'use client';

import React, { useState } from 'react';
import { LayoutGrid, List, Plus, CheckCircle2 } from 'lucide-react';
import KanbanView from '@/components/projects/KanbanView';
import TableView from '@/components/projects/TableView';
import CreateProjectModal from '@/components/projects/CreateProjectModal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export type ProjectStatus = 'TODO' | 'IN PROGRESS' | 'COMPLETED';

export interface Project {
  id: string;
  name: string;
  description: string;
  manager: string;
  teamSize: number;
  team: string[];
  status: ProjectStatus;
  deadline: string;
  progress: number;
}

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'SaaS Platform Redesign',
    description: 'Modernizing the core platform UI/UX.',
    manager: 'John Doe',
    teamSize: 5,
    team: ['/avatars/u1.png', '/avatars/u2.png', '/avatars/u3.png'],
    status: 'IN PROGRESS',
    deadline: '2026-05-15',
    progress: 65,
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Building the native mobile application.',
    manager: 'Jane Smith',
    teamSize: 8,
    team: ['/avatars/u4.png', '/avatars/u5.png'],
    status: 'TODO',
    deadline: '2026-06-20',
    progress: 0,
  },
  {
    id: '3',
    name: 'API Infrastructure Upgrade',
    description: 'Scalability improvements for backend services.',
    manager: 'Mike Johnson',
    teamSize: 3,
    team: ['/avatars/u1.png', '/avatars/u6.png'],
    status: 'COMPLETED',
    deadline: '2026-03-10',
    progress: 100,
  },
  {
    id: '4',
    name: 'Marketing Website',
    description: 'New landing pages for the product launch.',
    manager: 'Sarah Wilson',
    teamSize: 4,
    team: ['/avatars/u2.png', '/avatars/u7.png', '/avatars/u8.png'],
    status: 'IN PROGRESS',
    deadline: '2026-04-30',
    progress: 40,
  },
];

export default function ProjectsPage() {
  const [view, setView] = useState<'KANBAN' | 'TABLE'>('KANBAN');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCreateProject = (newProject: Omit<Project, 'id' | 'progress' | 'teamSize'>) => {
    const project: Project = {
      ...newProject,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      teamSize: newProject.team.length,
    };
    setProjects([...projects, project]);
    setIsModalOpen(false);
    showSuccess('Project created successfully');
  };

  const handleUpdateStatus = (projectId: string, newStatus: ProjectStatus) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, status: newStatus, progress: newStatus === 'COMPLETED' ? 100 : p.progress } : p
    ));
    showSuccess('Status updated');
  };

  const handleDelete = (id: string) => {
    setSelectedProjectId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setProjects(projects.filter(p => p.id !== selectedProjectId));
    setIsDeleteModalOpen(false);
    showSuccess('Project deleted successfully');
  };

  const handleEdit = (id: string) => {
    // Currently relying on Create Project Modal, ideally would populate it
    showSuccess('Edit mode activated (Mocked for current layout)');
  };

  return (
    <div className="space-y-6">
      {successMessage && (
        <div className="fixed top-6 right-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-3 z-[9999] shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={20} className="text-emerald-500" />
          <span className="font-semibold text-sm">{successMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <Card className="flex justify-between items-center p-5">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Project Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track your organization's projects</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-secondary p-1 rounded-lg border border-border">
            <button
              onClick={() => setView('KANBAN')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                view === 'KANBAN' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LayoutGrid size={16} />
              Kanban
            </button>
            <button
              onClick={() => setView('TABLE')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                view === 'TABLE' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <List size={16} />
              Table
            </button>
          </div>
          <Button
            size="sm"
            className="gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} />
            New Project
          </Button>
        </div>
      </Card>

      {/* Grid Content */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          {view === 'KANBAN' ? (
            <KanbanView projects={projects} onUpdateStatus={handleUpdateStatus} />
          ) : (
            <Card className="p-0 overflow-hidden">
              <TableView projects={projects} onDelete={handleDelete} onEdit={handleEdit} />
            </Card>
          )}
        </div>
      </div>

      {isModalOpen && (
        <CreateProjectModal 
          onClose={() => setIsModalOpen(false)} 
          onCreate={handleCreateProject}
        />
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[1100]">
          <Card className="w-[420px] p-6 shadow-2xl">
            <h3 className="text-lg font-medium text-foreground mb-2">Delete Project</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Are you sure you want to delete this project? This action is permanent and cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
              >
                Delete Project
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
