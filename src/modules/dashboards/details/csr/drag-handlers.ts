import { arrayMove } from "@dnd-kit/sortable";
import type { DragData } from "./types";
import type {
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";

export const handleDragStart = (
  event: DragStartEvent,
  { grids, setActiveDrag, setActiveWidget }: any
) => {
  const { active } = event;
  const data = active.data.current as DragData;
  setActiveDrag(data);

  if (data?.type === "widget") {
    const grid = grids.find((g: any) => g.id === data.gridId);
    const widget = grid?.widgets.find((w: any) => w.id === data.widgetId);
    setActiveWidget(widget || null);
  } else {
    setActiveWidget(null);
  }
};

export const handleDragOver = (
  event: DragOverEvent,
  { grids, setGrids }: any
) => {
  const { active, over } = event;
  if (!over) return;

  const activeData = active.data.current as DragData;
  const overData = over.data.current as any;

  // ⚠️ IGNORE toolbox items - they're handled in onDragEnd with modal
  if (activeData?.type === "toolbox") {
    return;
  }

  // Only handle widget movement between grids
  if (activeData?.type === "widget" && overData?.gridId) {
    const fromGridId = activeData.gridId!;
    const toGridId = overData.gridId;
    if (fromGridId === toGridId) return;

    const fromGrid = grids.find((g: any) => g.id === fromGridId);
    const toGrid = grids.find((g: any) => g.id === toGridId);
    if (!fromGrid || !toGrid) return;

    const widget = fromGrid.widgets.find(
      (w: any) => w.id === activeData.widgetId
    );
    if (!widget) return;

    const newFromWidgets = fromGrid.widgets.filter(
      (w: any) => w.id !== activeData.widgetId
    );
    const newToWidgets = [...toGrid.widgets];
    const insertIndex = overData.index ?? toGrid.widgets.length;
    newToWidgets.splice(insertIndex, 0, widget);

    setGrids(
      grids.map((g: any) => {
        if (g.id === fromGridId) return { ...g, widgets: newFromWidgets };
        if (g.id === toGridId) return { ...g, widgets: newToWidgets };
        return g;
      })
    );
  }
};

export const handleDragEnd = (
  event: DragEndEvent,
  { grids, setGrids, setActiveDrag, setActiveWidget }: any
) => {
  const { active, over } = event;
  setActiveDrag(null);
  setActiveWidget(null);
  if (!over) return;

  const activeData = active.data.current as DragData;
  const overData = over.data.current as any;

  // ⚠️ REMOVED: Toolbox drop logic (now handled in Dashboard component)

  // Widget reorder within same grid
  if (
    activeData?.type === "widget" &&
    overData?.gridId &&
    activeData.gridId === overData.gridId
  ) {
    const grid = grids.find((g: any) => g.id === activeData.gridId);
    if (!grid) return;

    const oldIndex = grid.widgets.findIndex(
      (w: any) => w.id === activeData.widgetId
    );
    const newIndex = overData.index ?? grid.widgets.length;
    if (oldIndex !== newIndex) {
      const newWidgets = arrayMove(grid.widgets, oldIndex, newIndex);
      setGrids(
        grids.map((g: any) =>
          g.id === grid.id ? { ...g, widgets: newWidgets } : g
        )
      );
    }
    return;
  }

  // Row reorder
  if (activeData?.type === "row" && overData?.type === "row") {
    const oldIndex = grids.findIndex((g: any) => g.id === active.id);
    const newIndex = grids.findIndex((g: any) => g.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      setGrids(arrayMove(grids, oldIndex, newIndex));
    }
  }
};
