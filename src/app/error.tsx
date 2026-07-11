"use client";

import React, { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Route Error Boundary caught an exception:", error);
  }, [error]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50vh",
      padding: "2rem",
      textAlign: "center",
      gap: "1.5rem"
    }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Something went wrong!</h2>
      <p style={{ color: "var(--text-muted)", maxWidth: "450px", fontSize: "0.95rem" }}>
        {error.message || "An unexpected error occurred in this section of the application."}
      </p>
      <button
        onClick={() => reset()}
        className="btn btn-primary"
      >
        Try Again
      </button>
    </div>
  );
}
