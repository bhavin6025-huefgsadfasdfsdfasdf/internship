'use client';

import React from 'react';
import { Folder, Plus } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const mockProjects = [
  { id: '1', name: 'Q2 Marketing Campaign', status: 'In Progress', tasks: 12, members: 5, due: 'Apr 30, 2026' },
  { id: '2', name: 'Platform Redesign', status: 'Planning', tasks: 8, members: 3, due: 'May 15, 2026' },
  { id: '3', name: 'Backend Migration', status: 'In Progress', tasks: 20, members: 7, due: 'Jun 1, 2026' },
  { id: '4', name: 'Client Onboarding Flow', status: 'Completed', tasks: 6, members: 2, due: 'Mar 20, 2026' },
];

const statusColors: Record<string, string> = {
  'In Progress': 'bg-primary/10 text-primary',
  'Planning': 'bg-amber-50 text-amber-600',
  'Completed': 'bg-emerald-50 text-emerald-600',
};

export default function ManagerProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track all team projects.</p>
        </div>
        <Link href="/manager/create-task">
          <Button size="sm" className="gap-2">
            <Plus size={16} /> New Task
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockProjects.map(proj => (
          <Card key={proj.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Folder className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground text-sm">{proj.name}</h3>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[proj.status]}`}>{proj.status}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-4 pt-3 border-t border-border/50">
              <span>{proj.tasks} tasks</span>
              <span>{proj.members} members</span>
              <span>Due: {proj.due}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
