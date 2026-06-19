import { Users } from "lucide-react";

import { PlaceholderPage } from "@/components/placeholder-page";

export default function ClientsPage() {
  return (
    <PlaceholderPage
      title="Clients"
      description="Manage the clients Berget Law represents as registered agent."
      icon={Users}
      emptyTitle="Client management arrives in Phase 4"
      emptyDescription="This page will list clients with their related entities and billing summaries once the data layer is connected."
    />
  );
}
