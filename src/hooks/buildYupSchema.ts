import { useMemo } from "react";
import * as yup from "yup";
import { useTranslate } from "./useTranslate";
import { IFieldConfig } from "@components";

export interface IFieldOption {
  label: string;
  value: string | number | boolean;
}

export interface ISchema extends IFieldConfig {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  patternMessage?: string;
  email?: boolean;
  url?: boolean;
  integer?: boolean;
  positive?: boolean;
  negative?: boolean;
  minDate?: Date | string;
  maxDate?: Date | string;
  minItems?: number;
  maxItems?: number;
  accept?: string[];
  maxFileSize?: number;
}

export function useBuildYupSchema(
  schemaData: ISchema[] | null
): yup.ObjectSchema<any> | null {
  const t = useTranslate("dynamic_form.validation");

  const schema = useMemo(() => {
    if (!schemaData?.length) return null;

    const shape: Record<string, yup.AnySchema> = {};

    schemaData.forEach((field) => {
      const type = field.type ?? "text";
      switch (type) {
        case "text":
        case "textarea": {
          let validator = yup.string();

          if (field.required) {
            validator = validator.required(
              t("required", { field: field.label as string })
            );
          }

          if (field.minLength !== undefined) {
            validator = validator.min(
              field.minLength,
              t("minLength", {
                field: field.label as string,
                count: field.minLength,
              })
            );
          }

          if (field.maxLength !== undefined) {
            validator = validator.max(
              field.maxLength,
              t("maxLength", {
                field: field.label as string,
                count: field.maxLength,
              })
            );
          }

          if (field.pattern) {
            validator = validator.matches(
              new RegExp(field.pattern),
              field.patternMessage ||
                t("pattern", { field: field.label as string })
            );
          }

          shape[field.name] = validator;
          break;
        }
        case "password": {
          let validator = yup
            .string()
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              t("password")
            );

          if (field.required) {
            validator = validator.required(
              t("required", { field: field.label as string })
            );
          }

          if (field.minLength !== undefined) {
            validator = validator.min(
              field.minLength,
              t("minLength", {
                field: field.label as string,
                count: field.minLength,
              })
            );
          }

          if (field.maxLength !== undefined) {
            validator = validator.max(
              field.maxLength,
              t("maxLength", {
                field: field.label as string,
                count: field.maxLength,
              })
            );
          }

          if (field.pattern) {
            validator = validator.matches(
              new RegExp(field.pattern),
              field.patternMessage ||
                t("pattern", { field: field.label as string })
            );
          }

          shape[field.name] = validator;
          break;
        }

        case "email": {
          let validator = yup
            .string()
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t("email"));

          if (field.required) {
            validator = validator.required(
              t("required", { field: field.label as string })
            );
          }

          shape[field.name] = validator;
          break;
        }

        case "url": {
          let validator = yup.string().url(t("url"));

          if (field.required) {
            validator = validator.required(
              t("required", { field: field.label as string })
            );
          }

          shape[field.name] = validator;
          break;
        }

        case "phone": {
          let validator = yup.string();

          if (field.required) {
            validator = validator.required(
              t("required", { field: field.label as string })
            );
          }

          const regex = field.pattern
            ? new RegExp(field.pattern)
            : /^[\+]?[\d\s\-\(\)]+$/;

          validator = validator.matches(regex, t("phone"));

          shape[field.name] = validator;
          break;
        }

        case "number": {
          let validator = yup
            .number()
            .typeError(t("number", { field: field.label as string }));

          if (field.required) {
            validator = validator.required(
              t("required", { field: field.label as string })
            );
          }

          if (field.min !== undefined) {
            validator = validator.min(
              field.min,
              t("min", { field: field.label as string, count: field.min })
            );
          }

          if (field.max !== undefined) {
            validator = validator.max(
              field.max,
              t("max", { field: field.label as string, count: field.max })
            );
          }

          if (field.integer) {
            validator = validator.integer(
              t("integer", { field: field.label as string })
            );
          }

          if (field.positive) {
            validator = validator.positive(
              t("positive", { field: field.label as string })
            );
          }

          if (field.negative) {
            validator = validator.negative(
              t("negative", { field: field.label as string })
            );
          }

          shape[field.name] = validator;
          break;
        }

        case "boolean": {
          let validator = yup.boolean();

          if (field.required) {
            validator = validator.oneOf(
              [true],
              t("accepted", { field: field.label as string })
            );
          }

          shape[field.name] = validator;
          break;
        }

        case "date": {
          let validator = yup
            .date()
            .typeError(t("date", { field: field.label as string }));

          if (field.required) {
            validator = validator.required(
              t("required", { field: field.label as string })
            );
          }

          if (field.minDate) {
            const minDate =
              typeof field.minDate === "string"
                ? new Date(field.minDate)
                : field.minDate;
            validator = validator.min(
              minDate,
              t("minDate", {
                field: field.label as string,
                date: minDate.toDateString(),
              })
            );
          }

          if (field.maxDate) {
            const maxDate =
              typeof field.maxDate === "string"
                ? new Date(field.maxDate)
                : field.maxDate;
            validator = validator.max(
              maxDate,
              t("maxDate", {
                field: field.label as string,
                date: maxDate.toDateString(),
              })
            );
          }

          shape[field.name] = validator;
          break;
        }

        case "select": {
          let validator = yup.string();

          if (field.required) {
            validator = validator.required(
              t("required", { field: field.label as string })
            );
          }

          if (field.options?.length) {
            const validValues = field.options.map((opt) => String(opt.value));
            validator = validator.oneOf(
              validValues,
              t("select", { field: field.label as string })
            );
          }

          shape[field.name] = validator;
          break;
        }

        case "multi-select": {
          let validator = yup.array().of(yup.string());

          if (field.required) {
            validator = validator.min(
              1,
              t("required", { field: field.label as string })
            );
          }

          if (field.minItems !== undefined) {
            validator = validator.min(
              field.minItems,
              t("minItems", {
                field: field.label as string,
                count: field.minItems,
              })
            );
          }

          if (field.maxItems !== undefined) {
            validator = validator.max(
              field.maxItems,
              t("maxItems", {
                field: field.label as string,
                count: field.maxItems,
              })
            );
          }

          if (field.options?.length) {
            const validValues = field.options.map((opt) => String(opt.value));
            validator = validator.of(
              yup.string().oneOf(validValues, t("invalidSelection"))
            );
          }

          shape[field.name] = validator;
          break;
        }

        case "file":
        case "drop-file": {
          const validator = yup
            .mixed<File[] | FileList>()
            .test(
              "fileRequired",
              t("required", { field: field.label as string }),
              function (value) {
                if (field.required) {
                  if (
                    !value ||
                    (Array.isArray(value) && value.length === 0) ||
                    (value instanceof FileList && value.length === 0)
                  ) {
                    return this.createError({
                      message: t("required", {
                        field: (field.label as string) || field.name,
                      }),
                    });
                  }
                }
                return true;
              }
            )
            .test("fileValidation", t("fileInvalid"), function (value) {
              if (!value) return true;

              const files = Array.isArray(value)
                ? value
                : Array.from(value as FileList);
              const maxBytes = field.maxFileSize
                ? field.maxFileSize * 1024 * 1024
                : undefined;

              for (const file of files) {
                if (field.accept?.length) {
                  const fileExtension = file.name
                    .split(".")
                    .pop()
                    ?.toLowerCase();
                  const allowedTypes = field.accept.map((type) =>
                    type.toLowerCase().replace(".", "")
                  );

                  if (fileExtension && !allowedTypes.includes(fileExtension)) {
                    return this.createError({
                      message: t("fileType", {
                        types: field.accept.join(", "),
                      }),
                    });
                  }
                }

                if (maxBytes !== undefined && file.size > maxBytes) {
                  const maxMB = Number(field.maxFileSize);
                  const actualMB = +(file.size / (1024 * 1024)).toFixed(2);
                  return this.createError({
                    message: t("fileSize", { size: maxMB, actual: actualMB }),
                  });
                }
              }

              return true;
            });

          shape[field.name] = validator;
          break;
        }

        case "table":
        case "array": {
          const columnShape: Record<string, yup.AnySchema> = {};

          if (field.arrayFields?.length) {
            field.arrayFields.forEach((col: ISchema) => {
              columnShape[col.name] = buildFieldValidator(col, t);
            });
          }

          let validator = yup
            .array()
            .of(yup.object().shape(columnShape))
            .transform((value) => {
              if (!value || (Array.isArray(value) && value.length === 0)) {
                return undefined;
              }
              return value;
            });

          if (field.required) {
            validator = validator.required(
              t("required", { field: field.label as string })
            );
          }

          shape[field.name] = validator;
          break;
        }

        default:
          shape[field.name] = yup.mixed();
      }
    });

    return yup.object().shape(shape);
  }, [schemaData, t]);

  return schema;
}
function buildFieldValidator(
  col: ISchema,
  t: (key: string, params?: any) => string
): yup.AnySchema {
  switch (col.type) {
    case "text":
      let textValidator = yup.string();
      if (col.required) {
        textValidator = textValidator.required(
          t("required", { field: col.label as string })
        );
      }
      if (col.minLength !== undefined) {
        textValidator = textValidator.min(
          col.minLength,
          t("minLength", { field: col.label as string, count: col.minLength })
        );
      }
      if (col.maxLength !== undefined) {
        textValidator = textValidator.max(
          col.maxLength,
          t("maxLength", { field: col.label as string, count: col.maxLength })
        );
      }
      return textValidator;

    case "number":
      let numValidator = yup
        .number()
        .typeError(t("number", { field: col.label as string }));
      if (col.required) {
        numValidator = numValidator.required(
          t("required", { field: col.label as string })
        );
      }
      if (col.min !== undefined) {
        numValidator = numValidator.min(
          col.min,
          t("min", { field: col.label as string, count: col.min })
        );
      }
      if (col.max !== undefined) {
        numValidator = numValidator.max(
          col.max,
          t("max", { field: col.label as string, count: col.max })
        );
      }
      return numValidator;

    default:
      let defaultValidator = yup.mixed();
      if (col.required) {
        defaultValidator = defaultValidator.required(
          t("required", { field: col.label as string })
        );
      }
      return defaultValidator;
  }
}
