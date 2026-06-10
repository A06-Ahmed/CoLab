const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const getFallbackApiUrl = () =>
  import.meta.env.DEV ? "http://localhost:8000" : "";

const getFallbackReverbHost = () =>
  import.meta.env.DEV ? "127.0.0.1" : "";

const getFallbackReverbScheme = () =>
  import.meta.env.DEV ? "http" : "https";

const getFallbackReverbPort = () => (import.meta.env.DEV ? 8080 : 443);

const getApiBaseUrl = () =>
  trimTrailingSlash(import.meta.env.VITE_API_URL ?? getFallbackApiUrl());

const getStorageUrl = (path: string) => {
  if (!path) return "";
  return `${getApiBaseUrl()}/storage/${path.replace(/^\/+/, "")}`;
};

const getApiDownloadUrl = (fileName: string) =>
  `${getApiBaseUrl()}/api/download/${encodeURIComponent(fileName)}`;

const getBroadcastAuthUrl = () => `${getApiBaseUrl()}/api/broadcasting/auth`;

const getReverbConfig = () => ({
  host: import.meta.env.VITE_REVERB_HOST ?? getFallbackReverbHost(),
  scheme: import.meta.env.VITE_REVERB_SCHEME ?? getFallbackReverbScheme(),
  port: Number(import.meta.env.VITE_REVERB_PORT ?? getFallbackReverbPort()),
  key: import.meta.env.VITE_REVERB_APP_KEY ?? "",
});

export {
  getApiBaseUrl,
  getApiDownloadUrl,
  getBroadcastAuthUrl,
  getReverbConfig,
  getStorageUrl,
};
