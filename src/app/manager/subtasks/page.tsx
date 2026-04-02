'use client';

import React, { useState } from 'react';
import { GitBranch, Plus, CheckCircle2, Circle, Trash2 } from 'lucide-react';

interface Subtask { id: string; title: string; done: boolean; }
const initial: Subtask[] = [
  { id: '1', title: 'Create wireframes', done: true },
  { id: '2', title: 'Get design approval', done: false },
  { id: '3', title: 'Implement frontend', done: false },
];

export default function ManagerSubtasksPage() {
  const [subtasks, setSubtasks] = useState<Subtask[]>(initial);
  const [newTask, setNewTask] = useState('');

  const toggle = (id: string) => setSubtasks(s => s.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = (id: string) => setSubtasks(s => s.filter(t => t.id !== id));
  const add = () => {
    if (!newTask.trim()) return;
    setSubtasks(s => [...s, { id: Date.now().toString(), title: newTask.trim(), done: false }]);
    setNewTask('');
  };

  const done = subtasks.filter(t => t.done).length;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Subtasks</h1>
        <p className="text-gray-500 text-sm mt-1">Break tasks into smaller actionable subtasks.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-gray-900">Platform Redesign — Task #3</span>
          </div>
          <span className="text-xs font-medium text-gray-500">{done}/{subtasks.length} done</span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2 mb-5">
          <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${subtasks.length ? (done / subtasks.length) * 100 : 0}%` }} />
        </div>

        <div className="flex flex-col gap-2 mb-5">
          {subtasks.map(t => (
            <div key={t.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 group transition-colors">
              <button onClick={() => toggle(t.id)} className="shrink-0 text-gray-400 hover:text-blue-500 transition-colors">
                {t.done ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5" />}
              </button>
              <span className={`flex-1 text-sm ${t.done ? 'line-through text-gray-400' : 'text-gray-900'}`}>{t.title}</span>
              <button onClick={() => remove(t.id)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()}
            placeholder="Add new subtask..." className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          <button onClick={add} className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
