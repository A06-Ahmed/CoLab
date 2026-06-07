import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export function useAuth() {
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);
  return { isLoggedIn, loading: false };
}