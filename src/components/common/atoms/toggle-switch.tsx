import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@lib/utils";

import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
  TooltipProvider,
} from "./tooltip";

const rootVariants = cva(
  "data-[state=checked]:text-white group border-1 overflow-hidden peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "data-[state=checked]:bg-primary-400 border-primary-400 data-[state=unchecked]:text-primary-400",
        success:
          "data-[state=checked]:bg-success-400 border-success-400 data-[state=unchecked]:text-success-400",
        error:
          "data-[state=checked]:bg-error-400 border-error-400 data-[state=unchecked]:text-error-400",
        warning:
          "data-[state=checked]:bg-warning-400 border-warning-400 data-[state=unchecked]:text-warning-400",
      },
      size: {
        sm: "h-[22px] w-[45px]",
        md: "h-[26px] w-[52px]",
        lg: "h-[30px] w-[60px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const thumbVariants = cva(
  "rtl:-translate-x-1 translate-x-1 shrink-0 pointer-events-none z-10 rounded-full shadow-lg ring-0 transition-transform duration-150 data-[state=checked]:bg-background",
  {
    variants: {
      variant: {
        default: "bg-primary-400",
        success: "bg-success-400",
        warning: "bg-warning-400",
        error: "bg-error-400",
      },
      size: {
        sm: "size-3 data-[state=checked]:translate-x-[27px] rtl:data-[state=checked]:-translate-x-[22px]",
        md: "size-4 data-[state=checked]:translate-x-[30px] rtl:data-[state=checked]:-translate-x-[26px]",
        lg: "size-5 data-[state=checked]:translate-x-[34px] rtl:data-[state=checked]:-translate-x-[30px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const checkVariants = cva(
  "absolute top-1/2 -translate-y-1/2 text-xs font-medium select-none transition-all duration-150 group-data-[state=unchecked]:end-1",
  {
    variants: {
      size: {
        sm: "group-data-[state=checked]:-end-3.5 [&_svg]:size-3",
        md: "group-data-[state=checked]:-end-4 [&_svg]:size-4",
        lg: "group-data-[state=checked]:-end-6 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const uncheckVariants = cva(
  "absolute top-1/2 -translate-y-1/2 text-xs font-medium select-none transition-all duration-150 group-data-[state=checked]:start-1",
  {
    variants: {
      size: {
        sm: "group-data-[state=unchecked]:-start-3.5 [&_svg]:size-3",
        md: "group-data-[state=unchecked]:-start-4 [&_svg]:size-4",
        lg: "group-data-[state=unchecked]:-start-6 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ToggleSwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof rootVariants> {
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  tooltip?: string;
}

const ToggleSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  ToggleSwitchProps
>(
  (
    {
      tooltip,
      className,
      variant,
      size,
      checkedChildren,
      unCheckedChildren,
      ...props
    },
    ref
  ) => {
    return tooltip ? (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="p-0 m-0">
              <SwitchPrimitives.Root
                className={cn(rootVariants({ variant, size }), className)}
                {...props}
                ref={ref}
              >
                {checkedChildren && (
                  <span
                    className={cn(checkVariants({ size }))}
                    data-state={props.checked ? "checked" : "unchecked"}
                  >
                    {checkedChildren}
                  </span>
                )}
                <SwitchPrimitives.Thumb
                  className={cn(thumbVariants({ variant, size }))}
                />
                {unCheckedChildren && (
                  <span
                    className={cn(uncheckVariants({ size }))}
                    data-state={props.checked ? "checked" : "unchecked"}
                  >
                    {unCheckedChildren}
                  </span>
                )}
              </SwitchPrimitives.Root>
            </div>
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      <SwitchPrimitives.Root
        className={cn(rootVariants({ variant, size }), className)}
        {...props}
        ref={ref}
      >
        {checkedChildren && (
          <span
            className={cn(checkVariants({ size }))}
            data-state={props.checked ? "checked" : "unchecked"}
          >
            {checkedChildren}
          </span>
        )}
        <SwitchPrimitives.Thumb
          className={cn(thumbVariants({ variant, size }))}
        />
        {unCheckedChildren && (
          <span
            className={cn(uncheckVariants({ size }))}
            data-state={props.checked ? "checked" : "unchecked"}
          >
            {unCheckedChildren}
          </span>
        )}
      </SwitchPrimitives.Root>
    );
  }
);

ToggleSwitch.displayName = "ToggleSwitch";

export { ToggleSwitch };
