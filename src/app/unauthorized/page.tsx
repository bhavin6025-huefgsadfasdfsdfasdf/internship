'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldOff, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center">
            <ShieldOff className="w-10 h-10 text-red-500" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-3">403</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Access Denied</h2>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          You don&apos;t have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link href="/" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Go to Dashboard
          </Link>
          <button onClick={() => window.history.back()} className="px-5 py-2.5 border border-gray-200 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors text-sm">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
