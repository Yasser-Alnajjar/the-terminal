interface ILog {
  _id: string;
  _type: "Log";
  _createdBy: string;
  _createdAt: number;
  message: string;
  date: number;
  attachments: any[];
  owner: string;
  extraData: {
    actionCount: number;
  };
}

export type { ILog };
