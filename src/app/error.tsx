'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home, LifeBuoy } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Application Error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <Card className="max-w-md w-full p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
            <AlertTriangle size={32} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Something went wrong</h2>
            <p className="text-sm text-gray-600">
              We encountered an error while rendering this page. Our team has been notified.
            </p>
          </div>

          <div className="w-full bg-secondary p-3 rounded-lg border border-border">
            <p className="text-xs text-gray-400 mb-1">Error</p>
            <p className="text-xs text-rose-600 font-mono break-all">
              {error.message || 'Unknown error'}
            </p>
          </div>
          
          <div className="flex flex-col w-full gap-2">
            <Button onClick={() => reset()} className="w-full gap-2">
              <RefreshCcw size={16} />
              Try Again
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => window.location.href = '/'} className="flex-1 gap-2">
                <Home size={14} />
                Home
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <LifeBuoy size={14} />
                Support
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
