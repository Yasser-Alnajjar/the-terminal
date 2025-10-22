"use client";

import React from "react";
import {
  Button,
  Badge,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@components";
import data from "public/permissions.json";

export const PermissionsTooltip: React.FC<{ permission: string }> = ({
  permission,
}) => {
  const matchedItems = data.filter((p) => p.name === permission);

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">{permission}</Button>
        </TooltipTrigger>

        <TooltipContent className="w-full max-w-96" side="left">
          <h3 className="text-sm font-semibold mb-2">Permissions</h3>
          <div className="flex flex-wrap gap-0.5">
            {matchedItems.flatMap((item) =>
              item.permissions.map((perm: string) => (
                <Badge
                  key={perm}
                  variant="info"
                  className="text-xxs bg-gray-100"
                >
                  {perm}
                </Badge>
              ))
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
