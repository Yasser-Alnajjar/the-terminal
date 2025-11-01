"use client";

import {
  ProgressInput,
  Switch,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  FileDropZone,
  MultiSelect,
  TagSelect,
  Calendar,
  Popover,
  PopoverTrigger,
  Button,
  InputPassword,
  UploadAvatar,
  PhoneInput,
  InlinePopoverContent,
  ProgressTextarea,
  ProgressTextEditor,
} from "@components";
import { Field, getIn, FieldArray } from "formik";
import React from "react";
import { IFieldConfig } from "./types";
import { cn } from "@lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { arSA, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";
import { PopoverClose } from "@radix-ui/react-popover";
import { TableField } from "./table-field";
import { useTranslate } from "@hooks";

interface FieldRendererProps {
  field: IFieldConfig;
  name?: string;
}

export function FieldRenderer({ field, name }: FieldRendererProps) {
  const locale = useLocale();
  const t = useTranslate("dynamic_form");
  const fullName = name || field.name;
  if (field.isArray) {
    return (
      <FieldArray name={field.name}>
        {({ push, remove, form }) => {
          const values = form.values[field.name] || [];

          if (field.type === "table") {
            return <TableField field={field} />;
          }

          return (
            <div className="space-y-4">
              {values.map((_: any, index: number) => (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4"
                >
                  {field.arrayFields?.map((subField) => {
                    const fullName = `${field.name}[${index}].${subField.name}`;
                    const error = getIn(form.errors, fullName);
                    const touched = getIn(form.touched, fullName);

                    return (
                      <div
                        key={fullName}
                        className={cn(
                          "col-span-12",
                          subField.col,
                          subField.colClassName
                        )}
                      >
                        <label
                          htmlFor={fullName}
                          className="block text-sm font-medium"
                        >
                          {subField.label}
                        </label>

                        <FieldRenderer field={subField} name={fullName} />

                        {(touched || form.submitCount > 0) && error && (
                          <small className="mt-1 text-xs text-error-300">
                            {typeof error === "string"
                              ? error
                              : JSON.stringify(error)}
                          </small>
                        )}
                      </div>
                    );
                  })}

                  <div className="flex col-span-12">
                    <Button
                      type="button"
                      variant="error"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="primary-outline"
                size="sm"
                onClick={() =>
                  push(
                    field.arrayFields?.reduce((acc, f) => {
                      acc[f.name] = "";
                      return acc;
                    }, {} as Record<string, any>)
                  )
                }
              >
                {t("add")}
              </Button>
            </div>
          );
        }}
      </FieldArray>
    );
  }

  return (
    <Field name={fullName}>
      {({ field: formikField, form }: any) => {
        const value = formikField.value ?? "";
        const variant = form?.errors[fullName] ? "error" : "default";

        switch (field.type) {
          case "checkbox":
            return (
              <React.Fragment>
                <Checkbox
                  key={fullName}
                  id={fullName}
                  checked={!!value}
                  className={cn("shrink-0", field.className)}
                  onCheckedChange={(checked: boolean) => {
                    form.setFieldValue(fullName, checked);
                    if (field.onChange) {
                      field.onChange({ value: checked, form });
                    }
                  }}
                />
              </React.Fragment>
            );

          case "switch":
            return (
              <Switch
                key={fullName}
                id={fullName}
                checked={!!value}
                size={field.size}
                dir={locale === "ar" ? "rtl" : "ltr"}
                className={cn(field.className)}
                onCheckedChange={(checked: boolean) => {
                  form.setFieldValue(fullName, checked);
                  if (field.onChange) {
                    field.onChange({ value: checked, form });
                  }
                }}
              />
            );
          case "radio":
            return (
              <div className="flex gap-4" key={fullName}>
                {(field.options || []).map((option, index) => (
                  <label
                    key={index}
                    htmlFor={`${fullName}-${option.value}`}
                    className="flex items-center gap-2"
                  >
                    <RadioGroup
                      value={value}
                      onValueChange={(value) => {
                        form.setFieldValue(fullName, value);
                        if (field.onChange) {
                          field.onChange({ value, form });
                        }
                      }}
                    >
                      <RadioGroupItem
                        value={String(option.value)}
                        id={`${fullName}-${option.value}`}
                      />
                    </RadioGroup>
                    {option.label}
                  </label>
                ))}
              </div>
            );

          case "select":
            return (
              <Select
                key={fullName}
                dir={locale === "ar" ? "rtl" : "ltr"}
                value={value || ""}
                onValueChange={(value) => {
                  form.setFieldValue(fullName, value);
                  if (field.onChange) {
                    field.onChange({ value, form });
                  }
                }}
              >
                <SelectTrigger
                  variant={field.variant || variant}
                  className={cn(field.className)}
                  filled={field.filled}
                >
                  <SelectValue
                    placeholder={
                      field.placeholder ??
                      (locale === "ar" ? "اختر..." : "Select...")
                    }
                  />
                </SelectTrigger>
                <SelectContent position={field?.position}>
                  {(field.options || []).map((option, index) => (
                    <SelectItem
                      key={index}
                      value={String(option.value)}
                      className={cn(option.itemClassName)}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          case "multi-select":
            return (
              <MultiSelect
                key={fullName}
                {...field}
                options={field.options || []}
                selected={formikField.value || []}
                onChange={(selected: string[]) => {
                  form.setFieldValue(fullName, selected);
                  if (field.onChange) {
                    field.onChange({ value: selected, form });
                  }
                }}
                onCreateOption={
                  field.creatable
                    ? (inputValue: string) => {
                        const updated = [
                          ...(formikField.value || []),
                          inputValue,
                        ];
                        form.setFieldValue(fullName, updated);

                        if (
                          field.options &&
                          !field.options.find((o) => o.value === inputValue)
                        ) {
                          field.options.push({
                            value: inputValue,
                            label: inputValue,
                          });
                        }

                        if (field.onChange) {
                          field.onChange({ value: updated, form });
                        }
                      }
                    : undefined
                }
                placeholder={field.placeholder}
                creatable={field.creatable}
                className={cn(field.className)}
              />
            );
          case "tags-select":
            return (
              <TagSelect
                key={fullName}
                {...field}
                value={formikField.value || []}
                onChange={(selected: string[]) => {
                  form.setFieldValue(fullName, selected);
                  if (field.onChange) {
                    field.onChange({ value: selected, form });
                  }
                }}
                placeholder={field.placeholder}
                className={cn(field.className)}
              />
            );
          case "logo":
            return (
              <UploadAvatar
                id={fullName}
                key={fullName}
                accept={field.accept}
                multiple={field.multiple}
                className={cn(field.className)}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const files = event.currentTarget.files
                    ? Array.from(event.currentTarget.files)
                    : [];

                  form.setFieldValue(
                    fullName,
                    field.multiple ? files : files[0]
                  );

                  if (field.onChange) {
                    field.onChange({
                      value: field.multiple ? files : files[0],
                      form,
                    });
                  }
                }}
              />
            );
          case "drop-file":
            return (
              <FileDropZone
                key={fullName}
                value={form.values[fullName] || []}
                multiple={field.multiple}
                accept={field.accept}
                onChange={(files: File[]) => {
                  form.setFieldValue(fullName, files);
                  if (field.onChange) {
                    field.onChange({ value: files, form });
                  }
                }}
              />
            );
          case "datetime":
            const isDisabled = !!field.disabled;

            return (
              <Popover key={fullName} open={!isDisabled ? undefined : false}>
                <PopoverTrigger asChild>
                  <div
                    className={cn(
                      "relative flex gap-2",
                      isDisabled && "opacity-50 pointer-events-none"
                    )}
                  >
                    <ProgressInput
                      id={fullName}
                      variant={field.variant || variant}
                      filled={field.filled}
                      value={
                        value instanceof Date
                          ? format(value, "MMMM dd, yyyy HH:mm:ss", {
                              locale: locale === "en" ? enUS : arSA,
                            })
                          : ""
                      }
                      placeholder={
                        locale === "en"
                          ? "MM/DD/YYYY HH:mm:ss"
                          : "يوم/شهر/سنة ساعة:دقيقة:ثانية"
                      }
                      className="pr-10"
                      readOnly
                      disabled={isDisabled}
                    />

                    <Button
                      id={`${fullName}-picker`}
                      variant="ghost"
                      size="icon"
                      disabled={isDisabled}
                      className={cn(
                        "absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2",
                        isDisabled && "cursor-not-allowed opacity-60"
                      )}
                    >
                      <CalendarIcon className="size-3" />
                      <span className="sr-only">Select date & time</span>
                    </Button>
                  </div>
                </PopoverTrigger>

                {!isDisabled && (
                  <InlinePopoverContent
                    className="w-auto overflow-hidden p-4 border-border shadow-[0px_24px_48px_-12px_#1018282E]"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                  >
                    <div className="flex gap-3">
                      {/* Calendar */}
                      <Calendar
                        mode="single"
                        dir={locale === "en" ? "ltr" : "rtl"}
                        locale={locale === "en" ? enUS : arSA}
                        selected={value instanceof Date ? value : undefined}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          if (!date) return;
                          const current =
                            value instanceof Date ? value : new Date();
                          const newDate = new Date(date);
                          newDate.setHours(current.getHours());
                          newDate.setMinutes(current.getMinutes());
                          newDate.setSeconds(current.getSeconds());
                          form.setFieldValue(fullName, newDate);
                          field.onChange?.({ value: newDate, form });
                        }}
                      />

                      {/* Time selectors */}
                      <div className="flex justify-between gap-4 h-[280px]">
                        {[
                          { label: "Hours", max: 23 },
                          { label: "Minutes", max: 59 },
                          { label: "Seconds", max: 59 },
                        ].map(({ label, max }) => {
                          const unit = label.toLowerCase() as
                            | "hours"
                            | "minutes"
                            | "seconds";
                          const current =
                            value instanceof Date
                              ? value[
                                  `get${
                                    label as "Hours" | "Minutes" | "Seconds"
                                  }`
                                ]()
                              : 0;

                          const handleChange = (newVal: number) => {
                            const newDate =
                              value instanceof Date
                                ? new Date(value)
                                : new Date();
                            if (unit === "hours") newDate.setHours(newVal);
                            if (unit === "minutes") newDate.setMinutes(newVal);
                            if (unit === "seconds") newDate.setSeconds(newVal);
                            form.setFieldValue(fullName, newDate);
                            field.onChange?.({ value: newDate, form });
                          };

                          const containerRef = (el: HTMLDivElement | null) => {
                            if (!el) return;
                            setTimeout(() => {
                              const selected = el.querySelector(
                                `[data-value="${current}"]`
                              ) as HTMLElement | null;
                              if (!selected) return;
                              const containerRect = el.getBoundingClientRect();
                              const selectedRect =
                                selected.getBoundingClientRect();
                              const offsetInside =
                                selectedRect.top - containerRect.top;
                              const targetScrollTop =
                                el.scrollTop +
                                offsetInside -
                                el.clientHeight / 2 +
                                selected.clientHeight / 2;
                              el.scrollTo({
                                top: Math.max(
                                  0,
                                  Math.round(targetScrollTop + 30)
                                ),
                                behavior: "smooth",
                              });
                            }, 40);
                          };

                          return (
                            <div
                              key={label}
                              className="flex flex-col items-center w-20 h-full overflow-hidden"
                            >
                              <label className="text-xs text-muted-foreground mb-1">
                                {label}
                              </label>

                              <div
                                ref={containerRef}
                                className="relative h-full w-full overflow-y-auto hide-scrollbar rounded-lg"
                              >
                                <div className="flex flex-col items-center py-2">
                                  {Array.from({ length: max + 1 }, (_, i) => (
                                    <button
                                      key={i}
                                      data-value={i}
                                      onClick={() => handleChange(i)}
                                      disabled={isDisabled}
                                      className={cn(
                                        "cursor-pointer w-full py-1 text-sm transition-colors rounded-md",
                                        i === current
                                          ? "bg-primary-400 text-primary-foreground font-medium"
                                          : "hover:bg-muted",
                                        isDisabled &&
                                          "opacity-50 cursor-not-allowed"
                                      )}
                                    >
                                      {i.toString().padStart(2, "0")}
                                    </button>
                                  ))}
                                  <div className="h-10" />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </InlinePopoverContent>
                )}
              </Popover>
            );

          case "date":
            return (
              <Popover key={fullName}>
                <PopoverTrigger asChild>
                  <div className="relative flex gap-2">
                    <ProgressInput
                      id={fullName}
                      variant={field.variant || variant}
                      filled={field.filled}
                      value={
                        value instanceof Date
                          ? format(value, "MMMM dd, yyyy", {
                              locale: locale === "en" ? enUS : arSA,
                            })
                          : ""
                      }
                      placeholder={
                        locale === "en" ? "MM/DD/YYYY" : "يوم/شهر/سنة"
                      }
                      className="pr-10"
                      onChange={(e) => {
                        const parsed = new Date(e.target.value);
                        if (!isNaN(parsed.getTime())) {
                          form.setFieldValue(fullName, parsed);
                          if (field.onChange) {
                            field.onChange({ value: parsed, form });
                          }
                        } else {
                          form.setFieldValue(fullName, null);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                        }
                      }}
                    />
                    <Button
                      id={`${fullName}-picker`}
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2"
                    >
                      <CalendarIcon className="size-3" />
                      <span className="sr-only">Select date</span>
                    </Button>
                  </div>
                </PopoverTrigger>
                <InlinePopoverContent
                  className="w-auto overflow-hidden p-0 border-border shadow-[0px_24px_48px_-12px_#1018282E]"
                  align="end"
                  alignOffset={-8}
                  sideOffset={10}
                >
                  <PopoverClose asChild>
                    <Calendar
                      mode="single"
                      dir={locale === "en" ? "ltr" : "rtl"}
                      locale={locale === "en" ? enUS : arSA}
                      formatters={{
                        formatMonthDropdown: (date) =>
                          locale === "en"
                            ? date.toLocaleString("en-US", { month: "long" })
                            : date.toLocaleString("ar-EG", { month: "long" }),
                      }}
                      selected={value instanceof Date ? value : undefined}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        if (!date) return;
                        form.setFieldValue(fullName, date);
                        if (field.onChange) {
                          field.onChange({ value: date, form });
                        }
                      }}
                    />
                  </PopoverClose>
                </InlinePopoverContent>
              </Popover>
            );

          case "password":
            return (
              <InputPassword
                key={fullName}
                placeholder={field.placeholder}
                className={cn(field.className)}
                autoComplete={field.autoComplete || "off"}
                autoFocus={field.autoFocus}
                disabled={field.disabled}
                {...formikField}
                value={value}
                variant={field.variant || variant}
                onChange={(event) => {
                  form.setFieldValue(fullName, event.target.value);

                  if (field.onChange) {
                    field.onChange({
                      value: event.target.value,
                      form,
                    });
                  }
                }}
                onBlur={(event) => {
                  form.setFieldTouched(fullName, event.target.value);

                  if (field.onBlur) {
                    field.onBlur({
                      value: event.target.value,
                      form,
                    });
                  }
                }}
                rows={field.rows || 5}
                id={fullName}
              />
            );
          case "editor":
            return (
              <ProgressTextEditor
                key={fullName}
                id={fullName}
                dir={locale === "en" ? "ltr" : "rtl"}
                className={cn(field.className)}
                variant={field.variant || variant}
                disabled={field.disabled}
                value={value}
                onChange={(val) => {
                  form.setFieldValue(fullName, val);
                  if (field.onChange) field.onChange({ value: val, form });
                }}
                onBlur={() => {
                  form.setFieldTouched(fullName, true);
                  if (field.onBlur) field.onBlur({ value, form });
                }}
              />
            );
          case "textarea":
            return (
              <ProgressTextarea
                key={fullName}
                placeholder={field.placeholder}
                dir={locale === "en" ? "ltr" : "rtl"}
                className={cn(field.className)}
                variant={field.variant || variant}
                autoComplete={field.autoComplete || "off"}
                autoFocus={field.autoFocus}
                disabled={field.disabled}
                {...formikField}
                value={value}
                onChange={(event) => {
                  form.setFieldValue(fullName, event.target.value);

                  if (field.onChange) {
                    field.onChange({
                      value: event.target.value,
                      form,
                    });
                  }
                }}
                onBlur={(event) => {
                  form.setFieldTouched(fullName, event.target.value);

                  if (field.onBlur) {
                    field.onBlur({
                      value: event.target.value,
                      form,
                    });
                  }
                }}
                rows={field.rows || 5}
                id={fullName}
              />
            );

          case "phone":
            return (
              <PhoneInput
                key={fullName}
                placeholder={field.placeholder}
                dir={locale === "en" ? "ltr" : "rtl"}
                className={cn(field.className)}
                variant={field.variant || variant}
                autoComplete={field.autoComplete || "off"}
                autoFocus={field.autoFocus}
                disabled={field.disabled}
                {...formikField}
                value={value}
                onChange={(value) => {
                  form.setFieldValue(fullName, value);

                  if (field.onChange) {
                    field.onChange({
                      value: value,
                      form,
                    });
                  }
                }}
                rows={field.rows || 5}
                id={fullName}
              />
            );
          case "custom":
            return field.custom;
          default:
            return (
              <ProgressInput
                key={fullName}
                filled={field.filled}
                type={field.type || "text"}
                placeholder={field.placeholder}
                dir={locale === "en" ? "ltr" : "rtl"}
                className={cn(field.className)}
                icon={field.icon}
                {...formikField}
                value={value}
                onChange={(event) => {
                  form.setFieldValue(fullName, event.target.value);

                  if (field.onChange) {
                    field.onChange({
                      value: event.target.value,
                      form,
                    });
                  }
                }}
                onBlur={(event) => {
                  form.setFieldTouched(fullName, event.target.value);

                  if (field.onBlur) {
                    field.onBlur({
                      value: event.target.value,
                      form,
                    });
                  }
                }}
                autoComplete={field.autoComplete || "off"}
                autoFocus={field.autoFocus}
                disabled={field.disabled}
                variant={field.variant || variant}
                id={fullName}
              />
            );
        }
      }}
    </Field>
  );
}
