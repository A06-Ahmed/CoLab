import { store } from "@/redux/store";
import axios from "axios";
import { getApiBaseUrl } from "@/lib/runtimeUrls";

const api = axios.create({
  baseURL: `${getApiBaseUrl()}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export { api };
