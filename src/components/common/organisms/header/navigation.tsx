"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  Collapsible,
  CollapsibleContent,
  SheetClose,
  CollapsibleTrigger,
} from "@components";
import { Link, usePathname } from "@navigation";
import { useLocale } from "next-intl";

export interface INavItem {
  title: string;
  icon?: any;
  link: string;
  matcher?: string;
  allowedRoles?: string[];
  children?: Array<INavItem>;
}
interface NavMainProps {
  items: Array<INavItem>;
}

function NavItemComponent({ item }: { item: INavItem }) {
  const pathname = usePathname();
  const isActive = item.matcher && pathname.startsWith(item.matcher);
  const hasChildren = item.children && item.children.length > 0;
  const locale = useLocale();

  // When children exist, wrap the item in a Collapsible
  if (hasChildren) {
    return (
      <Collapsible defaultOpen={false} className="group/collapsible" asChild>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild className="cursor-pointer">
            <SidebarMenuButton className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 capitalize">
                <span>{item.title}</span>
              </div>
              <ChevronDown className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent dir={locale === "ar" ? "rtl" : "ltr"}>
            <SidebarMenuSub className="border-l-0 !border-s">
              {item.children!.map((child) => (
                <NavItemComponent key={child.title} item={child} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  // No children, so simply render a normal link
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild isActive={isActive || item.link === pathname}>
        <SheetClose asChild className="cursor-pointer">
          <Link
            href={item.link}
            // data-active={true}
            // className="mb-0.5 last:mb-0 relative w-fit gap-1 rounded-sm p-2 text-xs transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:ring-input/50 before:absolute before:start-0 before:bottom-0 before:transition-width before:duration-300 px-0 mx-1 before:h-px before:w-0 data-[active=true]:before:w-full before:bg-foreground text-nowrap"
          >
            <span className="[collapsible=icon]:hidden">{item.title}</span>
          </Link>
        </SheetClose>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
export function Navigation({ items }: NavMainProps) {
  return (
    <SidebarMenu className="w-full group-data-[collapsible=icon]:items-center gap-4">
      {items.map((item) => (
        <NavItemComponent key={item.title} item={item} />
      ))}
    </SidebarMenu>
  );
}
