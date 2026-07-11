import React from "react";
import Link from "next/link";
import { ArrowRight, Eye, CheckCircle, ShieldAlert } from "lucide-react";
import SeverityBadge from "./SeverityBadge";
import CategoryBadge from "./CategoryBadge";
import { Alert } from "../types/alert";

interface AlertCardProps {
  alert: Alert;
  onToggleRead: (id: string, e: React.MouseEvent) => void;
}

export default function AlertCard({ alert, onToggleRead }: AlertCardProps) {
  return (
    <div className="glass-card" style={{
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      borderLeft: alert.read ? "1px solid var(--card-border)" : "3px solid var(--accent)",
      position: "relative",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <SeverityBadge severity={alert.severity} />
          <CategoryBadge category={alert.category} />
        </div>
        
        <button
          onClick={(e) => onToggleRead(alert.id, e)}
          title={alert.read ? "Mark as unread" : "Mark as read"}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: alert.read ? "var(--text-muted)" : "var(--accent)",
            display: "flex",
            alignItems: "center",
            padding: "0.25rem",
            borderRadius: "var(--radius-sm)",
            backgroundColor: alert.read ? "transparent" : "rgba(0, 240, 255, 0.05)",
            transition: "all var(--transition-fast)"
          }}
        >
          {alert.read ? <Eye size={16} /> : <CheckCircle size={16} />}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <h4 style={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.4 }}>
          {alert.title}
        </h4>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineClamp: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.5 }}>
          {alert.summary}
        </p>
      </div>

      <div style={{
        marginTop: "auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid var(--table-border)",
        paddingTop: "0.75rem",
        fontSize: "0.75rem",
        color: "var(--text-muted)"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          <span>Source: <strong style={{ color: "var(--text)" }}>{alert.source}</strong></span>
          <span>{alert.published}</span>
        </div>

        <Link href={`/alerts/${alert.id}`} style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          color: "var(--primary)",
          fontWeight: 600,
          transition: "color var(--transition-fast)"
        }} className="card-link">
          Details
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
