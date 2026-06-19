import { CalendarDays } from "lucide-react";

import { PlaceholderPage } from "@/components/placeholder-page";

export default function CalendarPage() {
  return (
    <PlaceholderPage
      title="Calendar"
      description="See tasks, annual report deadlines, and campaign milestones on a calendar."
      icon={CalendarDays}
      emptyTitle="Calendar integration arrives in Phase 11"
      emptyDescription="This page will show an internal calendar and let staff create Google Calendar reminders from tasks and deadlines."
    />
  );
}
