'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';

export default function AdminLeavesPage() {
  return (
    <div className="flex flex-col gap-6">
      <Typography variant="h2" display>Leave Management</Typography>
      
      <Card className="flex items-center justify-center min-h-[60vh]">
        <CardContent className="text-center">
          <Typography variant="h3" className="mb-2">Leaves Module</Typography>
          <Typography variant="p" className="text-muted-foreground mt-0">
            This module is currently under development.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
