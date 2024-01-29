export class RootErrorResponse extends Error {
  status: string;
  statusCode: number;
  userMsg: string;
  timestamp: Date;
  constructor(
    statusCode: number,
    userMsg: string,
    status?: string,
    timestamp?: Date,
    message?: string
  ) {
    super(message);
    this.status = status || 'FAILED';
    this.statusCode = statusCode;
    this.userMsg = userMsg;
    this.timestamp = timestamp || new Date();
  }
}
export interface RootSuccessResponse {
  status: string;
  statusCode: number;
  userMsg: string;
  timestamp: Date;
}
export interface loginSuccessResp extends RootSuccessResponse {
  access_token: string;
  refresh_token: string;
}

export interface BannerDao {
  url: string;
  action: string;
}

export interface GroupItemResponse {
  groupCode: string;
  groupName: string;
  role: string;
}
export interface RefreshTokenResponseDao extends RootSuccessResponse {
  access_token: string;
}
export interface HomeResp extends RootSuccessResponse {
  bannerList: BannerDao[];
  userDetails: UserDetails;
}

export interface UserDetails {
  username: string;
  email: string;
  userId: string;
}

export interface GroupLobbyDTO extends RootSuccessResponse {
  groupList: GroupLobbyDetails[],
  inviteList: InviteGroupDetails[]
}
export interface InviteGroupDetails extends GroupLobbyDetails {
  requestId:string | undefined
}

export interface GroupLobbyDetails {
  groupName: string;
  groupCode: string;
  role: string;
  memberCount: number;
  groupImg: string | null
}
export interface GroupSearchDTO extends RootSuccessResponse {
  groupCode: string;
  groupName: string;
  memberCount: number;
  groupImageURL: string | null;
}
export interface GroupUserShortDao {
  groupUserId: string
  status: string
  role: string,
  userDetails: UserDetails
  contributedAmount: number,
  withdrawnAmount: number
}

export interface GroupGoalDTO {
  goalId: string,
  goalDesc: string,
  targetAmount: number
  contributedAmount: number
}

export interface GroupHomeDTO extends RootSuccessResponse {
  groupName: string,
  groupId: string,
  groupDesc: string | null,
  role: string,
  groupCurrency: string,
  createdOn: Date,
  currentBalance: number,
  totalDeposited: number,
  totalWithdrawan: number,
  targetAmount?: number,
  targetDate? : Date,
  groupImageId: string | null,
  goalList: GroupGoalDTO[]
}
export interface GroupMemberListResp extends RootSuccessResponse {
  usersList: GroupUserShortDao[]
}
