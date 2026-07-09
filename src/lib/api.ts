import axios from "axios";
import { getCookie } from "cookies-next";

const apiBaseURL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const baseURL = apiBaseURL?.endsWith("/api") ? apiBaseURL : `${apiBaseURL}/api`;

export const api = axios.create({
  baseURL,
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
