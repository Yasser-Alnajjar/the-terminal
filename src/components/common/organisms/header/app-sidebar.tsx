"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@components";
import { NavMain } from "./nav-main";
import { useLocale } from "next-intl";
import { Link } from "@navigation";

import { useTranslate } from "@hooks";
import { useSidebarItems } from "./useSidebarItems";
export interface ISidebarItem {
  title: string;
  url: string;
  icon?: any;
  children?: Array<ISidebarItem>;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const locale = useLocale();
  const t = useTranslate("header");
  const data = useSidebarItems(t);
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      side={locale === "ar" ? "right" : "left"}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="relative">
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link
                href="/"
                className="group-data-[collapsible=icon]:text-center group-data-[collapsible=icon]:w-full"
              >
                <span className="text-base font-semibold group-data-[collapsible=icon]:hidden">
                  The Terminal
                </span>
                <span className="text-center text-base font-semibold hidden group-data-[collapsible=icon]:block">
                  T
                </span>
              </Link>
            </SidebarMenuButton>
            <SidebarTrigger className="absolute -end-6 top-1" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>
    </Sidebar>
  );
}
