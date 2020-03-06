import { DataStore } from '../infrastructure';

export type NavItem = {
  name: string,
  icon: string,
  url?: string,
  children?: NavItem[],
}

export type AuthUser = {
  employeeId: string,
  department: string,
  departmentID: string,
  division: string,
  divisionID: string,
  displayName: string,
  jobTitle: string,
  mail: string,
  mobilePhone: string,
  navigation: NavItem[],
  token: string,
}

export const AuthUserStore = new DataStore<AuthUser>({
  proxy: { url: '/api/user' },
})

export const UserInfoStore = new DataStore<AuthUser>({
  proxy: { url: '/api/user/info' },
})