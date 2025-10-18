import * as Auth from "./auth/action";
import * as Logs from "./logs/action";
import * as Project from "./project/action";
// import * as Policies from "./policies/action";

export const Actions = {
  auth: Auth,
  logs: Logs,
  project: Project,
};
export interface IResult {
  data: any | null;
  error: any | null;
}
