"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "next-themes";
import { cn } from "@lib/utils";
import { Card, CardTitle } from "../common";
interface AreaChartProps {
  seriesData: Array<number>;
  categories: Array<string>;
  title?: string;
  className?: string;
  chartTitle?: string;
  isCard?: boolean;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  seriesData,
  categories,
  title = "Completion %",
  isCard = false,
  chartTitle,
  className,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const getChartColor = (data: number[]) => {
    const last = data.at(-1) ?? 0;
    if (last > 70) return "#4ade80";
    if (last >= 40) return "#eab308";
    return "#f87171";
  };

  const lineColor = getChartColor(seriesData);

  const formattedCategories = categories.map((value, index) =>
    index % 2 === 0 ? value : ""
  );

  const option = {
    backgroundColor: "transparent",
    color: [lineColor],
    tooltip: {
      trigger: "axis",
      backgroundColor: isDark ? "#2a303c" : "#ffffff",
      borderColor: isDark ? "#20252e" : "#f4f6fa",
      textStyle: {
        color: isDark ? "#b2ccd6" : "#394e6a",
      },
    },
    grid: {
      left: "0%",
      right: "0%",
      bottom: "0%",
      top: 0,
    },
    dataZoom: [
      {
        type: "inside",
        zoomOnMouseWheel: true,
        moveOnMouseMove: true,
        moveOnMouseWheel: true,
      },
    ],
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: formattedCategories,
      axisLabel: {
        rotate: -45,
        color: isDark ? "#b2ccd6" : "#2b3440",
        fontSize: 10,
      },
      axisLine: {
        lineStyle: { color: isDark ? "#f4f6fa" : "#2b3440" },
      },
      axisTick: {
        lineStyle: { color: isDark ? "#f4f6fa" : "#2b3440" },
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      nameTextStyle: {
        color: isDark ? "#b2ccd6" : "#2b3440",
        fontSize: 10,
        fontWeight: 500,
        align: "center",
        verticalAlign: "middle",
      },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: isDark ? "#b2ccd6" : "#2b3440",
        fontSize: 10,
      },
      splitLine: {
        lineStyle: {
          color: isDark ? "#b2ccd6" : "#2b3440",
          type: "dashed",
        },
      },
    },
    series: [
      {
        name: chartTitle,
        type: "line",
        smooth: true,
        data: seriesData,
        symbol: "circle",
        symbolSize: 4,
        lineStyle: {
          width: 2,
          color: lineColor,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: lineColor + "66",
              },
              {
                offset: 1,
                color: lineColor + "0D",
              },
            ],
          },
        },
      },
    ],
  };

  return isCard ? (
    <Card className={cn("shadow-none p-4 lg:p-8", className)}>
      {title && <CardTitle className="text-sm p-0 mb-4">{title}</CardTitle>}
      <ReactECharts
        option={option}
        style={{ height: 350, width: "100%" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </Card>
  ) : (
    <ReactECharts
      option={option}
      style={{ height: 350, width: "100%" }}
      notMerge={true}
      lazyUpdate={true}
    />
  );
};
