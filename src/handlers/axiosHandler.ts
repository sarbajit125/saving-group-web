import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { LoginRequestType } from './schemaHandler';
import RootSuccessResponse, { loginSuccessResp } from '../models/responseModels';
import { apiErrorHandler } from './errorHandler';
import { useAuthStore } from '../store/authStore';
import { RegisterRequestModel } from '../models/requestModels';

export const axiosInstance = axios.create({
    baseURL: 'http://172.17.128.1:3000',
});
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { method, url, headers } = config;
    const bearerToken = useAuthStore((state) => state.bearerToken);
    if (headers && bearerToken) {
        headers.Authorization = `Bearer ${bearerToken}`;
    }
    console.info(`[request] Request ${method} URL: ${url}`);
    return config;
};
const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
};
const wrapInterceptor = () => axiosInstance.interceptors.request.use(onRequest, onRequestError);

export const loginUser = async (request:LoginRequestType) => {
    try {
        const response = await axiosInstance.post<loginSuccessResp>('/user/login', request);
        return response.data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};
export const registerUser = async (request: RegisterRequestModel) => {
    try {
        const response = await axiosInstance.post<RootSuccessResponse>('/create-user', request);
        return response.data;
    } catch (error) {
        throw apiErrorHandler(error);
    }
};
