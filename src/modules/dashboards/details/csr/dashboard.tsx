"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { DashboardToolbox } from "./dashboard-toolbox";
import { DashboardGrid } from "./dashboard-grid";
import { DashboardWidget } from "./dashboard-widget";
import { SortableRow } from "./sortable-row";
import { DashboardWidgetModal } from "./dashboard-widget-modal";
import { widgetsToDefinition, makeNewItem } from "./th-mapper";

import type { DragData, ActiveWidget, GridType } from "./types";

import {
  handleDragStart,
  handleDragOver,
  handleDragEnd,
} from "./drag-handlers";
import { DashboardHeader } from "./header";
import { DashboardControls } from "./dashboard-controls";

export function Dashboard({ data }: { data: any }) {
  const [grids, setGrids] = useState<GridType[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [activeItem, setActiveItem] = useState<any | null>(null);
  const [activeDrag, setActiveDrag] = useState<DragData | null>(null);
  const [activeWidget, setActiveWidget] = useState<ActiveWidget | null>(null);

  /** ─── DnD Setup ─────────────────────────────────────────────── */
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  useEffect(() => {
    if (data?.definition?.items)
      setGrids(initializeGrids(data.definition.items));
  }, [data]);

  /** ─── Grid Management ───────────────────────────────────────── */
  const addGrid = () =>
    setGrids([{ id: `grid-${Date.now()}`, widgets: [] }, ...grids]);

  const removeGrid = (gridId: string) =>
    setGrids((prev) => prev.filter((g) => g.id !== gridId));

  const handleSave = () => {
    const allWidgets = grids.flatMap((g) => g.widgets);
    const newDef = widgetsToDefinition(allWidgets, { items: [] });
    console.log("Exported dashboard definition:", newDef);
    setEditMode(false);
  };

  /** ─── Render ───────────────────────────────────────────────── */
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(e) =>
        handleDragStart(e, { grids, setActiveDrag, setActiveWidget })
      }
      onDragOver={(e) => handleDragOver(e, { grids, setGrids })}
      onDragEnd={(e) => {
        const { active, over } = e;

        // ✅ Clear drag state first
        setActiveDrag(null);
        setActiveWidget(null);

        if (!over) return;

        // ✅ Intercept toolbox drag - DO NOT call handleDragEnd
        if (active.data.current?.type === "toolbox") {
          const toolboxType = active.data.current.toolboxType;
          const newItem = makeNewItem(toolboxType);

          setActiveItem(newItem);
          return; // ⚠️ STOP HERE - don't process further
        }

        // ✅ Normal drag logic for widgets and rows only
        handleDragEnd(e, { grids, setGrids, setActiveDrag, setActiveWidget });
      }}
    >
      <div className="space-y-4 p-6">
        {/* Header */}
        <DashboardHeader
          title={data.title || "Dashboard"}
          editMode={editMode}
          onToggleEdit={() => setEditMode((v) => !v)}
          onSave={handleSave}
        />

        {/* Toolbox & Add Row */}
        {editMode && (
          <DashboardControls addGrid={addGrid}>
            <DashboardToolbox />
          </DashboardControls>
        )}

        {/* Rows */}
        <SortableContext
          items={grids.map((g) => g.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {grids.map((grid) => (
              <SortableRow key={grid.id} gridId={grid.id} editMode={editMode}>
                <DashboardGrid
                  gridId={grid.id}
                  widgets={grid.widgets}
                  setWidgets={(newWidgets) =>
                    setGrids(
                      grids.map((g) =>
                        g.id === grid.id ? { ...g, widgets: newWidgets } : g
                      )
                    )
                  }
                  editMode={editMode}
                  onRemoveGrid={() => removeGrid(grid.id)}
                  canRemove={grids.length > 1}
                />
              </SortableRow>
            ))}
          </div>
        </SortableContext>

        {/* Widget Modal */}
        {activeItem && (
          <DashboardWidgetModal
            open={!!activeItem}
            item={activeItem}
            onClose={() => {
              setActiveItem(null);
            }}
            onSave={(updated) => {
              if (!activeItem) return;

              setGrids((prev) => {
                const target = [...prev];
                const gridIndex = target.findIndex(
                  (g) => g.id === activeItem.targetGridId
                );

                if (gridIndex >= 0) {
                  const exists = target[gridIndex].widgets.some(
                    (w) => w.id === updated.id
                  );
                  if (!exists) {
                    target[gridIndex].widgets = [
                      ...target[gridIndex].widgets,
                      updated,
                    ];
                  }
                } else if (target.length > 0) {
                  const exists = target[0].widgets.some(
                    (w) => w.id === updated.id
                  );
                  if (!exists) {
                    target[0].widgets = [...target[0].widgets, updated];
                  }
                } else {
                  target.push({
                    id: `grid-${Date.now()}`,
                    widgets: [updated],
                  });
                }

                return target;
              });

              setActiveItem(null);
            }}
          />
        )}

        {/* Drag Overlay */}
        <DragOverlay>
          {activeDrag?.type === "widget" && activeWidget && (
            <div className="opacity-80">
              <DashboardWidget item={activeWidget} />
            </div>
          )}
          {activeDrag?.type === "toolbox" && activeDrag.toolboxType && (
            <div className="opacity-80 w-[250px] h-[250px]">
              <DashboardWidget item={makeNewItem(activeDrag.toolboxType)} />
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

const initializeGrids = (items: any[]) =>
  items.map((container: any) => ({
    id: `grid-${Date.now()}-${Math.random()}`,
    widgets: container.items || [],
  }));
