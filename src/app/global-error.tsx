"use client";

import React, { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global Error Boundary caught an exception:", error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "2rem",
          backgroundColor: "#030712",
          color: "#f3f4f6",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          gap: "1.5rem"
        }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800 }}>A critical application error occurred</h2>
          <p style={{ color: "#9ca3af", maxWidth: "500px", fontSize: "1rem" }}>
            {error.message || "An unexpected critical error occurred."}
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              fontWeight: 600,
              cursor: "pointer",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              border: "none"
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
