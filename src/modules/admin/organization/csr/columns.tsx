import {
  Avatar,
  AvatarFallback,
  Badge,
  DataTableColumnHeader,
} from "@components";
import { useStore } from "@hooks";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { OrganizationDetails } from "./OrganizationDetails";
import { Link } from "@navigation";

export const useOrganizationColumns = ({ users }: { users: any[] }) => {
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
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-4">
            <div className="min-w-[70px]">
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
                className="capitalize"
              >
                {row.original.locked ? "Locked" : "Active"}
              </Badge>
            </div>
            <Avatar className="size-8">
              <AvatarFallback className="capitalize">
                {row.original.name.at(0)}
              </AvatarFallback>
            </Avatar>
            <Link
              className="text-primary-400 hover:text-primary-300 flex flex-col gap-1 text-xs"
              href={`/organizations/${row.original.name}/users`}
            >
              {row.original.name}
              <p className="text-gray-600">
                Linked organizations:{" "}
                {row.original.links && row.original.links.length > 0
                  ? ""
                  : "None"}
              </p>
            </Link>
          </div>
          <OrganizationDetails data={row.original} users={users} />
        </div>
      ),
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "_createdBy",
      meta: {
        title: "Created by",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created by" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarFallback className="capitalize">
                {row.original._createdBy.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            {row.original._createdBy}
          </div>
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "_createdAt",
      meta: {
        title: "Created At",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created Date" />
      ),
      cell: ({ row }) => {
        const createdAt = row.original._createdAt
          ? new Date(row.original._createdAt)
          : null;

        return createdAt ? format(createdAt, "dd/MM/yyyy HH:mm") : "-";
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
  ];
  return columns;
};
