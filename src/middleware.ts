import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import createIntlMiddleware from "next-intl/middleware";
import { locales, defaultLocale, localePrefix } from "./navigation";
import { adminRoutes, publicPages, userRoutes } from "@lib/helpers";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const pathnameWithoutLocale = pathnameLocale
    ? pathname.slice(`/${pathnameLocale}`.length) || "/"
    : pathname;

  const isPublicPage = publicPages.some(
    (page) =>
      pathnameWithoutLocale === page ||
      pathnameWithoutLocale.startsWith(`${page}/`)
  );

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Unauthenticated users
  if (!token && !isPublicPage) {
    const loginUrl = new URL(
      pathnameLocale ? `/${pathnameLocale}/auth/login` : "/auth/login",
      request.url
    );
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated users — landing redirect
  if (token && (pathname === "/" || pathname === `/${pathnameLocale}`)) {
    const profile = token.profile;
    const targetPath =
      profile === "admin"
        ? `/${pathnameLocale || defaultLocale}/organizations`
        : `/${pathnameLocale || defaultLocale}/cases`;

    return NextResponse.redirect(new URL(targetPath, request.url));
  }

  // Authenticated but unauthorized route
  if (token && !isPublicPage) {
    const profile = token.profile;
    const currentPath = pathnameWithoutLocale.split("/")[1] || "";
    const allowedRoutes = profile === "admin" ? adminRoutes : userRoutes;
    const isAllowed = allowedRoutes.includes(currentPath);

    const isRootPath =
      pathname === "/" || pathname === "/en" || pathname === "/ar";

    if (!isAllowed && !isRootPath) {
      const notFoundPath = `/${pathnameLocale || defaultLocale}/not-found`;
      return NextResponse.rewrite(new URL(notFoundPath, request.url));
    }
  }

  const response = intlMiddleware(request);

  response.headers.set("x-frame-options", "DENY");
  response.headers.set("x-content-type-options", "nosniff");

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images|icons|manifest.*\\..*).*)",
  ],
};
