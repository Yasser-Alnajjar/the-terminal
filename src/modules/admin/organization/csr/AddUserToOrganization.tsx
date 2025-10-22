import {
  SheetTrigger,
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  FieldRenderer,
  IFieldConfig,
  SheetFooter,
} from "@components";
import { useBuildYupSchema } from "@hooks";
import { cn } from "@lib/utils";
import { Form, FormikProvider, useFormik } from "formik";

export const AddUserToOrganization = ({
  organizationName,
}: {
  organizationName: any;
}) => {
  const fields: Array<IFieldConfig> = [
    {
      name: "type",
      type: "select",
      label: "Name",
      options: [
        { label: "Normal", value: "normal" },
        { label: "Service", value: "service" },
      ],
    },
    {
      name: "organization",
      type: "text",
      label: "Organization",
      disabled: true,
    },
    {
      name: "login",
      type: "email",
      label: "Login",
      placeholder: "Enter a login...",
      required: true,
    },
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter a name...",
      required: true,
    },
    {
      name: "profile",
      type: "select",
      label: "Profile",
      options: [{ label: "Admin", value: "admin" }],
      placeholder: "Choose a profile...",
      required: true,
    },
  ];
  const initialValues = {
    name: "",
    type: "normal",
    login: "",
    profile: "",
    organization: organizationName,
  };
  const validationSchema = useBuildYupSchema(fields);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
    enableReinitialize: true,
  });
  console.log(formik.errors);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"link"}
          className="p-0 hover:no-underline text-primary-500"
        >
          Add
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col min-w-[45vw] p-0 h-full">
        <SheetHeader className="px-4 py-2 border-b-2 border-primary-400 bg-primary-800 text-white">
          <SheetTitle className="flex items-center gap-2 text-base !font-normal text-white">
            Adding a User
          </SheetTitle>
        </SheetHeader>
        <FormikProvider value={formik}>
          <Form className="p-4 space-y-4 flex-1">
            {fields.map((field) => (
              <div
                key={field.name}
                className={cn(field.col, field.colClassName)}
              >
                <div
                  className={cn(
                    "flex flex-col gap-2",
                    (field.type === "switch" || field.type === "checkbox") &&
                      "flex-row-reverse items-center w-fit",
                    field.rowClassName
                  )}
                >
                  <label
                    htmlFor={field.name}
                    className={cn(
                      "text-sm font-medium flex items-center gap-0.5",
                      field.labelClassName,
                      formik.errors[field.name as keyof typeof initialValues] &&
                        "text-error-300"
                    )}
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-error-300">*</span>
                    )}
                  </label>
                  <FieldRenderer
                    field={{
                      ...field,
                      filled: Boolean(
                        formik.errors[field.name as keyof typeof initialValues]
                      ),
                    }}
                  />
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
                  (formik?.touched[field.name as keyof typeof initialValues] ||
                    formik.submitCount > 0) &&
                  formik?.errors[field.name as keyof typeof initialValues] && (
                    <small className="mt-1 text-xs text-error-300">
                      {formik?.errors[
                        field.name as keyof typeof initialValues
                      ]?.toString()}
                    </small>
                  )}
              </div>
            ))}
          </Form>
        </FormikProvider>
        <SheetFooter className="absolute w-full bottom-0 px-4 py-2 border-t border-border bg-gray-50">
          <Button
            variant="ghost"
            className="text-error-500 hover:text-error-500"
            onClick={() => formik.resetForm()}
          >
            Cancel
          </Button>
          <Button
            variant="primary-outline"
            onClick={() => {
              formik.handleSubmit();
              setTimeout(() => {
                formik.resetForm();
              }, 50);
            }}
            disabled={!formik.dirty || !formik.isValid}
          >
            Save and add another
          </Button>
          <Button
            onClick={() => formik.handleSubmit()}
            disabled={!formik.dirty || !formik.isValid}
          >
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
