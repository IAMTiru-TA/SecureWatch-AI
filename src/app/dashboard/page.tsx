"use client";

import React, { useState, useEffect } from "react";
import { Eye, ShieldAlert, AlertTriangle, Clock, RefreshCw } from "lucide-react";
import { useAlerts } from "../../context/AlertsContext";
import StatCard from "../../components/StatCard";
import SearchBar from "../../components/SearchBar";
import AlertTable from "../../components/AlertTable";
import EmptyState from "../../components/EmptyState";
import LoadingSkeleton from "../../components/LoadingSkeleton";

export default function DashboardPage() {
  const { alerts, toggleRead, resetAlerts, unreadCount } = useAlerts();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Simulate dashboard data load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter alerts by search query
  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Compute stats dynamically
  const totalAlerts = alerts.length;
  const highSeverityAlerts = alerts.filter(
    (alert) => alert.severity.toLowerCase() === "high" || alert.severity.toLowerCase() === "critical"
  ).length;

  const getNewestAlertTime = () => {
    if (alerts.length === 0) return "N/A";
    let newestTime = 0;
    let newestStr = "";
    for (const alert of alerts) {
      const dateStr = alert.published || alert.publishedAt;
      if (!dateStr) continue;
      const t = new Date(dateStr).getTime();
      if (t > newestTime) {
        newestTime = t;
        newestStr = dateStr;
      }
    }
    return newestStr || "N/A";
  };

  const lastScanTime = getNewestAlertTime();

  const handleToggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleRead(id);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.25rem" }}>Security Command Center</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Loading real-time sensor streams...</p>
        </div>
        <LoadingSkeleton type="stats" />
        <LoadingSkeleton type="table" />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Page Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.25rem", letterSpacing: "-0.01em" }}>
            Security Command Center
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Real-time smart home threat telemetry and AI log analysis.
          </p>
        </div>

        {/* Reset Telemetry Database Button */}
        <button
          onClick={resetAlerts}
          className="btn btn-secondary"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1rem", fontSize: "0.85rem" }}
          title="Reset threats list back to telemetry database defaults"
        >
          <RefreshCw size={14} />
          Reset Telemetry Data
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="stats-grid">
        <StatCard
          title="Articles Scanned Today"
          value={totalAlerts}
          icon={<Eye size={22} />}
          trend="Total logs reviewed"
          trendType="neutral"
          color="var(--primary)"
        />
        <StatCard
          title="Security Alerts"
          value={totalAlerts}
          icon={<ShieldAlert size={22} />}
          trend={`${unreadCount} pending review`}
          trendType={unreadCount > 0 ? "negative" : "neutral"}
          color="var(--accent)"
        />
        <StatCard
          title="High Severity Alerts"
          value={highSeverityAlerts}
          icon={<AlertTriangle size={22} />}
          trend={highSeverityAlerts > 0 ? "Active Threats" : "System Secure"}
          trendType={highSeverityAlerts > 0 ? "negative" : "positive"}
          color="var(--severity-high)"
        />
        <StatCard
          title="Last Scan Time"
          value={lastScanTime}
          icon={<Clock size={22} />}
          trend={alerts.length > 0 ? "Timestamp of latest alert" : "No logs recorded"}
          trendType="neutral"
          color="var(--severity-low)"
        />
      </div>

      {/* Table Title and Filters */}
      <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Active Log Alerts</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginTop: "0.15rem" }}>
              Showing {filteredAlerts.length} of {totalAlerts} alerts
            </p>
          </div>
          
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Alerts Table */}
        {filteredAlerts.length > 0 ? (
          <AlertTable alerts={filteredAlerts} onToggleRead={handleToggleRead} />
        ) : (
          <EmptyState onClear={handleClearFilters} />
        )}
      </div>
    </div>
  );
}
