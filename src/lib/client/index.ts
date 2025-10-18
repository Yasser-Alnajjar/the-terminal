import axios from "axios";
import { getSession } from "next-auth/react";
import { getCookie } from "./cookies";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const [session, locale] = await Promise.all([
      getSession(),
      Promise.resolve(getCookie("NEXT_LOCALE")),
    ]);

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    if (locale) {
      config.headers["Accept-Language"] = locale;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

async function fetchData<T = any>(
  config?: AxiosRequestConfig & { enabled?: boolean; tags?: string[] }
): Promise<T | null> {
  if (!config?.enabled || !config?.url) return null;

  const res: AxiosResponse<T> = await instance.request<T>(config);

  return res.data;
}

export { instance as axios, fetchData };
