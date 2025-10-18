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
import { Separator } from "@components";

export interface IFieldGroup {
  title?: string | React.ReactNode;
  header?: (formik: FormikHelpers<any> & any) => React.ReactNode;
  description?: string;
  fields: Array<IFieldConfig>;
  [key: string]: any;
}

interface DynamicFormProps extends FormikConfig<any> {
  className?: string;
  groups: Array<IFieldGroup>;
  errors?: (errors: any) => void;
  formikHelpers?: (formikHelpers: FormikHelpers<any>) => void;
  children?: (formik: FormikHelpers<any> & any) => React.ReactNode;
}

export const FormGroup: React.FC<DynamicFormProps> = ({
  groups,
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
              <div className="mb-4">
                {groups.map((group, groupIndex) => (
                  <React.Fragment key={groupIndex}>
                    {(group.title || group.description || group.header) && (
                      <div className="mb-4">
                        {group.title && (
                          <h3
                            className={cn(
                              "text-lg font-semibold",
                              group.titleClassName
                            )}
                          >
                            {group.title}
                          </h3>
                        )}
                        {group.header?.(formik)}
                        {group.description && (
                          <p className="text-sm text-gray-600">
                            {group.description}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      {group.fields.map((field) => {
                        return (
                          <div
                            key={field.name}
                            className={cn(
                              "col-span-12",
                              field.col,
                              field.colClassName
                            )}
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
                              (formik?.touched[field.name] ||
                                formik.submitCount > 0) &&
                              formik?.errors[field.name] && (
                                <small className="mt-1 text-xs text-error-300">
                                  {formik?.errors[field.name]?.toString()}
                                </small>
                              )}
                          </div>
                        );
                      })}
                    </div>

                    {groupIndex === groups.length - 1 ? null : (
                      <Separator className="my-14 bg-gray-300" />
                    )}
                  </React.Fragment>
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
