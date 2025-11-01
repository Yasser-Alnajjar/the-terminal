"use client";

import { Button } from "@components";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 px-6">
        <h1 className="text-[8rem] font-extrabold leading-none tracking-tight text-primary">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto text-center">
          The page you are looking for doesn’t exist or you don’t have
          permission to access it.
        </p>

        <div className="mt-8 flex gap-3 justify-center">
          <Button
            variant="primary-outline"
            onClick={() => router.back()}
            className="rounded-full px-6"
          >
            Go Back
          </Button>
        </div>
      </body>
    </html>
  );
}
