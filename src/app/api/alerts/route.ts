import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "alerts.json");

// Helper to guarantee directory and file exist
async function ensureFileExists() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Folder exists
  }
  
  try {
    await fs.access(FILE_PATH);
  } catch (error) {
    // File does not exist, create empty array
    await fs.writeFile(FILE_PATH, JSON.stringify([]), "utf-8");
  }
}

// Helper to normalize link: trim whitespace, remove trailing slash, compare safely
function normalizeLink(link: unknown): string {
  if (typeof link !== "string") {
    return "";
  }
  let normalized = link.trim();
  if (normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}

export async function GET() {
  try {
    await ensureFileExists();
    const data = await fs.readFile(FILE_PATH, "utf-8");
    const alerts = JSON.parse(data);
    return NextResponse.json(alerts);
  } catch (error) {
    console.error("GET /api/alerts error:", error);
    return NextResponse.json(
      { error: "Internal Server Error while reading alerts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await ensureFileExists();

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid JSON body payload" },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = ["title", "summary", "category", "severity", "publishedAt", "source"];
    for (const field of requiredFields) {
      if (
        body[field] === undefined ||
        body[field] === null ||
        typeof body[field] !== "string" ||
        body[field].trim() === ""
      ) {
        return NextResponse.json(
          { error: `Missing or invalid required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Read current alerts
    const fileData = await fs.readFile(FILE_PATH, "utf-8");
    let alerts = [];
    try {
      alerts = JSON.parse(fileData);
      if (!Array.isArray(alerts)) {
        alerts = [];
      }
    } catch (e) {
      alerts = [];
    }

    // Check for duplicate alert
    const incomingLink = normalizeLink(body.link);
    if (incomingLink !== "") {
      const isDuplicate = alerts.some((alert: any) => {
        return normalizeLink(alert.link) === incomingLink;
      });

      if (isDuplicate) {
        return NextResponse.json(
          {
            success: true,
            duplicate: true,
            message: "Alert already exists"
          },
          { status: 200 }
        );
      }
    }

    // Prepare new alert with auto-generated ID, isRead flag and normalized severity
    const rawSeverity = body.severity.toLowerCase();
    const isReadVal = body.isRead !== undefined ? body.isRead : false;
    const readVal = body.read !== undefined ? body.read : isReadVal;

    const newAlert = {
      id: body.id || `alert-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title: body.title,
      summary: body.summary,
      category: body.category,
      severity: rawSeverity === "high" || rawSeverity === "critical" || rawSeverity === "medium" || rawSeverity === "low" 
        ? rawSeverity 
        : "medium", // Default fallback if external source sends custom levels
      link: body.link || "",
      details: body.details || "",
      publishedAt: body.publishedAt,
      published: body.published || body.publishedAt, // Maintain both schemas for backend/frontend
      source: body.source,
      read: readVal,
      isRead: isReadVal,
    };

    alerts.push(newAlert);

    // Save updated list
    await fs.writeFile(FILE_PATH, JSON.stringify(alerts, null, 2), "utf-8");

    return NextResponse.json(
      {
        success: true,
        duplicate: false,
        message: "Alert created"
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/alerts error:", error);
    return NextResponse.json(
      { error: "Internal Server Error while creating alert" },
      { status: 500 }
    );
  }
}
