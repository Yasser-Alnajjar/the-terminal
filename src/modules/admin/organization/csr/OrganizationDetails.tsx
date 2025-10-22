import {
  Button,
  Label,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  UploadAvatar,
  ProgressInput,
  ProgressTextarea,
  TableBody,
  TableRow,
  Table,
  TableCell,
  Avatar,
  AvatarFallback,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SheetFooter,
  Switch,
  PermissionsTooltip,
} from "@components";
import {
  CalendarArrowDown,
  CalendarPlus2,
  Copy,
  Eye,
  Landmark,
  Settings,
  User,
} from "lucide-react";
import React from "react";
import { useClipboard } from "@hooks";
import { Form, FormikProvider, useFormik } from "formik";
import { AddUserToOrganization } from "./AddUserToOrganization";
import { UserDetails } from "../../users";

export const OrganizationDetails = ({
  data,
  users,
}: {
  data: any;
  users: any;
}) => {
  const formik = useFormik({
    initialValues: {
      name: data.name,
      description: data.description,
      taskRule: data.taskRule,
      locked: data.locked,
      observableRule: data.observableRule,
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
      <SheetContent className="min-w-[60vw] p-0 h-full">
        <HeaderOrganization data={data} />
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-150px)]">
          <FormikProvider value={formik}>
            <Form>
              <div className="p-4 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <UploadAvatar clear id="avatar" name="avatar" />
                  <div className="flex flex-col gap-2 text-xs flex-1">
                    <Label htmlFor="name">Name</Label>
                    <ProgressInput
                      id="name"
                      defaultValue={formik.values.name}
                      onChange={(e) => {
                        formik.setFieldValue("name", e.target.value);
                      }}
                      disabled={data.name === "admin"}
                    />
                  </div>
                </div>
                {data.name !== "admin" && (
                  <div className="flex flex-col gap-2 text-xs flex-1">
                    <Label htmlFor="locked">Locked</Label>
                    <Switch
                      id="locked"
                      checked={formik.values.locked}
                      onCheckedChange={(checked) => {
                        formik.setFieldValue("locked", checked);
                      }}
                      disabled={data.name === "admin"}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2 text-xs flex-1">
                  <Label htmlFor="taskRule">Tasks sharing rule</Label>
                  <Select
                    name="taskRule"
                    value={formik.values.taskRule}
                    onValueChange={(value) => {
                      formik.setFieldValue("taskRule", value);
                    }}
                    disabled={data.name === "admin"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={"Choose.."} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="autoShare">AutoShare</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2 text-xs flex-1">
                  <Label htmlFor="observableRule">ObservableRule</Label>
                  <Select
                    name="observableRule"
                    value={formik.values.observableRule}
                    onValueChange={(value) => {
                      formik.setFieldValue("observableRule", value);
                    }}
                    disabled={data.name === "admin"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={"Choose.."} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="autoShare">AutoShare</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2 text-xs flex-1">
                  <Label htmlFor="description">Description</Label>
                  <ProgressTextarea
                    id="description"
                    defaultValue={formik.values.description}
                    onChange={(e) => {
                      formik.setFieldValue("description", e.target.value);
                    }}
                    disabled={data.name === "admin"}
                  />
                </div>
              </div>
            </Form>
          </FormikProvider>
          <div className="p-4 flex flex-col gap-6">
            <UsersList users={users} organizationName={data.name} />
          </div>
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
            <Button onClick={() => formik.handleSubmit()}>Go to Details</Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
const HeaderOrganization = ({ data }: { data: any }) => {
  const { copy } = useClipboard();
  return (
    <>
      <SheetHeader className="px-4 py-2 border-b-2 border-primary-400 bg-primary-800 dark:bg-primary-25 text-white">
        <SheetTitle className="flex items-center gap-2 text-base !font-normal text-white">
          <Landmark size={20} />
          Organization Preview
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
const UsersList = ({
  users,
  organizationName,
}: {
  users: any[];
  organizationName: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h3 className="font-medium">Users</h3>
        <AddUserToOrganization organizationName={organizationName} />
      </div>
      <div className="border border-border rounded-lg overflow-hidden">
        <Table className="table-auto w-full">
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                className="group border-b !border-s-2 border-s-transparent data-[state=selected]:border-s-primary-400 hover:border-s-primary-400  hover:bg-primary-25"
              >
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="capitalize">
                        {user.name.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="text-xs">{user.name}</p>
                      <p className="text-xs">{user.login}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <UserDetails data={user} />
                </TableCell>
                <TableCell>
                  <PermissionsTooltip permission={user.profile} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
