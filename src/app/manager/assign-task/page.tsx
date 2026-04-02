'use client';

import React, { useState } from 'react';
import { CheckCircle2, UserCheck } from 'lucide-react';

const members = ['Alex Rivera', 'Sarah Jenkins', 'Michael Torres', 'Emily Chen', 'David Park'];
const tasks = ['Design landing page', 'Write API docs', 'Fix login bug', 'Update database schema', 'Review PR #42'];

export default function ManagerAssignTaskPage() {
  const [selected, setSelected] = useState({ task: '', assignee: '', note: '' });
  const [success, setSuccess] = useState(false);

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setSelected({ task: '', assignee: '', note: '' });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {success && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl shadow-lg">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-medium">Task assigned successfully!</span>
        </div>
      )}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Assign Task</h1>
        <p className="text-gray-500 text-sm mt-1">Assign existing tasks to team members.</p>
      </div>
      <form onSubmit={handleAssign} className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Task <span className="text-red-500">*</span></label>
          <select required value={selected.task} onChange={e => setSelected({ ...selected, task: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option value="">Choose a task...</option>
            {tasks.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Assign To <span className="text-red-500">*</span></label>
          <select required value={selected.assignee} onChange={e => setSelected({ ...selected, assignee: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option value="">Choose a member...</option>
            {members.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Assignment Note</label>
          <textarea rows={3} value={selected.note} onChange={e => setSelected({ ...selected, note: e.target.value })} placeholder="Optional note for the assignee..."
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" />
        </div>
        <button type="submit" className="flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm">
          <UserCheck className="w-4 h-4" /> Assign Task
        </button>
      </form>
    </div>
  );
}
