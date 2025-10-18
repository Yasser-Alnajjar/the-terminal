export interface INavItem {
  title: string;
  icon?: any;
  link: string;
  matcher?: string;
  allowedRoles?: string[];
  children?: Array<INavItem>;
}
