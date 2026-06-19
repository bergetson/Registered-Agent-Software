import { Scale } from "lucide-react";

import { PlaceholderPage } from "@/components/placeholder-page";

export default function StateRulesPage() {
  return (
    <PlaceholderPage
      title="State Rules"
      description="Configure annual report due dates and fees by state and entity type. Montana first, more states later."
      icon={Scale}
      emptyTitle="State rules engine arrives in Phase 5"
      emptyDescription="This page will manage due-date rules and fees per state and entity type, starting with Montana."
    />
  );
}
