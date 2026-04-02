'use client';

import React, { useState } from 'react';
import { Search, MoreVertical, Shield, Mail, Building2, Calendar } from 'lucide-react';

const mockAdmins = [
  { id: '1', name: 'Sarah Jenkins', email: 'sarah@techcorp.com', company: 'TechCorp Inc.', role: 'Admin', status: 'Active', created: 'Jan 10, 2026' },
  { id: '2', name: 'Michael Torres', email: 'michael@nexgen.io', company: 'NexGen Solutions', role: 'Admin', status: 'Active', created: 'Feb 3, 2026' },
  { id: '3', name: 'Emily Chen', email: 'emily@startupco.com', company: 'StartupCo', role: 'Manager', status: 'Suspended', created: 'Mar 15, 2026' },
  { id: '4', name: 'David Park', email: 'david@globalfirm.com', company: 'Global Firm', role: 'Admin', status: 'Active', created: 'Mar 28, 2026' },
];

export default function AdminListPage() {
  const [search, setSearch] = useState('');
  const filtered = mockAdmins.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8">
      <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Admin List</h1>
          <p className="text-slate-400 text-sm">Manage all admin and manager accounts.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search admins..."
            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-64"
          />
        </div>
      </div>

      <div className="bg-slate-800/50 border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Company</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Role</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Created</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(admin => (
              <tr key={admin.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                      {admin.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{admin.name}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1"><Mail className="w-3 h-3" />{admin.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-sm text-slate-300 flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-500" />{admin.company}</span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="flex items-center gap-1.5 text-sm text-slate-300"><Shield className="w-4 h-4 text-slate-500" />{admin.role}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${admin.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {admin.status}
                  </span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="text-sm text-slate-400 flex items-center gap-1.5"><Calendar className="w-4 h-4" />{admin.created}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-sm">No admins found matching your search.</div>
        )}
      </div>
    </div>
  );
}
