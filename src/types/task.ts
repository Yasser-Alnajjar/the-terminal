import { ICase } from "./cases";
import { ILog } from "./log";

export interface ITaskExtraData {
  actionRequired: boolean;
  shareCount: number;
  case: ICase;
  logs: Array<ILog>;
}

interface ITask {
  _id: string;
  _type: "Task";
  _createdBy: string;
  _updatedBy: string;
  _createdAt: number;
  _updatedAt: number;

  title: string;
  group: string;
  description: string;

  status: string;
  flag: boolean;

  startDate: number;
  dueDate: number;
  mandatory: boolean;
  order: number;

  assignee: string;

  extraData: ITaskExtraData;
}
export type { ITask };
