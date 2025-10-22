import React, { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Cairo, Inter } from "next/font/google";
import { ThemeProvider, Toaster } from "@components";
import { routing } from "@navigation";
import AuthProvider from "src/AuthProvider";

const cairo = Cairo({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  subsets: ["arabic"],
});
const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout(props: Props) {
  const { params, children } = props;
  const locale = (await params).locale;

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(error);
  }
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  if (!messages) notFound();
  else {
    const layoutDir = locale === "ar" ? "rtl" : "ltr";
    return (
      <html
        lang={locale}
        dir={layoutDir}
        data-layout-dir={layoutDir}
        suppressHydrationWarning
      >
        <body
          dir={layoutDir}
          className={locale === "ar" ? cairo.className : inter.className}
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AuthProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                <Toaster />
                {children}
              </ThemeProvider>
            </AuthProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }
}
