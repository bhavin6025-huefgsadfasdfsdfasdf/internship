'use client';

import React, { useState } from 'react';
import { Clock, CheckCircle2, Search } from 'lucide-react';

const mockAdmins = [
  { id: '1', name: 'Sarah Jenkins', email: 'sarah@techcorp.com', company: 'TechCorp Inc.', duration: 12 },
  { id: '2', name: 'Michael Torres', email: 'michael@nexgen.io', company: 'NexGen Solutions', duration: 6 },
  { id: '3', name: 'David Park', email: 'david@globalfirm.com', company: 'Global Firm', duration: 24 },
];

export default function SetAdminDurationPage() {
  const [admins, setAdmins] = useState(mockAdmins);
  const [saved, setSaved] = useState<string | null>(null);

  const handleSave = (id: string) => {
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-8">
      {saved && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl shadow-lg">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-medium">Duration updated successfully!</span>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Set Admin Duration</h1>
        <p className="text-slate-400 text-sm">Configure access duration for admin accounts (in months).</p>
      </div>

      <div className="flex flex-col gap-4">
        {admins.map(admin => (
          <div key={admin.id} className="bg-slate-800/50 border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">
                {admin.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white">{admin.name}</p>
                <p className="text-xs text-slate-400">{admin.email} · {admin.company}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number" min="1" max="60"
                  value={admin.duration}
                  onChange={e => setAdmins(admins.map(a => a.id === admin.id ? { ...a, duration: Number(e.target.value) } : a))}
                  className="w-28 bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <span className="text-sm text-slate-400">months</span>
              <button
                onClick={() => handleSave(admin.id)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
