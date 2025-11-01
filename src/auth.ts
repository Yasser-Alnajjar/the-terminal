import { getServerSession, type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from "fs";
import path from "path";
import { IOrganization } from "@lib/types";

const filePath = path.join(process.cwd(), "public", "users.json");

function readDB() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith("https://");
const cookiePrefix = process.env.SITE_NAME?.replace(" ", "-");

const options: AuthOptions = {
  pages: {
    signIn: "/auth",
    newUser: "/auth",
  },
  providers: [
    // === Local JSON-based credentials provider ===
    CredentialsProvider({
      id: "local-json",
      name: "Local JSON",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) return null;

        const users = readDB();
        const user = users.find(
          (u: any) =>
            u.login === credentials.login && u.password === credentials.password
        );

        if (!user) return null;

        return {
          id: user._id,
          name: user.name,
          login: user.login,
          email: user.login,
          profile: user.profile,
          organization: user.organization,
          permissions: user.permissions,
          type: user.type,
          extraData: user.extraData,
          organizations: user.organizations,
          image: user.image,
          hasKey: user.hasKey,
          hasPassword: user.hasPassword,
          hasMFA: user.hasMFA,
          locked: user.locked,
          _createdAt: user._createdAt,
          _createdBy: user._createdBy,
        };
      },
    }),

    // === Existing JWT credentials provider ===
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {
        jwt: { type: "object" },
      },
      authorize(credentials) {
        if (credentials?.jwt) {
          const jwt = JSON.parse(credentials.jwt);
          return { accessToken: jwt.accessToken, ...jwt };
        }
        return null;
      },
    }),
  ],

  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) token.user = user;
      if (trigger === "update" && session) Object.assign(token, session);

      return { ...token, ...user, trigger, ...session };
    },
    async session({ session, token }) {
      session.id = token.name!;
      session.permission = token.permissions as Array<string> | undefined;
      session.accessToken = token.accessToken as string;

      session.user = {
        _id: token._id as string,
        name: token.name as string,
        login: token.login as string,
        email: token.login as string,
        password: token.password as string,
        hasKey: token.hasKey as boolean,
        hasPassword: token.hasPassword as boolean,
        hasMFA: token.hasMFA as boolean,
        locked: token.locked as boolean,
        permissions: token.permissions as string[],
        type: token.type as string,
        extraData: token.extraData as Record<string, unknown>,
        organizations: token.organizations as IOrganization[],
        profile: token.profile as string,
        organization: token.organization as string,
        _createdAt: token._createdAt as number,
        _createdBy: token._createdBy as string,
      };

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  useSecureCookies,
  cookies: {
    sessionToken: {
      name: useSecureCookies
        ? `__Secure-next-auth.session-token.${cookiePrefix}`
        : `next-auth.session-token.${cookiePrefix}`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
  },
};

(globalThis as any).authOptions = options;
export default options;
export const getServerAuthSession = () => getServerSession(options);
