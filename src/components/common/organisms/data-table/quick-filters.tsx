"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ToggleSwitch,
} from "@components";
import { Zap } from "lucide-react";
import { useStore } from "@hooks";
import { FilterOption } from "src/store/data-table-filter";
export type IQuickFilter = {
  id: string;
  options?: FilterOption[];
  dividerBefore?: boolean;
  title?: string;
  operator: string;
  value?: string;
};

export interface IQuickFiltersProps {
  data: Array<IQuickFilter>;
}

export const QuickFilters = ({ data }: IQuickFiltersProps) => {
  const [open, setOpen] = useState(false);
  const { setShowFilter, addFilter } = useStore((state) => ({
    setShowFilter: state.setShowFilter,
    addFilter: state.addFilter,
  }));
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <span className="inline-flex">
          <ToggleSwitch
            checked={open}
            onCheckedChange={setOpen}
            size="sm"
            tooltip="Quick Filters"
            checkedChildren={<Zap />}
            unCheckedChildren={<Zap />}
          />
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" sideOffset={6}>
        {data.map((item, idx) => (
          <React.Fragment key={idx}>
            {item.dividerBefore && <DropdownMenuSeparator />}
            <DropdownMenuItem
              onClick={() => {
                addFilter({
                  id: item.id,
                  operator: item.operator,
                  value: item.value ||'',
                });
                setShowFilter(true);
                setOpen(false);
              }}
              className="cursor-pointer capitalize"
            >
              {item.title}
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
