"use client";

import QueryProviders from "@/providers/query-providers";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/layout.tsx/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";

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
          <ProtectedRoute>{children}</ProtectedRoute>
          <Toaster position="top-right" richColors />
        </QueryProviders>
      </body>
    </html>
  );
}
