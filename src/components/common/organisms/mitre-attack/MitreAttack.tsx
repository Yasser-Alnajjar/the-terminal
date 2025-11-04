"use client";

import { useState, useMemo } from "react";
import { PatternTree } from "./pattern-tree";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components";
import patterns from "public/ttp.json";

export function MitreAttack() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedTactic, setSelectedTactic] = useState<string>("all");
  const [showSelection, setShowSelection] = useState<boolean>(false);

  const allTactics = useMemo(() => {
    const set = new Set<string>();
    for (const p of patterns) {
      set.add(p.tactics.at(0) ?? "all");
    }
    return ["all", ...Array.from(set)];
  }, []);

  const filteredPatterns = useMemo(() => {
    if (selectedTactic === "all") return patterns;
    return patterns.filter((p) => p.tactics.includes(selectedTactic));
  }, [selectedTactic]);
  const selectedPatterns = useMemo(() => {
    return patterns.filter((p) => selectedIds.includes(p._id));
  }, [selectedIds]);

  return (
    <>
      <div className="flex items-center">
        {!showSelection && (
          <Select value={selectedTactic} onValueChange={setSelectedTactic}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filter by tactic" />
            </SelectTrigger>
            <SelectContent>
              {allTactics.map((tactic) => (
                <SelectItem key={tactic} value={tactic}>
                  {tactic === "all"
                    ? "All tactics"
                    : tactic
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
            onClick={() => {
              setShowSelection((prev) => !prev);
            }}
          >
            {showSelection ? "Show All" : "Show Selection"}
          </Button>
        )}
      </div>

      <PatternTree
        patterns={
          showSelection
            ? selectedPatterns
            : filteredPatterns.sort((a, b) => {
                return (a?.tactics?.at(0) || a.name).localeCompare(
                  b?.tactics?.at(0) || a.name
                );
              })
        }
        onSelectionChange={setSelectedIds}
      />
    </>
  );
}
