import { NextRequest } from "next/server";
import { createReadStream, statSync, existsSync } from "fs";
import { join } from "path";
import { Readable } from "stream";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const filePath = join(process.cwd(), "public", ...path);

  if (!existsSync(filePath)) {
    return new Response("File not found", { status: 404 });
  }

  const stat = statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.get("range");

  const ext = path.at(-1)?.split(".").pop()?.toLowerCase();
  const contentType = getContentType(ext);

  if (range) {
    const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : fileSize - 1;

    const chunkSize = end - start + 1;
    const nodeStream = createReadStream(filePath, { start, end });
    const webStream = Readable.toWeb(nodeStream);

    return new Response(webStream as ReadableStream, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize.toString(),
        "Content-Type": contentType,
      },
    });
  }

  const nodeStream = createReadStream(filePath);
  const webStream = Readable.toWeb(nodeStream);

  return new Response(webStream as ReadableStream, {
    headers: {
      "Content-Length": fileSize.toString(),
      "Content-Type": contentType,
    },
  });
}

function getContentType(ext?: string): string {
  const mimeTypes: Record<string, string> = {
    mp4: "video/mp4",
    mp3: "audio/mpeg",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
    svg: "image/svg+xml",
    pdf: "application/pdf",
  };

  return mimeTypes[ext || ""] || "application/octet-stream";
}
