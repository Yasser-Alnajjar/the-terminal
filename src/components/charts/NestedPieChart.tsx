"use client";
import React from "react";
import ReactECharts from "echarts-for-react";

import { Card, CardTitle } from "../common";
import { cn } from "@lib/utils";

interface PieChartProps {
  groups: {
    name: string;
    colors: Array<string>;
    items: { name: string; count?: number }[];
  }[];
  className?: string;
  title?: string;
}

export const NestedPieChart: React.FC<PieChartProps> = ({
  groups,
  className,
  title,
}) => {
  const sunburstData = groups.map((group) => {
    return {
      name: group.name,
      itemStyle: { color: group.colors?.[0] },
      children: group.items.map((item, index) => ({
        name: item.name,
        value: item.count || 1,
        count: `Count: ${item.count ?? 0}`,
        itemStyle: {
          color: group.colors[index % group.colors.length],
        },
      })),
    };
  });

  const option = {
    tooltip: {
      trigger: "item",
      formatter: (params: any) => {
        const { data } = params;

        if (data.children) {
          // Group tooltip
          const itemsList = data.children
            .map(
              (item: any) =>
                `<div><strong>${item.name}</strong>: ${item.count || 0}</div>`
            )
            .join("");

          return `
                <div>
                  <div style="font-weight:bold; margin-bottom:4px;">${
                    data.name || "No name"
                  }</div>
                  ${itemsList}
                </div>
              `;
        } else {
          // Item tooltip
          return `<div><strong>${data.name}</strong>: ${data.count || 0}</div>`;
        }
      },
    },
    series: [
      {
        type: "sunburst",
        radius: [0, "90%"],
        sort: null,
        color: groups.flatMap((group) => group.colors),
        data: sunburstData,
        levels: [
          {},
          {
            r0: "15%",
            r: "50%",
            itemStyle: { borderWidth: 2 },
            label: {
              rotate: "tangential",
              fontWeight: "bold",
              fontSize: 12,
            },
          },
          {
            r0: "50%",
            r: "90%",
            label: {
              rotate: "tangential",
            },
          },
          {
            r0: "70%",
            r: "90%",
            label: {
              position: "outside",
              padding: 3,
              silent: false,
              fontSize: 12,
            },
          },
        ],
      },
    ],
  };

  return (
    <Card className={cn("shadow-none p-4 lg:p-8", className)}>
      {title && <CardTitle className="text-sm p-0 m-0">{title}</CardTitle>}
      <ReactECharts option={option} style={{ height: 400 }} />
    </Card>
  );
};
