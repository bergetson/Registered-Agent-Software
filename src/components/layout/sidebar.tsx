"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/components/layout/nav-items";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex h-full w-60 flex-col border-r bg-card",
        className
      )}
      aria-label="Main navigation"
    >
      <div className="flex h-14 items-center gap-2 border-b px-4">
        <Scale className="size-5 text-primary" />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">Berget Law</span>
          <span className="text-xs text-muted-foreground">Entity Manager</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border-t p-3 text-xs text-muted-foreground">
        Internal use only &middot; Berget Law
      </div>
    </nav>
  );
}
