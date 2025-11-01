export type THSeries = {
  agg?: string;
  label?: string;
  type?: string;
  filters?: any[];
  dateField?: string;
  periodDateField?: string;
  threshold?: number;
  orientation?: string;
};

export type THItem = {
  id: string;
  type: string;
  options?: any;
};

export type THContainer = {
  type: "container";
  items: THItem[];
};

export type THDefinition = {
  period?: string;
  items: THContainer[];
  customPeriod?: any;
};

export type THDashboard = {
  _id: string;
  title: string;
  definition: THDefinition;
  writable?: boolean;
};
export interface DragData {
  type: "widget" | "row" | "toolbox";
  widgetId?: string;
  gridId?: string;
  toolboxType?: string;
}

export interface ActiveWidget {
  id: string;
  type: string;
  options: any;
}

export interface GridType {
  id: string;
  widgets: any[];
}
