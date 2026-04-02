'use client';

import React, { useState } from 'react';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EmployeeUpdateTaskPage() {
  const [form, setForm] = useState({ status: 'in-progress', progress: '40', notes: '', blockers: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {success && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl shadow-lg">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-medium">Task updated successfully!</span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <Link href="/employee/tasks" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tasks
        </Link>
      </div>

      <h1 className="page-title">Update Task</h1>

      <div className="table-container p-6" style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontWeight: '700', fontSize: '16px', color: 'var(--text-main)' }}>Update API Documentation</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>SaaS Platform · Due: 2026-04-10</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
              style={{ width: '100%', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', outline: 'none', backgroundColor: '#F9FAFB' }}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Progress ({form.progress}%)</label>
            <input type="range" min="0" max="100" value={form.progress} onChange={e => setForm({ ...form, progress: e.target.value })}
              style={{ width: '100%', accentColor: 'var(--primary)' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Update Notes</label>
            <textarea rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="What did you accomplish..."
              style={{ width: '100%', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', outline: 'none', resize: 'none', backgroundColor: '#F9FAFB' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Blockers (if any)</label>
            <textarea rows={2} value={form.blockers} onChange={e => setForm({ ...form, blockers: e.target.value })} placeholder="Any issues blocking progress..."
              style={{ width: '100%', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', outline: 'none', resize: 'none', backgroundColor: '#F9FAFB' }} />
          </div>

          <button type="submit" className="btn-primary" style={{ height: '44px', fontSize: '14px' }}>Submit Update</button>
        </form>
      </div>
    </div>
  );
}
