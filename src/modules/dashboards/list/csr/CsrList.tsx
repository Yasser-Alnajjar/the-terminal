"use client";

import React from "react";
import { useCasesColumns } from "./columns";
import {
  Button,
  DataTable,
  DataTableDeleteColumn,
  DataTableFilters,
  ExportDialog,
  FilterButton,
} from "@components";
import { useStore } from "@hooks";
import { Plus } from "lucide-react";

export const CsrList = ({ data, filters }: { data: any[]; filters: any }) => {
  const columns = useCasesColumns();
  const { showFilter } = useStore((state) => ({
    showFilter: state.showFilter,
  }));

  return (
    <>
      <DataTableFilters
        filters={filters}
        show={showFilter}
        onApply={(filters) => {
          console.log("filters:", filters);
        }}
      />

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
