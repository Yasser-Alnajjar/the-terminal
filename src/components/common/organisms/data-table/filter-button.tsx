import React from "react";
import { ToggleSwitch } from "@components";
import { Filter } from "lucide-react";
import { useStore, useTranslate } from "@hooks";

export const FilterButton = () => {
  const t = useTranslate("dataTable");
  const { show, setShow } = useStore((state) => ({
    show: state.showFilter,
    setShow: state.setShowFilter,
  }));
  return (
    <ToggleSwitch
      checked={show}
      onCheckedChange={(checked) => setShow(checked)}
      size="sm"
      tooltip={t("filters.filters")}
      checkedChildren={<Filter />}
      unCheckedChildren={<Filter />}
    />
  );
};
