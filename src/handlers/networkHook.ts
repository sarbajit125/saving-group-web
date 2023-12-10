import { useMutation } from '@tanstack/react-query';
import { LoginRequestType, RegisterRequestType } from './schemaHandler';
import { loginUser, registerUser } from './axiosHandler';
import { useAuthStore } from '../store/authStore';

export const loginMutation = () =>
  useMutation({
    mutationKey: ['user/login'],
    mutationFn: (request: LoginRequestType) => loginUser(request),
    onSuccess(data) {
      const setToken = useAuthStore((state) => state.setBearerToken);
      setToken(data.access_token);
    },
  });
export const registerMutation = () =>
  useMutation({
    mutationKey: ['user/register'],
    mutationFn: (request: RegisterRequestType) =>
      registerUser({
        email: request.email,
        password: request.password,
        username: request.username,
      }),
  });
