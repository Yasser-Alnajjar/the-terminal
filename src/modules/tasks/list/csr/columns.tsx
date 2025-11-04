import { format, formatDistanceToNow, isPast, isFuture } from "date-fns";
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
} from "@components";
import {
  CheckCircle,
  CirclePlay,
  Clock,
  Flag,
  FlagOff,
  Pin,
  PlayCircle,
  Settings,
  Star,
  Trash2,
  TriangleAlert,
  UserPlus,
  X,
  XCircle,
} from "lucide-react";
import { cn } from "@lib/utils";

import { useSession } from "next-auth/react";
import { Responders } from "./Responders";
import { TaskDetails } from "./TaskDetails";

export const useCasesColumns = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const { addFilter } = useStore((state) => ({
    addFilter: state.addFilter,
  }));

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
        const timeAgo = formatDistanceToNow(
          new Date(row.original._updatedAt || row.original._createdAt),
          {
            addSuffix: true,
          }
        );
        return (
          <div className="flex gap-2">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger
                  asChild
                  onClick={() => {
                    addFilter({
                      id: "flag",
                      operator: "",
                      value: row.original.flag,
                    });
                  }}
                >
                  <Flag
                    size={14}
                    className={cn(
                      "mt-2",
                      row.original.flag && "text-primary-400"
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent>Flag</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TriangleAlert
                    size={14}
                    className={cn(
                      "mt-2",
                      row.original.flag && "text-warning-400"
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent>Action Required</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Star
                    size={14}
                    className={cn(
                      "mt-2",
                      row.original.mandatory && "text-error-400"
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent>Mandatory</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div>
              <div
                className={cn(
                  "overflow-hidden custom-badge text-xs z-[1] ps-[30px] relative border w-fit px-2 py-1 rounded-md text-center",
                  row.original.status === "Completed"
                    ? "border-success-500 text-success-500"
                    : row.original.status === "Cancel"
                    ? "border-gray-400 text-gray-400"
                    : row.original.status === "InProgress"
                    ? "border-primary-400 text-primary-400"
                    : "border-warning-400 text-warning-400"
                )}
                onClick={() => {
                  addFilter({
                    id: "status",
                    operator: "any_of",
                    value: row.original.status,
                  });
                }}
              >
                {row.original.status === "Completed" ? (
                  <CheckCircle
                    className="absolute start-2 top-1/2 -translate-y-1/2 t z-10"
                    size={14}
                  />
                ) : row.original.status === "Cancel" ? (
                  <XCircle
                    className="absolute start-2 top-1/2 -translate-y-1/2 t z-10"
                    size={14}
                  />
                ) : (
                  <CirclePlay
                    className="absolute start-2 top-1/2 -translate-y-1/2 t z-10"
                    size={14}
                  />
                )}
                <span className="text-gray-600">{row.original.status}</span>
              </div>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <span>
                        {row.original.status === "InProgress"
                          ? "Started"
                          : row.original.status === "Waiting"
                          ? "Created"
                          : row.original.status}
                      </span>
                      <span>{timeAgo.replace("about", "")}</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {format(row.original._createdAt, "dd/MM/yyyy HH:mm")}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "title",
      meta: {
        title: "Task",
      },

      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Task" />
      ),
      cell: ({ row }) => {
        return (
          <div className="min-w-lg flex items-center justify-between gap-2">
            <span>{row.original.title}</span>
            <TaskDetails data={row.original} />
          </div>
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "group",
      meta: {
        title: "Group",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Group" />
      ),
      cell: ({ row }) => {
        return <Badge className="rounded-sm">{row.original.group}</Badge>;
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "dueDate",
      meta: {
        title: "Due Date",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Due Date" />
      ),
      cell: ({ row }) => {
        const value = row.original.dueDate;
        if (!value) return <p className="text-center w-full">-</p>;

        const due = new Date(value);
        const diff = formatDistanceToNow(due, { addSuffix: true });

        if (isPast(due)) {
          return (
            <p className="flex items-center gap-1 text-error-300">
              <Clock size={16} /> Due Date {diff.replace("about", "")}
            </p>
          );
        }

        if (isFuture(due)) {
          return (
            <p className="flex items-center gap-1 text-success-500">
              <Clock size={16} /> Due Date: {diff}
            </p>
          );
        }
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "extraData.case.number",
      meta: {
        title: "Case",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Case" />
      ),
      cell: ({ row }) => {
        const timeAgo = formatDistanceToNow(
          new Date(row.original.extraData.case._createdAt),
          {
            addSuffix: true,
          }
        );
        return (
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        className="rounded-lg"
                        variant={
                          row.original.extraData.case.severityLabel ===
                          "CRITICAL"
                            ? "error"
                            : row.original.extraData.case.severityLabel ===
                              "HIGH"
                            ? "warning"
                            : row.original.extraData.case.severityLabel ===
                              "MEDIUM"
                            ? "info"
                            : "primary"
                        }
                      >
                        {row.original.extraData.case.severityLabel
                          .at(0)
                          .toUpperCase()}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="capitalize text-xs">
                      {row.original.extraData.case.severityLabel.toLowerCase()}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                #{row.original.extraData.case.number} -{" "}
                <p>{row.original.extraData.case.title}</p>
              </div>
              <p className="text-gray-600 text-xs">
                Created {timeAgo.replace("about", "")}
              </p>
            </div>
          </div>
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
    },

    {
      accessorKey: "assignee",
      meta: {
        title: "assignee",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Assignee" />
      ),
      cell: ({ row }) => {
        return (
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                {row.original.assignee ? (
                  <Avatar>
                    <AvatarFallback className="capitalize">
                      {row.original.assignee.at(0)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar>
                    <AvatarFallback className="capitalize text-xl">
                      ?
                    </AvatarFallback>
                  </Avatar>
                )}
              </TooltipTrigger>
              <TooltipContent className="capitalize">
                {row.original.assignee
                  ? row.original.assignee.split("@").at(0)
                  : "Unassigned"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "startDate",
      meta: {
        title: "Start Date",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Start Date" />
      ),
      cell: ({ row }) => {
        const updatedAt = row.original.startDate
          ? new Date(row.original.startDate)
          : null;

        return updatedAt ? format(updatedAt, "dd/MM/yyyy HH:mm") : "-";
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
                          description: `Task (${row.original.title}) has been assigned to you`,
                          variant: "success",
                        });
                      },
                    },
                  ]
                : []),
              ...(row.original.status !== "InProgress"
                ? [
                    {
                      key: "start",
                      name: "Start",
                      icon: <PlayCircle />,
                      onClick: ({ row }: { row: any }) =>
                        console.log("start:", row),
                    },
                  ]
                : []),
              ...(row.original.status !== "Completed"
                ? [
                    {
                      key: "close",
                      name: "Close",
                      icon: <X />,
                      onClick: ({ row }: { row: any }) =>
                        console.log("close:", row),
                    },
                  ]
                : []),

              {
                key: "delete",
                name: "Delete",
                icon: <Trash2 />,
                onClick: ({ row }: { row: any }) => console.log("delete:", row),
              },
              {
                key: "flag",
                name: row.original.flag ? "Unflag" : "Flag",
                icon: row.original.flag ? <FlagOff /> : <Flag />,
                onClick: ({ row }: { row: any }) => console.log("flag:", row),
              },
              {
                key: "pin",
                name: "Pin",
                icon: <Pin />,
                onClick: ({ row }: { row: any }) => console.log("pin:", row),
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
      enableColumnFilter: true,
      enableSorting: true,
    },
  ];
  return columns;
};
