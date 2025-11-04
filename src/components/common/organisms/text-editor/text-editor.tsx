"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { cn } from "@lib/utils";
import type { MDEditorProps } from "@uiw/react-md-editor";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface TextEditorProps extends MDEditorProps {
  className?: string;
  height?: number;
  dir?: "ltr" | "rtl";
  placeholder?: string;
  disabled?: boolean;
}

const TextEditor = React.forwardRef<HTMLDivElement, TextEditorProps>(
  (
    {
      className,
      dir,
      placeholder,
      disabled,
      height = 200,
      value,
      onChange,
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
              "overflow-hidden flex w-full text-xs border border-border rounded-lg bg-background transition-all duration-300 focus-within:ring-0 disabled:opacity-50",
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
                placeholder: placeholder || "Start typing here...",
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
      </div>
    );
  }
);

TextEditor.displayName = "TextEditor";
export { TextEditor };
