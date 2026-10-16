import { NextResponse } from "next/server";
import { getPublicRepositories } from "@/lib/github";

export async function GET() {
  try {
    const data = await getPublicRepositories();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}
