'use client';

import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function SuperAdminChangePasswordPage() {
  const [form, setForm] = useState({ current: '', new: '', confirm: '' });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.new !== form.confirm) { setError('New passwords do not match.'); return; }
    if (form.new.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setSuccess(true);
    setForm({ current: '', new: '', confirm: '' });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="flex-1 w-full max-w-lg mx-auto p-4 md:p-8">
      {success && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl shadow-lg">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-medium">Password changed successfully!</span>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Change Password</h1>
        <p className="text-slate-400 text-sm">Update your super admin account password.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-5">
        {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

        {(['current', 'new', 'confirm'] as const).map(field => (
          <div key={field}>
            <label className="block text-sm font-medium text-slate-300 mb-2 capitalize">
              {field === 'current' ? 'Current Password' : field === 'new' ? 'New Password' : 'Confirm New Password'}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={show[field] ? 'text' : 'password'}
                required value={form[field]}
                onChange={e => setForm({ ...form, [field]: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button type="button" onClick={() => setShow({ ...show, [field]: !show[field] })} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                {show[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}

        <button type="submit" className="mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm">
          Update Password
        </button>
      </form>
    </div>
  );
}
