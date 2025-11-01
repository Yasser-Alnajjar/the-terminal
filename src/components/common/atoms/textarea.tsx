"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@lib/utils";

const textareaVariants = cva(
  "flex w-full text-sm rounded-lg bg-transparent px-4 py-2.5 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 transition-all duration-200",
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

export interface TextareaProps
  extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };

{
  /* */
}
