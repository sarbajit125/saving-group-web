import { RootErrorResponse } from '../models/responseModels';

export const apiErrorHandler = (error: unknown): RootErrorResponse => {
    if (error instanceof RootErrorResponse) {
        return error;
    } if (error instanceof Error) {
        return new RootErrorResponse(400, error.message, 'FAILED');
    }
        return new RootErrorResponse(500, 'Something went wrong', 'FAILED');
};
