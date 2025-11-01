"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";

export function SortableWidget({
  widget,
  gridId,
  index,
  editMode,
  children,
}: {
  widget: any;
  gridId: string;
  index: number;
  editMode: boolean;
  children: ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: widget.id,
    data: {
      type: "widget",
      widgetId: widget.id,
      gridId,
      index,
    },
    disabled: !editMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${editMode ? "cursor-move" : ""} ${isDragging ? "z-50" : ""}`}
    >
      {children}
    </div>
  );
}
