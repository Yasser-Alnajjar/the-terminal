import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

import { useClipboard, useStore } from "@hooks";

import {
  Badge,
  DataTableActions,
  DataTableColumnHeader,
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

export const useObservablesColumns = () => {
  const { copy } = useClipboard();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "flags",
      meta: {
        title: "Flags",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Flags" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-2">
            <Badge
              variant={
                row.original.tlp === 0
                  ? "primary"
                  : row.original.tlp === 1
                  ? "success"
                  : row.original.tlp === 2
                  ? "warning"
                  : "error"
              }
              className="rounded-md w-fit"
            >
              TLP: {row.original.tlpLabel}
            </Badge>
            <Badge
              variant={
                row.original.pap === 0
                  ? "primary"
                  : row.original.pap === 1
                  ? "success"
                  : row.original.pap === 2
                  ? "warning"
                  : "error"
              }
              className="rounded-md w-fit"
            >
              PAP: {row.original.papLabel}
            </Badge>

            <div className="flex gap-2">
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Star
                      size={14}
                      className={cn(row.original.ioc && "text-primary-400")}
                    />
                  </TooltipTrigger>
                  <TooltipContent>IOC</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Zap
                      size={14}
                      className={cn(row.original.sighted && "text-primary-400")}
                    />
                  </TooltipTrigger>
                  <TooltipContent>Sighted</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Eye
                      size={14}
                      className={cn(
                        row.original.extraData.seenSummary.ioc &&
                          "text-primary-400"
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent>0 related observable(s)</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {row.original.ignoreSimilarity ? (
                      <Link2Off size={14} className="text-primary-400" />
                    ) : (
                      <Link2 size={14} />
                    )}
                  </TooltipTrigger>
                  <TooltipContent>Ignore similarity</TooltipContent>
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
      accessorKey: "dataType",
      meta: {
        title: "Data Type",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data Type" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-2">
            <Badge className="rounded-md min-w-20 w-fit">
              {row.original.dataType}
            </Badge>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-fit flex text-xs items-center gap-1 cursor-pointer">
                    <Tags size={14} />
                    {row.original.tags.length === 0
                      ? "None"
                      : row.original.tags.length}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {row.original.tags.length !== 0 && (
                    <h3 className="text-sm font-semibold mb-2">Tags</h3>
                  )}
                  <div className="max-w-xs flex items-center gap-2 flex-wrap">
                    {row.original.tags.length === 0
                      ? "None"
                      : row.original.tags.map((tag: string) => (
                          <div
                            key={tag}
                            className="rounded-[0.2rem] border-s-4 border-primary-500 bg-gray-100 hover:bg-gray-200 transition-colors px-2 py-0.5 text-xs"
                          >
                            <span>{tag}</span>
                          </div>
                        ))}
                  </div>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-fit text-xs flex items-center gap-1 cursor-pointer">
                    <FileCode size={14} />
                    No report(s) available
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <h3 className="text-sm font-semibold mb-2">Reports</h3>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "data",
      meta: {
        title: "Data",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data" />
      ),
      cell: ({ row }) => {
        return (
          <div className="min-w-xl flex items-center justify-between">
            <span>{row.original.data}</span>
            <ObservableDetails data={row.original} />
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
