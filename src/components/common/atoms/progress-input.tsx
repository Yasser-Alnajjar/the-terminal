"use client";

import * as React from "react";
import { cn } from "@lib/utils";

export interface ProgressInputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "error" | "warning" | "success";
  filled?: boolean;
}

const ProgressInput = React.forwardRef<HTMLInputElement, ProgressInputProps>(
  ({ className, variant = "default", filled = false, ...props }, ref) => {
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

    const filledEffectMap: Record<string, string> = {
      default: "before:w-full before:bg-primary-400",
      error: "before:w-full before:bg-error-400",
      warning: "before:w-full before:bg-warning-400",
      success: "before:w-full before:bg-success-400",
    };

    return (
      <div className={cn("w-full group relative")}>
        <input
          ref={ref}
          {...props}
          className={cn(
            "border border-border disabled:[&~span]:hidden disabled:bg-gray-100 px-4 flex w-full text-xs rounded-ss-lg rounded-se-lg py-1.5 file:border-0 file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-disabled disabled:rounded-lg transition-all duration-200",
            className
          )}
        />

        <span
          className={cn(
            "absolute left-0 bottom-0 w-full h-[2px] group-hover:bg-border overflow-hidden before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-full before:w-0 before:transition-[width,background-color] before:duration-300 transition-all duration-300",
            filled
              ? filledEffectMap[variant || "default"]
              : variantColorMap[variant || "default"]
          )}
        />
      </div>
    );
  }
);

ProgressInput.displayName = "ProgressInput";

export { ProgressInput };
