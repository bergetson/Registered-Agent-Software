import { Building2 } from "lucide-react";

import { PlaceholderPage } from "@/components/placeholder-page";

export default function EntitiesPage() {
  return (
    <PlaceholderPage
      title="Entities"
      description="Track every business entity Berget Law serves as registered agent for."
      icon={Building2}
      emptyTitle="Entity management arrives in Phase 3"
      emptyDescription="Once the database is connected, this page will list active entities with search, filters, and status badges."
    />
  );
}
