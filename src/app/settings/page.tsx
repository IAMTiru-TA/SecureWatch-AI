"use client";

import React, { useState } from "react";
import { Save, RefreshCw, Volume2, ShieldCheck, Cpu, HardDrive } from "lucide-react";
import { useAlerts } from "../../context/AlertsContext";

export default function SettingsPage() {
  const { resetAlerts } = useAlerts();
  
  // Settings states
  const [scanInterval, setScanInterval] = useState("5");
  const [minSeverity, setMinSeverity] = useState("medium");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveMessage("Settings saved successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const formGroupStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "100%",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "var(--text-muted)",
  };

  const selectStyle: React.CSSProperties = {
    backgroundColor: "var(--input-bg)",
    border: "1px solid var(--input-border)",
    padding: "0.75rem 1rem",
    borderRadius: "var(--radius-md)",
    fontSize: "0.9rem",
    outline: "none",
    color: "var(--text)",
    cursor: "pointer",
    width: "100%",
  };

  const toggleContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 0",
    borderBottom: "1px solid var(--table-border)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.25rem", letterSpacing: "-0.01em" }}>
          Platform Settings
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Configure AI telemetry scan patterns and notification dispatch targets.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        
        {/* Telemetry settings card */}
        <div className="glass-card" style={{ padding: "2rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Cpu size={20} style={{ color: "var(--accent)" }} />
            Sensor Telemetry
          </h2>
          
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>AI Threat Scan Interval</label>
              <select 
                value={scanInterval} 
                onChange={(e) => setScanInterval(e.target.value)}
                style={selectStyle}
              >
                <option value="5">Every 5 Seconds (Real-time)</option>
                <option value="10">Every 10 Seconds</option>
                <option value="30">Every 30 Seconds</option>
                <option value="60">Every 1 Minute</option>
              </select>
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Minimum Audit Severity Logged</label>
              <select 
                value={minSeverity} 
                onChange={(e) => setMinSeverity(e.target.value)}
                style={selectStyle}
              >
                <option value="low">Low & Above (All Logs)</option>
                <option value="medium">Medium & Above</option>
                <option value="high">High & Above</option>
                <option value="critical">Critical Only</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: "0.5rem", alignSelf: "flex-start" }}>
              <Save size={16} />
              Save Configurations
            </button>

            {saveMessage && (
              <span style={{ fontSize: "0.85rem", color: "#10b981", fontWeight: 600 }}>
                {saveMessage}
              </span>
            )}
          </form>
        </div>

        {/* Notifications and audio settings card */}
        <div className="glass-card" style={{ padding: "2rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Volume2 size={20} style={{ color: "var(--primary)" }} />
            Alert Dispatch & Audio
          </h2>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={toggleContainerStyle}>
              <div>
                <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>Audible Incident Alarms</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>Play siren/sound on critical breaches</div>
              </div>
              <input 
                type="checkbox" 
                checked={soundEnabled} 
                onChange={(e) => setSoundEnabled(e.target.checked)}
                style={{ width: "36px", height: "18px", cursor: "pointer" }}
              />
            </div>

            <div style={toggleContainerStyle}>
              <div>
                <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>Desktop Push Dispatches</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>Show browser notification cards</div>
              </div>
              <input 
                type="checkbox" 
                checked={pushEnabled} 
                onChange={(e) => setPushEnabled(e.target.checked)}
                style={{ width: "36px", height: "18px", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>

        {/* Database administration card */}
        <div className="glass-card" style={{ padding: "2rem", gridColumn: "1 / -1" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <HardDrive size={20} style={{ color: "var(--severity-critical)" }} />
            Telemetry Database Administration
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem", lineHeight: 1.5 }}>
            Since the SecureWatch AI application does not connect to a production backend yet, data is saved locally inside your browser's Local Storage. If you modify or dismiss threats, you can reset the telemetry cache here.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button 
              onClick={() => {
                resetAlerts();
                alert("Telemetry Database state has been reset to defaults!");
              }} 
              className="btn btn-secondary"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <RefreshCw size={15} />
              Reset Telemetry Database
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
