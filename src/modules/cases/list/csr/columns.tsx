import { format, formatDistanceToNow } from "date-fns";
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
  BaggageClaim,
  CirclePlay,
  Flag,
  Settings,
  Sparkles,
  Tags,
  UserPlus,
  X,
} from "lucide-react";
import { cn } from "@lib/utils";
import { Link } from "@navigation";
import { useSession } from "next-auth/react";
import { ApplyCaseTemplate } from "./ApplyCaseTemplate";
import { Responders } from "./Responders";
import { CloseCase } from "./CloseCase";
import { CaseDetails } from "./CaseDetails";

export const useCasesColumns = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const { addFilter, setShowFilter } = useStore((state) => ({
    addFilter: state.addFilter,
    setShowFilter: state.setShowFilter,
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
        const timeAgo = formatDistanceToNow(new Date(row.original._createdAt), {
          addSuffix: true,
        });
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
              {/* <Tooltip>
                <TooltipTrigger asChild>
                  <Lock
                    size={14}
                    className={cn(
                      "mt-2",
                      row.original.flag && "text-warning-400"
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent>Restricted case</TooltipContent>
              </Tooltip> */}
            </TooltipProvider>
            <div>
              <div
                className="overflow-hidden  before:start-0 custom-badge text-xs z-[1] ps-[50px] relative border w-fit px-2 py-1 rounded-md text-center"
                style={{
                  borderColor: row.original.extraData.status.color,
                }}
                onClick={() => {
                  addFilter({
                    id: "status",
                    operator: "any_of",
                    value: row.original.status,
                  });
                }}
              >
                <style jsx>{`
            .custom-badge:before {
              content: "";
              position: absolute;
              top: 0;
              width: 40px;
              height: 100%;
              background-color: ${row.original.extraData.status.color};
              z-index: -1;
            `}</style>
                {row.original.status === "New" ? (
                  <Sparkles
                    className="absolute start-3 top-1/2 -translate-y-1/2 t z-10 text-white"
                    size={12}
                  />
                ) : (
                  <CirclePlay
                    className="absolute start-3 top-1/2 -translate-y-1/2 t z-10 text-white"
                    size={12}
                  />
                )}
                {row.original.status}
              </div>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs text-gray-500">
                      {row.original.status === "New"
                        ? row.original.status
                        : "Started"}{" "}
                      {timeAgo.replace("about", "")}
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
      accessorKey: "number",
      meta: {
        title: "Title",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-between gap-2 min-w-lg">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        className="rounded-lg"
                        variant={
                          row.original.severityLabel === "CRITICAL"
                            ? "error"
                            : row.original.severityLabel === "HIGH"
                            ? "warning"
                            : row.original.severityLabel === "MEDIUM"
                            ? "info"
                            : "primary"
                        }
                      >
                        {row.original.severityLabel.at(0).toUpperCase()}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="capitalize text-xs">
                      {row.original.severityLabel.toLowerCase()}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Link
                  href={`/cases/${row.original._id}`}
                  className="hover:text-primary-400 transition-colors duration-300 flex gap-1"
                >
                  <span>#{row.original.number}</span> -{" "}
                  <p>{row.original.title}</p>
                </Link>
              </div>

              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-fit flex items-center gap-1 cursor-pointer">
                      <Tags size={16} />
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
                              onClick={() => {
                                addFilter({
                                  id: "tag",
                                  operator: "",
                                  value: tag,
                                });
                                setShowFilter(true);
                              }}
                              className="rounded-[0.2rem] border-s-4 border-primary-500 bg-gray-100 hover:bg-gray-200 transition-colors px-2 py-0.5 text-xs"
                            >
                              <span>{tag}</span>
                            </div>
                          ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CaseDetails data={row.original} />
          </div>
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "Details",
      meta: {
        title: "Details",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Details" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-1">
            <Link
              href={"/cases"}
              className="flex items-center justify-between gap-2 text-primary-400 hover:text-primary-300"
            >
              <span>Tasks</span>
              <span>{row.original.stats.tasks}</span>
            </Link>
            <Link
              href={"/cases"}
              className="flex items-center justify-between gap-2 text-primary-400 hover:text-primary-300"
            >
              <span>Observables</span>
              <span>{row.original.stats.observables}</span>
            </Link>
            <Link
              href={"/cases"}
              className="flex items-center justify-between gap-2 text-primary-400 hover:text-primary-300"
            >
              <span>TTPs</span>
              <span>{row.original.stats.ttps}</span>
            </Link>
            <Link
              href={"/cases"}
              className="flex items-center justify-between gap-2 text-primary-400 hover:text-primary-300"
            >
              <span>Linked Alerts</span>
              <span>{row.original.stats.alerts}</span>
            </Link>
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
                <Avatar>
                  <AvatarFallback className="capitalize">
                    {row.original.assignee.at(0)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className="capitalize">
                {row.original.extraData.owningOrganization.name}/
                {row.original.assignee.split("@").at(0)}
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
      enableColumnFilter: true,
      enableSorting: true,
    },
  ];
  return columns;
};
