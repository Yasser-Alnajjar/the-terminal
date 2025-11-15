import React, { useCallback } from "react";
import { cn } from "@lib/utils";
import {
  Checkbox,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components";
import { Info, ExternalLink } from "lucide-react";

type Pattern = {
  _id: string;
  patternId: string;
  name: string;
  description: string;
  tactics: string[];
  url: string;
  [k: string]: any;
};

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

interface PatternTreeProps {
  rootIds: string[];
  byId: Record<string, Pattern>;
  childrenMap: Record<string, string[]>;
  visibleSet: Set<string>;
  selectedIds: Set<string>;
  onSelectionChange?: (ids: string[]) => void;
  onToggle?: (id: string) => void;
}

export function PatternTree({
  rootIds,
  byId,
  childrenMap,
  visibleSet,
  selectedIds,
  onSelectionChange,
  onToggle,
}: PatternTreeProps) {
  // toggle with fallback
  const internalToggle = useCallback(
    (id: string) => {
      if (onToggle) {
        onToggle(id);
      } else if (onSelectionChange) {
        const next = new Set(selectedIds);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        next.has(id) ? next.delete(id) : next.add(id);
        onSelectionChange(Array.from(next));
      }
    },
    [onToggle, onSelectionChange, selectedIds]
  );

  // Memoized Row
  const Row = React.memo(
    function Row({
      node,
      depth,
      checked,
      onToggleRow,
    }: {
      node: Pattern;
      depth: number;
      checked: boolean;
      onToggleRow: (id: string) => void;
    }) {
      const tactic = node.tactics?.[0] ?? "";

      return (
        <div
          key={node._id}
          className="cursor-pointer text-sm flex items-center justify-between px-4 py-3 border-b border-border hover:bg-muted/50 transition-colors"
          style={{ paddingLeft: depth === 0 ? 8 : depth * 20 }}
          onClick={() => onToggleRow(node._id)}
        >
          <div className="flex items-center gap-3 flex-1">
            <Checkbox
              checked={checked ? true : "indeterminate"}
              className="rounded-full"
              onCheckedChange={() => onToggleRow(node._id)}
            />

            <span className="font-medium text-foreground">
              {node.patternId} - {node.name}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-4">
            <span
              className={cn(
                "inline-flex items-center text-nowrap justify-center rounded-full border px-2 py-0.5 text-xs font-medium transition-colors",
                TACTIC_COLORS[tactic]
              )}
            >
              {tactic}
            </span>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={18} />
                </TooltipTrigger>
                <TooltipContent className="max-w-lg">
                  {node.description}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <a
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open URL"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      );
    },
    (prev, next) =>
      prev.node._id === next.node._id &&
      prev.checked === next.checked &&
      prev.depth === next.depth
  );

  // Recursive renderer
  const renderNode = useCallback(
    (id: string, depth = 0): React.ReactNode => {
      if (!visibleSet.has(id)) return null;

      const node = byId[id];
      if (!node) return null;

      const children = childrenMap[id] ?? [];
      const childrenNodes = children
        .map((cid) => renderNode(cid, depth + 1))
        .filter(Boolean);

      return (
        <div key={id}>
          <Row
            node={node}
            depth={depth}
            checked={selectedIds.has(id)}
            onToggleRow={internalToggle}
          />

          {childrenNodes.length > 0 ? <div>{childrenNodes}</div> : null}
        </div>
      );
    },
    [visibleSet, byId, childrenMap, Row, selectedIds, internalToggle]
  );

  return (
    <div className="w-full border border-border rounded-lg max-h-[400px] overflow-y-auto">
      {rootIds.map((rid) => (
        <div key={rid}>{renderNode(rid, 0)}</div>
      ))}
    </div>
  );
}
