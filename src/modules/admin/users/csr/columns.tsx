import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

import { useStore } from "@hooks";
import { UserDetails } from "./UserDetails";
import {
  Avatar,
  AvatarFallback,
  Button,
  DataTableActions,
  DataTableColumnHeader,
  PermissionsTooltip,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components";
import { ShieldUser } from "lucide-react";

export const useUsersColumns = () => {
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
          <div
            className="flex items-center gap-4 text-xs"
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
            <Avatar className="size-8">
              <AvatarFallback className="capitalize">
                {row.original.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p>{row.original.name}</p>
              <p>{row.original.login}</p>
            </div>
          </div>

          <UserDetails data={row.original} />
        </div>
      ),
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "profile",
      meta: {
        title: "Profile",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Profile" />
      ),
      cell: ({ row }) => {
        return <PermissionsTooltip permission={row.original.profile} />;
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "hasMfa",
      meta: {
        title: "MFA",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="MFA" />
      ),
      cell: ({ row }) => {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="w-fit block">
                <Button
                  variant="ghost"
                  size={"icon"}
                  onClick={() => {
                    addFilter({
                      id: "",
                      operator: "",
                      value: "",
                    });
                  }}
                >
                  <ShieldUser size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                {row.original.hasMfa ? "MFA is active." : "MFA not active."}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
        <DataTableColumnHeader column={column} title="Created" />
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
    {
      accessorKey: "_updatedAt",
      meta: {
        title: "Updated At",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Updated" />
      ),
      cell: ({ row }) => {
        const updatedAt = row.original._updatedAt
          ? new Date(row.original._updatedAt)
          : null;

        return updatedAt ? format(updatedAt, "dd/MM/yyyy HH:mm") : "-";
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "actions",
      meta: {
        title: "Actions",
      },
      header: "",
      cell: ({ row }) => {
        return (
          <DataTableActions
            actions={[
              {
                key: "delete",
                name: "View Details",
                selectedKey: "_id",
                onClick(ids) {
                  console.log("view details:", ids);
                },
              },
            ]}
            row={row.original}
          />
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
  ];
  return columns;
};
