import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

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
      toast.success(data.userMsg, { position: 'top-right', autoClose: 1000, closeOnClick: true });
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
    onSuccess(data) {
      toast.success(data.userMsg, { position: 'top-right', autoClose: 1000, closeOnClick: true });
     // navigate({ to: '/login' });
    },
  });
