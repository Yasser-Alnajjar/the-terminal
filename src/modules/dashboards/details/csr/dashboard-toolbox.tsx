"use client";

import type React from "react";
import { LineChart, PieChart, Hash, Gauge, Radar } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { Button, TooltipTrigger } from "@components";
import { Tooltip, TooltipContent, TooltipProvider } from "@components";

export interface WidgetItem {
  type: string;
  id: string;
  icon: React.ComponentType<any>;
}

export const TOOLBOX_ITEMS: WidgetItem[] = [
  { type: "line", id: "line-toolbox", icon: LineChart },
  { type: "donut", id: "donut-toolbox", icon: PieChart },
  { type: "counter", id: "counter-toolbox", icon: Hash },
  { type: "gauge", id: "gauge-toolbox", icon: Gauge },
  { type: "radar", id: "radar-toolbox", icon: Radar },
];

function ToolboxItem({ item }: { item: WidgetItem }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: item.id,
    data: {
      type: "toolbox",
      toolboxType: item.type,
    },
  });

  const Icon = item.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          variant="outline"
          size="icon"
          className={`rounded-full bg-transparent active:cursor-grabbing`}
        >
          <Icon className="h-5 w-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <span className="text-sm capitalize">{item.type}</span>
      </TooltipContent>
    </Tooltip>
  );
}

export function DashboardToolbox() {
  return (
    <TooltipProvider>
      {TOOLBOX_ITEMS.map((item) => (
        <ToolboxItem key={item.id} item={item} />
      ))}
    </TooltipProvider>
  );
}
