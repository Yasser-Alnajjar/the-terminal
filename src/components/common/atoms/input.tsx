"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@lib/utils";

const inputVariants = cva(
  "flex h-10 w-full text-sm rounded-lg  px-4 py-2.5 file:border-0 file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "border border-border hover:border-primary-300/40 disabled:border-transparent focus-visible:border-transparent focus-visible:shadow-[0px_1px_1px_0px_#3088E81F,0px_0px_0px_1px_#3088E829,0px_2px_5px_0px_#3088E814,0px_0px_0px_4px_#3088E829]",
        error:
          "border border-error-400 bg-error-25 hover:bg-transparent  focus:bg-transparent  hover:border-error-400 focus-visible:border-transparent focus-visible:shadow-[0px_1px_1px_0px_#0000001F,0px_0px_0px_1px_#F3414129,0px_2px_5px_0px_#676E7614,0px_0px_0px_4px_#F3414129]",
        warning:
          "border border-warning-300 bg-warning-25 hover:bg-transparent  focus:bg-transparent  hover:border-warning-300 focus-visible:border-transparent focus-visible:shadow-[0px_1px_1px_0px_#0000001F,0px_0px_0px_1px_#E9A23B29,0px_2px_5px_0px_#676E7614,0px_0px_0px_4px_#E9A23B29]",
        success:
          "border border-success-300 bg-success-25 hover:bg-transparent  focus:bg-transparent  hover:border-success-300 focus-visible:border-transparent focus-visible:shadow-[0px_1px_1px_0px_#0000001F,0px_0px_0px_1px_#53B48329,0px_2px_5px_0px_#676E7614,0px_0px_0px_4px_#53B48329]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className, variant, ...props }, ref) => {
    return icon ? (
      <div
        className={cn(
          "w-full relative [&_svg]:size-5 [&_svg]:text-gray-400",
          className
        )}
      >
        <input
          className={cn("ps-10", inputVariants({ variant }))}
          ref={ref}
          {...props}
        />
        <span className="absolute start-3 top-1/2 -translate-y-1/2">
          {icon}
        </span>
      </div>
    ) : (
      <input
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
