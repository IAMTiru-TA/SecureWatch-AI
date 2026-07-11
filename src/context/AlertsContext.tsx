"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "../types/alert";

interface AlertsContextType {
  alerts: Alert[];
  unreadCount: number;
  toggleRead: (id: string) => void;
  dismissAlert: (id: string) => void;
  markAllAsRead: () => void;
  resetAlerts: () => void;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export function AlertsProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    async function loadAlerts() {
      try {
        const res = await fetch("/api/alerts");
        if (res.ok) {
          const serverAlerts = await res.json();
          if (Array.isArray(serverAlerts)) {
            let dismissedIds: string[] = [];
            try {
              dismissedIds = JSON.parse(localStorage.getItem("securewatch_dismissed") || "[]");
            } catch (e) {
              // Ignore parse error
            }

            // Filter out server alerts that have been dismissed locally
            const activeServerAlerts = serverAlerts.filter(
              (alert: any) => !dismissedIds.includes(alert.id)
            );

            const savedString = localStorage.getItem("securewatch_alerts");
            if (savedString) {
              try {
                const localAlerts: Alert[] = JSON.parse(savedString);
                const localMap = new Map(localAlerts.map((a) => [a.id, a]));
                const merged = activeServerAlerts.map((sAlert: any) => {
                  const local = localMap.get(sAlert.id);
                  if (local) {
                    return {
                      ...sAlert,
                      read: local.read,
                      isRead: local.isRead,
                    };
                  }
                  return sAlert;
                });
                setAlerts(merged);
                localStorage.setItem("securewatch_alerts", JSON.stringify(merged));
                return;
              } catch (e) {
                // Ignore parse error, fallback to server list
              }
            }

            setAlerts(activeServerAlerts);
            localStorage.setItem("securewatch_alerts", JSON.stringify(activeServerAlerts));
            return;
          }
        }
      } catch (error) {
        console.error("Error loading alerts from backend:", error);
      }

      // Fallback to localStorage or cached alerts in case of fetch/server error
      const saved = localStorage.getItem("securewatch_alerts");
      if (saved) {
        try {
          setAlerts(JSON.parse(saved));
        } catch (e) {
          setAlerts([]);
        }
      } else {
        setAlerts([]);
      }
    }

    loadAlerts();
  }, []);

  const saveAlerts = (newAlerts: Alert[]) => {
    setAlerts(newAlerts);
    localStorage.setItem("securewatch_alerts", JSON.stringify(newAlerts));
  };

  const toggleRead = (id: string) => {
    const updated = alerts.map((alert) => {
      if (alert.id === id) {
        const nextRead = !alert.read;
        return {
          ...alert,
          read: nextRead,
          isRead: nextRead,
        };
      }
      return alert;
    });
    saveAlerts(updated);
  };

  const dismissAlert = (id: string) => {
    const updated = alerts.filter((alert) => alert.id !== id);
    saveAlerts(updated);

    // Save dismissed state locally so it persists across refreshes
    try {
      const dismissed = JSON.parse(localStorage.getItem("securewatch_dismissed") || "[]");
      if (!dismissed.includes(id)) {
        dismissed.push(id);
        localStorage.setItem("securewatch_dismissed", JSON.stringify(dismissed));
      }
    } catch (e) {
      // Ignore
    }
  };

  const markAllAsRead = () => {
    const updated = alerts.map((alert) => ({
      ...alert,
      read: true,
      isRead: true,
    }));
    saveAlerts(updated);
  };

  const resetAlerts = () => {
    localStorage.removeItem("securewatch_dismissed");
    localStorage.removeItem("securewatch_alerts");
    setAlerts([]);
  };

  const unreadCount = alerts.filter((alert) => !alert.read).length;

  return (
    <AlertsContext.Provider
      value={{
        alerts,
        unreadCount,
        toggleRead,
        dismissAlert,
        markAllAsRead,
        resetAlerts,
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertsContext);
  if (!context) {
    throw new Error("useAlerts must be used within an AlertsProvider");
  }
  return context;
}
