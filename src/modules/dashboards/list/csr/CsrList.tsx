"use client";

import React, { useState } from "react";
import { useCasesColumns } from "./columns";
import {
  Button,
  DataTable,
  DataTableDeleteColumn,
  DataTableFilters,
  ExportDialog,
  FilterButton,
  IQuickFilter,
  QuickFilters,
  ToggleSwitch,
} from "@components";
import { useStore } from "@hooks";
import { PieChart } from "@charts";
import { ChartPie, Plus } from "lucide-react";

export const CsrList = ({ data, filters }: { data: any[]; filters: any }) => {
  const columns = useCasesColumns();
  const { showFilter } = useStore((state) => ({
    showFilter: state.showFilter,
  }));
  const [showCharts, setShowCharts] = useState(false);
  const quick: Array<IQuickFilter> = [
    {
      title: "Open Cases",
      id: "stage",
      operator: "none_of",
      value: "closed",
    },
    {
      title: "Closed Cases",
      id: "stage",
      operator: "any_of",
      value: "closed",
    },
    {
      title: "Closed Cases",
      id: "stage",
      operator: "any_of",
      value: "closed",
      dividerBefore: true,
    },
  ];

  return (
    <>
      <DataTableFilters
        filters={filters}
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
        selectionRender={({ table }) => (
          <>
            {Object.keys(table.getState().rowSelection).length > 0 && (
              <DataTableDeleteColumn
                mode="bulk"
                table={table}
                onDelete={(ids) => console.log("bulk delete:", ids)}
                selectedKey="_id"
              />
            )}
          </>
        )}
        addButton={() => (
          <Button variant="primary" size="default">
            <Plus size={16} />
          </Button>
        )}
        header={({ table }) => (
          <div className="flex items-center gap-2">
            <ExportDialog table={table} />
            <FilterButton />
          </div>
        )}
      />
    </>
  );
};
