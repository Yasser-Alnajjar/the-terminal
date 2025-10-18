import React from "react";
import { Button, ButtonProps } from "../atoms";
import { Plus } from "lucide-react";
import { useTranslate } from "@hooks";

interface IAddButtonProps extends ButtonProps {
  text?: string;
}
export const AddButton = ({ text, ...props }: IAddButtonProps) => {
  const t = useTranslate("common");
  return (
    <Button {...props}>
      {text || t("add")}
      <Plus size={16} />
    </Button>
  );
};
