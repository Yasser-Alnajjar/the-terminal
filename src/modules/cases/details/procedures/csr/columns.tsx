import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

import { useClipboard } from "@hooks";

import {
  Avatar,
  AvatarFallback,
  Badge,
  DataTableActions,
  DataTableColumnHeader,
  LiveDot,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components";
import {
  Copy,
  Eye,
  FileCode,
  Link2,
  Link2Off,
  Pin,
  Star,
  Tags,
  Trash2,
  Zap,
} from "lucide-react";
import { cn } from "@lib/utils";

import { ObservableDetails } from "./ObservableDetails";
import { Technique } from "./Technique";

export const useObservablesColumns = () => {
  const { copy } = useClipboard();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "tactic",
      meta: {
        title: "Tactic",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tactic" />
      ),
      cell: ({ row }) => {
        const TACTIC_COLORS: Record<string, string> = {
          "command-and-control": "bg-warning-500",
          "credential-access": "bg-error-500",
          collection: "bg-sky-500 dark:bg-sky-500/30",
          "defense-evasion": "bg-rose-500 dark:bg-rose-500/30",
          discovery: "bg-cyan-500 dark:bg-cyan-500/30",
          exfiltration: "bg-indigo-500 dark:bg-indigo-500/30",
          "lateral-movement": "bg-pink-500 dark:bg-pink-500/30",
          persistence: "bg-teal-500 dark:bg-teal-500/30",
          execution: "bg-green-500 dark:bg-green-500/30",
          "privilege-escalation": "bg-orange-500 dark:bg-orange-500/30",
          "initial-access": "bg-red-500 dark:bg-red-500/30",
          impact: "bg-fuchsia-500 dark:bg-fuchsia-500/30",
          "resource-development": "bg-lime-500 dark:bg-lime-500/30",
          reconnaissance: "bg-blue-500 dark:bg-blue-500/30",
        };
        return (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "size-[10px] rounded-full",
                TACTIC_COLORS[row.original.tactic]
              )}
            />
            {row.original.tactic}
          </div>
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "technique",
      meta: {
        title: "Technique",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Technique" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex gap-1 items-center">
            <Technique row={row.original.extraData} />
            <span>{row.original.extraData.pattern.name}</span>
          </div>
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "_createdBy",
      meta: {
        title: "By",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="By" />
      ),
      cell: ({ row }) => {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="size-6">
                  <AvatarFallback className="text-sm capitalize text-foreground">
                    {row.original._createdBy.at(0)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className="capitalize">
                {row.original._createdBy.split("@").at(0)}
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
                name: "Delete",
                icon: <Trash2 />,
                onClick: () => console.log("delete:", row),
              },
              {
                key: "pin",
                name: "Pin",
                icon: <Pin />,
                onClick: () => console.log("pin:", row),
              },
              {
                key: "copy",
                name: "Copy Data",
                icon: <Copy />,
                onClick: () => {
                  copy(row.original.data);
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
