import React from "react";
import { ShieldCheck, Cpu, Wifi, Eye, Radio, Server } from "lucide-react";

export default function AboutPage() {
  const cardStyle: React.CSSProperties = {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.25rem", letterSpacing: "-0.01em" }}>
          About SecureWatch AI
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Learn about our autonomous smart home vulnerability monitoring and AI-driven mitigation engine.
        </p>
      </div>

      {/* Main Intro Hero card */}
      <div className="glass-card" style={{ padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          top: "-50px",
          left: "-50px",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "var(--accent)",
          opacity: 0.05,
          filter: "blur(40px)",
        }} />

        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <ShieldCheck size={24} style={{ color: "var(--accent)" }} />
          Platform Overview
        </h2>

        <p style={{ fontSize: "0.95rem", color: "var(--text)", lineHeight: 1.7 }}>
          SecureWatch AI represents the next generation of smart home defense. In an era where home automation is growing rapidly, standard domestic routers are ill-equipped to flag intelligent intrusion strategies. By utilizing a hybrid heuristic-network analyzer combined with a local large language model, SecureWatch AI intercepts and classifies telemetry packets across all smart appliances—offering instant visual telemetry, threat diagnostics, and automated confinement actions.
        </p>
      </div>

      {/* System Architecture Section */}
      <div>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1.5rem" }}>Core Monitoring Engines</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          
          <div className="glass-card" style={cardStyle}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "rgba(0, 114, 245, 0.05)",
              border: "1px solid rgba(0, 114, 245, 0.15)",
              color: "var(--primary)",
            }}>
              <Cpu size={22} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>AI Natural Language Log Summarizer</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              Converts complex network frames, buffer dump traces, and binary system failures into natural language event analyses, detailing exactly what happened and recommending immediate physical override mitigations.
            </p>
          </div>

          <div className="glass-card" style={cardStyle}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.15)",
              color: "var(--accent)",
            }}>
              <Radio size={22} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Dual-Band RF & Gateway Monitor</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              Supports tracking Zigbee, Z-Wave, BLE, and standard Wi-Fi sensor telemetry. Automatically flag device masquerading, rogue access points (Evil Twins), and credential brute force campaigns.
            </p>
          </div>

          <div className="glass-card" style={cardStyle}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "rgba(139, 92, 246, 0.05)",
              border: "1px solid rgba(139, 92, 246, 0.15)",
              color: "#8b5cf6",
            }}>
              <Server size={22} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Isolated Local Network Sandbox</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              When a device behaves anomalies (e.g. smart fridge port-scanning, camera uploading data spikes), SecureWatch AI modifies firewall parameters, quarantining the compromised device to a secure sandbox VLAN.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
