"use client";

import { useState, useRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@lib/utils";
import { inputVariants } from "@components";

interface TagSelectProps {
  placeholder?: string;
  className?: string;
  onChange?: (selected: string[]) => void;
  value?: string[];
}

export function TagSelect({
  placeholder = "Add or select...",
  onChange,
  className,
  value = [],
}: TagSelectProps) {
  const [selected, setSelected] = useState<string[]>(value);
  const [query, setQuery] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddNew = () => {
    const trimmed = query.trim();
    if (trimmed && !selected.includes(trimmed)) {
      const updated = [...selected, trimmed];
      setSelected(updated);
      onChange?.(updated);
    }
    setQuery("");
  };

  const handleRemove = (tag: string) => {
    const updated = selected.filter((t) => t !== tag);
    setSelected(updated);
    onChange?.(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddNew();
    }
    if (e.key === "Backspace" && query === "" && selected.length > 0) {
      handleRemove(selected[selected.length - 1]);
    }
  };

  const handleFocus = () => {
    setTimeout(() => setShowDropdown(true), 50);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 150);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          inputVariants(),
          "h-auto py-1.5 flex flex-wrap items-center gap-1 cursor-text"
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {selected.map((tag, index) => (
          <div
            key={index}
            className="cursor-pointer flex items-center gap-1 bg-primary-25 hover:bg-primary-25 text-primary-400 px-2 py-0.5 rounded-full text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(tag);
            }}
          >
            {tag}
          </div>
        ))}

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={selected.length === 0 ? placeholder : ""}
          className="flex-1 bg-transparent outline-none border-none text-sm p-0"
        />
      </div>

      {/* Smooth Popover */}
      <div
        className={cn(
          "absolute left-0 top-full mt-1 w-full max-h-48 bg-background overflow-auto border border-border rounded-md shadow-md z-50 p-2 transition-all duration-200 ease-out transform",
          showDropdown
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        )}
      >
        {selected.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-2">
            {query.trim() ? "Press Enter to add new" : "No items found"}
          </div>
        ) : (
          <ul className="space-y-1">
            {selected.map((tag, index) => (
              <li
                key={index}
                className="flex items-center justify-between capitalize text-sm font-medium px-2 py-1 rounded-md bg-primary-25 hover:bg-primary-50 text-primary-400 cursor-pointer transition-colors"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleRemove(tag);
                }}
              >
                <span>{tag}</span>
                <Check size={14} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
