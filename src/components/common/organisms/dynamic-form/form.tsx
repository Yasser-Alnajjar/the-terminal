"use client";

import React from "react";
import {
  Form as FormikForm,
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikProvider,
} from "formik";
import { FieldRenderer } from "./field-renderer";
import { IFieldConfig } from "./types";
import { cn } from "@lib/utils";

interface DynamicFormProps extends FormikConfig<any> {
  className?: string;
  fields: Array<IFieldConfig>;
  errors?: (errors: any) => void;
  formikHelpers?: (formikHelpers: FormikHelpers<any>) => void;
  children?: (formik: FormikHelpers<any> & any) => React.ReactNode;
}

export const Form: React.FC<DynamicFormProps> = ({
  fields,
  className,
  formikHelpers,
  children,
  errors,
  ...formikConfig
}) => {
  return (
    <Formik {...formikConfig} enableReinitialize>
      {(formik) => {
        if (formikHelpers) {
          formikHelpers(formik);
        }
        if (formik.errors) {
          errors?.(formik.errors);
        }

        return (
          <FormikProvider value={formik}>
            <FormikForm className={cn(className)}>
              <div
                className={cn("grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4")}
              >
                {fields.map((field) => (
                  <div
                    key={field.name}
                    className={cn("col-span-12", field.col, field.colClassName)}
                  >
                    <div
                      className={cn(
                        "flex flex-col gap-2",
                        (field.type === "switch" ||
                          field.type === "checkbox") &&
                          "flex-row-reverse items-center w-fit",
                        field.rowClassName
                      )}
                    >
                      <label
                        htmlFor={field.name}
                        className={cn(
                          "text-sm font-medium flex items-center gap-0.5",
                          field.labelClassName
                        )}
                      >
                        {field.label}
                        {field.required && (
                          <span className="text-error-300">*</span>
                        )}
                      </label>
                      <FieldRenderer field={field} />
                      {field.description && (
                        <p
                          className={cn(
                            "text-sm text-gray-600",
                            field.descriptionClassName
                          )}
                        >
                          {field.description}
                        </p>
                      )}
                    </div>
                    {!field.isArray &&
                      (formik?.touched[field.name] || formik.submitCount > 0) &&
                      formik?.errors[field.name] && (
                        <small className="mt-1 text-xs text-error-300">
                          {formik?.errors[field.name]?.toString()}
                        </small>
                      )}
                  </div>
                ))}
              </div>
              {children && children(formik)}
            </FormikForm>
          </FormikProvider>
        );
      }}
    </Formik>
  );
};
