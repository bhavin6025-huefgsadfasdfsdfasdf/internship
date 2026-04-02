'use client';

import React, { useState } from 'react';
import { UserPlus, Mail, Lock, Building2, CheckCircle2 } from 'lucide-react';

export default function CreateAdminPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '', role: 'admin' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setForm({ name: '', email: '', password: '', company: '', role: 'admin' });
  };

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto p-4 md:p-8">
      {success && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl shadow-lg">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-medium">Admin created successfully!</span>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Create New Admin</h1>
        <p className="text-slate-400 text-sm">Add a new admin user to the system.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
          <div className="relative">
            <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="John Doe"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="admin@company.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Temporary Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
              placeholder="Company Name"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
          <select
            value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="admin" className="bg-slate-800">Admin</option>
            <option value="manager" className="bg-slate-800">Manager</option>
          </select>
        </div>

        <button type="submit" className="mt-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm">
          Create Admin
        </button>
      </form>
    </div>
  );
}
