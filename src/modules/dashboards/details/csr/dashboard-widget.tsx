"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useTheme } from "next-themes";
import { CounterCard } from "./CounterCard";
import {
  Gauge,
  Calculator,
  LineChart,
  PieChart,
  Radar,
  Trash2,
} from "lucide-react";
import { Button } from "@components";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

interface DashboardWidgetProps {
  item: any;
  editMode?: boolean;
  onRemove?: () => void;
}

export function DashboardWidget({
  item,
  editMode,
  onRemove,
}: DashboardWidgetProps) {
  const { type, options } = item;
  const title = options?.title ?? "Untitled";
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const items = [
    { type: "line", icon: <LineChart size={16} /> },
    { type: "donut", icon: <PieChart size={16} /> },
    { type: "counter", icon: <Calculator size={16} /> },
    { type: "gauge", icon: <Gauge size={16} /> },
    { type: "radar", icon: <Radar size={16} /> },
  ];

  const echartOptions = useMemo(() => {
    const textColor = isDark ? "#b2ccd6" : "#20252e";
    const gridLine = isDark ? "#2a2e4a" : "#e5e7eb";
    const tooltipBg = isDark ? "#2a303c" : "#ffffff";
    const tooltipBorder = isDark ? "#20252e" : "#f4f6fa";

    // Same switch-case as before (no changes inside)
    switch (type) {
      case "line": {
        const series = (options.series || []).map((s: any) => ({
          name: s.label || s.agg,
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 6,
          lineStyle: { width: 2 },
          data: generateMockTimelineData(),
        }));

        return {
          backgroundColor: "transparent",
          tooltip: {
            trigger: "axis",
            backgroundColor: tooltipBg,
            borderColor: tooltipBorder,
            textStyle: { color: textColor },
          },
          grid: { top: 50, left: 40, right: 20, bottom: 50 },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: mockCategories(),
            axisLine: { lineStyle: { color: textColor } },
            axisLabel: { color: textColor },
          },
          yAxis: {
            type: "value",
            axisLine: { lineStyle: { color: textColor } },
            axisLabel: { color: textColor },
            splitLine: { lineStyle: { color: gridLine, type: "dotted" } },
          },
          series,
        };
      }

      case "donut": {
        const data = options.customize?.length
          ? options.customize.map((c: any) => ({
              name: c.label || c.name,
              value: Math.round(Math.random() * 100),
              itemStyle: { color: c.color },
            }))
          : [
              { name: "A", value: 30 },
              { name: "B", value: 20 },
              { name: "C", value: 50 },
            ];

        return {
          backgroundColor: "transparent",
          tooltip: {
            trigger: "item",
            backgroundColor: tooltipBg,
            borderColor: tooltipBorder,
            textStyle: { color: textColor },
          },
          legend: {
            orient: "horizontal",
            right: "center",
            top: "bottom",
            textStyle: { color: textColor },
          },
          series: [
            {
              name: title,
              type: "pie",
              radius: ["45%", "70%"],
              avoidLabelOverlap: false,
              label: { show: false },
              itemStyle: {
                borderRadius: 15,
                borderColor: isDark ? "#20252e" : "#f4f6fa",
                borderWidth: 2,
              },
              data,
            },
          ],
        };
      }

      case "radar": {
        const categories = options.customize?.map(
          (c: any) => c.label || c.name
        ) || ["clear", "amber"];
        const values =
          options.data?.map((d: any) => d.value) ||
          new Array(categories.length).fill(0);

        const color = options.customize?.[0]?.color || "#4a90e2";

        return {
          backgroundColor: "transparent",
          tooltip: { trigger: "axis" },
          grid: { top: 10, bottom: 0, left: 0, right: 0 },
          xAxis: {
            type: "category",
            data: categories,
            axisLine: { lineStyle: { color: textColor } },
            axisLabel: { color: textColor, fontSize: 12 },
          },
          yAxis: {
            type: "value",
            splitLine: { lineStyle: { color: gridLine, type: "dotted" } },
            axisLine: { show: false },
            axisLabel: { color: textColor },
          },
          series: [
            {
              type: "line",
              data: values,
              lineStyle: { color, width: 2 },
              symbol: "circle",
              symbolSize: 10,
              itemStyle: {
                color,
                borderColor: isDark ? "#20252e" : "#f4f6fa",
                borderWidth: 2,
              },
            },
          ],
        };
      }

      case "gauge": {
        const val = Math.floor(Math.random() * 100);
        return {
          backgroundColor: "transparent",
          series: [
            {
              type: "gauge",
              startAngle: 200,
              endAngle: -20,
              progress: { show: true, width: 18 },
              pointer: { itemStyle: { color: "auto" } },
              axisLine: {
                lineStyle: {
                  width: 18,
                  color: [
                    [0.3, isDark ? "#67e0e3" : "#76c7c0"],
                    [0.7, isDark ? "#37a2da" : "#4a90e2"],
                    [1, isDark ? "#fd666d" : "#e57373"],
                  ],
                },
              },
              axisLabel: {
                color: textColor,
                distance: 30,
                fontSize: 12,
              },
              detail: {
                valueAnimation: true,
                formatter: "{value}",
                color: textColor,
                fontSize: 16,
              },
              data: [{ value: val }],
            },
          ],
        };
      }

      default:
        return null;
    }
  }, [type, options, title, isDark]);

  // Counter Widget
  if (type === "counter") {
    const counters: Array<{ label: string; value: number }> = (
      options.series || []
    ).map((s: any) => ({
      label: s.label || "Metric",
      value: Math.floor(Math.random() * 100),
    }));

    return (
      <div className="border bg-background border-border rounded-lg  h-full">
        <div className="flex items-center justify-between border-b border-border bg-muted p-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            {items.find((i) => i.type === type)?.icon} {title}
          </h3>
          {editMode && onRemove && (
            <Button variant="error" size="icon" onClick={onRemove}>
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 px-2">
          {counters.map((c, i) => (
            <CounterCard key={i} label={c.label} value={c.value} />
          ))}
        </div>
      </div>
    );
  }
  if (!echartOptions) {
    return (
      <div className="border bg-background border-border rounded-lg  h-full">
        <h3 className="text-sm font-medium p-2 bg-muted flex items-center gap-2">
          {items.find((i) => i.type === type)?.icon} {title}
        </h3>
      </div>
    );
  }
  // Chart Widgets
  return (
    <div className="w-full border bg-background border-border rounded-lg  h-full">
      <div className="flex items-center justify-between border-b border-border bg-muted p-2">
        <h3 className="text-sm font-medium flex items-center gap-2">
          {items.find((i) => i.type === type)?.icon} {title}
        </h3>
        {editMode && onRemove && (
          <Button variant="error" size="icon" onClick={onRemove}>
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="h-full min-h-[300px] max-h-[500px]">
        <ReactECharts
          option={echartOptions}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
}

function mockCategories() {
  return Array.from({ length: 8 }).map((_, i) => `M-${i + 1}`);
}

function generateMockTimelineData() {
  return Array.from({ length: 8 }).map(() => Math.round(Math.random() * 100));
}
