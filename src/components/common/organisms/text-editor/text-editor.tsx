"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { cn } from "@lib/utils";
import type { MDEditorProps } from "@uiw/react-md-editor";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface TextEditorProps extends MDEditorProps {
  className?: string;
  height?: number;
}

const TextEditor = React.forwardRef<HTMLDivElement, TextEditorProps>(
  ({ className, height = 200, value, onChange, ...props }, ref) => {
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
        className={cn(
          "relative w-full rounded-md border border-border bg-background  transition-all",
          className
        )}
      >
        <MDEditor
          value={value ?? internalValue}
          onChange={handleChange}
          preview="edit"
          height={height}
          className="!border-0 !bg-background !shadow-none"
          visibleDragbar={true}
          textareaProps={{
            placeholder: "Start typing here...",
          }}
          {...props}
        />
      </div>
    );
  }
);

TextEditor.displayName = "TextEditor";
export { TextEditor };
