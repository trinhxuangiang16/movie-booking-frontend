"use client";

import QueryProviders from "@/providers/query-providers";
import "./globals.css";
import { Geist, Oswald } from "next/font/google";
// import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/layout.tsx/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth">
      <body>
        <QueryProviders>
          <Header />
          {children}
          <Toaster position="top-right" richColors />
        </QueryProviders>
      </body>
    </html>
  );
}
