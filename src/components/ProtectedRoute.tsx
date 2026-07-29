"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  const publicRoutes = ["/login", "/register"];
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  useEffect(() => {
    setIsMounted(true);
    setToken(getCookie("accessToken") as string | undefined);
  }, [pathname]);

  useEffect(() => {
    if (isMounted && !isPublic && !token) {
      router.push("/login");
    }
  }, [router, isMounted, pathname, isPublic, token]);

  if (!isMounted) return null;
  if (!isPublic && !token) return null;
  return <>{children}</>;
}
