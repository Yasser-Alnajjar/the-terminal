"use client";

import React from "react";
import { useUsersColumns } from "./columns";
import {
  DataTable,
  DataTableFilters,
  ExportDialog,
  FilterButton,
} from "@components";
import { useStore } from "@hooks";

export const UsersList = ({ data }: { data: any[] }) => {
  const columns = useUsersColumns();
  const { showFilter } = useStore((state) => ({
    showFilter: state.showFilter,
  }));

  return (
    <>
      <DataTableFilters
        filters={[
          { id: "_createdAt", type: "date" },
          { id: "_updatedAt", type: "date" },
          {
            id: "_createdBy",
            type: "select",
            options: [
              { value: "admin", label: "Default admin user" },
              { value: "user1", label: "User 1" },
            ],
          },
          { id: "avatar", type: "text" },
          { id: "defaultOrganization", type: "date" },
          { id: "email", type: "text" },
          { id: "hasMFA", type: "boolean" },
          { id: "keyword", type: "text" },
          { id: "locked", type: "boolean" },
          { id: "login", type: "text" },
          { id: "profile", type: "text" },
          { id: "type", type: "text" },
          { id: "name", type: "text" },
        ]}
        show={showFilter}
        onApply={(filters) => {
          console.log("filters:", filters);
        }}
      />
      <DataTable
        columns={columns}
        data={data}
        title="Users"
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
