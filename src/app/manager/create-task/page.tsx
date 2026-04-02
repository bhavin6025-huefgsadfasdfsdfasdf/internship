'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ManagerCreateTaskPage() {
  const [form, setForm] = useState({ title: '', description: '', project: '', assignee: '', priority: 'medium', dueDate: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setForm({ title: '', description: '', project: '', assignee: '', priority: 'medium', dueDate: '' });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {success && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl shadow-lg">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-medium">Task created successfully!</span>
        </div>
      )}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Create Task</h1>
        <p className="text-gray-500 text-sm mt-1">Define a new task and assign it to a team member.</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Task Title <span className="text-red-500">*</span></label>
          <input required type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="E.g. Design landing page mockups"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the task..."
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Project</label>
            <select value={form.project} onChange={e => setForm({ ...form, project: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option value="">Select project</option>
              <option>Q2 Marketing Campaign</option>
              <option>Platform Redesign</option>
              <option>Backend Migration</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Assignee</label>
            <select value={form.assignee} onChange={e => setForm({ ...form, assignee: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option value="">Select member</option>
              <option>Alex Rivera</option>
              <option>Sarah Jenkins</option>
              <option>Michael Torres</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Priority</label>
            <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Due Date</label>
            <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
        </div>
        <button type="submit" className="mt-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm">Create Task</button>
      </form>
    </div>
  );
}
