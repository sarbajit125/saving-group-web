import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { LoginRequestType, RegisterRequestType } from './schemaHandler';
import { fireUserDetails, loginUser, registerUser } from './axiosHandler';

export const cookies = new Cookies();

export const loginMutation = () =>
  useMutation({
    mutationKey: ['user/login'],
    mutationFn: (request: LoginRequestType) => loginUser(request),
    onSuccess(data) {
      cookies.set('refresh_token', data.refresh_token, { httpOnly: true, secure: true });
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
    },
  });
export const userDetailQuery = () => useQuery({
  queryKey: ['user/home'],
  queryFn: () => fireUserDetails(),
});
