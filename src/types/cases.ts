interface ICase {
  _id: string;
  _type: "Case";
  _createdBy: string;
  _updatedBy: string;
  _createdAt: number;
  _updatedAt: number;

  number: number;
  title: string;
  description: string;

  severity: number;
  severityLabel: string;

  startDate: number;
  endDate?: number;
  summary?: string;
  tags: string[];
  flag: boolean;

  tlp: number;
  tlpLabel: string;

  pap: number;
  papLabel: string;

  status: string;
  stage: string;
  assignee: string;

  access: {
    _kind: string;
  };

  stats: {
    tasks: number;
    ttps: number;
    observables: number;
    alerts: number;
  };

  customFields: any[];

  userPermissions: string[];

  extraData: {
    procedureCount: number;
    observableStats: {
      total: number;
    };
    isOwner: boolean;
    status: ICaseStatus;
    actionRequired: boolean;
    alerts: any[];
    contributors: IContributor[];
    shareCount: number;
    owningOrganization: IOwningOrganization;
    permissions: string[];
    taskStats: {
      Completed: number;
      total: number;
    };
  };

  newDate: number;
  inProgressDate: number;
  timeToDetect: number;
  timeToTriage: number;
  timeToAcknowledge: number;
}

interface ICaseStatus {
  _id: string;
  _type: "CaseStatus";
  _createdAt: number;
  _createdBy: string;
  value: string;
  stage: string;
  order: number;
  color: string;
  hidden: boolean;
  extraData: Record<string, unknown>;
}

interface IContributor {
  login: string;
}

interface IOwningOrganization {
  _id: string;
  _type: "Organization";
  _createdBy: string;
  _createdAt: number;
  name: string;
  description: string;
  taskRule: string;
  observableRule: string;
  links: string[];
  locked: boolean;
  extraData: Record<string, unknown>;
}

export type { ICase, ICaseStatus, IContributor, IOwningOrganization };
