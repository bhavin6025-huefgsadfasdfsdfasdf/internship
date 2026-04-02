"use client";

import React from "react";
import { ArrowLeft, Construction } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ 
  title, 
  description = "This feature is currently under development. Our team is working to bring this module online." 
}: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/50">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <Construction size={16} />
            </div>
            <span className="text-xs text-primary font-medium">In Development</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-gray-600 max-w-2xl">{description}</p>
        </div>

        <Link href="/">
          <Button variant="secondary" size="sm" className="gap-2">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Placeholder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <h3 className="text-lg font-medium text-foreground mb-2">Module {i}</h3>
            <p className="text-sm text-muted-foreground mb-4">Resource orchestration layer</p>
            <div className="h-32 bg-secondary rounded-lg border border-dashed border-border flex items-center justify-center">
              <span className="text-xs text-gray-400">Placeholder {i}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
