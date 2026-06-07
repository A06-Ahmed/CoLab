import { Bell, Search, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { SidebarTrigger, useSidebar } from "./AppSidebar";
import { useAppSelector } from "@/redux/store";
import { getImageUrl } from "@/lib/utils";

export default function Topbar() {
  const { isMobile } = useSidebar();
  const { user } = useAppSelector((state) => state?.auth);

  return (
    <header className="fixed left-0 top-0 z-20 h-16 border-b border-border bg-white/90 backdrop-blur-xl md:left-60">
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-3">
          {isMobile && <SidebarTrigger className="shrink-0 md:hidden" />}
          <label className="flex h-11 w-full max-w-md items-center gap-3 rounded-2xl border border-border bg-surface px-4 text-sm text-text-muted shadow-sm">
            <Search className="h-4 w-4 shrink-0" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="h-auto border-0 bg-transparent p-0 text-sm text-text-primary placeholder:text-text-muted focus-visible:ring-0"
            />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
            aria-label="Paramètres"
          >
            <Settings className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white shadow-[0_10px_30px_rgba(59,91,219,0.24)]"
            aria-label={user?.full_name ?? "Profil"}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={getImageUrl(user?.avatar)} />
              <AvatarFallback className="bg-primary text-white">
                {user?.full_name?.[0] ?? "T"}
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  );
}
