"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@components";
import { useIsMobile } from "@hooks";
import { Folder } from "lucide-react";
import { ISidebarItem } from "./app-sidebar";
import { Link } from "@navigation";

export function NavMain({ items }: { items: Array<ISidebarItem> }) {
  const isMobile = useIsMobile();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <Accordion type="multiple" className="w-full">
          {items.map((item) =>
            item.children?.length === 0 ? (
              <AccordionItem
                className="border-border/40"
                key={item.title}
                value={item.title}
              >
                <SidebarMenuItem className="flex-1">
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <AccordionTrigger>
                      {item.icon && item.icon}
                      {item.title}
                    </AccordionTrigger>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <AccordionContent>
                  <div
                    className={`
                    flex flex-col gap-1
                    ${isMobile ? "pl-3 pt-1" : "pl-4 pt-1"}
                  `}
                  >
                    <button className="flex items-center gap-2 text-sm hover:text-primary transition">
                      <Folder className="w-4 h-4" />
                      <span>Open</span>
                    </button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ) : (
              <SidebarMenuItem className="flex-1" key={item.title}>
                <SidebarMenuButton tooltip={item.title} asChild>
                  <Link href={item.url}>
                    {item.icon && item.icon}
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
        </Accordion>
      </SidebarMenu>
    </SidebarGroup>
  );
}
