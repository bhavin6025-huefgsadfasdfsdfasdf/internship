'use client';

import React from 'react';
import { Settings } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <Card className="min-h-[60vh] flex flex-col items-center justify-center p-12 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
            <Settings size={32} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-3 tracking-tight">System Settings</h2>
          <p className="text-muted-foreground max-w-md leading-relaxed">
            Configure your system-wide preferences, security protocols, and integration hooks. Current development is focused on core security layers.
          </p>
          <div className="mt-8 flex gap-3">
            <Button variant="primary">Edit Preferences</Button>
            <Button variant="secondary">Security Audit</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
