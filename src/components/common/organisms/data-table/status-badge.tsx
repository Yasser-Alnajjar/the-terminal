import { Badge, LiveDot } from "@components";
import { useTranslate } from "@hooks";
import { cn } from "@lib/utils";

interface StatusBadgeProps {
  status: boolean | string | null | undefined;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const t = useTranslate("dataTable.status");

  const normalized = (() => {
    if (typeof status === "boolean") {
      return status ? "active" : "inactive";
    }
    if (typeof status === "string") {
      return status.toLowerCase();
    }
    return "unknown";
  })();

  const variantMap: Record<string, "success" | "warning" | "error" | "info"> = {
    active: "success",
    inactive: "info",
    approved: "success",
    pending: "warning",
    rejected: "error",
    unknown: "info",
  };

  const variant = variantMap[normalized] ?? "info";

  return (
    <div className="flex justify-center items-center w-full">
      <Badge
        variant={variant}
        className={cn("capitalize flex items-center gap-2 w-fit")}
      >
        <LiveDot variant={variant} />
        {normalized === "active"
          ? t("active")
          : normalized === "inactive"
          ? t("inactive")
          : normalized}
      </Badge>
    </div>
  );
}
