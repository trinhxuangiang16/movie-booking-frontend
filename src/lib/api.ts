import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const ACCESSTOKEN = localStorage.getItem("accessToken");

  if (ACCESSTOKEN) {
    config.headers.Authorization = `Bearer ${ACCESSTOKEN}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});
