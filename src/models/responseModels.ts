export class RootErrorResponse extends Error {
    status: string;
    statusCode: number;
    userMsg: string;
    timestamp: Date;
    constructor(statusCode: number, userMsg: string, status?: string, timestamp?: Date,
         message?: string) {
        super(message);
        this.status = status || 'FAILED';
        this.statusCode = statusCode;
        this.userMsg = userMsg;
        this.timestamp = timestamp || new Date();
    }
}

export interface RootSuccessResponse {
    status: string
    statusCode: number
    userMsg: string
    timestamp: Date
}

export default RootSuccessResponse;

export interface loginSuccessResp extends RootSuccessResponse {
    access_token: string,
}

export interface BannerDao {
    url: string,
    action: string,
}

export interface GroupItemResponse {
    groupCode: string,
    groupName: string,
    role: string,
}
