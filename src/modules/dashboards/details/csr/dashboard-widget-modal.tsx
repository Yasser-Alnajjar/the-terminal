"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Input,
  Label,
  Button,
} from "@components";

export function DashboardWidgetModal({
  open,
  onClose,
  item,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  item: any;
  onSave: (updated: any) => void;
}) {
  const [local, setLocal] = useState(item?.options || {});

  const handleChange = (key: string, value: any) => {
    setLocal((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Widget</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={local.title ?? ""}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          {item.type === "gauge" && (
            <div>
              <Label>Value</Label>
              <Input
                type="number"
                value={local.value ?? 0}
                onChange={(e) => handleChange("value", Number(e.target.value))}
              />
            </div>
          )}

          {item.type === "donut" && (
            <div>
              <Label>Label</Label>
              <Input
                value={local.customize?.[0]?.label ?? ""}
                onChange={(e) =>
                  handleChange("customize", [
                    {
                      ...local.customize?.[0],
                      label: e.target.value,
                    },
                  ])
                }
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={() => {
              onSave({ ...item, options: local });
              onClose();
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
