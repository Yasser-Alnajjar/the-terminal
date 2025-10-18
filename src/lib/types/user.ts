export interface IUser {
  _id: string;
  _createdBy: string;
  _createdAt: number;
  login: string;
  password: string;
  name: string;
  hasKey: boolean;
  hasPassword: boolean;
  hasMFA: boolean;
  locked: boolean;
  profile: string;
  permissions: string[];
  organization: string;
  organizations: IOrganization[];
  type: "Normal" | string;
  extraData: Record<string, unknown>;
}

export interface IOrganization {
  organizationId: string;
  organization: string;
  profile: string;
  links: string[];
}
