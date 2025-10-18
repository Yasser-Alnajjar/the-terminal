import React from "react";

import { Inbox } from "lucide-react";
import { useTranslate } from "@hooks";

export const DataTableEmpty = () => {
  const t = useTranslate("dataTable.empty");

  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="max-w-2xl text-center flex flex-col items-center justify-center gap-4">
        <div className="p-4 bg-muted rounded-full">
          <Inbox size={48} className="text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("description")}</p>
        </div>
      </div>
    </div>
  );
};
