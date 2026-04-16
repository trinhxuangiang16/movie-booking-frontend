import axios from "axios";
import { getCookie } from "cookies-next";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const ACCESSTOKEN = getCookie("accessToken");

  if (ACCESSTOKEN) {
    config.headers.Authorization = `Bearer ${ACCESSTOKEN}`;
  }

  return config;
});
