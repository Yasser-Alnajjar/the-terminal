"use client";

import React from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@components";
import { MoreVertical } from "lucide-react";
import { DataTableDeleteColumn } from "./data-table-delete-column";
import { cn } from "@lib/utils";

export interface IDataTableAction {
  name: string;
  key: string;
  className?: string;
  icon?: React.ReactNode;
  onClick?: (row: any) => void;
  hidden?: (row: any) => boolean;
  disabled?: boolean | ((row: any) => boolean);
  dividerBefore?: boolean;
}

interface IDataTableActionsProps {
  row: any;
  actions: Array<IDataTableAction>;
}

export function DataTableActions({ actions, row }: IDataTableActionsProps) {
  const visibleActions = actions.filter(
    (action) => !action.hidden || !action.hidden(row)
  );

  if (!visibleActions.length) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("sticky end-0")}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl min-w-[8rem]">
        {visibleActions.map((action, i) =>
          action.key === "delete" ? (
            <React.Fragment key={i}>
              {action.dividerBefore && <DropdownMenuSeparator />}
              <DataTableDeleteColumn
                key={i}
                row={row}
                triggerType="menu"
                triggerClassName={action.className}
                mode="single"
                onDelete={(ids) => action.onClick?.(ids)}
              />
            </React.Fragment>
          ) : (
            <React.Fragment key={i}>
              {action.dividerBefore && <DropdownMenuSeparator />}
              <DropdownMenuItem
                className={cn("cursor-pointer", action.className)}
                disabled={
                  typeof action.disabled === "function"
                    ? action.disabled(row)
                    : action.disabled
                }
                onClick={() => action.onClick?.(row)}
              >
                {action.icon && action.icon}
                <span>{action.name}</span>
              </DropdownMenuItem>
            </React.Fragment>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
