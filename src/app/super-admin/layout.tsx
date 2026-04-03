"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Using 'admin' as a base for Super Admin UI, or customized if needed
  return (
    <DashboardLayout role="admin">
      {children}
    </DashboardLayout>
  );
}
