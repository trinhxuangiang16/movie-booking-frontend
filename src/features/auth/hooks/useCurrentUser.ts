"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getCookie } from "cookies-next";

export interface ICurrentUser {
  tai_khoan: number;
  ho_ten?: string;
  email?: string;
  loai_nguoi_dung?: string;
}

const subscribe = () => () => { };
const getServerSnapshot = () => "";
const getClientSnapshot = () => {
  const raw = getCookie("user");
  return typeof raw === "string" ? raw : "";
};

export const useCurrentUser = () => {
  const rawUser = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const user = useMemo(() => {
    if (!rawUser) return null;
    try {
      return JSON.parse(rawUser) as ICurrentUser;
    } catch {
      return null;
    }
  }, [rawUser]);

  return {
    user,
    isAdmin: user?.loai_nguoi_dung === "ADMIN",
  };
};
