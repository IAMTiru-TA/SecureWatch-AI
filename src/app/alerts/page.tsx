"use client";

import React, { useState, useEffect } from "react";
import { CheckSquare, Grid, List, RefreshCw, Trash2, Filter } from "lucide-react";
import { useAlerts } from "../../context/AlertsContext";
import SeverityBadge from "../../components/SeverityBadge";
import CategoryBadge from "../../components/CategoryBadge";
import SearchBar from "../../components/SearchBar";
import AlertCard from "../../components/AlertCard";
import AlertTable from "../../components/AlertTable";
import EmptyState from "../../components/EmptyState";
import LoadingSkeleton from "../../components/LoadingSkeleton";

type SeverityFilter = "all" | "low" | "medium" | "high" | "critical";
type CategoryFilter = "all" | "Network" | "IoT Security" | "Access Control" | "System Health";
type ReadFilter = "all" | "unread" | "read";

export default function AlertsPage() {
  const { alerts, toggleRead, markAllAsRead, resetAlerts } = useAlerts();
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [readFilter, setReadFilter] = useState<ReadFilter>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleRead(id);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSeverityFilter("all");
    setCategoryFilter("all");
    setReadFilter("all");
  };

  // Filter logic
  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter;
    const matchesCategory = categoryFilter === "all" || alert.category === categoryFilter;
    
    const matchesRead =
      readFilter === "all" ||
      (readFilter === "unread" && !alert.read) ||
      (readFilter === "read" && alert.read);

    return matchesSearch && matchesSeverity && matchesCategory && matchesRead;
  });

  const selectStyle: React.CSSProperties = {
    backgroundColor: "var(--input-bg)",
    border: "1px solid var(--input-border)",
    padding: "0.6rem 1rem",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.85rem",
    outline: "none",
    color: "var(--text)",
    cursor: "pointer",
    minWidth: "140px",
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.25rem" }}>Alerts Log Center</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Filtering audit logs...</p>
        </div>
        <LoadingSkeleton type="card" />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.25rem", letterSpacing: "-0.01em" }}>
            Alerts Log Center
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Comprehensive list of all cybersecurity vulnerabilities and IoT anomalies.
          </p>
        </div>

        {/* Global actions */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            onClick={markAllAsRead}
            className="btn btn-secondary"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.05rem", fontSize: "0.85rem" }}
          >
            <CheckSquare size={14} />
            Mark All Read
          </button>
          
          <button
            onClick={resetAlerts}
            className="btn btn-secondary"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.05rem", fontSize: "0.85rem" }}
            title="Reset dataset defaults"
          >
            <RefreshCw size={14} />
            Reset Data
          </button>
        </div>
      </div>

      {/* Filter and View Panel */}
      <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Search */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search alerts title, source, summary..." />

        {/* Filters and View Toggles */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
          
          {/* Severity Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as SeverityFilter)}
              style={selectStyle}
            >
              <option value="all">All Severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          {/* Category Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
              style={selectStyle}
            >
              <option value="all">All Categories</option>
              <option value="Network">Network</option>
              <option value="IoT Security">IoT Security</option>
              <option value="Access Control">Access Control</option>
              <option value="System Health">System Health</option>
            </select>
          </div>

          {/* Read/Unread Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Status:</span>
            <select
              value={readFilter}
              onChange={(e) => setReadFilter(e.target.value as ReadFilter)}
              style={selectStyle}
            >
              <option value="all">All Statuses</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>

          {/* Divider */}
          <div style={{ width: "1px", height: "24px", backgroundColor: "var(--card-border)", margin: "0 0.25rem" }} />

          {/* View Toggles */}
          <div style={{ display: "inline-flex", gap: "0.25rem", backgroundColor: "rgba(255, 255, 255, 0.03)", padding: "0.25rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--card-border)" }}>
            <button
              onClick={() => setViewMode("grid")}
              style={{
                background: viewMode === "grid" ? "var(--sidebar-active-bg)" : "none",
                border: "none",
                cursor: "pointer",
                padding: "0.35rem",
                borderRadius: "var(--radius-sm)",
                color: viewMode === "grid" ? "var(--primary)" : "var(--text-muted)",
                display: "flex",
                alignItems: "center"
              }}
              title="Grid View"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              style={{
                background: viewMode === "table" ? "var(--sidebar-active-bg)" : "none",
                border: "none",
                cursor: "pointer",
                padding: "0.35rem",
                borderRadius: "var(--radius-sm)",
                color: viewMode === "table" ? "var(--primary)" : "var(--text-muted)",
                display: "flex",
                alignItems: "center"
              }}
              title="Table View"
            >
              <List size={16} />
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      {filteredAlerts.length > 0 ? (
        viewMode === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {filteredAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} onToggleRead={handleToggleRead} />
            ))}
          </div>
        ) : (
          <AlertTable alerts={filteredAlerts} onToggleRead={handleToggleRead} />
        )
      ) : (
        <EmptyState onClear={handleClearFilters} />
      )}
    </div>
  );
}
