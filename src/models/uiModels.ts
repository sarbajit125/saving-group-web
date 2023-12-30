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

export interface InviteItemUIDao {
    groupCode: string,
    groupName: string,
    invitedBy: string,
    groupImage: string | null,
}

export enum GoalCategoryFilter {
    ALL_GOAL = 'ALL-GOAL',
    ONGOING = 'ONGOING-GOAL',
    COMPLETED = 'COMPLETED-GOAL',
}
export interface GoalCategoryItem {
    name: string,
    id: GoalCategoryFilter
}

export interface GoalItemDao {
    id: string,
    name: string,
    amount: number,
    isCompleted: boolean

}
