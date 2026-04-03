"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useParams } from "next/navigation";
import { Role } from "@/context/AuthContext";

export default function DynamicRoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const role = params.role as Role;

  const currentRole: "admin" | "manager" | "employee" = 
    role === "super-admin" ? "admin" : 
    (role === "admin" || role === "manager" || role === "employee" ? role : "employee");

  return (
    <DashboardLayout role={currentRole}>
      {children}
    </DashboardLayout>
  );
}
