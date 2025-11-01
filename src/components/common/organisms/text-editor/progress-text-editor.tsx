"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { cn } from "@lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components";
import type { MDEditorProps } from "@uiw/react-md-editor";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export interface ProgressTextEditorProps extends MDEditorProps {
  variant?: "default" | "error" | "warning" | "success";
  height?: number;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  placeholder?: string;
}

const ProgressTextEditor = React.forwardRef<
  HTMLDivElement,
  ProgressTextEditorProps
>(
  (
    {
      className,
      height = 200,
      variant = "default",
      value,
      onChange,
      disabled,
      dir = "ltr",
      ...props
    },
    ref
  ) => {
    const { resolvedTheme } = useTheme();
    const [internalValue, setInternalValue] = React.useState<string>("");

    const handleChange = (val?: string) => {
      if (onChange) onChange(val);
      else setInternalValue(val || "");
    };

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

    return (
      <div
        ref={ref}
        data-color-mode={resolvedTheme}
        dir={dir}
        className={cn("w-full group relative", className)}
      >
        <TooltipProvider delayDuration={300}>
          <div
            className={cn(
              "overflow-hidden flex w-full text-xs border border-border rounded-ss-lg rounded-se-lg disabled:rounded-lg bg-background transition-all duration-300 focus-within:ring-0 disabled:opacity-50",
              disabled && "opacity-50 pointer-events-none"
            )}
          >
            <MDEditor
              value={value ?? internalValue}
              onChange={handleChange}
              preview="edit"
              height={height}
              className="!border-0 !bg-background !shadow-none w-full"
              textareaProps={{
                placeholder: props.placeholder || "Start typing here...",
                disabled,
                className:
                  "text-xs bg-transparent focus:outline-none placeholder:text-gray-400",
              }}
              components={{
                toolbar: (command, disabled, executeCommand) => (
                  <Tooltip key={command.name}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => executeCommand(command)}
                        disabled={disabled}
                        className={cn(
                          "p-1.5 rounded-md hover:bg-muted transition-colors",
                          disabled && "opacity-40 cursor-not-allowed"
                        )}
                      >
                        {command.icon || command?.name?.charAt(0).toUpperCase()}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs capitalize">
                      {command.name}
                    </TooltipContent>
                  </Tooltip>
                ),
              }}
              {...props}
            />
          </div>
        </TooltipProvider>

        <span
          className={cn(
            "absolute left-0 bottom-0 w-full h-[2px] group-hover:bg-border overflow-hidden before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-full before:w-0 before:transition-[width,background-color] before:duration-300 transition-all duration-300",
            variantColorMap[variant || "default"]
          )}
        />
      </div>
    );
  }
);

ProgressTextEditor.displayName = "ProgressTextEditor";
export { ProgressTextEditor };
