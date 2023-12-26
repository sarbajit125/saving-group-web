import { ColorDao } from '../constants/colorConstant';

export interface ServiceCardsDao {
    serviceCode: string,
    name: string,
    icon: JSX.Element,
    bgColor?: ColorDao,
    textColor?: string,
}

export enum GroupRoles {
    Gold = 'GOLD',
    Silver = 'SILVER',
    Regular = 'REGULAR'
}

export interface GroupItemUIDao {
    groupCode: string,
    groupName: string,
    role: GroupRoles,
    groupImage: string | null,
    memberCount: number
}
