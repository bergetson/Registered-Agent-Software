import { Building2, FileCheck2, ListChecks, Receipt } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SUMMARY_CARDS = [
  {
    label: "Active Entities",
    value: "--",
    icon: Building2,
    hint: "Connect data in a later phase",
  },
  {
    label: "Annual Reports Due Soon",
    value: "--",
    icon: FileCheck2,
    hint: "Tracked once compliance module is live",
  },
  {
    label: "Open Tasks",
    value: "--",
    icon: ListChecks,
    hint: "Daily work queue arrives in Phase 7",
  },
  {
    label: "Outstanding Billing",
    value: "--",
    icon: Receipt,
    hint: "Billing tracker arrives in Phase 8",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="A daily snapshot of entities, deadlines, tasks, and billing for Berget Law."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SUMMARY_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label}>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </CardTitle>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{card.value}</div>
                <CardDescription className="mt-1">{card.hint}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Daily Work Queue</CardTitle>
          <CardDescription>
            Overdue tasks, due-today items, and upcoming deadlines will appear
            here once the data layer is connected.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={ListChecks}
            title="No work queue data yet"
            description="This dashboard is a placeholder built in Phase 0. Real entity, task, and billing data will populate this view starting in Phase 1."
          />
        </CardContent>
      </Card>
    </div>
  );
}
