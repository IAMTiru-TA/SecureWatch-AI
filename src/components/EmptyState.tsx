import React from "react";
import { ShieldAlert } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  onClear?: () => void;
}

export default function EmptyState({ title = "No threats found", message = "No security events match the current search filters or category selections.", onClear }: EmptyStateProps) {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem 1.5rem",
    textAlign: "center",
    gap: "1rem",
    maxWidth: "400px",
    margin: "0 auto",
  };

  return (
    <div className="glass-card" style={containerStyle}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "rgba(0, 240, 255, 0.05)",
        border: "1px solid rgba(0, 240, 255, 0.15)",
        color: "var(--accent)",
        marginBottom: "0.5rem",
        boxShadow: "0 0 20px rgba(0, 240, 255, 0.05)"
      }}>
        <ShieldAlert size={30} />
      </div>
      
      <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>
        {title}
      </h3>
      
      <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
        {message}
      </p>
      
      {onClear && (
        <button 
          onClick={onClear}
          className="btn btn-secondary" 
          style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
