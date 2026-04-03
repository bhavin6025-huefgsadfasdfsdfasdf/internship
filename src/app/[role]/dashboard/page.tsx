"use client";

import React, { useMemo, Suspense } from "react";
import { useParams, notFound } from "next/navigation";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import SuperAdminDashboard from "@/components/dashboard/SuperAdminDashboard";
import ManagerDashboard from "@/components/dashboard/ManagerDashboard";
import EmployeeDashboard from "@/components/dashboard/EmployeeDashboard";

export default function RoleDashboardPage() {
  const params = useParams();
  const role = params.role as string;

  const DashboardComponent = useMemo(() => {
    switch (role) {
      case "admin":
        return AdminDashboard;
      case "super-admin":
        return SuperAdminDashboard;
      case "manager":
        return ManagerDashboard;
      case "employee":
        return EmployeeDashboard;
      default:
        return null;
    }
  }, [role]);

  if (!DashboardComponent) {
    return notFound();
  }

  return (
    <Suspense fallback={<div className="p-20 text-center italic animate-pulse text-gray-400">Loading Dashboard Protocol...</div>}>
      <DashboardComponent />
    </Suspense>
  );
}
