"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/utils";

const alertVariants = cva(
  "relative flex text-sm items-center w-full rounded-lg border p-4 [&>svg~*]:pl-4 [&>svg+div]:translate-y-[-3px] [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        success: "border-success-400 bg-success-400/5 text-success-400",
        error: "border-error-400 bg-error-400/5 text-error-400 ",
        primary: "border-primary-400 bg-primary-400/5 text-primary-400 ",
        warning: "border-warning-400 bg-warning-400/5 text-warning-400 ",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  }
);
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
