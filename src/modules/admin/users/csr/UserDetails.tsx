"use client";
import React, { useState } from "react";
import {
  Button,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Avatar,
  Badge,
  AvatarFallback,
  UploadAvatar,
  SheetFooter,
  ProgressInput,
  FormikField,
} from "@components";
import { useClipboard, useToast } from "@hooks";
import { IUser } from "src/types";
import { Form, FormikProvider, useFormik } from "formik";
import {
  Eye,
  Settings,
  Copy,
  User,
  CalendarPlus2,
  CalendarArrowDown,
} from "lucide-react";
import profiles from "public/profiles.json";
import permissions from "public/permissions.json";

export const UserDetails = ({ data }: { data: IUser }) => {
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      name: data.name,
      email: data.email,
      locked: data.locked,
      image: data.image,
      permissions: data.permissions,
      organization: data.organization,
      login: data.login,
      hasKey: data.hasKey,
      profile: data.profile,
      type: data.type,
      edit_password: false,
    },

    onSubmit: (values) => {
      console.log(values);
    },
    enableReinitialize: true,
  });
  const matchedPermissions = permissions.filter(
    (p) => p.name === formik.values.profile
  );

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
        <UserHeader data={data} />
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-150px)] p-4">
          <FormikProvider value={formik}>
            <Form className="space-y-6">
              <div className="flex items-center gap-4">
                <UploadAvatar clear id="image" name="image" />
                <div className="flex-1">
                  <FormikField
                    field={{
                      name: "name",
                      type: "text",
                      label: "Name",
                      placeholder: "Name",
                    }}
                    formik={formik}
                  />
                </div>
              </div>
              <FormikField
                field={{
                  name: "login",
                  type: "text",
                  label: "Login",
                  disabled: true,
                }}
                formik={formik}
              />
              <FormikField
                field={{
                  name: "email",
                  type: "email",
                  label: "Email",
                  placeholder: "Email",
                }}
                formik={formik}
              />
              <FormikField
                field={{
                  name: "type",
                  type: "select",
                  label: "Type",
                  options: [
                    {
                      label: "Normal",
                      value: "Normal",
                    },
                    {
                      label: "Service",
                      value: "Service",
                    },
                  ],
                }}
                formik={formik}
              />
              <FormikField
                field={{
                  name: "locked",
                  type: "switch",
                  label: "Locked",
                }}
                formik={formik}
              />
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-medium">MFA</h4>
                <p className="text-xs text-gray-600">
                  {data.hasMFA ? "Yes" : "No"}
                </p>
              </div>

              <APIKeyForm data={data} />

              <FormikField
                field={{
                  name: "profile",
                  type: "select",
                  label: "Profile",
                  options: profiles.map((profile) => ({
                    label: profile.name,
                    value: profile.name,
                  })),
                }}
                formik={formik}
              />
              {matchedPermissions.map(
                (profile) =>
                  profile.permissions.length > 0 && (
                    <div key={profile.name} className="flex flex-col gap-1">
                      <h4 className="text-xs font-medium">Permissions</h4>
                      <div className="flex flex-wrap gap-0.5">
                        {profile.permissions.map((perm: string) => (
                          <Badge
                            key={perm}
                            variant="info"
                            className="text-xxs bg-gray-100"
                          >
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )
              )}
              {!formik.values.edit_password && (
                <div className={"flex flex-col gap-1"}>
                  <label
                    className={"text-xs font-medium flex items-center gap-0.5"}
                  >
                    Password
                  </label>
                  <Button
                    type="button"
                    variant="link"
                    className="w-fit text-xs p-0 hover:no-underline text-primary-400 hover:text-primary-300"
                    onClick={() =>
                      formik.setFieldValue(
                        "edit_password",
                        !formik.values.edit_password
                      )
                    }
                  >
                    Edit Password
                  </Button>
                </div>
              )}
              {formik.values.edit_password && (
                <FormikField
                  field={{
                    name: "password",
                    type: "password",
                    label: "Password",
                    placeholder: "Password",
                  }}
                  formik={formik}
                />
              )}
              <Button
                variant="primary-outline"
                className="text-xs"
                onClick={() => {
                  toast({
                    title: "Password Reset",
                    description: "Mail for password reset has been sent!",
                  });
                }}
              >
                Reset The Password
              </Button>
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
            <Button onClick={() => formik.handleSubmit()} variant={"error"}>
              Delete User
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const APIKeyForm = ({ data }: { data: IUser }) => {
  const [show, setShow] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();
  const { copy } = useClipboard();
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xs font-medium">API Key</h4>
      <ProgressInput
        type={show ? "text" : "password"}
        // disabled={!data.hasKey}
        disabled={!apiKey}
        value={apiKey}
        onFocus={() => {
          copy(apiKey);
        }}
      />
      <div className="flex items-center gap-4">
        <Button
          className="w-full"
          variant="primary-outline"
          onClick={async () => {
            try {
              // Simulate API key generation (async)
              await new Promise((resolve) => setTimeout(resolve, 500));

              const newKey = `${crypto
                .randomUUID()
                .replace(/-/g, "")
                .substring(0, 32)}`;
              setApiKey(newKey);

              // Optional: copy to clipboard for convenience
              await navigator.clipboard.writeText(newKey);

              // Show key and success toast
              setShow(true);
              toast({
                title: "New API key generated to: " + data.name,
                description: "Your new API key has been copied to clipboard.",
              });
            } catch (error) {
              console.error("Error generating API key:", error);
              toast({
                title: "Error generating key",
                description:
                  "Something went wrong while generating your API key.",
                variant: "error",
              });
            }
          }}
        >
          {apiKey ? "Renew" : "Create"}
        </Button>
        <Button
          className="w-full"
          // disabled={!data.hasKey}
          disabled={!apiKey}
          onClick={() => {
            setShow(true);
          }}
        >
          Reveal
        </Button>
        <Button
          className="w-full"
          variant="error"
          // disabled={!data.hasKey}
          disabled={!apiKey}
          onClick={() => {
            setApiKey("");
          }}
        >
          Revoke
        </Button>
      </div>
    </div>
  );
};

const UserHeader = ({ data }: { data: IUser }) => {
  const { copy } = useClipboard();
  return (
    <>
      <SheetHeader className="px-4 py-2 border-b-2 border-primary-400 bg-primary-800 dark:bg-primary-25 text-white">
        <SheetTitle className="capitalize flex items-center gap-2 text-base !font-normal text-white">
          <Avatar className="size-6">
            <AvatarFallback className="text-sm capitalize text-foreground">
              {data.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          {data.name}
          <Badge variant={data.locked ? "error" : "success"}>
            {data.locked ? "Locked" : "Active"}
          </Badge>
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
          <span>{data._createdBy}</span>
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
