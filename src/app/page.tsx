"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Activity, Cpu, BellRing, Lock } from "lucide-react";

export default function HomePage() {
  return (
    <div style={{
      minHeight: "calc(100vh - 70px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      padding: "3rem 1.5rem",
    }}>
      {/* Background glow effects */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "15%",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0, 114, 245, 0.15) 0%, transparent 70%)",
        filter: "blur(40px)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        bottom: "20%",
        right: "15%",
        width: "350px",
        height: "350px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, transparent 70%)",
        filter: "blur(50px)",
        pointerEvents: "none"
      }} />

      {/* Grid Pattern Background overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        pointerEvents: "none"
      }} />

      {/* Hero Content Container */}
      <div style={{
        maxWidth: "900px",
        width: "100%",
        textAlign: "center",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem"
      }}>
        {/* Glow Tag */}
        <div className="glass-card" style={{
          padding: "0.5rem 1rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          borderRadius: "var(--radius-full)",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "var(--accent)",
          borderColor: "rgba(0, 240, 255, 0.2)",
          backgroundColor: "rgba(0, 240, 255, 0.03)",
          boxShadow: "0 0 15px rgba(0, 240, 255, 0.05)"
        }}>
          <Activity size={14} style={{ animation: "pulse 2s infinite" }} />
          Next-Gen AI Sentinel Guard Active
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          background: "linear-gradient(135deg, #ffffff 30%, #a5b4fc 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          SecureWatch <span style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
          color: "var(--text-muted)",
          maxWidth: "650px",
          lineHeight: 1.6,
          fontWeight: 500
        }}>
          AI-powered Cybersecurity & Smart Home Threat Monitoring Platform.
        </p>

        {/* Buttons */}
        <div style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "1rem"
        }}>
          <Link href="/dashboard" className="btn btn-primary">
            View Dashboard
            <ArrowRight size={18} />
          </Link>
          <Link href="/about" className="btn btn-secondary">
            Learn More
          </Link>
        </div>

        {/* Features Preview Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          width: "100%",
          marginTop: "4rem"
        }}>
          <div className="glass-card" style={{ padding: "1.5rem", textAlign: "left", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ color: "var(--accent)", marginBottom: "0.5rem" }}><Cpu size={24} /></div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>AI Summary</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>Automatically scan logs, extract core threats, and generate natural language mitigations.</p>
          </div>
          <div className="glass-card" style={{ padding: "1.5rem", textAlign: "left", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ color: "var(--primary)", marginBottom: "0.5rem" }}><Lock size={24} /></div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>Smart Home Shield</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>Monitor smart locks, cameras, and IoT gateways from a single high-performance dashboard.</p>
          </div>
          <div className="glass-card" style={{ padding: "1.5rem", textAlign: "left", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ color: "var(--severity-critical)", marginBottom: "0.5rem" }}><BellRing size={24} /></div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>Real-Time Alerts</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>Color-coded severities, localized containment jamming, and instant push signals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
