"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AccountDetail } from "@/features/account";

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <div className="relative min-h-screen w-full bg-[#0c1137] bg-[url('http://www.transparenttextures.com/patterns/batthern.png')]">
        <AccountDetail />
      </div>
    </ProtectedRoute>
  );
}
