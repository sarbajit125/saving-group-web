import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { LoginRequestType, createGroupRequestType } from './schemaHandler';
import { RootSuccessResponse,
  RefreshTokenResponseDao,
  loginSuccessResp,
  RootErrorResponse,
  HomeResp,
  GroupLobbyDTO,
} from '../models/responseModels';
import { useAuthStore } from '../store/authStore';
import { RegisterRequestModel } from '../models/requestModels';
import { apiErrorHandler } from './errorHandler';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const { method, url, headers } = config;
  const { bearerToken } = useAuthStore.getState();
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

export const loginUser = async (request: LoginRequestType) => {
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
export const fireRefreshToken = async (refreshToken: string): Promise<RefreshTokenResponseDao> => {
  try {
    wrapInterceptor();
    const response = await axiosInstance.post<RefreshTokenResponseDao>('/user/refresh', {
      refresh_token: refreshToken,
    });
    return response.data;
  } catch (error) {
    throw new RootErrorResponse(400, 'Refresh token failed');
  }
};
export const fireUserDetails = async () => {
  try {
    wrapInterceptor();
    const response = await axiosInstance.get<HomeResp>('/user/home');
    return response.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};
export const fireGroupLobby = async () => {
  try {
    wrapInterceptor();
    const response = await axiosInstance.get<GroupLobbyDTO>('/group/lobby');
    return response.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};

export const fireCreateGroup = async (request: createGroupRequestType) => {
  try {
    wrapInterceptor();
    const response = await axiosInstance.post<RootSuccessResponse>('/user/create-group', request);
    return response.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};
export const fireJoinGroup = async (groupCode: string) => {
  try {
    wrapInterceptor();
    const response = await axiosInstance.post<RootSuccessResponse>('/group/join', {
      groupcode: groupCode,
    });
    return response.data;
  } catch (error) {
    throw apiErrorHandler(error);
  }
};
