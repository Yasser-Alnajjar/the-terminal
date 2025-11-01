import { Button } from "@components";

export function DashboardControls({
  addGrid,
  children,
}: {
  addGrid: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap gap-3 p-4 border border-border rounded-lg bg-muted/40">
      <Button
        onClick={addGrid}
        variant="outline"
        className="gap-2 bg-transparent"
      >
        + Add Row
      </Button>
      <div className="mx-auto flex items-center gap-4">{children}</div>
    </div>
  );
}
