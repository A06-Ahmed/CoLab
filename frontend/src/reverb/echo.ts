import { store } from "@/redux/store";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import {
  getBroadcastAuthUrl,
  getReverbConfig,
} from "@/lib/runtimeUrls";

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

window.Pusher = Pusher;

const { host, key, port, scheme } = getReverbConfig();

const echo = new Echo({
  broadcaster: "reverb",
  key,
  wsHost: host,
  wsPort: port,
  wssPort: port,
  forceTLS: scheme === "https",
  enabledTransports: ["ws", "wss"],

  authEndpoint: getBroadcastAuthUrl(),

  auth: {
    headers: {
      get Authorization() {
        const token = store.getState()?.auth?.token;
        return token ? `Bearer ${token}` : "";
      },
      Accept: "application/json",
    },
  },
});

export default echo;
