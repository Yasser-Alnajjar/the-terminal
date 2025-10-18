import { cn } from "@lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const dotAnimatedVariants = cva(
  "absolute end-0 top-0 size-[10px] rounded-full",
  {
    variants: {
      variant: {
        primary: "bg-primary-400",
        success: "bg-success-500",
        error: "bg-error-500",
        warning: "bg-warning-500",
        info: "bg-light-500",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  }
);
export interface ILiveDot
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dotAnimatedVariants> {
  className?: string;
}
export const LiveDot = ({ variant, className }: ILiveDot) => {
  return (
    <div className={cn("relative size-[10px]", className)}>
      <span
        className={cn("animate-ping", dotAnimatedVariants({ variant }))}
      ></span>
      <span
        className={cn("border border-border", dotAnimatedVariants({ variant }))}
      ></span>
    </div>
  );
};
