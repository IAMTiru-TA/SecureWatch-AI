"use client";

import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search alerts by title or source..." }: SearchBarProps) {
  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: "400px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem 0.75rem 2.75rem",
    backgroundColor: "var(--input-bg)",
    border: "1px solid var(--input-border)",
    borderRadius: "var(--radius-md)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
  };

  const iconStyle: React.CSSProperties = {
    position: "absolute",
    left: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--text-muted)",
    width: "18px",
    height: "18px",
    pointerEvents: "none",
  };

  return (
    <div style={containerStyle}>
      <Search style={iconStyle} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--input-focus-border)";
          e.target.style.boxShadow = "0 0 10px rgba(0, 240, 255, 0.15)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--input-border)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}
