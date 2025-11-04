"use client";

import React, { useState } from "react";
import { useCasesColumns } from "./columns";
import {
  DataTable,
  DataTableFilters,
  ExportDialog,
  FilterButton,
  ToggleSwitch,
} from "@components";
import { useStore } from "@hooks";
import { PieChart } from "@charts";

import { ChartPie } from "lucide-react";
import { AddTask } from "./AddTask";

export const TasksList = ({ data }: { data: any[] }) => {
  const columns = useCasesColumns();
  const { showFilter } = useStore((state) => ({
    showFilter: state.showFilter,
  }));
  const [showCharts, setShowCharts] = useState(false);
  function getPieData(tasks: any[], key: any) {
    const map: Record<string, number> = {};

    for (const task of tasks) {
      const value = (task[key] as string) || "Unknown";
      map[value] = (map[value] || 0) + 1;
    }

    return {
      labels: Object.keys(map),
      series: Object.values(map),
    };
  }

  const byStatus = getPieData(data, "status");
  const byGroup = getPieData(data, "group");
  return (
    <>
      <DataTableFilters
        filters={[
          { id: "_createdAt", type: "date" },
          { id: "_updatedAt", type: "date" },
          { id: "flag", type: "boolean" },
        ]}
        show={showFilter}
        onApply={(filters) => {
          console.log("filters:", filters);
        }}
      />
      {showCharts && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PieChart
            title="Tasks by Status"
            labels={byStatus.labels}
            series={byStatus.series}
            colors={["#34d399", "#60a5fa", "#fbbf24", "#ef4444"]}
          />
          <PieChart
            title="Tasks by Group"
            labels={byGroup.labels}
            series={byGroup.series}
            colors={["#3b82f6", "#f97316", "#10b981", "#a855f7"]}
          />
        </div>
      )}

      <DataTable
        columns={columns}
        data={data}
        title="Tasks"
        addButton={() => {
          return <AddTask />;
        }}
        header={({ table }) => (
          <>
            <div className="flex items-center gap-2">
              <ExportDialog table={table} />
              <ToggleSwitch
                checked={showCharts}
                onCheckedChange={(checked) => setShowCharts(checked)}
                size="sm"
                tooltip={"Stats"}
                checkedChildren={<ChartPie />}
                unCheckedChildren={<ChartPie />}
              />
              <FilterButton />
            </div>
          </>
        )}
      />
    </>
  );
};
