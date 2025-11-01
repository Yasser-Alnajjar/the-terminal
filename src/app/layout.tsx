import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "The Terminal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
