"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

export const progressRootVariants = cva(
  "relative h-4 w-full overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary-400/20",
        error: "bg-error-500/20",
        success: "bg-success-500/20",
        warning: "bg-warning-500/20",
        foreground: "bg-foreground/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary-400",
        error: "bg-error-500",
        success: "bg-success-500",
        warning: "bg-warning-500",
        foreground: "bg-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type ProgressVariant = VariantProps<
  typeof progressRootVariants
>["variant"];

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value: number;
  variant?: ProgressVariant;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant = "default", ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressRootVariants({ variant }), className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(progressIndicatorVariants({ variant }))}
      style={{ transform: `translateX(-${100 - value}%)` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
