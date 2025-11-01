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

export const OrganizationList = ({
  data,
  users,
}: {
  data: any[];
  users: any[];
}) => {
  const columns = useOrganizationColumns({ users });
  const { showFilter } = useStore((state) => ({
    showFilter: state.showFilter,
  }));

  return (
    <>
      <DataTableFilters
        filters={[
          { id: "name", type: "text" },
          { id: "description", type: "text" },
          { id: "createdAt", type: "date" },
          {
            id: "locked",
            type: "boolean",
          },
          {
            id: "_createdBy",
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
