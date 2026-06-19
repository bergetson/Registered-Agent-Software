import { ListChecks } from "lucide-react";

import { PlaceholderPage } from "@/components/placeholder-page";

export default function TasksPage() {
  return (
    <PlaceholderPage
      title="Tasks / Ticklers"
      description="Daily work queue for ticklers, follow-ups, and filing deadlines."
      icon={ListChecks}
      emptyTitle="Task and tickler system arrives in Phase 7"
      emptyDescription="This page will show overdue, due-today, and waiting-on-client tasks linked to entities and annual reports."
    />
  );
}
