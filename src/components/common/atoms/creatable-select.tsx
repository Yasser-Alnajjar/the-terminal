"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@lib/utils";

interface CreatableSelectProps {
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function CreatableSelect({
  value = [],
  onChange,
  placeholder = "Type or create...",
  className,
}: CreatableSelectProps) {
  const [options, setOptions] = useState<string[]>(value);
  const [inputValue, setInputValue] = useState("");
  const [showList, setShowList] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateOptions = (vals: string[]) => {
    setOptions(vals);
    onChange?.(vals);
  };

  const removeOption = (val: string) => {
    const newVals = options.filter((v) => v !== val);
    updateOptions(newVals);
  };

  const addOption = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return;
    if (options.includes(trimmed)) return;
    const newVals = [...options, trimmed];
    updateOptions(newVals);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addOption(inputValue);
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      options.length > 0
    ) {
      removeOption(options[options.length - 1]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered =
    inputValue.trim() === ""
      ? options
      : options.filter((opt) =>
          opt.toLowerCase().includes(inputValue.toLowerCase())
        );

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <div
        className={cn(
          "flex flex-wrap items-center gap-1 border rounded-md px-2 py-1.5 min-h-[42px] cursor-text bg-background focus-within:ring-2 focus-within:ring-ring"
        )}
        onClick={() => {
          inputRef.current?.focus();

          setShowList(true);
        }}
      >
        {options.map((val) => (
          <span
            key={val}
            className="flex items-center gap-1 bg-muted rounded-md px-2 py-0.5 text-sm"
          >
            {val}
            <X
              className="w-3 h-3 cursor-pointer hover:text-destructive"
              onClick={() => removeOption(val)}
            />
          </span>
        ))}

        <input
          ref={inputRef}
          value={inputValue}
          onFocus={() => setShowList(true)}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowList(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={options.length === 0 ? placeholder : ""}
          className="flex-1 bg-transparent outline-none text-sm min-w-[80px] py-0.5"
        />
      </div>

      {showList && (
        <div className="absolute z-50 w-72 rounded-md  border border-border overflow-hidden bg-background p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
          {filtered.length ? (
            filtered.map((opt) => (
              <div
                key={opt}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => removeOption(opt)}
                className="cursor-pointer px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                {opt}
              </div>
            ))
          ) : (
            <>empty</>
          )}
        </div>
      )}
    </div>
  );
}
