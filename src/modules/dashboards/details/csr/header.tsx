import { Button } from "@components";
import { PenLine, Save } from "lucide-react";

export function DashboardHeader({
  title,
  editMode,
  onToggleEdit,
  onSave,
}: {
  title: string;
  editMode: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex gap-2">
        <Button
          variant="primary-outline"
          size="icon"
          className="rounded-full"
          onClick={onToggleEdit}
        >
          <PenLine size={16} />
        </Button>
        {editMode && (
          <Button
            variant="primary-outline"
            size="icon"
            className="rounded-full"
            onClick={onSave}
          >
            <Save size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
