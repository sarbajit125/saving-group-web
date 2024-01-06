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

export enum RequestType {
    join = 'JOIN',
    leave = 'LEAVE',
    remove = 'REMOVE'
}
export enum ApprovalType {
    approved = 'APPROVED',
    rejected = 'REJECTED',
    pending = 'PENDING',
}
export interface ApproverItem extends ApprovalPartyDetails {
    decision: ApprovalType
}
export interface ApprovalPartyDetails {
    userId: string,
    name: string,
    role: GroupRoles,
}
export interface GroupApprovalItemUIModel {
    requestId: string,
    requestType: RequestType,
    requestTimeStamp: Date,
    initiatorDetails: ApprovalPartyDetails,
    approverArr: ApproverItem[],
    initiatedOnDetails?: ApprovalPartyDetails,
}

export interface UserManageItemModel {
    userId: string,
    firstName: string,
    lastName?: string,
    joiningDate: Date,
    role: GroupRoles,
}
