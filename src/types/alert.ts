export interface Alert {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  category: string;
  title: string;
  published: string;
  source: string;
  read: boolean;
  summary: string;
  details?: string;
  isRead?: boolean;
  publishedAt?: string;
  link?: string;
}
