"use client";
import type React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DashboardWidget } from "./dashboard-widget";
import { SortableWidget } from "./sortable-widget";
import { Button } from "@components";
import { Trash2 } from "lucide-react";
import { cn } from "@lib/utils";

export function DashboardGrid({
  gridId,
  widgets,
  setWidgets,
  editMode,
  onRemoveGrid,
  canRemove,
}: {
  gridId: string;
  widgets: any[];
  setWidgets: (w: any[]) => void;
  editMode: boolean;
  onRemoveGrid: () => void;
  canRemove: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: gridId,
    data: {
      type: "grid",
      gridId,
    },
  });

  const widgetIds = widgets.map((w) => w.id);
  const handleRemoveWidget = (id: string) => {
    setWidgets(widgets.filter((w) => w.id !== id));
  };
  return (
    <div
      ref={setNodeRef}
      className={cn(
        `relative flex gap-4 w-full transition-colors`,
        editMode && "rounded-lg border p-2",
        isOver ? "border-primary-400" : "border-border"
      )}
    >
      <div className="flex-1">
        <SortableContext
          items={widgetIds}
          strategy={verticalListSortingStrategy}
        >
          <div
            className={`grid gap-4 ${
              widgets.length === 0
                ? "min-h-[200px] grid-cols-1"
                : widgets.length === 1
                ? "grid-cols-1"
                : widgets.length === 2
                ? "grid-cols-2"
                : "grid-cols-3"
            }`}
          >
            {widgets.length === 0 && editMode && (
              <div className="flex items-center justify-center text-muted-foreground text-sm">
                Drop widgets here
              </div>
            )}

            {widgets.map((widget, index) => (
              <SortableWidget
                key={widget.id}
                widget={widget}
                gridId={gridId}
                index={index}
                editMode={editMode}
              >
                <DashboardWidget
                  item={widget}
                  editMode={editMode}
                  onRemove={() => handleRemoveWidget(widget.id)}
                />
              </SortableWidget>
            ))}
          </div>
        </SortableContext>
      </div>
      {editMode && canRemove && (
        <Button
          onClick={onRemoveGrid}
          // className="ms-auto mb-4"
          variant="error"
          size="icon"
        >
          <Trash2 size={14} />
        </Button>
      )}
    </div>
  );
}
