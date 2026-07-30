"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SupportDetail } from "@/features/support";

export default function SupportPage() {
  return (
    <ProtectedRoute>
      <div className="relative min-h-screen w-full bg-[#0c1137] bg-[url('http://www.transparenttextures.com/patterns/batthern.png')]">
        <SupportDetail />
      </div>
    </ProtectedRoute>
  );
}
