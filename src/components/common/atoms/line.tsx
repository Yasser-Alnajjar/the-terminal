import { cn } from "@lib/utils";
import React from "react";

export const Line = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "[&>*]:bg-background [&>*]:w-fit relative z-[1] before:absolute before:z-[-1] before:top-1/2 before:left-0 before:h-0.5 before:w-full before:bg-border",
        className
      )}
    >
      {children}
    </div>
  );
};
