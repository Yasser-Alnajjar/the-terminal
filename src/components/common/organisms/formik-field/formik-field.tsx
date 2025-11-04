import React from "react";
import { cn } from "@lib/utils";
import { FieldRenderer, IFieldConfig } from "@components";

export const FormikField = ({
  field,
  formik,
}: {
  field: IFieldConfig;
  formik: any;
}) => {
  return (
    <div
      key={field.name}
      className={cn("col-span-12", field.col, field.colClassName)}
    >
      <div
        className={cn(
          "flex flex-col gap-1",
          (field.type === "switch" || field.type === "checkbox") && "gap-2",
          field.rowClassName
        )}
      >
        <label
          htmlFor={field.name}
          className={cn(
            "text-xs font-medium flex items-center gap-0.5",
            field.labelClassName,
            formik.errors[field.name as any] && "text-error-300"
          )}
        >
          {field.label}
          {field.required && <span className="text-error-300">*</span>}
        </label>
        <FieldRenderer
          field={{
            ...field,
            filled: Boolean(formik.errors[field.name as any]),
          }}
        />
        {field.description && (
          <p
            className={cn("text-sm text-gray-600", field.descriptionClassName)}
          >
            {field.description}
          </p>
        )}
      </div>
      {!field.isArray &&
        (formik?.touched[field.name as any] || formik.submitCount > 0) &&
        formik?.errors[field.name as any] && (
          <small className="mt-1 text-xs text-error-300">
            {formik?.errors[field.name as any]?.toString()}
          </small>
        )}
    </div>
  );
};
