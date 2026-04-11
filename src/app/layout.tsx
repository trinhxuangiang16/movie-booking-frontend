"use client";

import QueryProviders from "@/providers/query-providers";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/layout.tsx/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-scroll-behavior="smooth" lang="vi">
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
