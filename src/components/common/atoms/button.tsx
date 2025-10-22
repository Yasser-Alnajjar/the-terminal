"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/utils";
import { Link } from "@navigation";

const buttonVariants = cva(
  "border-border cursor-pointer transition-[scale,color,background] ease-out flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium focus-visible:outline-none  disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary-400 text-white hover:bg-primary-300 active:bg-primary-500 hover:text-white focus:bg-primary-500 focus:text-white",
        success:
          "bg-success-500 text-white hover:bg-success-400 active:bg-success-600 hover:text-white focus:bg-success-600 focus:text-white",
        error:
          "border bg-error-50 text-error-300 border-error-100  hover:bg-error-100 hover:bg-error-100 hover:text-error-400 hover:border-error-200/80",
        primary:
          "bg-background border text-foreground hover:bg-primary-50 hover:text-primary-300 hover:border-primary-100  active:bg-primary-100 focus:bg-primary-100 focus:text-primary-400 focus:border-primary-200/80",
        warning:
          "bg-warning-500 text-white hover:bg-warning-400 active:bg-warning-600 hover:text-white focus:bg-warning-600 focus:text-white",
        outline:
          "text-gray-700 border bg-background hover:bg-gray-300/40  focus-visible:ring-gray-300",
        secondary:
          "bg-secondary text-foreground hover:bg-secondary/80 focus-visible:ring-secondary",
        ghost:
          "hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring focus-visible:ring-ring/50",
        link: "underline-offset-4 hover:underline",

        "primary-outline":
          "border border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white focus:bg-primary-400 focus:text-white",
        "error-outline":
          "border border-error-500 text-error-500 hover:bg-error-500 hover:text-white focus:bg-error-500 focus:text-white",
        "warning-outline":
          "border border-warning-500 text-warning-500 hover:bg-warning-500 hover:text-white focus:bg-warning-500 focus:text-white",
        "success-outline":
          "border border-success-500 text-success-500 hover:bg-success-500 hover:text-white focus:bg-success-500 focus:text-white",
      },
      size: {
        default: "px-2 py-1.5 rounded-md",
        sm: "h-9 rounded-md px-3",
        md: "h-8 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  prefetch?: boolean;
  target?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      target,
      prefetch,
      href,
      type = "button",
      ...props
    },
    ref
  ) => {
    const classNames = cn(buttonVariants({ variant, size, className }));

    if (href) {
      return (
        <Link
          href={href}
          target={target}
          className={classNames}
          ref={ref as React.Ref<HTMLAnchorElement>}
          prefetch={prefetch}
          {...(props as any)}
        />
      );
    }
    const Comp = asChild ? Slot : "button";
    return <Comp className={classNames} ref={ref} type={type} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
