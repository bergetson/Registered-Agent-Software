import { Receipt } from "lucide-react";

import { PlaceholderPage } from "@/components/placeholder-page";

export default function BillingPage() {
  return (
    <PlaceholderPage
      title="Billing"
      description="Track registered agent fees, invoices, and payment status."
      icon={Receipt}
      emptyTitle="Billing tracker arrives in Phase 8"
      emptyDescription="This page will show billed, paid, outstanding, and overdue registered agent fees per client and entity."
    />
  );
}
