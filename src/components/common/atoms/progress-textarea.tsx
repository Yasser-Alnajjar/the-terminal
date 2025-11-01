"use client";

import * as React from "react";
import { cn } from "@lib/utils";

export interface ProgressTextareaProps
  extends React.ComponentProps<"textarea"> {
  variant?: "default" | "error" | "warning" | "success";
}

const ProgressTextarea = React.forwardRef<
  HTMLTextAreaElement,
  ProgressTextareaProps
>(({ className, rows = 3, variant = "default", ...props }, ref) => {
  const variantColorMap: Record<string, string> = {
    default:
      "group-focus-within:before:w-full group-focus-within:before:bg-primary-400",
    error:
      "group-focus-within:before:w-full group-focus-within:before:bg-error-400",
    warning:
      "group-focus-within:before:w-full group-focus-within:before:bg-warning-400",
    success:
      "group-focus-within:before:w-full group-focus-within:before:bg-success-400",
  };

  return (
    <div className={cn("w-full group relative")}>
      <textarea
        ref={ref}
        {...props}
        rows={rows}
        className={cn(
          "flex w-full text-xs border-b disabled:[&~span]:hidden border-border disabled:bg-gray-100 rounded-ss-lg rounded-se-lg  disabled:rounded-lg p-2.5 file:border-0 file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-disabled transition-all duration-300",
          className
        )}
      />

      <span
        className={cn(
          "absolute left-0 bottom-0 w-full h-[2px] group-hover:bg-border overflow-hidden before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-full before:w-0 before:transition-[width,background-color] before:duration-300 transition-all duration-300",
          variantColorMap[variant || "default"]
        )}
      />
    </div>
  );
});

ProgressTextarea.displayName = "ProgressTextarea";

export { ProgressTextarea };
