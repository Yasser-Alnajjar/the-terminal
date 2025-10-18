import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const response = await fetch(request.nextUrl.searchParams.get("url") || "");
  if (response.ok) {
    return new Response(response.body, {
      headers: {
        "content-type": "application/octet-stream",
      },
    });
  }
  return new NextResponse("", { status: 404, statusText: "Image not found" });
}
