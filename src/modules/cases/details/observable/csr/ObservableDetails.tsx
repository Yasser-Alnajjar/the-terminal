"use client";
import React, { useMemo } from "react";
import {
  Button,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  DataTableActions,
  FormikField,
  IFieldConfig,
  Line,
} from "@components";
import { useClipboard } from "@hooks";

import { Form, FormikProvider, useFormik } from "formik";
import {
  Eye,
  Settings,
  Copy,
  User,
  CalendarPlus2,
  CalendarArrowDown,
  ChevronDown,
  Fingerprint,
  Trash2,
  Pin,
} from "lucide-react";
import { MessageBox } from "@icons";

export const ObservableDetails = ({ data }: { data: any }) => {
  const { copy } = useClipboard();
  const initialValues = useMemo(
    () => ({
      type: data.dataType,
      data: data.data,
      tlp: String(data.tlp),
      pap: String(data.pap),
      ioc: data.ioc,
      sighted: data.sighted,
      sightedAt: data.sightedAt ? new Date(data.sightedAt) : null,
      ignore_similarity: data.ignoreSimilarity,
      description: data.description,
    }),
    [data]
  );
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    enableReinitialize: true,
  });

  const fields: Array<IFieldConfig> = [
    {
      name: "type",
      label: "Type",
      required: true,
      type: "select",
      options: [
        {
          label: "autonomous-system",
          value: "autonomous-system",
        },
        {
          label: "domain",
          value: "domain",
        },
        {
          label: "file",
          value: "file",
        },
        {
          label: "filename",
          value: "filename",
        },
        {
          label: "fqdn",
          value: "fqdn",
        },
        {
          label: "hash",
          value: "hash",
        },
        {
          label: "hostname",
          value: "hostname",
        },
        {
          label: "ip",
          value: "ip",
        },
        {
          label: "mail",
          value: "mail",
        },
        {
          label: "mail-subject",
          value: "mail-subject",
        },
        {
          label: "other",
          value: "other",
        },
        {
          label: "regexp",
          value: "regexp",
        },
        {
          label: "registry",
          value: "registry",
        },
        {
          label: "uri_path",
          value: "uri_path",
        },
        {
          label: "url",
          value: "url",
        },
        {
          label: "user-agent",
          value: "user-agent",
        },
      ],
    },
    {
      name: "data",
      label: "Data",
      type: "textarea",
      required: true,
    },
    {
      name: "tlp",
      label: "TLP",
      variant:
        formik.values.tlp === "1"
          ? "success"
          : formik.values.tlp === "2"
          ? "warning"
          : formik.values.tlp === "3" || formik.values.tlp === "4"
          ? "error"
          : "default",
      required: true,
      type: "select",
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
      col: "lg:col-span-6",
    },
    {
      name: "pap",
      label: "PAP",
      required: true,
      variant:
        formik.values.pap === "1"
          ? "success"
          : formik.values.pap === "2"
          ? "warning"
          : formik.values.pap === "3"
          ? "error"
          : "default",
      type: "select",
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
      col: "lg:col-span-6",
    },
    {
      name: "ioc",
      label: "IOC",
      type: "switch",
      col: "col-span-4",
    },
    {
      name: "sighted",
      label: "Has been sighted",
      type: "switch",
      col: "col-span-4",
    },
    {
      name: "ignore_similarity",
      label: "Ignore similarity",
      type: "switch",
      col: "col-span-4",
    },
    ...((formik.values.sighted
      ? [
          {
            name: "sightedAt",
            label: "Sighted at",
            type: "date",
          },
        ]
      : []) as IFieldConfig[]),
    {
      name: "tags",
      label: "Tags",
      type: "tags-select",
    },
    {
      name: "description",
      label: "Description",
      type: "editor",
    },
  ];

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
        <ObservableHeader data={data} />
        <div className="p-4 space-y-2 flex-1 max-h-[90vh] overflow-y-auto">
          <FormikProvider value={formik}>
            <Form>
              <div className="w-full grid grid-cols-12 gap-4">
                {fields.map((field) => (
                  <FormikField field={field} formik={formik} key={field.name} />
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-6 w-full">
                <Line>
                  <div className="mx-10 px-5">Analyzers</div>
                </Line>
                <div className="w-full min-h-36 flex justify-center items-center flex-col gap-2">
                  <MessageBox width={60} height={40} />
                  <p className="text-xs">No Data</p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-6 w-full">
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
                  {
                    key: "delete",
                    name: "Delete",
                    icon: <Trash2 />,
                    onClick: () => console.log("delete:", data),
                  },
                  {
                    key: "pin",
                    name: "Pin",
                    icon: <Pin />,
                    onClick: () => console.log("pin:", data),
                  },
                  {
                    key: "copy",
                    name: "Copy Data",
                    icon: <Copy />,
                    onClick: () => {
                      copy(data.data);
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

const ObservableHeader = ({ data }: { data: any }) => {
  const { copy } = useClipboard();
  return (
    <>
      <SheetHeader className="px-4 py-2 border-b-2 border-primary-400 bg-primary-800 dark:bg-primary-25 text-white">
        <SheetTitle className="capitalize flex items-center gap-2 text-base !font-normal text-white">
          <Fingerprint /> Observable preview
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
