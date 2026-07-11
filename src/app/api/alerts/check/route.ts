import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const link = searchParams.get("link");

    if (link === null || link.trim() === "") {
      return NextResponse.json(
        { error: "Query parameter 'link' is required" },
        { status: 400 }
      );
    }

    await ensureFileExists();

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

    const normalizedInput = normalizeLink(link);
    const exists = alerts.some((alert: any) => {
      return normalizeLink(alert.link) === normalizedInput;
    });

    return NextResponse.json({ exists }, { status: 200 });
  } catch (error) {
    console.error("GET /api/alerts/check error:", error);
    return NextResponse.json(
      { error: "Internal Server Error while checking alert" },
      { status: 500 }
    );
  }
}
