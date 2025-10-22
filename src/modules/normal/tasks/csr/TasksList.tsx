"use client";

import React, { useState } from "react";
import { useCasesColumns } from "./columns";
import {
  Button,
  DataTable,
  DataTableFilters,
  ExportDialog,
  FilterButton,
  ToggleSwitch,
} from "@components";
import { useStore } from "@hooks";
import { PieChart } from "@charts";

import { ChartPie, Plus } from "lucide-react";

export const TasksList = ({ data }: { data: any[] }) => {
  const columns = useCasesColumns();
  const { showFilter } = useStore((state) => ({
    showFilter: state.showFilter,
  }));
  const [showCharts, setShowCharts] = useState(false);

  return (
    <>
      <DataTableFilters
        filters={[
          { id: "_createdAt", label: "_createdAt", type: "date" },
          { id: "_updatedAt", label: "_updatedAt", type: "date" },
        ]}
        show={showFilter}
        onApply={(filters) => {
          console.log("filters:", filters);
        }}
      />
      {showCharts && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PieChart
            title="Cases by status"
            series={[1, 1]}
            labels={["New", "In Progress"]}
            colors={["#b91c1c", "#ffa940"]}
          />
          <PieChart
            title="Cases by severity"
            labels={["low", "medium", "high", "critical"]}
            series={[1, 1, 1, 1]}
            colors={["#60a5fa", "#ffa940", "#f87171", "#b91c1c", "#d8d8d8"]}
          />
        </div>
      )}

      <DataTable
        columns={columns}
        data={data}
        onDelete={(ids) => console.log("bulk delete:", ids)}
        title="Tasks"
        addButton={() => (
          <Button variant="primary" size="default">
            <Plus size={16} />
          </Button>
        )}
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
