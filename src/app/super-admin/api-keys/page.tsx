'use client';
import React from 'react';
export default function ApiKeysPage() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[60vh] flex flex-col items-center justify-center p-12 text-center transition-all hover:shadow-md">
          <div className="w-20 h-20 bg-[#5B6CFF]/10 rounded-full flex items-center justify-center text-[#5B6CFF] mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3L15.5 7.5z"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">API Key Management</h2>
          <p className="text-slate-500 max-w-md leading-relaxed">
            Manage your secure access tokens and API integrations. We are currently implementing a new RBAC-based token system for enhanced security.
          </p>
          <div className="mt-8 flex gap-3">
             <button className="bg-[#5B6CFF] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all hover:bg-[#4A5AEF] active:scale-95">
              Generate New Key
            </button>
            <button className="bg-white text-slate-600 border border-slate-200 px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:bg-slate-50 active:scale-95">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
