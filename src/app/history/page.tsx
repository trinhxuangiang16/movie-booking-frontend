"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import HistoryPayment from "@/features/booking/component/historyPayment";

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <HistoryPayment />
    </ProtectedRoute>
  );
}
