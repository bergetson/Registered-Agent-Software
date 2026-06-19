import { BarChart3 } from "lucide-react";

import { PlaceholderPage } from "@/components/placeholder-page";

export default function ReportsPage() {
  return (
    <PlaceholderPage
      title="Reports"
      description="Generate and export reports on entities, billing, and compliance status."
      icon={BarChart3}
      emptyTitle="Reporting and exports arrive in Phase 12"
      emptyDescription="This page will offer CSV exports and print-friendly views for entity, billing, and compliance reports."
    />
  );
}
