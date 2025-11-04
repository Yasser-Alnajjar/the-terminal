"use client";

import { useState } from "react";
import { Info, ExternalLink } from "lucide-react";
import { cn } from "@lib/utils";
import {
  Checkbox,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components";

interface Pattern {
  _id: string;
  patternId: string;
  name: string;
  description: string;
  tactics: string[];
  url: string;
}

interface PatternTreeProps {
  patterns: Pattern[];
  onSelectionChange?: (selectedIds: string[]) => void;
}
const TACTIC_COLORS: Record<string, string> = {
  "command-and-control": "bg-warning-50 text-warning-400 border-warning-500/40",
  "credential-access": "bg-error-50 text-error-300 border-error-200",
  collection:
    "bg-sky-50 text-sky-700 border-sky-500/30 dark:bg-sky-500/30 dark:text-sky-50 dark:border-sky-200/30",
  "defense-evasion":
    "bg-rose-50 text-rose-700 border-rose-500/30 dark:bg-rose-500/30 dark:text-rose-50 dark:border-rose-200/30",
  discovery:
    "bg-cyan-50 text-cyan-700 border-cyan-500/30 dark:bg-cyan-500/30 dark:text-cyan-50 dark:border-cyan-200/30",
  exfiltration:
    "bg-indigo-50 text-indigo-700 border-indigo-500/30 dark:bg-indigo-500/30 dark:text-indigo-50 dark:border-indigo-200/30",
  "lateral-movement":
    "bg-pink-50 text-pink-700 border-pink-500/30 dark:bg-pink-500/30 dark:text-pink-50 dark:border-pink-200/30",
  persistence:
    "bg-teal-50 text-teal-700 border-teal-500/30 dark:bg-teal-500/30 dark:text-teal-50 dark:border-teal-200/30",
  execution:
    "bg-green-50 text-green-700 border-green-500/30 dark:bg-green-500/30 dark:text-green-50 dark:border-green-200/30",
  "privilege-escalation":
    "bg-orange-50 text-orange-700 border-orange-500/30 dark:bg-orange-500/30 dark:text-orange-50 dark:border-orange-200/30",
  "initial-access":
    "bg-red-50 text-red-700 border-red-500/30 dark:bg-red-500/30 dark:text-red-50 dark:border-red-200/30",
  impact:
    "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-500/30 dark:bg-fuchsia-500/30 dark:text-fuchsia-50 dark:border-fuchsia-200/30",
  "resource-development":
    "bg-lime-50 text-lime-700 border-lime-500/30 dark:bg-lime-500/30 dark:text-lime-50 dark:border-lime-200/30",
  reconnaissance:
    "bg-blue-50 text-blue-700 border-blue-500/30 dark:bg-blue-500/30 dark:text-blue-50 dark:border-blue-200/30",
};
export function PatternTree({ patterns, onSelectionChange }: PatternTreeProps) {
  const [selectedPatterns, setSelectedPatterns] = useState<Set<string>>(
    new Set()
  );

  // Group patterns by parent ID
  const getChildren = (parentId: string) => {
    return patterns.filter((p) => p.patternId.startsWith(parentId + "."));
  };

  const getRootPatterns = () => {
    return patterns.filter((p) => !p.patternId.includes("."));
  };

  const handleCheckboxChange = (patternId: string, checked: boolean) => {
    const newSelected = new Set(selectedPatterns);
    if (checked) {
      newSelected.add(patternId);
    } else {
      newSelected.delete(patternId);
    }
    setSelectedPatterns(newSelected);
    onSelectionChange?.(Array.from(newSelected));
  };

  const PatternRow = ({
    pattern,
    isChild = false,
  }: {
    pattern: Pattern;
    isChild?: boolean;
  }) => {
    const children = getChildren(pattern.patternId);
    const hasChildren = children.length > 0;
    const isSelected = selectedPatterns.has(pattern._id);

    return (
      <div key={pattern._id}>
        <div
          className={cn(
            "cursor-pointer text-sm flex items-center justify-between px-4 py-3 border-b border-border hover:bg-muted/50 transition-colors",
            isChild && "ps-12"
          )}
          onClick={() => {
            handleCheckboxChange(pattern._id, isSelected ? false : true);
          }}
        >
          <div className="flex items-center gap-3 flex-1">
            <Checkbox
              checked={isSelected ? true : "indeterminate"}
              className="rounded-full"
              onCheckedChange={(checked) => {
                handleCheckboxChange(pattern._id, checked === true);
              }}
            />

            <span className="font-medium text-foreground">
              {pattern.patternId} - {pattern.name}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-4">
            <span
              className={cn(
                "inline-flex items-center text-nowrap justify-center text-center rounded-full border px-2 py-0.5 text-xs font-medium transition-colors leading-normal",
                TACTIC_COLORS[pattern.tactics.at(0) || ""]
              )}
            >
              {pattern.tactics.at(0)}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="cursor-pointer">
                  <Info size={18} />
                </TooltipTrigger>
                <TooltipContent className="max-w-lg">
                  {pattern.description}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <a
              href={pattern.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View details"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        {hasChildren && (
          <div>
            {children.map((child) => (
              <PatternRow key={child._id} pattern={child} isChild={true} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const rootPatterns = getRootPatterns();

  return (
    <div className="w-full border border-border rounded-lg overflow-hidden">
      {rootPatterns.map((pattern) => (
        <PatternRow key={pattern._id} pattern={pattern} />
      ))}
    </div>
  );
}
