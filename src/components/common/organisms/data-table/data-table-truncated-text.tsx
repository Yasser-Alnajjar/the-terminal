import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components";

export const DataTableTruncatedText = ({
  text,
  maxLength = 20,
}: {
  text: string;
  maxLength?: number;
}) => {
  if (!text) return <span>-</span>;
  const isLong = text.length > maxLength;
  const displayText = isLong ? text.slice(0, maxLength) + "..." : text;

  return isLong ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-block truncate cursor-help">
            {displayText}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs break-words">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    text
  );
};
