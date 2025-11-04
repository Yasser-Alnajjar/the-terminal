import {
  BookText,
  BriefcaseBusiness,
  ClipboardList,
  Landmark,
  LayoutDashboard,
  Siren,
  SlidersVertical,
  Users,
  Wrench,
} from "lucide-react";
import { useSession } from "next-auth/react";

export function useSidebarItems(t: any) {
  const { data: session } = useSession();
  const profile = session?.user?.profile ?? "analyst";

  const items = allSidebarItems(t);

  if (profile === "admin") {
    return items.filter((item) =>
      ["organizations", "users", "knowledge", "entities", "platform"].includes(
        item.key
      )
    );
  }

  return items.filter((item) =>
    [
      "cases",
      "alerts",
      "tasks",
      "knowledge",
      "dashboards",
      "organization",
    ].includes(item.key)
  );
}
const allSidebarItems = (t: any) => [
  {
    key: "organizations",
    title: t("organizations"),
    url: "/organizations",
    icon: <Landmark />,
  },
  { key: "users", title: t("users"), url: "/users", icon: <Users /> },
  {
    key: "entities",
    title: t("entities"),
    url: "/entities",
    icon: <SlidersVertical />,
  },
  {
    key: "platform",
    title: t("platform"),
    url: "/platform",
    icon: <Wrench />,
  },
  {
    key: "cases",
    title: t("cases"),
    url: "/cases",
    icon: <BriefcaseBusiness />,
  },
  { key: "alerts", title: t("alerts"), url: "/alerts", icon: <Siren /> },
  { key: "tasks", title: t("tasks"), url: "/tasks", icon: <ClipboardList /> },
  {
    key: "knowledge",
    title: t("knowledge"),
    url: "/knowledge",
    icon: <BookText />,
  },
  {
    key: "dashboards",
    title: t("dashboards"),
    url: "/dashboards",
    icon: <LayoutDashboard />,
  },
  {
    key: "organization",
    title: t("organizations"),
    url: "/organization",
    icon: <Landmark />,
  },
];
