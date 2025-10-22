import { getServerAuthSession } from "@auth";
import { redirect } from "@navigation";

const page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const locale = (await params).locale;
  const session = await getServerAuthSession();

  return session?.user?.profile === "admin"
    ? redirect({
        href: "/organizations",
        locale,
      })
    : redirect({
        href: "/cases",
        locale,
      });
};

export default page;
