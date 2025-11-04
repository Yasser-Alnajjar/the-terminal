"use client";
import React from "react";
import {
  Button,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  FormikField,
  Avatar,
  AvatarFallback,
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  DataTableActions,
} from "@components";
import { useClipboard, useToast } from "@hooks";

import { Form, FormikProvider, useFormik } from "formik";
import {
  Eye,
  Settings,
  Copy,
  User,
  CalendarPlus2,
  CalendarArrowDown,
  Boxes,
  ChevronDown,
  BaggageClaim,
  Flag,
  PlayCircle,
  X,
  FlagOff,
} from "lucide-react";
import users from "public/users.json";
import { ApplyCaseTemplate } from "./ApplyCaseTemplate";
import { Responders } from "./Responders";
import { CloseCase } from "./CloseCase";
import { ReopenCase } from "./ReopenCase";

export const CaseDetails = ({ data }: { data: any }) => {
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      title: data.title,
      description: data.description,
      assignee: data.assignee,
      status: data.status,
      type: data.type,
      edit_password: false,
      tlp: String(data.tlp),
      pap: String(data.pap),
      severity: String(data.severity),
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      tags: data.tags,
      summary: data.summary,
    },

    onSubmit: (values) => {
      console.log(values);
    },
    enableReinitialize: true,
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="primary-outline"
          size={"icon"}
          className="group-hover:opacity-100 opacity-0 transition-opacity duration-300"
        >
          <Eye size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-0 min-w-[55vw] p-0 h-full">
        <CaseHeader data={data} />
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-150px)]">
          <FormikProvider value={formik}>
            <Form className="space-y-6">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-4 border-e border-border flex flex-col gap-2">
                  <FormikField
                    field={{
                      name: "tlp",
                      placeholder: "TLP",
                      filled: true,
                      type: "select",
                      variant:
                        formik.values.tlp === "1"
                          ? "success"
                          : formik.values.tlp === "2"
                          ? "warning"
                          : formik.values.tlp === "3" ||
                            formik.values.tlp === "4"
                          ? "error"
                          : "",
                      options: [
                        {
                          label: "TLP:Clear",
                          value: 0,
                          itemClassName:
                            "border border-black text-black dark:text-white data-[highlighted]:bg-black data-[highlighted]:text-white data-[state=checked]:bg-black data-[state=checked]:text-white",
                        },
                        {
                          label: "TLP:Green",
                          value: 1,
                          itemClassName:
                            "border border-success-500 text-success-500 data-[highlighted]:bg-success-500 data-[highlighted]:text-white data-[state=checked]:bg-success-500 data-[state=checked]:text-white",
                        },
                        {
                          label: "TLP:Amber",
                          value: 2,
                          itemClassName:
                            "border border-warning-500 text-warning-500 data-[highlighted]:bg-warning-500 data-[highlighted]:text-white data-[state=checked]:bg-warning-500 data-[state=checked]:text-white",
                        },
                        {
                          label: "TLP:Amber+Strict",
                          value: 3,
                          itemClassName:
                            "border border-error-300 text-error-300 data-[highlighted]:bg-error-300 data-[highlighted]:text-white data-[state=checked]:bg-error-300 data-[state=checked]:text-white",
                        },
                        {
                          label: "TLP:Red",
                          value: 4,
                          itemClassName:
                            "border border-error-500 text-error-500 data-[highlighted]:bg-error-500 data-[highlighted]:text-white data-[state=checked]:bg-error-500 data-[state=checked]:text-white",
                        },
                      ],
                    }}
                    formik={formik}
                  />
                  <FormikField
                    field={{
                      name: "pap",
                      placeholder: "PAP",
                      filled: true,
                      type: "select",
                      variant:
                        formik.values.pap === "1"
                          ? "success"
                          : formik.values.pap === "2"
                          ? "warning"
                          : formik.values.pap === "3"
                          ? "error"
                          : "",
                      options: [
                        {
                          label: "PAP:Clear",
                          value: 0,
                          itemClassName:
                            "border border-black text-black dark:text-white data-[highlighted]:bg-black data-[highlighted]:text-white data-[state=checked]:bg-black data-[state=checked]:text-white",
                        },
                        {
                          label: "PAP:Green",
                          value: 1,
                          itemClassName:
                            "border border-success-500 text-success-500 data-[highlighted]:bg-success-500 data-[highlighted]:text-white data-[state=checked]:bg-success-500 data-[state=checked]:text-white",
                        },
                        {
                          label: "PAP:Amber",
                          value: 2,
                          itemClassName:
                            "border border-warning-500 text-warning-500 data-[highlighted]:bg-warning-500 data-[highlighted]:text-white data-[state=checked]:bg-warning-500 data-[state=checked]:text-white",
                        },
                        {
                          label: "PAP:Red",
                          value: 3,
                          itemClassName:
                            "border border-error-500 text-error-500 data-[highlighted]:bg-error-500 data-[highlighted]:text-white data-[state=checked]:bg-error-500 data-[state=checked]:text-white",
                        },
                      ],
                    }}
                    formik={formik}
                  />
                  <FormikField
                    field={{
                      name: "severity",
                      placeholder: "SEV",
                      type: "select",
                      filled: true,
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
                          itemClassName:
                            "border border-primary-400  text-primary-400 data-[highlighted]:bg-primary-400 data-[highlighted]:text-white data-[state=checked]:bg-primary-400 data-[state=checked]:text-white",
                        },
                        {
                          label: "SEV:Medium",
                          value: 2,
                          itemClassName:
                            "border border-warning-400 text-warning-400 data-[highlighted]:bg-warning-400 data-[highlighted]:text-white data-[state=checked]:bg-warning-400 data-[state=checked]:text-white",
                        },
                        {
                          label: "SEV:High",
                          value: 3,
                          itemClassName:
                            "border border-error-300 text-error-300 data-[highlighted]:bg-error-300 data-[highlighted]:text-white data-[state=checked]:bg-error-300 data-[state=checked]:text-white",
                        },
                        {
                          label: "SEV:Critical",
                          value: 4,
                          itemClassName:
                            "border border-error-500 text-error-500 data-[highlighted]:bg-error-500 data-[highlighted]:text-white data-[state=checked]:bg-error-500 data-[state=checked]:text-white",
                        },
                      ],
                    }}
                    formik={formik}
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div>
                    <h3>Assignee</h3>
                    <FormikField
                      field={{
                        name: "assignee",
                        placeholder: "Assignee",
                        type: "select",
                        options: users.map((user: any) => ({
                          label: user.name,
                          value: user.login,
                        })),
                      }}
                      formik={formik}
                    />
                  </div>
                  <div>
                    <h3>Contributors</h3>
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
                <div className="p-4 border-e border-border space-y-3">
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
                      name: "endDate",
                      label: "End Date",
                      type: "datetime",
                      disabled: true,
                    }}
                    formik={formik}
                  />
                </div>
                <div className="p-4">
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
                </div>
              </div>
              <div className="p-4 space-y-6">
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
              </div>
            </Form>
          </FormikProvider>
        </div>
        <SheetFooter className="absolute w-full bottom-0 px-4 py-2 border-t border-border bg-gray-50">
          {formik.dirty ? (
            <>
              <Button
                variant="ghost"
                className="text-error-500 hover:text-error-500"
                onClick={() => formik.resetForm()}
              >
                Cancel
              </Button>
              <Button onClick={() => formik.handleSubmit()}>
                Save changes
              </Button>
            </>
          ) : (
            <div className="w-full flex items-center justify-between gap-2">
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="primary-outline">
                    Actions
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => formik.resetForm()}>
                    Reset
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
              <DataTableActions
                trigger={
                  <Button variant="primary-outline">
                    Actions
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                }
                actions={[
                  {
                    key: "Apply case template",
                    name: "Apply case template",
                    icon: <BaggageClaim />,
                    onClick(ids) {
                      console.log("view details:", ids);
                    },
                    render(row, open, close) {
                      return (
                        <ApplyCaseTemplate
                          open={open}
                          close={close}
                          row={row}
                        />
                      );
                    },
                  },
                  {
                    key: "Flag case(s)",
                    name: data.flag ? "Unflag" : "Flag",
                    icon: data.flag ? (
                      <FlagOff />
                    ) : (
                      <Flag className="text-primary-400" />
                    ),
                    onClick(row) {
                      toast({
                        title: row.flag ? "Flag" : "UnFlag",
                        description: row.flag
                          ? "Case has been marked as Flagged"
                          : "Case has been marked as UnFlagged",
                        variant: "success",
                      });
                    },
                  },
                  ...(data.endDate
                    ? [
                        {
                          key: "Reopen",
                          name: "Reopen multiple cases",
                          icon: <PlayCircle />,
                          onClick: (row: any) =>
                            console.log("Reopen multiple cases:", row),
                          render(row: any, open: any, close: any) {
                            return (
                              <ReopenCase open={open} close={close} row={row} />
                            );
                          },
                        },
                      ]
                    : [
                        {
                          key: "close",
                          name: "Close Case(s)",
                          icon: <X />,
                          onClick: (row: any) =>
                            console.log("assign to me:", row),
                          render(row: any, open: any, close: any) {
                            return (
                              <CloseCase open={open} close={close} row={row} />
                            );
                          },
                        },
                      ]),
                  {
                    key: "Responders",
                    name: "Responders",
                    icon: <Settings />,
                    onClick(ids) {
                      console.log("view details:", ids);
                    },
                    render(row, open, close) {
                      return <Responders open={open} close={close} row={row} />;
                    },
                  },
                ]}
                row={data}
              />
              <Button onClick={() => formik.handleSubmit()}>
                Go To Details
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const CaseHeader = ({ data }: { data: any }) => {
  const { copy } = useClipboard();
  return (
    <>
      <SheetHeader className="px-4 py-2 border-b-2 border-primary-400 bg-primary-800 dark:bg-primary-25 text-white">
        <SheetTitle className="capitalize flex items-center gap-2 text-base !font-normal text-white">
          <Boxes size={16} /> Case #{data.number}
        </SheetTitle>
      </SheetHeader>
      <div className="border-b border-border flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2 text-xs">
        <div
          className="flex items-center gap-1 cursor-pointer group"
          onClick={() => copy(data._id)}
        >
          <Settings size={12} /> <span className="text-gray-600">id</span>
          <span className=" flex gap-1">
            {data._id}
            <Copy
              size={12}
              className="text-primary-400 group-hover:opacity-100 opacity-0 transition-opacity duration-300"
            />
          </span>
        </div>
        <div className="flex items-center gap-1">
          <User size={12} />
          <span className="text-gray-600">Created by</span>
          <span className="capitalize">{data._createdBy.split("@").at(0)}</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarPlus2 size={12} />
          <span className="text-gray-600">Created at</span>
          <span>{new Date(data._createdAt).toLocaleString()}</span>
        </div>
        {data._updatedAt && (
          <div className="flex items-center gap-1">
            <CalendarArrowDown size={12} />
            <span className="text-gray-600">Updated at</span>
            <span>{new Date(data._updatedAt).toLocaleString()}</span>
          </div>
        )}
      </div>
    </>
  );
};
