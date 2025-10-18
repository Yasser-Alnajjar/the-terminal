"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";

import { cn } from "@lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  const checkedProp = (
    props as React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
  ).checked;
  const isChecked = checkedProp === true;
  const isIndeterminate = checkedProp === "indeterminate";

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "cursor-pointer size-4 shrink-0 rounded-md border border-primary-400 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-400 data-[state=checked]:text-white",
        className,
        isIndeterminate && "bg-primary-25"
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        {isChecked && <Check size={12} strokeWidth={3} />}
        {isIndeterminate && (
          <Minus size={12} className="text-primary-400" strokeWidth={3} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
