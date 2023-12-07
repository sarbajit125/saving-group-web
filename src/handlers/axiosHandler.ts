import axios from 'axios';
import { LoginRequestType } from './schemaHandler';
import { loginSuccessResp } from '../models/responseModels';
import { apiErrorHandler } from './errorHandler';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.BASE_URL,
});

export const loginUser = async (request:LoginRequestType) => {
    try {
        const response = await axiosInstance.post<loginSuccessResp>('/user/login', request);
        return response.data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};
