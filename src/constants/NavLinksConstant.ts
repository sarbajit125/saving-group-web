import { SideNavbarItem } from "../models/uiModels";


export const navLinksArr: SideNavbarItem[] = [
    {
      serviceCode: 'HOME',
      title: 'Home',
    },
    {
      serviceCode: 'ACCOUNTS',
      title: 'Accounts',
    },
    {
      serviceCode: 'CARDS',
      title: 'Cards',
    },
    {
      serviceCode: 'SETTINGS',
      title: 'Settings',
    },
  ];


export const ROUTES = {
  HOME: '/',
  GROUP_LOBBY: '/user/group-lobby',
  GROUP_SETTINGS: (groupId: string) => `/user/group/${groupId}/settings`,
  GROUP_MEMBER_MANAGEMENT: (groupId: string) =>  `/user/group/${groupId}/management`,
  GROUP_TRANSFER_SERVICE: (groupId: string) =>  `/user/group/${groupId}/transfer`,
  GROUP_DASHBOARD: (groupId: string) =>  `/user/group/${groupId}/dashboard`,
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
}