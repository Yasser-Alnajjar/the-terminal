import { redirect } from "@navigation";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; locale: "ar" | "en" }>;
}) => {
  const { id, locale } = await params;
  return redirect({ href: `/cases/${id}/general`, locale });
};

export default page;
