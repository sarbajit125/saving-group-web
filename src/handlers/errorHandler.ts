import { AxiosError } from 'axios';
import { RootErrorResponse } from '../models/responseModels';

export const apiErrorHandler = (error: unknown): RootErrorResponse => {
    if (error instanceof RootErrorResponse) {
        return error;
    }
    if (error instanceof AxiosError) {
        return new RootErrorResponse(Number(error.response?.status), error.message);
    }
     if (error instanceof Error) {
        console.log('Error 2');
        return new RootErrorResponse(400, error.message, 'FAILED');
    }
        return new RootErrorResponse(500, 'Something went wrong', 'FAILED');
};
