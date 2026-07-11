"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import { Bell, Sun, Moon, Menu, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
  unreadCount: number;
}

export default function Navbar({ onMenuClick, unreadCount }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  const navbarStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    right: 0,
    left: 0,
    height: "70px",
    backgroundColor: "var(--navbar-bg)",
    borderBottom: "1px solid var(--navbar-border)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2rem",
    zIndex: 900,
  };

  const menuButtonStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--text)",
    padding: "0.5rem",
    borderRadius: "var(--radius-sm)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "1rem"
  };

  const navIconBtnStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--text-muted)",
    padding: "0.5rem",
    borderRadius: "var(--radius-sm)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    transition: "color var(--transition-fast)"
  };

  const avatarStyle: React.CSSProperties = {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "0.85rem",
    border: "2px solid var(--card-border)",
    boxShadow: "0 0 10px rgba(0, 240, 255, 0.15)"
  };

  const responsiveStyles = `
    @media (min-width: 1025px) {
      .navbar-hamburger {
        display: none !important;
      }
    }
    @media (max-width: 640px) {
      .navbar-container {
        padding: 0 1rem !important;
      }
    }
  `;

  return (
    <>
      <style>{responsiveStyles}</style>
      <header className="navbar-container" style={navbarStyle}>
        
        {/* Left Section */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <button 
            className="navbar-hamburger" 
            onClick={onMenuClick}
            style={menuButtonStyle}
          >
            <Menu size={22} />
          </button>
          
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} className="navbar-hamburger">
            <ShieldCheck size={24} style={{ color: "var(--accent)" }} />
            <span style={{ fontWeight: 800, fontSize: "1.05rem" }}>SecureWatch</span>
          </Link>
        </div>

        {/* Right Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            style={navIconBtnStyle}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications Icon with Badge */}
          <Link 
            href="/alerts"
            style={navIconBtnStyle}
            title={`${unreadCount} Unread Alerts`}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span style={{
                position: "absolute",
                top: "2px",
                right: "2px",
                backgroundColor: "var(--severity-critical)",
                color: "#ffffff",
                fontSize: "0.65rem",
                fontWeight: 800,
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 6px var(--severity-critical)",
                animation: "pulse 2s infinite"
              }}>
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Divider */}
          <div style={{ width: "1px", height: "20px", backgroundColor: "var(--navbar-border)" }} />

          {/* Profile Avatar */}
          <div style={avatarStyle} title="User Profile: Admin">
            AD
          </div>
        </div>
      </header>
    </>
  );
}
