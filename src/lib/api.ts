import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const apiBaseURL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const baseURL = apiBaseURL?.endsWith("/api") ? apiBaseURL : `${apiBaseURL}/api`;

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;

let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

api.interceptors.request.use((config) => {
  const ACCESSTOKEN = getCookie("accessToken");

  if (ACCESSTOKEN) {
    config.headers.Authorization = `Bearer ${ACCESSTOKEN}`;
  }

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;
      refreshSubscribers = [];

      try {
        const accessToken = getCookie("accessToken");
        const refreshToken = getCookie("refreshToken");

        if (!accessToken || !refreshToken) {
          throw new Error("No tokens available");
        }

        const response = await axios.post(
          `${baseURL}/QuanLyNguoiDung/refresh-token`,
          {
            accessToken,
            refreshToken,
          },
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data.data;

        setCookie("accessToken", newAccessToken, {
          maxAge: 60 * 60 * 24 * 7,
        });
        setCookie("refreshToken", newRefreshToken, {
          maxAge: 60 * 60 * 24 * 30,
        });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        onRefreshed(newAccessToken);

        return api(originalRequest);
      } catch (refreshError) {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        deleteCookie("user");

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
