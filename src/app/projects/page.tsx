'use client';

import React, { useState } from 'react';
import { 
  LayoutGrid, 
  List, 
  Plus, 
  CheckCircle2, 
  Search, 
  Filter, 
  MoreHorizontal,
  Briefcase,
  Users,
  Calendar,
  Layers,
  Trash2
} from 'lucide-react';
import KanbanView from '@/components/projects/KanbanView';
import TableView from '@/components/projects/TableView';
import CreateProjectModal from '@/components/projects/CreateProjectModal';
import { Card, CardContent } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

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
  const [searchQuery, setSearchQuery] = useState('');

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
    showSuccess('Edit mode activated (Mocked)');
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.manager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {successMessage && (
        <div className="fixed top-24 right-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3 z-50 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={20} className="text-green-500" />
          <span className="font-bold text-sm tracking-tight">{successMessage}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
               <Briefcase size={20} />
             </div>
             <Typography variant="h2" display>Portfolio Management</Typography>
          </div>
          <Typography variant="p" className="text-muted-foreground mt-1 px-1">
            Across-the-board visibility into all organizational projects and deliverables.
          </Typography>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex bg-muted/30 p-1 rounded-xl border border-border">
             <Button 
                variant="ghost" 
                size="sm" 
                className={`gap-2 h-9 px-4 font-bold text-[11px] uppercase tracking-wider transition-all ${view === 'KANBAN' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                onClick={() => setView('KANBAN')}
              >
                <LayoutGrid size={16} />
                Kanban
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`gap-2 h-9 px-4 font-bold text-[11px] uppercase tracking-wider transition-all ${view === 'TABLE' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                onClick={() => setView('TABLE')}
              >
                <List size={16} />
                Matrix
              </Button>
          </div>
          <Button className="gap-2 px-6 shadow-md h-11" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            Develop Project
          </Button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Live Projects', count: projects.length, icon: Layers, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'In Progress', count: projects.filter(p => p.status === 'IN PROGRESS').length, icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Completed', count: projects.filter(p => p.status === 'COMPLETED').length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Team Members', count: 24, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <Card key={i} className="p-4 border-border/60 hover:border-primary/20 transition-all cursor-default group bg-background">
             <div className="flex items-center justify-between">
                <div>
                   <Typography variant="small" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">{stat.label}</Typography>
                   <Typography variant="h3" className="mb-0 mt-1">{stat.count}</Typography>
                </div>
                <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                   <stat.icon size={20} />
                </div>
             </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 saas-card p-4 border border-border/40 bg-muted/5">
        <div className="relative flex-1 min-w-[300px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search projects by title or lead manager..." 
            className="pl-10 h-11 border-border/50 focus:bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 h-11 px-5 border-border/50 shadow-sm font-bold text-xs">
            <Filter size={16} />
            Advanced Filtering
          </Button>
          <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl">
             <MoreHorizontal size={18} />
          </Button>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {view === 'KANBAN' ? (
          <KanbanView projects={filteredProjects} onUpdateStatus={handleUpdateStatus} />
        ) : (
          <TableView projects={filteredProjects} onDelete={handleDelete} onEdit={handleEdit} />
        )}
      </div>

      {isModalOpen && (
        <CreateProjectModal 
          onClose={() => setIsModalOpen(false)} 
          onCreate={handleCreateProject}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-8 border border-border shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2 border border-red-100">
                <Trash2 size={32} />
              </div>
              <Typography variant="h3" className="mb-0">Permanent Removal?</Typography>
              <Typography variant="p" className="text-muted-foreground text-sm leading-relaxed">
                You are about to delete this project and all associated task history. This action cannot be reversed.
              </Typography>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 font-bold" onClick={() => setIsDeleteModalOpen(false)}>No, archive it</Button>
              <Button variant="destructive" className="flex-1 font-bold bg-red-600 hover:bg-red-700 shadow-md" onClick={confirmDelete}>Yes, delete it</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
