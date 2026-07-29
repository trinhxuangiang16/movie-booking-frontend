import { api } from "@/lib";
import type {
  ISeatHoldPayload,
  ISeatHoldResult,
  ISeatReleaseResult,
} from "../types/seatHold.types";

export const seatHoldService = {
  giuGhe: async (payload: ISeatHoldPayload): Promise<ISeatHoldResult> => {
    const res = await api.post("QuanLyDatVe/GiuGhe", payload);

    return res.data?.data;
  },


  giaHanGiuGhe: async (payload: ISeatHoldPayload): Promise<ISeatHoldResult> => {
    const res = await api.post("QuanLyDatVe/GiaHanGiuGhe", payload);

    return res.data?.data;
  },

  nhaGhe: async (payload: ISeatHoldPayload): Promise<ISeatReleaseResult> => {
    const res = await api.post("QuanLyDatVe/NhaGhe", payload);

    return res.data?.data;
  },

  nhaGheBeacon: (payload: ISeatHoldPayload, accessToken?: string): boolean => {
    if (typeof navigator === "undefined" || !navigator.sendBeacon) return false;

    const raw = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
    const baseURL = raw.endsWith("/api") ? raw : `${raw}/api`;

    const blob = new Blob(
      [JSON.stringify({ ...payload, access_token: accessToken })],
      { type: "application/json" },
    );

    return navigator.sendBeacon(`${baseURL}/QuanLyDatVe/NhaGhe`, blob);
  },
};
