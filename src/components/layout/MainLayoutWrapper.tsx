"use client";

import React from "react";

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Now just a lightweight wrapper to provide global styles or minimal context.
  // The Sidebar and Navbar have been moved to role-specific DashboardLayouts
  // for better performance and server-side optimization.
  return (
    <main className="min-h-screen bg-background selection:bg-primary/10">
      {children}
    </main>
  );
}
