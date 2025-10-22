"use client";

import React, { forwardRef, useState } from "react";
import { Label, ProgressInput, inputVariants } from "@components";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@lib/utils";
import { type VariantProps } from "class-variance-authority";

export interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  id?: string;
  label?: string;
  description?: string | React.ReactNode;
  error?: string | boolean;
  toggle?: boolean;
  className?: string;
  dir?: "ltr" | "rtl";
}

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  (
    {
      id,
      label,
      description,
      error,
      toggle = true,
      className,
      dir,
      variant,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const inputType = visible ? "text" : "password";
    const inputId =
      id ?? props.name ?? `password-${Math.random().toString(36).slice(2, 9)}`;

    const direction =
      dir || (typeof document !== "undefined" ? document.dir : "ltr");
    const isRTL = direction === "rtl";

    const computedVariant = error ? "error" : variant;

    return (
      <div className={cn("space-y-1", className)}>
        {label ? (
          <Label htmlFor={inputId} className="text-sm font-medium">
            {label}
          </Label>
        ) : null}

        <div className="relative">
          <ProgressInput
            id={inputId}
            ref={ref}
            type={inputType}
            {...props}
            variant={computedVariant || "default"}
            className={cn(isRTL ? "pl-10" : "pr-10")}
            aria-invalid={!!error}
            autoComplete="off"
            aria-describedby={description ? `${inputId}-desc` : undefined}
          />

          {toggle ? (
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className="cursor-pointer absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {visible ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          ) : null}
        </div>

        {description ? (
          <p id={`${inputId}-desc`} className="text-xs text-gray-600">
            {description}
          </p>
        ) : null}

        {error ? (
          <p className="text-xs text-error-400" role="alert">
            {typeof error === "string" ? error : "Invalid password"}
          </p>
        ) : null}
      </div>
    );
  }
);

InputPassword.displayName = "InputPassword";
export default InputPassword;
