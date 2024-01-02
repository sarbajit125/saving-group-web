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

export enum GroupNotificationFilter {
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL',
    JOINED = 'JOINED',
    LEFT = 'LEFT',
    REMOVED = 'REMOVED',
    REQUEST = 'APPROVALS',
}

export interface GroupNotificationUIModel {
    id: string,
    message: string,
    isRead: boolean,
    date: Date,
    type: GroupNotificationFilter
}
