"use client";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  FormikField,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components";

import { ICase } from "@types";
import { Form, FormikProvider, useFormik } from "formik";
import users from "public/users.json";

export const CsrGeneral = ({ data }: { data: ICase }) => {
  const formik = useFormik({
    initialValues: {
      title: data.title,
      description: data.description,
      assignee: data.assignee,
      status: data.status,
      type: data._type,
      edit_password: false,
      tlp: String(data.tlp),
      pap: String(data.pap),
      severity: String(data.severity),
      startDate: new Date(data.startDate),
      tags: data.tags,
      summary: data.summary,
    },

    onSubmit: (values) => {
      console.log(values);
    },
    enableReinitialize: true,
  });
  const variant: Record<"default" | "error" | "warning" | "success", string> = {
    default:
      "rounded-lg border text-primary-500 data-[highlighted]:bg-primary-50 data-[highlighted]:text-primary-500 data-[state=checked]:bg-primary-500 data-[state=checked]:text-primary-25",
    error:
      "rounded-lg border text-error-500 data-[highlighted]:bg-error-50 data-[highlighted]:text-error-500 data-[state=checked]:bg-error-500 data-[state=checked]:text-error-25",
    warning:
      "rounded-lg border text-warning-500 data-[highlighted]:bg-warning-50 data-[highlighted]:text-warning-500 data-[state=checked]:bg-warning-500 data-[state=checked]:text-warning-25",
    success:
      "rounded-lg border text-success-500 data-[highlighted]:bg-success-50 data-[highlighted]:text-success-500 data-[state=checked]:bg-success-500 data-[state=checked]:text-success-25",
  };
  return (
    <FormikProvider value={formik}>
      <Form className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <FormikField
            field={{
              name: "title",
              label: "Title",
              type: "text",
            }}
            formik={formik}
          />
          <FormikField
            field={{
              name: "status",
              label: "Status",
              type: "select",
              className:
                formik.values.status === "New"
                  ? "text-error-500 border-error-500"
                  : "text-warning-500 border-warning-500",
              variant: formik.values.status === "New" ? "error" : "warning",
              options: [
                {
                  label: (
                    <div className="flex items-center gap-2">
                      <span className="size-3 block rounded-full bg-error-400"></span>
                      <span>New</span>
                    </div>
                  ),
                  value: "New",
                },
                {
                  label: (
                    <div className="flex items-center gap-2">
                      <span className="size-3 block rounded-full bg-warning-400"></span>{" "}
                      <span>In Progress</span>
                    </div>
                  ),
                  value: "InProgress",
                },
              ],
            }}
            formik={formik}
          />

          <FormikField
            field={{
              name: "tlp",
              label: "TLP",
              type: "select",
              className:
                formik.values.tlp === "1"
                  ? "text-success-500 border-success-500"
                  : formik.values.tlp === "2"
                  ? "text-warning-500 border-warning-500"
                  : formik.values.tlp === "3" || formik.values.tlp === "4"
                  ? "text-error-500 border-error-500"
                  : "text-primary-500 border-primary-500",
              variant:
                formik.values.tlp === "1"
                  ? "success"
                  : formik.values.tlp === "2"
                  ? "warning"
                  : formik.values.tlp === "3" || formik.values.tlp === "4"
                  ? "error"
                  : "",
              options: [
                {
                  label: "TLP:Clear",
                  value: 0,
                  itemClassName: variant["default"],
                },
                {
                  label: "TLP:Green",
                  value: 1,
                  itemClassName: variant["success"],
                },
                {
                  label: "TLP:Amber",
                  value: 2,
                  itemClassName: variant["warning"],
                },
                {
                  label: "TLP:Amber+Strict",
                  value: 3,
                  itemClassName: variant["error"],
                },
                {
                  label: "TLP:Red",
                  value: 4,
                  itemClassName: variant["error"],
                },
              ],
            }}
            formik={formik}
          />
          <FormikField
            field={{
              name: "pap",
              label: "PAP",
              type: "select",
              variant:
                formik.values.pap === "1"
                  ? "success"
                  : formik.values.pap === "2"
                  ? "warning"
                  : formik.values.pap === "3"
                  ? "error"
                  : "",
              className:
                formik.values.pap === "1"
                  ? "text-success-500 border-success-500"
                  : formik.values.pap === "2"
                  ? "text-warning-500 border-warning-500"
                  : formik.values.pap === "3"
                  ? "text-error-500 border-error-500"
                  : "text-primary-500 border-primary-500",
              options: [
                {
                  label: "PAP:Clear",
                  value: 0,
                  itemClassName: variant["default"],
                },
                {
                  label: "PAP:Green",
                  value: 1,
                  itemClassName: variant["success"],
                },
                {
                  label: "PAP:Amber",
                  value: 2,
                  itemClassName: variant["warning"],
                },
                {
                  label: "PAP:Red",
                  value: 3,
                  itemClassName: variant["error"],
                },
              ],
            }}
            formik={formik}
          />
          <FormikField
            field={{
              name: "severity",
              label: "SEV",
              type: "select",
              className:
                formik.values.severity === "1"
                  ? "text-success-500 border-success-500"
                  : formik.values.severity === "2"
                  ? "text-warning-500 border-warning-500"
                  : formik.values.severity === "3" ||
                    formik.values.severity === "4"
                  ? "text-error-500 border-error-500"
                  : "text-primary-500 border-primary-500",
              variant:
                formik.values.severity === "1"
                  ? ""
                  : formik.values.severity === "2"
                  ? "warning"
                  : formik.values.severity === "3" ||
                    formik.values.severity === "4"
                  ? "error"
                  : "",
              options: [
                {
                  label: "SEV:Low",
                  value: 1,
                  itemClassName: variant["default"],
                },
                {
                  label: "SEV:Medium",
                  value: 2,
                  itemClassName: variant["warning"],
                },
                {
                  label: "SEV:High",
                  value: 3,
                  itemClassName: variant["error"],
                },
                {
                  label: "SEV:Critical",
                  value: 4,
                  itemClassName: variant["error"],
                },
              ],
            }}
            formik={formik}
          />
          <FormikField
            field={{
              name: "startDate",
              label: "Start Date",
              type: "datetime",
            }}
            formik={formik}
          />
          <FormikField
            field={{
              name: "assignee",
              label: "Assignee",
              type: "select",
              options: users.map((user: any) => ({
                label: user.name,
                value: user.login,
              })),
            }}
            formik={formik}
          />

          <div>
            <h3 className="text-xs font-medium flex items-center gap-0.5 mb-2">
              Contributors
            </h3>
            <TooltipProvider>
              <div className="flex items-center gap-3">
                {data.extraData.contributors.map((user: any) => (
                  <Tooltip key={user.login}>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="capitalize">
                            {user.login.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="capitalize">
                      {data.extraData.owningOrganization.name}/
                      {user.login.split("@").at(0)}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </div>
        </div>
        <FormikField
          field={{
            name: "tags",
            label: "Tags",
            type: "tags-select",
          }}
          formik={formik}
        />
        <FormikField
          field={{
            name: "description",
            label: "Description",
            type: "editor",
          }}
          formik={formik}
        />
        {data.summary && (
          <FormikField
            field={{
              name: "summary",
              label: "Summary",
              type: "editor",
            }}
            formik={formik}
          />
        )}
      </Form>
    </FormikProvider>
  );
};
