"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "../context/ThemeContext";
import { AlertsProvider, useAlerts } from "../context/AlertsContext";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { unreadCount } = useAlerts();

  const isLandingPage = pathname === "/";

  if (isLandingPage) {
    return (
      <div className="app-container" style={{ flexDirection: "column" }}>
        {/* Simple marketing header for landing page */}
        <Navbar onMenuClick={() => {}} unreadCount={unreadCount} />
        <main style={{ flex: 1 }}>{children}</main>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* App Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="main-content">
        <Navbar onMenuClick={() => setSidebarOpen(true)} unreadCount={unreadCount} />
        <main className="page-wrapper">{children}</main>
      </div>
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AlertsProvider>
        <AppLayout>{children}</AppLayout>
      </AlertsProvider>
    </ThemeProvider>
  );
}
