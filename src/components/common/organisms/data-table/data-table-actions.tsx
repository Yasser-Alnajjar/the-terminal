"use client";

import React, { useState } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@components";
import { MoreVertical } from "lucide-react";
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
  render?: (row: any, open: boolean, close: () => void) => React.ReactNode;
}

interface IDataTableActionsProps {
  row: any;
  actions: Array<IDataTableAction>;
  className?: string;
  trigger?: React.ReactNode;
}

export function DataTableActions({
  className,
  trigger,
  actions,
  row,
}: IDataTableActionsProps) {
  const [activeAction, setActiveAction] = useState<IDataTableAction | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const visibleActions = actions.filter(
    (action) => !action.hidden || !action.hidden(row)
  );

  const handleSelect = (action: IDataTableAction) => {
    if (action.render) {
      setActiveAction(action);
      setOpen(true);
    } else {
      action.onClick?.(row);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // delay to let close animation finish
    setTimeout(() => setActiveAction(null), 150);
  };

  if (!visibleActions.length) return null;

  // 👇 Render the interactive dropdown
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {trigger?trigger:<Button variant="ghost" size="icon" className={cn(className,"sticky end-0")}>
            <MoreVertical className="h-4 w-4" />
          </Button>}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-xl min-w-[8rem]">
          {visibleActions.map((action, i) => (
            <React.Fragment key={i}>
              {action.dividerBefore && <DropdownMenuSeparator />}
              <DropdownMenuItem
                className={cn("cursor-pointer", action.className)}
                disabled={
                  typeof action.disabled === "function"
                    ? action.disabled(row)
                    : action.disabled
                }
                onClick={() => handleSelect(action)}
              >
                {action.icon && action.icon}
                <span>{action.name}</span>
              </DropdownMenuItem>
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {activeAction &&
        activeAction.render &&
        activeAction.render(row, open, handleClose)}
    </>
  );
}
