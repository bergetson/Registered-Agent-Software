import { CircleUserRound } from "lucide-react";

import { MobileNav } from "@/components/layout/mobile-nav";

export function Topbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4">
      <div className="flex items-center gap-2">
        <MobileNav />
        <span className="text-sm font-semibold md:hidden">Berget Law</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CircleUserRound className="size-5" />
        <span className="hidden sm:inline">Demo User</span>
      </div>
    </header>
  );
}
