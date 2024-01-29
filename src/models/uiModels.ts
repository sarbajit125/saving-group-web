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
export enum GoalCategoryFilter {
    ALL_GOAL = 'ALL-GOAL',
    ONGOING = 'ONGOING-GOAL',
    COMPLETED = 'COMPLETED-GOAL',
}
export interface GoalCategoryItem {
    name: string,
    id: GoalCategoryFilter
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
export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL',
}
export enum WalletType {
    REGULAR = 'REGULAR',
    SAVING = 'SAVING',
    PREMIUM = 'PREMIUM'
}
export enum CardType {
    VISA = 'VISA',
    MASTERCARD = 'MASTERCARD',
    OTHERS = 'OTHERS',
}
export enum InstrumentType {
    wallet = 'WALLET',
    card = 'CARD',
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

export interface ManageRoleUIModel {
    userId: string,
    action: string,
    name: string,
}

export interface RequestConfirmationProps {
    requestType: RequestType,
    decision: 'ACCEPT' | 'REJECT' | 'CONFIRM',
    requestId: string,
}

export interface PaymentInstrument {
    instrumentId: string,
    instrumentBalance: number,
    instrumentCurrency: number,
    instrumentType: InstrumentType,
}

export interface WalletPaymentInstrument extends PaymentInstrument {
    walletId: string,
    walletType: WalletType,
    isDefault: boolean,
}

export interface CardPaymentInstrument extends PaymentInstrument {
    cardType: CardType
    cardHolderName: string,
    cardExpiry: Date,
}
export interface FeesUIModel {
    isAmount: boolean,
    key: string
    value: string | number,
}
