"use client";

import React from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { useTheme } from "next-themes";
import { Card, CardTitle } from "@components";
import { cn } from "@lib/utils";

interface PieChartProps {
  series: number[];
  labels: string[];
  title: string;
  colors?: string[];
  totalLabel?: string;
  className?: string;
  options?: EChartsOption;
}

export const PieChart: React.FC<PieChartProps> = ({
  series,
  labels,
  title,
  colors,
  totalLabel = "Total",
  className,
  options,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const total = series.reduce((a, b) => a + b, 0);

  const option: EChartsOption = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      backgroundColor: isDark ? "#2a303c" : "#ffffff",
      borderColor: isDark ? "#20252e" : "#f4f6fa",
      textStyle: { color: isDark ? "#b2ccd6" : "#20252e" },
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      right: 0,
      top: "middle",
      textStyle: { color: isDark ? "#b2ccd6" : "#20252e" },
    },
    color: colors,

    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 15,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        data: labels.map((label, i) => ({
          name: label,
          value: series[i] ?? 0,
        })),
      },
    ],
    graphic: [
      {
        type: "text",
        left: "center",
        top: "center",
        style: {
          text: `${totalLabel}\n${total}`,
          textAlign: "center",
          fill: isDark ? "#b2ccd6" : "#20252e",
          fontSize: 18,
          fontWeight: "bold",
          lineHeight: 24,
        },
      },
    ],
    ...options,
  };

  return (
    <Card className={cn("p-4 shadow-none", className)}>
      <CardTitle className="text-sm pb-2">{title} </CardTitle>
      <ReactECharts option={option} style={{ width: "100%", height: 300 }} />
    </Card>
  );
};
