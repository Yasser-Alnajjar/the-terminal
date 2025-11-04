import { IUser } from "src/types";
import "react";

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.md" {
  const src: string;
  export default src;
}
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    name: string;
    id: string;
    exp: number;
    permission?: Array<string>;
    accessToken: string;
    refreshToken?: string;
    user?: IUser;
    jwt?: any;
  }
}
