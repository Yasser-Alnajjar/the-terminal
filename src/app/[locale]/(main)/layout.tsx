import React, { ReactNode } from "react";
import { Header, SidebarInset, SidebarProvider, AppSidebar } from "@components";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout(props: Props) {
  const { children } = props;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 60)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Header />

        <main className="flex flex-1 flex-col gap-2 m-2">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
