"use client";
import React from "react";

import { FieldRenderer, IFieldConfig } from "../dynamic-form";
import { cn } from "@lib/utils";

interface IStepProps {
  fields: Array<IFieldConfig>;
  className?: string;
}

export const Step = (props: IStepProps) => {
  const { fields, className } = props;

  return (
    <div className={cn(className)}>
      {fields.map((field) => (
        <FieldRenderer field={field} key={field.name} />
      ))}
    </div>
  );
};
