"use client";
import React from "react";
import { FormikHelpers } from "formik";

import { cn } from "@lib/utils";
import { useQueryParams, useTranslate } from "@hooks";
import { Button } from "@components";

import { FormGroup, IFieldGroup } from "./form-group";
import { Save } from "lucide-react";

interface FormProps<T = any> {
  data?: T;
  groups: Array<IFieldGroup>;
  initialValues?: Record<string, any>;
  onSubmit: (
    values: Record<string, T>,
    formikHelpers: FormikHelpers<T>
  ) => void;
  schema: any;
  className?: string;
}

export const DynamicForm = <T,>({
  data,
  groups,
  initialValues,
  schema,
  onSubmit,
  className,
}: FormProps<T>) => {
  const t = useTranslate("dynamic_form");
  const { getQueryObject } = useQueryParams();
  const receivedId = getQueryObject()?.id;

  const resolvedInitialValues = receivedId
    ? initialValues ?? (data as Record<string, any>) ?? {}
    : initialValues ?? {};

  return (
    <FormGroup
      groups={groups}
      initialValues={resolvedInitialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
      className={cn(className)}
    >
      {({ isSubmitting }) => (
        <div className="flex justify-end">
          <Button type="submit" className="px-8" disabled={isSubmitting}>
            {t("save")} <Save size={16} />
          </Button>
        </div>
      )}
    </FormGroup>
  );
};
