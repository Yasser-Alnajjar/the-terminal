import { ColumnDef } from "@tanstack/react-table";
import { useStore, useToast } from "@hooks";

import {
  Avatar,
  AvatarFallback,
  Badge,
  DataTableActions,
  DataTableColumnHeader,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useSidebar,
} from "@components";
import { BaggageClaim, Flag, Settings, UserPlus, X } from "lucide-react";

import { Link } from "@navigation";
import { useSession } from "next-auth/react";
import { ApplyCaseTemplate } from "./ApplyCaseTemplate";
import { Responders } from "./Responders";
import { CloseCase } from "./CloseCase";
import { format } from "date-fns";

export const useCasesColumns = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const { addFilter } = useStore((state) => ({
    addFilter: state.addFilter,
  }));
  const { setOpen } = useSidebar();
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "status",
      meta: {
        title: "Status",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        return (
          <Badge variant="warning" className="rounded-md">
            {row.original.status}
          </Badge>
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "title",
      meta: {
        title: "Title",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        return (
          <Link
            href={`/dashboards/${row.original._id}`}
            onClick={() => setOpen(false)}
            className="rounded-md w-2xl block hover:text-primary-400 transition-colors duration-300"
          >
            {row.original.title}
          </Link>
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "version",
      meta: {
        title: "Version",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Version" />
      ),
      cell: ({ row }) => {
        return (
          <span
            onClick={() => {
              addFilter({
                id: "version",
                operator: "",
                value: "",
              });
            }}
          >
            {row.original.version}
          </span>
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "Widget",
      meta: {
        title: "Widget",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Widget" />
      ),
      cell: ({ row }) => {
        return <span>{row.original.definition.items.length}</span>;
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "owner",
      meta: {
        title: "owner",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Owner" />
      ),
      cell: ({ row }) => {
        return (
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="size-8">
                  <AvatarFallback className="capitalize">
                    {row.original.owner.at(0)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>{row.original.owner}</TooltipContent>
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
              ...(row.original.assignee !== session?.user?.login
                ? [
                    {
                      key: "assign-to-me",
                      name: "Assign to me",
                      icon: <UserPlus />,
                      onClick(row: any) {
                        toast({
                          title: "Assigned to me",
                          description: `Case (${row.original.title}) has been assigned to you`,
                          variant: "success",
                        });
                      },
                    },
                  ]
                : []),
              {
                key: "Apply case template",
                name: "Apply case template",
                icon: <BaggageClaim />,
                onClick(ids) {
                  console.log("view details:", ids);
                },
                render(row, open, close) {
                  return (
                    <ApplyCaseTemplate open={open} close={close} row={row} />
                  );
                },
              },
              {
                key: "Flag case(s)",
                name: "Flag case(s)",
                icon: <Flag />,
                onClick(row) {
                  console.log(row.original.flag);

                  toast({
                    title: !row.original.flag ? "Flagged" : "UnFlag",
                    description: !row.original.flag
                      ? "Case has been marked as Flagged"
                      : "Case has been marked as UnFlagged",
                  });
                },
              },
              {
                key: "Close case(s)",
                name: "Close case(s)",
                icon: <X />,
                onClick(ids) {
                  console.log("view details:", ids);
                },
                render(row, open, close) {
                  return (
                    <CloseCase open={open} close={close} row={row.original} />
                  );
                },
              },
              {
                key: "Responders",
                name: "Responders",
                icon: <Settings />,
                onClick(ids) {
                  console.log("view details:", ids);
                },
                render(row, open, close) {
                  return (
                    <Responders open={open} close={close} row={row.original} />
                  );
                },
              },
            ]}
            row={row}
          />
        );
      },
    },
  ];
  return columns;
};
