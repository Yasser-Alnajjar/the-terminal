// import { getServerAuthSession } from "@auth";
// import { redirect } from "@navigation";

// const page = async ({ params }: { params: Promise<{ locale: string }> }) => {
//   const locale = (await params).locale;
//   const session = await getServerAuthSession();

//   // return session?.user?.profile === "admin"
//   //   ? redirect({
//   //       href: "/organizations",
//   //       locale,
//   //     })
//   //   : redirect({
//   //       href: "/cases",
//   //       locale,
//   //     });
// };

// export default page;
import { Switch, ToggleSwitch } from "@components";
import { Filter, Mail } from "lucide-react";
import React from "react";

const page = () => {
  const data = ["default", "success", "error", "warning"];
  return data.map((item) => (
    <div key={item} className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <ToggleSwitch
          size="sm"
          tooltip={item}
          variant={item as any}
          checkedChildren={<Filter />}
          unCheckedChildren={<Filter />}
        />
        <ToggleSwitch
          size="md"
          tooltip={item}
          variant={item as any}
          checkedChildren={<Filter />}
          unCheckedChildren={<Filter />}
        />
        <ToggleSwitch
          size="lg"
          tooltip={item}
          variant={item as any}
          checkedChildren={<Mail />}
          unCheckedChildren={<Mail />}
        />
      </div>
      <div className="flex items-center gap-2">
        <Switch size="sm" />
        <Switch size="md" />
        <Switch size="lg" />
      </div>
    </div>
  ));
};

export default page;
