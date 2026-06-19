import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap gap-1 [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "text-foreground border-border",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        success: "border-transparent bg-[var(--status-active-bg)] text-[var(--status-active)]",
        warning: "border-transparent bg-[var(--status-due-soon-bg)] text-[var(--status-due-soon)]",
        waiting: "border-transparent bg-[var(--status-waiting-client-bg)] text-[var(--status-waiting-client)]",
        late: "border-transparent bg-[var(--status-late-bg)] text-[var(--status-late)]",
        archived: "border-transparent bg-[var(--status-archived-bg)] text-[var(--status-archived)]",
        ready: "border-transparent bg-[var(--status-ready-to-file-bg)] text-[var(--status-ready-to-file)]",
        review: "border-transparent bg-[var(--status-needs-review-bg)] text-[var(--status-needs-review)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
