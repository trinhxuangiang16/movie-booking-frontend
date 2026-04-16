"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const publicRoutes = ["/login", "/register"];
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  useEffect(() => {
    if (isPublic) {
      setIsAuthorized(true);
      setIsLoading(false);
      return;
    }

    const token = getCookie("accessToken");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, [router, pathname, isPublic]);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthorized) return null;
  return <>{children}</>;
}
