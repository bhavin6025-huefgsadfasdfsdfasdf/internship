'use client';
import React from 'react';
export default function BillingPage() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[60vh] flex flex-col items-center justify-center p-12 text-center">
          <div className="w-20 h-20 bg-[#5B6CFF]/10 rounded-full flex items-center justify-center text-[#5B6CFF] mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Billing & Subscriptions</h2>
          <p className="text-slate-500 max-w-md leading-relaxed">
            This module is currently being optimized for high-performance financial tracking. Check back soon for billing management features.
          </p>
          <div className="mt-8 flex gap-3">
            <button className="bg-[#5B6CFF] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all hover:bg-[#4A5AEF]">
              View Pricing Plans
            </button>
            <button className="bg-white text-slate-600 border border-slate-200 px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:bg-slate-50">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
