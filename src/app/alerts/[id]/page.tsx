"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  ExternalLink, 
  Check, 
  Trash2, 
  Terminal, 
  ShieldAlert, 
  MailOpen, 
  FileText 
} from "lucide-react";
import { useAlerts } from "../../../context/AlertsContext";
import SeverityBadge from "../../../components/SeverityBadge";
import CategoryBadge from "../../../components/CategoryBadge";
import EmptyState from "../../../components/EmptyState";

interface AlertDetailPageProps {
  params: {
    id: string;
  };
}

export default function AlertDetailPage({ params }: AlertDetailPageProps) {
  const { id } = params;
  const { alerts, toggleRead, dismissAlert } = useAlerts();
  const router = useRouter();

  const alert = alerts.find((a) => a.id === id);

  // Helper to extract CVE ID from alert fields
  const extractCveId = () => {
    if (!alert) return null;
    const cveRegex = /\bCVE-\d{4}-\d{4,}\b/i;
    const match = (alert.title && alert.title.match(cveRegex)) ||
                  (alert.summary && alert.summary.match(cveRegex)) ||
                  (alert.details && alert.details.match(cveRegex));
    return match ? match[0].toUpperCase() : null;
  };

  const cveId = extractCveId();

  if (!alert) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <EmptyState 
          title="Alert Not Found" 
          message="The security event you are trying to review does not exist or has been dismissed from the monitoring hub."
        />
        <Link href="/dashboard" className="btn btn-primary">
          Back to Command Center
        </Link>
      </div>
    );
  }

  const handleToggleRead = () => {
    toggleRead(alert.id);
  };

  const handleDismiss = () => {
    dismissAlert(alert.id);
    router.push("/dashboard");
  };

  const detailLabelStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: 600,
    marginBottom: "0.25rem",
  };

  const detailValStyle: React.CSSProperties = {
    fontSize: "0.95rem",
    fontWeight: 600,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      
      {/* Back navigation & general actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <Link 
          href="/dashboard"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--text-muted)",
            fontSize: "0.9rem",
            fontWeight: 600,
            transition: "color var(--transition-fast)"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={handleToggleRead}
            className="btn btn-secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }}
          >
            {alert.read ? <Check size={15} style={{ color: "#10b981" }} /> : <MailOpen size={15} />}
            {alert.read ? "Mark as Unread" : "Mark as Read"}
          </button>
          
          <button
            onClick={handleDismiss}
            className="btn btn-secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", fontSize: "0.85rem", color: "var(--severity-high)", borderColor: "rgba(239, 68, 68, 0.2)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <Trash2 size={15} />
            Dismiss Alert
          </button>
        </div>
      </div>

      {/* Main Alert Card Details */}
      <div className="glass-card" style={{ padding: "2.5rem", display: "flex", flexDirection: "column", gap: "2rem", position: "relative", overflow: "hidden" }}>
        
        {/* Severity glowing corner marker */}
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "8px",
          height: "100%",
          backgroundColor: `var(--severity-${alert.severity})`,
          boxShadow: `0 0 15px var(--severity-${alert.severity}-bg)`
        }} />

        {/* Title area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <SeverityBadge severity={alert.severity} />
            <CategoryBadge category={alert.category} />
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>ID: {alert.id}</span>
          </div>

          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800, lineHeight: 1.25 }}>
            {alert.title}
          </h1>
        </div>

        {/* Metadatas block */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1.5rem",
          padding: "1.25rem",
          borderRadius: "var(--radius-sm)",
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          border: "1px solid var(--card-border)"
        }}>
          <div>
            <div style={detailLabelStyle}>Published Timestamp</div>
            <div style={detailValStyle}>{alert.published}</div>
          </div>
          <div>
            <div style={detailLabelStyle}>Detection Source</div>
            <div style={detailValStyle}><code>{alert.source}</code></div>
          </div>
          <div>
            <div style={detailLabelStyle}>Read Status</div>
            <div style={{ ...detailValStyle, color: alert.read ? "var(--text-muted)" : "var(--accent)" }}>
              {alert.read ? "Reviewed" : "Unread / Pending"}
            </div>
          </div>
        </div>

        {/* AI summary block */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent)" }}>
            <ShieldAlert size={18} />
            AI Threat Analysis & Summary
          </h3>
          <p style={{ fontSize: "1rem", color: "var(--text)", lineHeight: 1.6, padding: "0.5rem 0" }}>
            {alert.summary}
          </p>
        </div>

        {/* Technical log detail */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Terminal size={18} style={{ color: "var(--text-muted)" }} />
            Raw Technical Event Log
          </h3>
          <div style={{
            fontFamily: "monospace",
            fontSize: "0.85rem",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            padding: "1.25rem",
            borderRadius: "var(--radius-sm)",
            color: "#e5e7eb",
            lineHeight: 1.6,
            wordBreak: "break-all",
            whiteSpace: "pre-wrap"
          }}>
            {alert.details}
          </div>
        </div>

        {/* Original Article CTA */}
        <div style={{
          marginTop: "1rem",
          borderTop: "1px solid var(--table-border)",
          paddingTop: "1.5rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "flex-start"
        }}>
          <a
            href={alert.link ? (alert.link.startsWith("=") ? alert.link.substring(1) : alert.link) : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <FileText size={16} />
            View Original Article
            <ExternalLink size={14} />
          </a>

          {cveId && (
            <a
              href={`https://nvd.nist.gov/vuln/detail/${cveId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              <ShieldAlert size={16} />
              CVE Details ({cveId})
              <ExternalLink size={14} />
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
