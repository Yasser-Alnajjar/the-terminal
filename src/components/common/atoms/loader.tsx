import React from "react";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-background z-[10000000000000]">
      <div className="animate-spin rounded-full size-16 border-b-2 border-primary-400"></div>
    </div>
  );
};
