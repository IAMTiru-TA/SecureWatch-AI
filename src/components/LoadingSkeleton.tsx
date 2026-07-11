import React from "react";

interface LoadingSkeletonProps {
  type?: "stats" | "table" | "card";
}

export default function LoadingSkeleton({ type = "table" }: LoadingSkeletonProps) {
  const containerStyle: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const shimmerKeyframes = `
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
  `;

  const itemStyle: React.CSSProperties = {
    background: "linear-gradient(90deg, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite linear",
    borderRadius: "var(--radius-sm)",
  };

  if (type === "stats") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", width: "100%" }}>
        <style>{shimmerKeyframes}</style>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-card" style={{ padding: "1.5rem", height: "130px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ ...itemStyle, width: "60%", height: "16px" }} />
            <div style={{ ...itemStyle, width: "40%", height: "32px" }} />
            <div style={{ ...itemStyle, width: "50%", height: "12px" }} />
          </div>
        ))}
      </div>
    );
  }

  if (type === "card") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", width: "100%" }}>
        <style>{shimmerKeyframes}</style>
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ ...itemStyle, width: "80px", height: "20px" }} />
              <div style={{ ...itemStyle, width: "60px", height: "20px" }} />
            </div>
            <div style={{ ...itemStyle, width: "90%", height: "24px" }} />
            <div style={{ ...itemStyle, width: "100%", height: "60px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto" }}>
              <div style={{ ...itemStyle, width: "100px", height: "14px" }} />
              <div style={{ ...itemStyle, width: "60px", height: "14px" }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <style>{shimmerKeyframes}</style>
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", gap: "1rem", borderBottom: "1px solid var(--table-border)", paddingBottom: "1rem" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ ...itemStyle, flex: 1, height: "16px" }} />
            ))}
          </div>
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} style={{ display: "flex", gap: "1rem", padding: "0.5rem 0" }}>
              <div style={{ ...itemStyle, width: "80px", height: "20px", borderRadius: "var(--radius-full)" }} />
              <div style={{ ...itemStyle, width: "100px", height: "20px" }} />
              <div style={{ ...itemStyle, flex: 2, height: "20px" }} />
              <div style={{ ...itemStyle, flex: 1, height: "20px" }} />
              <div style={{ ...itemStyle, width: "60px", height: "20px" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
