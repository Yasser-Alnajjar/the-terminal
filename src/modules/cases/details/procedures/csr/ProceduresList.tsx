"use client";

import React, { useState } from "react";
import { useObservablesColumns } from "./columns";
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
import { AddProcedure } from "./AddProcedure";

export const ProceduresList = ({ data }: { data: any[] }) => {
  const columns = useObservablesColumns();
  const { showFilter } = useStore((state) => ({
    showFilter: state.showFilter,
  }));
  const [showCharts, setShowCharts] = useState(false);
  function getPieData(data: any[], key: any, empty?: string) {
    const map: Record<string, number> = {};

    for (const observable of data) {
      const value = (observable[key] as string) || empty || "Unknown";
      map[value] = (map[value] || 0) + 1;
    }

    return {
      labels: Object.keys(map),
      series: Object.values(map),
    };
  }

  const IOC = getPieData(data, "ioc", "false");
  const datatype = getPieData(data, "dataType");

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
            title="TTPs by datatype"
            labels={datatype.labels}
            series={datatype.series}
          />
          <PieChart
            title="TTPs as IOC"
            labels={IOC.labels}
            series={IOC.series}
          />
        </div>
      )}

      <DataTable
        columns={columns}
        data={data}
        addButton={() => {
          return <AddProcedure />;
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
