import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileCheck2,
  ListChecks,
  Receipt,
  FileText,
  CalendarDays,
  BarChart3,
  Scale,
  Settings,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Entities", href: "/entities", icon: Building2 },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Annual Reports", href: "/annual-reports", icon: FileCheck2 },
  { label: "Tasks / Ticklers", href: "/tasks", icon: ListChecks },
  { label: "Billing", href: "/billing", icon: Receipt },
  { label: "Documents", href: "/documents", icon: FileText },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "State Rules", href: "/state-rules", icon: Scale },
  { label: "Settings", href: "/settings", icon: Settings },
];
