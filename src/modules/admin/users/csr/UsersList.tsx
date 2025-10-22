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
          { id: "_createdAt", label: "_createdAt", type: "date" },
          { id: "_updatedAt", label: "_updatedAt", type: "date" },
          {
            id: "_createdBy",
            label: "_createdBy",
            type: "select",
            options: [
              { value: "admin", label: "Default admin user" },
              { value: "user1", label: "User 1" },
            ],
          },
          { id: "avatar", label: "avatar", type: "text" },
          {
            id: "defaultOrganisation",
            label: "defaultOrganisation",
            type: "date",
          },
          { id: "email", label: "email", type: "text" },
          { id: "hasMFA", label: "hasMFA", type: "boolean" },
          { id: "keyword", label: "keyword", type: "text" },
          { id: "locked", label: "locked", type: "boolean" },
          { id: "login", label: "login", type: "text" },
          { id: "profile", label: "profile", type: "text" },
          { id: "type", label: "type", type: "text" },
          { id: "name", label: "name", type: "text" },
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
