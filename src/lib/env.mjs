import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const CultureNames = Object.freeze({
  US: "en-US",
  EG: "ar-EG",
});

export const env = createEnv({
  server: {
    API_BASE_URL: z.string().url(),
    DEFAULT_CULTURE_NAME: z.nativeEnum(CultureNames),
    SITE_NAME: z.string().min(3).max(60),
    SITE_DOMAIN: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().min(1),
  },
  runtimeEnv: {
    API_BASE_URL: process.env.API_BASE_URL,
    DEFAULT_CULTURE_NAME: process.env.DEFAULT_CULTURE_NAME,
    SITE_NAME: process.env.SITE_NAME,
    SITE_DOMAIN: process.env.SITE_DOMAIN,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
});
