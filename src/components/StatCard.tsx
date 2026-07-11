import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
  color?: string;
}

export default function StatCard({ title, value, icon, trend, trendType = "neutral", color = "var(--primary)" }: StatCardProps) {
  const getTrendColor = () => {
    if (trendType === "positive") return "#10b981";
    if (trendType === "negative") return "#ef4444";
    return "var(--text-muted)";
  };

  return (
    <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", position: "relative", overflow: "hidden" }}>
      {/* Dynamic Glow Accent */}
      <div 
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: color,
          opacity: 0.08,
          filter: "blur(25px)",
          pointerEvents: "none"
        }}
      />
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.025em" }}>
          {title}
        </span>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "42px",
          height: "42px",
          borderRadius: "var(--radius-sm)",
          backgroundColor: `rgba(255, 255, 255, 0.03)`,
          border: `1px solid rgba(255, 255, 255, 0.06)`,
          color: color,
          boxShadow: `0 0 15px rgba(255, 255, 255, 0.01)`
        }}>
          {icon}
        </div>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <h3 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
          {value}
        </h3>
        {trend && (
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: getTrendColor() }}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
