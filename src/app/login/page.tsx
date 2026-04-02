"use client";

import React from "react";
import Link from "next/link";
import { Shield, Users, Briefcase, UserCog, Leaf, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function MainLoginPage() {
  const roles = [
    {
      title: "Super Admin",
      icon: Shield,
      href: "/super-admin/login",
      description: "Root level system access and infrastructure configuration.",
    },
    {
      title: "Admin",
      icon: UserCog,
      href: "/admin/login",
      description: "Company level management, auditing, and user control.",
    },
    {
      title: "Manager",
      icon: Briefcase,
      href: "/manager/login",
      description: "Team leadership, project oversight, and approvals.",
    },
    {
      title: "Employee",
      icon: Users,
      href: "/employee/login",
      description: "Personal tasks, self-service portal, and daily workflow.",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-12">
        {/* Branding */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
            <Leaf size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-foreground">NoteFlow</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
              Enterprise Resource Planning
            </p>
          </div>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, idx) => (
            <Link key={idx} href={role.href} className="group">
              <Card className="h-full hover:border-primary/30 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-muted-foreground">
                  <role.icon size={24} />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">{role.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
                <div className="flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Access Portal <ArrowRight size={14} />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <Card className="max-w-xl mx-auto border-dashed">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-primary/10 text-primary rounded-lg shrink-0">
              <Shield size={20} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">Secure Access Environment</h4>
              <p className="text-xs text-muted-foreground">
                Development mode active. Use any email/password to explore.
              </p>
            </div>
          </div>
        </Card>

        <p className="text-center text-xs text-gray-400">
          © 2026 NoteFlow AI Systems
        </p>
      </div>
    </div>
  );
}
