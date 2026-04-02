import React from 'react';
import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
        <FileQuestion className="w-10 h-10 text-primary" />
      </div>
      <h1 className="text-6xl font-semibold text-foreground mb-2">404</h1>
      <h2 className="text-lg font-medium text-muted-foreground mb-6">Page not found</h2>
      <Link
        href="/"
        className="inline-flex items-center justify-center h-10 px-4 min-w-[100px] bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
