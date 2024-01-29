import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { LoginRequestType, RegisterRequestType, createGroupRequestType } from './schemaHandler';
import { fireCreateGroup, fireGroupDetails, fireGroupLobby, fireGroupUserList, fireJoinGroup, fireSearchGroup, fireUserDetails, loginUser, registerUser } from './axiosHandler';
import { APIConstants } from '../constants/coreLibrary';

export const cookies = new Cookies();

export const loginMutation = () =>
  useMutation({
    mutationKey: ['user/login'],
    mutationFn: (request: LoginRequestType) => loginUser(request),
    onSuccess(data) {
      cookies.remove(APIConstants.refreshTokenKey);
      cookies.set(APIConstants.refreshTokenKey, data.refresh_token, {
        httpOnly: false,
        secure: true,
        sameSite: 'none',
      });
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
export const userDetailQuery = () =>
  useQuery({
    queryKey: ['user/home'],
    queryFn: () => fireUserDetails(),
  });

export const useGroupLobbyQuery = () => useQuery({
  queryKey: ['user/group'],
  queryFn: () => fireGroupLobby(),
});

export const useCreateGroupMutation = () => useMutation({
  mutationKey: ['user/create-group'],
  mutationFn: (request: createGroupRequestType) => fireCreateGroup(request),
  onSuccess(data) {
    toast.success(data.userMsg, { position: 'top-right', autoClose: 1000, closeOnClick: true });
  },
});

export const useJoinGroupMutation = () => useMutation({
  mutationKey: ['user/join-group'],
  mutationFn: (groupCode: string) => fireJoinGroup(groupCode),
  onSuccess(data) {
    toast.success(data.userMsg, { position: 'top-right', autoClose: 1000, closeOnClick: true });
  },
});

export const useSearchGroupQuery = (groupId: string) => useQuery({
  queryKey: [`group/search/${groupId}`],
  queryFn: () => fireSearchGroup(groupId),
  enabled: false,
});

export const useGroupHomeQuery = (groupId: string) => useQuery({
  queryKey: [`group/home/${groupId}`],
  queryFn: () => fireGroupDetails(groupId),
});

export const useGroupMemberListQuery = (groupId: string) => useQuery({
  queryKey: [`group/userslist/${groupId}`],
  queryFn: () => fireGroupUserList(groupId),
});
