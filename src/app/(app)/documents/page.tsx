import { FileText } from "lucide-react";

import { PlaceholderPage } from "@/components/placeholder-page";

export default function DocumentsPage() {
  return (
    <PlaceholderPage
      title="Documents"
      description="Store and retrieve filings, confirmations, and correspondence."
      icon={FileText}
      emptyTitle="Document storage arrives in Phase 9"
      emptyDescription="This page will let staff upload and securely retrieve documents linked to clients, entities, and annual reports."
    />
  );
}
