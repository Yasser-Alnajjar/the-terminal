// MitreAttack.tsx
"use client";

import React, { useMemo, useState, useCallback, useEffect } from "react";
import { PatternTree } from "./pattern-tree";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components";
import rawPatterns from "public/ttp.json";

type Pattern = {
  _id: string;
  patternId: string;
  name: string;
  description: string;
  tactics: string[];
  url: string;
  // allow extra fields
  [k: string]: any;
};

interface MitreAttackProps {
  selectedItems?: (items: string[]) => void;
}

export function MitreAttack({ selectedItems }: MitreAttackProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedTactic, setSelectedTactic] = useState<string>("all");
  const [showSelection, setShowSelection] = useState<boolean>(false);

  /**
   * Precompute everything once:
   * - byId
   * - childrenMap (parentId -> childrenIds)
   * - rootIds (top-level patterns)
   * - parentsMap (id -> ancestor ids)
   * - patternsByTactic (tactic -> ids)
   * - tactics (list)
   */
  const {
    byId,
    childrenMap,
    rootIds,
    parentsMap,
    patternsByTactic,
    tactics,
    allPatternIds,
  } = useMemo(() => {
    const patterns: Pattern[] = Array.isArray(rawPatterns)
      ? (rawPatterns as Pattern[])
      : [];

    const byId: Record<string, Pattern> = {};
    const childrenMap: Record<string, string[]> = {};
    const parentsMap: Record<string, string[]> = {};
    const patternsByTactic: Record<string, string[]> = {};
    const tacticsSet = new Set<string>();
    const allPatternIds: string[] = [];
    const rootIds: string[] = [];

    // index patterns by patternId for quick lookup
    const patternIdIndex: Record<string, Pattern> = {};
    for (const p of patterns) {
      patternIdIndex[p.patternId] = p;
    }

    for (const p of patterns) {
      byId[p._id] = p;
      allPatternIds.push(p._id);

      // tactics indexing
      const tactic = p.tactics?.[0] ?? "all";
      tacticsSet.add(tactic);
      if (!patternsByTactic[tactic]) patternsByTactic[tactic] = [];
      patternsByTactic[tactic].push(p._id);

      // build children map using patternId parent relationship
      const parts = p.patternId.split(".");
      if (parts.length === 1) {
        rootIds.push(p._id);
      } else {
        const parentPid = parts.slice(0, -1).join(".");
        const parent = patternIdIndex[parentPid];
        if (parent) {
          if (!childrenMap[parent._id]) childrenMap[parent._id] = [];
          childrenMap[parent._id].push(p._id);
        } else {
          // if parent not found, treat as root
          rootIds.push(p._id);
        }
      }

      // compute parent chain (ancestors) for quick selectedPatterns expansion
      const parentIds: string[] = [];
      const climbing = [...parts];
      while (climbing.length > 1) {
        climbing.pop();
        const parentPatternId = climbing.join(".");
        const parent = patternIdIndex[parentPatternId];
        if (parent) parentIds.push(parent._id);
      }
      parentsMap[p._id] = parentIds;
    }

    return {
      byId,
      childrenMap,
      rootIds,
      parentsMap,
      patternsByTactic,
      tactics: ["all", ...Array.from(tacticsSet)],
      allPatternIds,
    };
  }, []);

  /**
   * Compute visibleSet of pattern ids when filtering by tactic.
   * We want to render:
   * - only nodes that belong to the tactic OR
   * - their ancestors (to preserve hierarchy)
   */
  const visibleSet = useMemo(() => {
    if (selectedTactic === "all") {
      return new Set(allPatternIds);
    }

    const ids = new Set<string>(patternsByTactic[selectedTactic] ?? []);
    // also include ancestors of those ids so hierarchy shows up
    const stack = Array.from(ids);
    while (stack.length) {
      const id = stack.pop()!;
      const parents = parentsMap[id] ?? [];
      for (const p of parents) {
        if (!ids.has(p)) {
          ids.add(p);
          stack.push(p);
        }
      }
    }
    return ids;
  }, [selectedTactic, patternsByTactic, parentsMap, allPatternIds]);

  /**
   * Compute visibleRootIds: top-level roots that have at least one descendant in visibleSet.
   */
  const visibleRootIds = useMemo(() => {
    // helper to check if any descendant of node is in visibleSet
    const hasVisibleDescendant = (id: string, cache: Map<string, boolean>) => {
      if (cache.has(id)) return cache.get(id)!;
      if (visibleSet.has(id)) {
        cache.set(id, true);
        return true;
      }
      const children = childrenMap[id] ?? [];
      for (const childId of children) {
        if (hasVisibleDescendant(childId, cache)) {
          cache.set(id, true);
          return true;
        }
      }
      cache.set(id, false);
      return false;
    };

    const cache = new Map<string, boolean>();
    return rootIds.filter((rid) => hasVisibleDescendant(rid, cache));
  }, [rootIds, childrenMap, visibleSet]);

  /**
   * Expand selectedIds to include ancestors for show-selection display.
   * This is computed where needed by PatternTree consumer if desired.
   */

  // keep selection ownership in parent
  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return Array.from(next);
    });
  }, []);

  const setSelection = useCallback((ids: string[]) => {
    setSelectedIds(ids);
  }, []);

  // emit selection outward
  useEffect(() => {
    selectedItems?.(selectedIds);
  }, [selectedIds, selectedItems]);

  // precompute selectedPatterns expanded with parents (for showSelection mode)
  const selectedExpandedIds = useMemo(() => {
    const result = new Set<string>();
    for (const id of selectedIds) {
      result.add(id);
      const parents = parentsMap[id] ?? [];
      for (const p of parents) result.add(p);
    }
    return result;
  }, [selectedIds, parentsMap]);

  return (
    <div>
      <div className="flex items-center gap-4 mb-3">
        {!showSelection && (
          <Select value={selectedTactic} onValueChange={setSelectedTactic}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filter by tactic" />
            </SelectTrigger>
            <SelectContent>
              {tactics.map((t) => (
                <SelectItem key={t} value={t}>
                  {t === "all"
                    ? "All tactics"
                    : t
                        .split("-")
                        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                        .join(" ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {selectedIds.length > 0 && (
          <Button
            variant="ghost"
            className="ms-auto"
            onClick={() => setShowSelection((prev) => !prev)}
          >
            {showSelection ? "Show All" : "Show Selection"}
          </Button>
        )}
      </div>

      <PatternTree
        rootIds={
          showSelection
            ? Array.from(selectedExpandedIds).filter((id) => {
                // selectedExpandedIds may contain non-root ids; we want roots to start rendering from
                // find the top ancestor for each selected/expanded id to use as roots in showSelection mode
                const parents = parentsMap[id] ?? [];
                return parents.length === 0; // roots only
              })
            : visibleRootIds
        }
        byId={byId}
        childrenMap={childrenMap}
        visibleSet={showSelection ? selectedExpandedIds : visibleSet}
        selectedIds={new Set(selectedIds)}
        onSelectionChange={setSelection}
        onToggle={toggleSelection}
      />
    </div>
  );
}
