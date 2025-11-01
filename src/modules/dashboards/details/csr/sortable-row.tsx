"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";

export function SortableRow({
  gridId,
  editMode,
  children,
}: {
  gridId: string;
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
    id: gridId,
    data: {
      type: "row",
      gridId,
    },
    disabled: !editMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  if (!editMode) {
    return <div>{children}</div>;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isDragging ? "z-40" : ""}`}
      {...attributes}
      {...listeners}
    >
      <div className="cursor-move border-2 border-dashed border-transparent hover:border-primary/50 rounded-lg transition-colors">
        {children}
      </div>
    </div>
  );
}
