import { FileCheck2 } from "lucide-react";

import { PlaceholderPage } from "@/components/placeholder-page";

export default function AnnualReportsPage() {
  return (
    <PlaceholderPage
      title="Annual Reports"
      description="Run annual report compliance campaigns by year and track progress to filing."
      icon={FileCheck2}
      emptyTitle="Annual report workflow arrives in Phase 6"
      emptyDescription="This page will show campaign progress, status buckets, and billing status for every entity's annual report."
    />
  );
}
