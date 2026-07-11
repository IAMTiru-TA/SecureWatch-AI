"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Settings, 
  Info, 
  X, 
  ShieldCheck 
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Alerts", href: "/alerts", icon: <ShieldAlert size={20} /> },
    { name: "Settings", href: "/settings", icon: <Settings size={20} /> },
    { name: "About", href: "/about", icon: <Info size={20} /> },
  ];

  const sidebarStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    width: "260px",
    backgroundColor: "var(--sidebar-bg)",
    borderRight: "1px solid var(--sidebar-border)",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    transition: "transform var(--transition-normal)",
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",
  };

  // Add responsive CSS via an embedded style block
  const responsiveStyles = `
    @media (min-width: 1025px) {
      .sidebar-container {
        transform: translateX(0) !important;
      }
      .sidebar-close-btn {
        display: none !important;
      }
      .sidebar-overlay {
        display: none !important;
      }
    }
  `;

  return (
    <>
      <style>{responsiveStyles}</style>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 999,
          }}
        />
      )}

      <aside className="sidebar-container" style={sidebarStyle}>
        {/* Sidebar Header */}
        <div style={{
          padding: "1.5rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--sidebar-border)"
        }}>
          <Link href="/" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "var(--radius-sm)",
              background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
              color: "#fff",
              boxShadow: "0 0 12px var(--primary-glow)"
            }}>
              <ShieldCheck size={22} />
            </div>
            <span style={{ fontSize: "1.15rem", fontWeight: 800, letterSpacing: "-0.01em", background: "linear-gradient(90deg, #fff 0%, var(--text-muted) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              SecureWatch <span style={{ color: "var(--accent)", WebkitTextFillColor: "initial" }}>AI</span>
            </span>
          </Link>
          
          <button 
            className="sidebar-close-btn"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              padding: "0.25rem",
              borderRadius: "var(--radius-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav style={{ flex: 1, padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.85rem 1rem",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.925rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "var(--text)" : "var(--text-muted)",
                  backgroundColor: isActive ? "var(--sidebar-active-bg)" : "transparent",
                  borderLeft: isActive ? "3px solid var(--sidebar-active-border)" : "3px solid transparent",
                  transition: "all var(--transition-fast)",
                }}
                className={isActive ? "active" : ""}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--text)";
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.02)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div style={{
          padding: "1.25rem 1.5rem",
          borderTop: "1px solid var(--sidebar-border)",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem"
        }}>
          <span>System Status: <strong style={{ color: "#10b981" }}>Online</strong></span>
          <span>Version 1.0.4</span>
        </div>
      </aside>
    </>
  );
}
