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

  return (
    <FormikProvider value={formik}>
      <Form className="space-y-6 p-2">
        <div className="grid grid-cols-12 gap-6">
          <FormikField
            field={{
              name: "title",
              label: "Title",
              type: "text",
              col: "col-span-6",
            }}
            formik={formik}
          />
          <FormikField
            field={{
              name: "status",
              label: "Status",
              type: "select",
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
                  variant: "error",
                },
                {
                  label: (
                    <div className="flex items-center gap-2">
                      <span className="size-3 block rounded-full bg-warning-400"></span>{" "}
                      <span>In Progress</span>
                    </div>
                  ),
                  value: "InProgress",
                  variant: "warning",
                },
              ],
              col: "col-span-6",
            }}
            formik={formik}
          />

          <FormikField
            field={{
              name: "tlp",
              label: "TLP",
              type: "select",

              variant:
                formik.values.tlp === "1"
                  ? "success"
                  : formik.values.tlp === "2"
                  ? "warning"
                  : formik.values.tlp === "3" || formik.values.tlp === "4"
                  ? "error"
                  : "default",
              options: [
                {
                  label: "TLP:Clear",
                  value: 0,
                  variant: "default",
                },
                {
                  label: "TLP:Green",
                  value: 1,
                  variant: "success",
                },
                {
                  label: "TLP:Amber",
                  value: 2,
                  variant: "warning",
                },
                {
                  label: "TLP:Amber+Strict",
                  value: 3,
                  variant: "error",
                },
                {
                  label: "TLP:Red",
                  value: 4,
                  variant: "error",
                },
              ],
              col: "col-span-6",
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
                  : "default",

              options: [
                {
                  label: "PAP:Clear",
                  value: 0,
                  variant: "default",
                },
                {
                  label: "PAP:Green",
                  value: 1,
                  variant: "success",
                },
                {
                  label: "PAP:Amber",
                  value: 2,
                  variant: "warning",
                },
                {
                  label: "PAP:Red",
                  value: 3,
                  variant: "error",
                },
              ],
              col: "col-span-6",
            }}
            formik={formik}
          />
          <FormikField
            field={{
              name: "severity",
              label: "SEV",
              type: "select",
              variant:
                formik.values.severity === "1"
                  ? "default"
                  : formik.values.severity === "2"
                  ? "warning"
                  : formik.values.severity === "3" ||
                    formik.values.severity === "4"
                  ? "error"
                  : "default",
              options: [
                {
                  label: "SEV:Low",
                  value: 1,
                  variant: "default",
                },
                {
                  label: "SEV:Medium",
                  value: 2,
                  variant: "warning",
                },
                {
                  label: "SEV:High",
                  value: 3,
                  variant: "error",
                },
                {
                  label: "SEV:Critical",
                  value: 4,
                  variant: "error",
                },
              ],
              col: "col-span-6",
            }}
            formik={formik}
          />
          <FormikField
            field={{
              name: "startDate",
              label: "Start Date",
              type: "datetime",
              col: "col-span-6",
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
              col: "col-span-6",
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
            col: "col-span-6",
          }}
          formik={formik}
        />
        <FormikField
          field={{
            name: "description",
            label: "Description",
            type: "editor",
            col: "col-span-6",
          }}
          formik={formik}
        />
        {data.summary && (
          <FormikField
            field={{
              name: "summary",
              label: "Summary",
              type: "editor",
              col: "col-span-6",
            }}
            formik={formik}
          />
        )}
      </Form>
    </FormikProvider>
  );
};
