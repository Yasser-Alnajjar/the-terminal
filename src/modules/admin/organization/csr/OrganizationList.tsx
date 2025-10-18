"use client";

import React from "react";
import { useOrganizationColumns } from "./columns";
import {
  DataTable,
  DataTableFilters,
  ExportDialog,
  FilterButton,
} from "@components";
import { useStore } from "@hooks";

export const OrganizationList = ({ data }: { data: any[] }) => {
  const columns = useOrganizationColumns();
  const { showFilter } = useStore((state) => ({
    showFilter: state.showFilter,
  }));

  return (
    <>
      <DataTableFilters
        filters={[
          { id: "name", label: "Name", type: "text" },
          { id: "description", label: "Description", type: "text" },
          { id: "createdAt", label: "Created Date", type: "date" },
          {
            id: "locked",
            label: "Locked",
            type: "boolean",
          },
          {
            id: "_createdBy",
            label: "Created By",
            type: "select",
            options: [
              { value: "admin", label: "Default admin user" },
              { value: "user1", label: "User 1" },
            ],
          },
        ]}
        show={showFilter}
        onApply={(filters) => {
          console.log("filters:", filters);
        }}
      />
      <DataTable
        columns={columns}
        data={data}
        onDelete={(ids) => console.log("bulk delete:", ids)}
        title="Organizations"
        header={({ table }) => (
          <>
            <div className="flex items-center gap-2">
              <ExportDialog table={table} />
              <FilterButton />
            </div>
          </>
        )}
      />
    </>
  );
};
