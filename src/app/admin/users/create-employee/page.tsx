"use client";

import React from "react";
import UserCreateForm from "@/components/forms/UserCreateForm";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function CreateEmployeePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link href="/admin/users">
          <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 bg-white border border-border/20 shadow-sm hover:bg-secondary">
            <ChevronLeft size={20} className="text-muted-foreground" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Employee</h1>
          <p className="text-sm text-muted-foreground italic">Standard User Registration Portal</p>
        </div>
      </div>

      <UserCreateForm type="employee" />
    </div>
  );
}
