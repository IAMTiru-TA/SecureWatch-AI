import React from "react";

interface SeverityBadgeProps {
  severity: "low" | "medium" | "high" | "critical";
}

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
  const styles: Record<string, React.CSSProperties> = {
    badge: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.25rem 0.75rem",
      borderRadius: "var(--radius-full)",
      fontSize: "0.75rem",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      boxShadow: `0 0 10px var(--severity-${severity}-bg)`,
      backgroundColor: `var(--severity-${severity}-bg)`,
      color: `var(--severity-${severity})`,
      border: `1px solid rgba(255, 255, 255, 0.05)`,
    },
  };

  return <span style={styles.badge}>{severity}</span>;
}
