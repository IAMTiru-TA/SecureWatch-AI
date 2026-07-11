"use client";

import React from "react";
import Link from "next/link";
import { Check, MailOpen, AlertCircle, ExternalLink } from "lucide-react";
import SeverityBadge from "./SeverityBadge";
import CategoryBadge from "./CategoryBadge";
import { Alert } from "../types/alert";

interface AlertTableProps {
  alerts: Alert[];
  onToggleRead: (id: string, e: React.MouseEvent) => void;
}

export default function AlertTable({ alerts, onToggleRead }: AlertTableProps) {
  return (
    <div className="glass-card" style={{ overflow: "hidden", border: "1px solid var(--card-border)" }}>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: "120px" }}>Severity</th>
              <th style={{ width: "140px" }}>Category</th>
              <th>Title</th>
              <th style={{ width: "180px" }}>Published</th>
              <th style={{ width: "150px" }}>Source</th>
              <th style={{ width: "100px", textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr 
                key={alert.id} 
                className={alert.read ? "read" : "unread"}
                style={{
                  borderLeft: alert.read ? "2px solid transparent" : "2px solid var(--accent)",
                }}
              >
                <td>
                  <SeverityBadge severity={alert.severity} />
                </td>
                <td>
                  <CategoryBadge category={alert.category} />
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Link 
                      href={`/alerts/${alert.id}`}
                      style={{ 
                        color: "var(--text)", 
                        textDecoration: "none", 
                        transition: "color var(--transition-fast)" 
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
                    >
                      {alert.title}
                    </Link>
                    {!alert.read && (
                      <span style={{
                        display: "inline-block",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "var(--accent)",
                        boxShadow: "0 0 8px var(--accent)"
                      }} />
                    )}
                  </div>
                </td>
                <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  {alert.published}
                </td>
                <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  <code>{alert.source}</code>
                </td>
                <td style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", alignItems: "center" }}>
                    <button
                      onClick={(e) => onToggleRead(alert.id, e)}
                      title={alert.read ? "Mark as unread" : "Mark as read"}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: alert.read ? "var(--text-muted)" : "var(--accent)",
                        padding: "0.35rem",
                        borderRadius: "var(--radius-sm)",
                        backgroundColor: alert.read ? "transparent" : "rgba(0, 240, 255, 0.08)",
                        transition: "all var(--transition-fast)",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      {alert.read ? <MailOpen size={15} /> : <Check size={15} />}
                    </button>
                    
                    <Link
                      href={`/alerts/${alert.id}`}
                      title="View Details"
                      style={{
                        color: "var(--text-muted)",
                        padding: "0.35rem",
                        borderRadius: "var(--radius-sm)",
                        transition: "all var(--transition-fast)",
                        display: "flex",
                        alignItems: "center"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                    >
                      <ExternalLink size={15} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
