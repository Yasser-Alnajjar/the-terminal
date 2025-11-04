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
  DataTableActions,
  Line,
} from "@components";
import { useClipboard, useToast } from "@hooks";
import { Tasks } from "@modules";
import { Form, FormikProvider, useFormik } from "formik";
import {
  Eye,
  Settings,
  Copy,
  User,
  CalendarPlus2,
  CalendarArrowDown,
  ChevronDown,
  Flag,
  List,
  FlagOff,
  Pin,
  PlayCircle,
  Trash2,
  UserPlus,
  X,
  PinOff,
} from "lucide-react";

import { Responders } from "./Responders";
import users from "public/users.json";
import { useSession } from "next-auth/react";
import { MessageBox } from "@icons";

export const TaskDetails = ({ data }: { data: any }) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const formik = useFormik({
    initialValues: {
      title: data.title,
      description: data.description,
      assignee: data.assignee,
      status: data.status,
      flag: data.flag,
      group: data.group,
      startDate: new Date(data.startDate),
      dueDate: new Date(data.dueDate),
      mandatory: data.mandatory,
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
      <SheetContent className="flex flex-col gap-0 min-w-[45vw] p-0 h-full">
        <CaseHeader data={data} />
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-150px)] p-4">
          <FormikProvider value={formik}>
            <Form className="space-y-6">
              <FormikField
                field={{
                  name: "title",
                  label: "Title",
                  type: "text",
                }}
                formik={formik}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
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
                <div>
                  <FormikField
                    field={{
                      name: "status",
                      label: "Status",
                      type: "select",
                      options: [
                        { label: "Open", value: "open" },
                        { label: "Closed", value: "closed" },
                      ],
                    }}
                    formik={formik}
                  />
                </div>
                <div>
                  <FormikField
                    field={{
                      name: "group",
                      label: "Group",
                      type: "text",
                    }}
                    formik={formik}
                  />
                </div>
                <div>
                  <FormikField
                    field={{
                      name: "startDate",
                      label: "Start Date",
                      type: "datetime",
                    }}
                    formik={formik}
                  />
                </div>
                <div>
                  <FormikField
                    field={{
                      name: "dueDate",
                      label: "Due Date",
                      type: "datetime",
                    }}
                    formik={formik}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <FormikField
                    field={{
                      name: "mandatory",
                      label: "Mandatory",
                      type: "switch",
                    }}
                    formik={formik}
                  />
                  <FormikField
                    field={{
                      name: "flag",
                      label: "Flag",
                      type: "switch",
                    }}
                    formik={formik}
                  />
                </div>
              </div>
              <FormikField
                field={{
                  name: "description",
                  label: "Description",
                  type: "editor",
                }}
                formik={formik}
              />
              <Tasks.Logs data={data.extraData.logs} />
              <div className="flex flex-col gap-6">
                <Line>
                  <div className="mx-10 px-5">Responder Reports</div>
                </Line>
                <div className="w-full min-h-36 flex justify-center items-center flex-col gap-2">
                  <MessageBox width={60} height={40} />
                  <p className="text-xs">No Reports</p>
                </div>
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
              <DataTableActions
                trigger={
                  <Button variant="primary-outline">
                    Actions
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                }
                actions={[
                  ...(data.assignee !== session?.user?.login
                    ? [
                        {
                          key: "assign-to-me",
                          name: "Assign to me",
                          icon: <UserPlus />,
                          onClick(row: any) {
                            toast({
                              title: "Assigned to me",
                              description: `Task (${row.original.title}) has been assigned to you`,
                              variant: "success",
                            });
                          },
                        },
                      ]
                    : []),
                  ...(data.status !== "InProgress"
                    ? [
                        {
                          key: "start",
                          name: "Start",
                          icon: <PlayCircle />,
                          onClick: ({ row }: { row: any }) =>
                            console.log("start:", row),
                        },
                      ]
                    : []),
                  ...(data.status !== "Completed"
                    ? [
                        {
                          key: "close",
                          name: "Close",
                          icon: <X />,
                          onClick: ({ row }: { row: any }) =>
                            console.log("close:", row),
                        },
                      ]
                    : []),

                  {
                    key: "delete",
                    name: "Delete",
                    icon: <Trash2 />,
                    onClick: ({ row }: { row: any }) =>
                      console.log("delete:", row),
                  },
                  {
                    key: "flag",
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
                          : "Case has been marked as UnFlag",
                        variant: "success",
                      });
                    },
                  },
                  {
                    key: "pin",
                    name: data.pin ? "Unpin" : "Pin",
                    icon: data.pin ? <PinOff /> : <Pin />,
                    onClick(row) {
                      toast({
                        title: row.flag ? "Pin" : "UnPin",
                        description: row.flag
                          ? "Case has been marked as Pinned"
                          : "Case has been marked as UnPin",
                        variant: "success",
                      });
                    },
                  },
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
          <List /> Task preview
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
