"use client";

import React from "react";
import { Button } from "@components";
import {
  FileText,
  CheckSquare,
  Eye,
  Paperclip,
  Clock,
  BookOpen,
  Link2,
  Flag,
  BaggageClaim,
  UserPlus,
  X,
  Settings,
} from "lucide-react";
import { Link, usePathname } from "@navigation";
import { General } from "./general";
import { Tasks } from "./tasks";
import { Observables } from "./observables";
import { Ttps } from "./ttps";
import { Attachments } from "./attachments";
import { Timeline } from "./timeline";
import { Report } from "./report";
import { Pages } from "./pages";
import { History } from "./history";
import { Similar } from "./similar";

export const CaseLayout = () => {
  const pathname = usePathname();
  const currentPath = pathname.split("/").at(-1) ?? "general";

  const links = [
    { href: "general", label: "General", icon: FileText },
    { href: "tasks", label: "Tasks (2)", icon: CheckSquare },
    { href: "observables", label: "Observables (0)", icon: Eye },
    { href: "ttps", label: "TTPs (4)", icon: Flag },
    { href: "attachments", label: "Attachments", icon: Paperclip },
    { href: "timeline", label: "Timeline", icon: Clock },
    { href: "report", label: "Report", icon: FileText },
    { href: "pages", label: "Pages", icon: BookOpen },
    { href: "history", label: "History", icon: Clock },
    { href: "similar", label: "Similar", icon: Link2 },
  ];

  const sectionMap: Record<string, React.ReactNode> = {
    general: <General />,
    tasks: <Tasks />,
    observables: <Observables />,
    ttps: <Ttps />,
    attachments: <Attachments />,
    timeline: <Timeline />,
    report: <Report />,
    pages: <Pages />,
    history: <History />,
    similar: <Similar />,
  };

  return (
    <>
      <header className="sticky top-0 z-10 bg-background border-b border-border p-2 flex items-center justify-between">
        <h1 className="text-sm">Quidem saepe in pari</h1>
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

      <div className="w-full max-w-full overflow-x-auto">
        <div className="w-full flex gap-4 flex-nowrap">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={`/cases/${"id"}/${href}`}
              className="text-nowrap flex items-center gap-2 py-2 text-sm border-primary-400 data-[state=active]:border-b-2 data-[state=active]:text-primary-400"
              data-state={currentPath === href ? "active" : "inactive"}
            >
              <Icon size={16} /> {label}
            </Link>
          ))}
        </div>

        {sectionMap[currentPath] ?? <General />}
      </div>
    </>
  );
};
