import { Settings } from "lucide-react";

import { PlaceholderPage } from "@/components/placeholder-page";

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Firm details, default registered agent fee, users, and integrations."
      icon={Settings}
      emptyTitle="Settings page arrives in Phase 1"
      emptyDescription="This page will manage firm settings, the default registered agent fee, user roles, and calendar connections."
    />
  );
}
