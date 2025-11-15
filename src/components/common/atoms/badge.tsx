"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/utils";

const badgeVariants = cva(
  "inline-flex items-center text-nowrap justify-center text-center rounded-full border px-2 py-0.5 text-xs font-medium transition-colors leading-normal",
  {
    variants: {
      variant: {
        primary: "bg-primary-50 text-primary-400",
        error: "bg-error-50 text-error-500",
        success: "bg-success-50 text-success-500",
        warning: "bg-warning-50 text-warning-500",
        info: "bg-light-300 text-gray-600",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
