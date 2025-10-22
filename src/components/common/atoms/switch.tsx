"use client";
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@lib/utils";

type SwitchSize = "sm" | "md" | "lg";

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  size?: SwitchSize;
}

const sizeClasses = {
  sm: {
    root: "h-3.5 w-6",
    thumb:
      "h-2.5 w-2.5 translate-x-[2px] data-[state=checked]:translate-x-2.5 rtl:data-[state=checked]:-translate-x-2.5",
  },
  md: {
    root: "h-4 w-7",
    thumb:
      "h-3 w-3 translate-x-[2px] data-[state=checked]:translate-x-3 rtl:data-[state=checked]:-translate-x-3",
  },
  lg: {
    root: "h-4.5 w-8",
    thumb:
      "h-3.5 w-3.5 translate-x-[2px] data-[state=checked]:translate-x-3.5 rtl:data-[state=checked]:-translate-x-3.5",
  },
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size = "sm", ...props }, ref) => {
  const { root, thumb } = sizeClasses[size];

  return (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-primary-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-400 data-[state=unchecked]:bg-transparent",
        root,
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none rounded-full bg-primary-400 data-[state=checked]:bg-background shadow-lg ring-0 transition-transform",
          thumb
        )}
      />
    </SwitchPrimitives.Root>
  );
});

Switch.displayName = "Switch";
export { Switch };
