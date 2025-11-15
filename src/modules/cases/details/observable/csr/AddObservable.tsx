import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  Button,
  IFieldConfig,
  FormikField,
  SheetTrigger,
} from "@components";
import { Form, FormikProvider, useFormik } from "formik";
import { Plus } from "lucide-react";

export const AddObservable = () => {
  const [open, setOpen] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      type: "",
      value: "",
      tlp: "0",
      pap: "0",
      ioc: false,
      sighted: false,
      sightedAt: 0,
      ignore_similarity: false,
      description: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setOpen(false);
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
      name: "value",
      label: "Value",
      type: "textarea",
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
    <Sheet
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        formik.resetForm();
      }}
    >
      <SheetTrigger asChild>
        <Button
          variant="primary-outline"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Plus size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[45vw] p-0 h-full flex-col flex gap-0">
        <SheetHeader className="px-4 py-2 border-b-2 border-primary-400 bg-primary-800 dark:bg-primary-25 text-white">
          <SheetTitle className="flex items-center gap-2 text-base !font-normal text-white">
            Adding an Observable
          </SheetTitle>
        </SheetHeader>
        <div className="p-4 space-y-2 flex-1 max-h-[90vh] overflow-y-auto">
          <FormikProvider value={formik}>
            <Form className="w-full grid grid-cols-12 gap-6">
              {fields.map((field) => (
                <FormikField field={field} formik={formik} key={field.name} />
              ))}
            </Form>
          </FormikProvider>
        </div>
        <SheetFooter className="px-4 py-2 border-t border-border bg-gray-50">
          <>
            <Button variant="error-outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary-outline"
              onClick={() => formik.resetForm()}
              disabled={!formik.dirty}
            >
              Save and add another
            </Button>
            <Button
              disabled={!formik.dirty}
              onClick={() => {
                formik.submitForm();
              }}
            >
              Confirm
            </Button>
          </>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
