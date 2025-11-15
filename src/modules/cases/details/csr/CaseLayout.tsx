"use client";

import React from "react";
import { Badge, Button } from "@components";
import {
  FileText,
  ListChecks,
  Fingerprint,
  Paperclip,
  Clock,
  BookOpen,
  Link2,
  Flag,
  BaggageClaim,
  UserPlus,
  X,
  Settings,
  Copy,
  User,
  CalendarPlus2,
  CalendarArrowDown,
} from "lucide-react";
import { Link, usePathname } from "@navigation";
import { ICase } from "@types";
import { useClipboard } from "@hooks";

interface CaseLayoutProps {
  children: React.ReactNode;
  data: ICase;
}

export const CaseLayout = ({ children, data }: CaseLayoutProps) => {
  const pathname = usePathname();
  const { copy } = useClipboard();

  const currentPath = pathname.split("/").at(-1) ?? "general";

  const links = [
    { href: "general", label: "General", icon: FileText },
    { href: "case-tasks", label: "Tasks", icon: ListChecks },
    { href: "observables", label: "Observables", icon: Fingerprint },
    { href: "procedures", label: "TTPs", icon: Flag },
    { href: "attachments", label: "Attachments", icon: Paperclip },
    { href: "timeline", label: "Timeline", icon: Clock },
    { href: "report", label: "Report", icon: FileText },
    { href: "pages", label: "Pages", icon: BookOpen },
    { href: "history", label: "History", icon: Clock },
    { href: "similar-cases", label: "Similar Cases", icon: Link2 },
    { href: "similar-alerts", label: "Similar Alerts", icon: Link2 },
    { href: "linked-alerts", label: "Linked Alerts", icon: Link2 },
    { href: "responders", label: "Responders", icon: Link2 },
  ];

  return (
    <>
      <header className="sticky top-0 z-10 bg-background border-b border-border p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={data.status === "New" ? "error" : "warning"}>
            {data.status}
          </Badge>
          <h1 className="text-sm font-medium">
            #{data.number} - {data.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="primary-outline"
            className="rounded-full"
            title="Assign to me"
          >
            <UserPlus size={16} />
          </Button>

          <Button
            size="icon"
            variant="primary-outline"
            className="rounded-full"
            title="Apply case template"
          >
            <BaggageClaim size={16} />
          </Button>

          <Button
            size="icon"
            variant="primary-outline"
            className="rounded-full"
            title="Flag case"
          >
            <Flag size={16} />
          </Button>

          <Button
            size="icon"
            variant="primary-outline"
            className="rounded-full"
            title="Close case"
          >
            <X size={16} />
          </Button>

          <Button
            size="icon"
            variant="primary-outline"
            className="rounded-full"
            title="Responders"
          >
            <Settings size={16} />
          </Button>
        </div>
      </header>
      <div className="border-b border-border flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2 text-xs">
        <div className="flex flex-wrap items-center gap-2">
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
            <span className="capitalize">
              {data._createdBy.split("@").at(0)}
            </span>
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
        {/* <div className="flex items-center gap-2">
          <Badge
            variant={
              data.tlp === 1
                ? "success"
                : data.tlp === 2
                ? "warning"
                : data.tlp === 3 || data.tlp === 4
                ? "error"
                : undefined
            }
          >
            TLP: {data.tlpLabel} - {data.tlp}
          </Badge>
          <Badge
            variant={
              data.pap === 1
                ? "success"
                : data.pap === 2
                ? "warning"
                : data.pap === 3
                ? "error"
                : undefined
            }
          >
            PAP: {data.papLabel} - {data.pap}
          </Badge>
          <Badge
            variant={
              data.severity === 1
                ? "default"
                : data.severity === 2
                ? "warning"
                : data.severity === 3 || data.severity === 4
                ? "error"
                : undefined
            }
          >
            SEVERITY: {data.severityLabel} - {data.severity}
          </Badge>
        </div> */}
      </div>

      <nav className="w-full max-w-full hide-scrollbar overflow-x-auto border-b border-border">
        <div className="flex gap-4 flex-nowrap px-2">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={`/cases/${data._id}/${href}`}
              data-state={currentPath === href ? "active" : "inactive"}
              className="relative transition-colors duration-300 text-nowrap flex items-center gap-2 py-2 text-sm data-[state=active]:text-primary-400 before:absolute before:start-0 before:bottom-0 before:transition-width before:duration-300 before:h-[2px] before:w-0 data-[state=active]:before:w-full  before:bg-primary-400"
            >
              <Icon size={16} /> {label}
            </Link>
          ))}
        </div>
      </nav>

      {children}
    </>
  );
};
