import React from "react";

interface CategoryBadgeProps {
  category: string;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const getCategoryClass = () => {
    switch (category) {
      case "Network":
        return {
          bg: "var(--cat-network-bg)",
          color: "var(--cat-network)",
        };
      case "IoT Security":
        return {
          bg: "var(--cat-iot-bg)",
          color: "var(--cat-iot)",
        };
      case "Access Control":
        return {
          bg: "var(--cat-access-bg)",
          color: "var(--cat-access)",
        };
      case "System Health":
        return {
          bg: "var(--cat-system-bg)",
          color: "var(--cat-system)",
        };
      default:
        return {
          bg: "rgba(255, 255, 255, 0.1)",
          color: "var(--text-muted)",
        };
    }
  };

  const colors = getCategoryClass();

  const badgeStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.25rem 0.6rem",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.75rem",
    fontWeight: 600,
    backgroundColor: colors.bg,
    color: colors.color,
    border: `1px solid rgba(255, 255, 255, 0.05)`,
  };

  return <span style={badgeStyle}>{category}</span>;
}
