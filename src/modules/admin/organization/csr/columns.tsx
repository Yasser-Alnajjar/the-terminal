import {
  Badge,
  DataTableColumnHeader,
  DataTableActions,
  DataTableTruncatedText,
} from "@components";
import { useStore } from "@hooks";

import { ColumnDef } from "@tanstack/react-table";
import {} from "src/components/common/organisms/data-table/data-table-actions";
import {} from "src/components/common/organisms/data-table/data-table-truncated-text";

export const useOrganizationColumns = () => {
  const { addFilter, setShowFilter } = useStore((state) => ({
    addFilter: state.addFilter,
    setShowFilter: state.setShowFilter,
  }));

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      meta: {
        title: "Name",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Badge
            onClick={() => {
              setShowFilter(true);
              setTimeout(() => {
                addFilter({
                  id: "locked",
                  value: row.original.locked,
                  operator: "boolean",
                });
              }, 0);
            }}
            variant={row.original.locked ? "error" : "success"}
            className="capitalize flex items-center gap-2 w-fit"
          >
            {row.original.locked ? "Locked" : "Unlocked"}
          </Badge>

          <div
            onClick={() => {
              setShowFilter(true);
              setTimeout(() => {
                addFilter({
                  id: "name",
                  value: "",
                  operator: "text",
                });
              }, 0);
            }}
          >
            <DataTableTruncatedText
              text={`${row.original.name} ${row.original.name} ${row.original.name} ${row.original.name} ${row.original.name} ${row.original.name}`}
            />
          </div>
        </div>
      ),
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "actions",
      meta: {
        title: "Actions",
      },
      header: "",
      cell: ({ row }) => (
        <DataTableActions
          row={row}
          actions={[
            {
              key: "delete",
              name: "Delete",
              className: "border-0",
              onClick(row) {
                console.log(row);
              },
            },
          ]}
        />
      ),
      enableColumnFilter: true,
      enableSorting: true,
      enableHiding: false,
      enableResizing: true,
    },
  ];
  return columns;
};
