'use client';

import React, { useState } from 'react';
import { Settings2, Server, Shield, Bell, CheckCircle2 } from 'lucide-react';

export default function SystemConfigPage() {
  const [config, setConfig] = useState({
    maxUsers: 500,
    sessionTimeout: 30,
    maintenanceMode: false,
    twoFactorRequired: true,
    emailNotifications: true,
    maxStorageGB: 100,
    apiRateLimit: 1000,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof typeof config) => setConfig(c => ({ ...c, [key]: !c[key] }));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-8">
      {saved && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl shadow-lg">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-medium">System config saved!</span>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">System Configuration</h1>
        <p className="text-slate-400 text-sm">Manage global system settings and limits.</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Server Settings */}
        <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white mb-5"><Server className="w-5 h-5 text-blue-400" />Server Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Max Users (per company)', key: 'maxUsers' as const },
              { label: 'Session Timeout (minutes)', key: 'sessionTimeout' as const },
              { label: 'Max Storage (GB)', key: 'maxStorageGB' as const },
              { label: 'API Rate Limit (req/hr)', key: 'apiRateLimit' as const },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
                <input
                  type="number"
                  value={config[key] as number}
                  onChange={e => setConfig(c => ({ ...c, [key]: Number(e.target.value) }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white mb-5"><Shield className="w-5 h-5 text-purple-400" />Security & Notifications</h2>
          <div className="divide-y divide-white/5">
            {[
              { label: 'Maintenance Mode', desc: 'Block all user logins and show maintenance page.', key: 'maintenanceMode' as const, danger: true },
              { label: '2FA Required (All Users)', desc: 'Force two-factor authentication for every user.', key: 'twoFactorRequired' as const },
              { label: 'Email Notifications', desc: 'Send system alerts and event emails.', key: 'emailNotifications' as const },
            ].map(({ label, desc, key, danger }) => (
              <div key={key} className="flex items-center justify-between py-4">
                <div>
                  <p className={`font-medium text-sm ${danger ? 'text-red-400' : 'text-white'}`}>{label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                </div>
                <button
                  onClick={() => toggle(key)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${config[key] ? (danger ? 'bg-red-500' : 'bg-blue-500') : 'bg-slate-600'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${config[key] ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSave} className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm">
          Save Configuration
        </button>
      </div>
    </div>
  );
}
