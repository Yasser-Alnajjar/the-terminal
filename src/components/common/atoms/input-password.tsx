"use client";

import React, { forwardRef, useState } from "react";
import { Input, Label, inputVariants } from "@components";
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
          <Input
            id={inputId}
            ref={ref}
            type={inputType}
            {...props}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.1524 14.5195C1.83981 14.8319 1.66416 15.2558 1.66406 15.6978V17.5078C1.66406 17.7288 1.75186 17.9408 1.90814 18.097C2.06442 18.2533 2.27638 18.3411 2.4974 18.3411H4.9974C5.21841 18.3411 5.43037 18.2533 5.58665 18.097C5.74293 17.9408 5.83073 17.7288 5.83073 17.5078V16.6745C5.83073 16.4534 5.91853 16.2415 6.07481 16.0852C6.23109 15.9289 6.44305 15.8411 6.66406 15.8411H7.4974C7.71841 15.8411 7.93037 15.7533 8.08665 15.597C8.24293 15.4408 8.33073 15.2288 8.33073 15.0078V14.1745C8.33073 13.9534 8.41853 13.7415 8.57481 13.5852C8.73109 13.4289 8.94305 13.3411 9.16406 13.3411H9.3074C9.74939 13.341 10.1732 13.1654 10.4857 12.8528L11.1641 12.1745C12.3223 12.5779 13.5831 12.5764 14.7403 12.1701C15.8975 11.7638 16.8826 10.9768 17.5344 9.93789C18.1862 8.89896 18.4661 7.66959 18.3283 6.4509C18.1906 5.2322 17.6433 4.09633 16.7761 3.22909C15.9089 2.36186 14.773 1.8146 13.5543 1.67686C12.3356 1.53911 11.1062 1.81903 10.0673 2.47082C9.02837 3.12261 8.24139 4.10768 7.8351 5.26488C7.42882 6.42209 7.42727 7.68292 7.83073 8.84112L2.1524 14.5195Z"
                  stroke="#B1B9C3"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.7474 6.67432C13.9775 6.67432 14.1641 6.48777 14.1641 6.25765C14.1641 6.02753 13.9775 5.84098 13.7474 5.84098C13.5173 5.84098 13.3307 6.02753 13.3307 6.25765C13.3307 6.48777 13.5173 6.67432 13.7474 6.67432Z"
                  stroke="#B1B9C3"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            variant={computedVariant}
            className={cn(isRTL ? "pl-10" : "pr-10")}
            aria-invalid={!!error}
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
