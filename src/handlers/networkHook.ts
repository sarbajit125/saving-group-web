import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import {
  LoginRequestType,
  RegisterRequestType,
  createGroupRequestType,
  sendInviteRequest,
} from './schemaHandler';
import {
  fireCreateGroup,
  fireFetchFavorites,
  fireGroupDetails,
  fireGroupLobby,
  fireGroupUserList,
  fireJoinGroup,
  fireSearchGroup,
  fireSendInvite,
  fireUserDetails,
  loginUser,
  registerUser,
} from './axiosHandler';
import { APIConstants } from '../constants/coreLibrary';
import { SendInviteUserDao } from '../models/uiModels';

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

export const useGroupLobbyQuery = () =>
  useQuery({
    queryKey: ['user/group'],
    queryFn: () => fireGroupLobby(),
  });

export const useCreateGroupMutation = () =>
  useMutation({
    mutationKey: ['user/create-group'],
    mutationFn: (request: createGroupRequestType) => fireCreateGroup(request),
    onSuccess(data) {
      toast.success(data.userMsg, { position: 'top-right', autoClose: 1000, closeOnClick: true });
    },
  });

export const useJoinGroupMutation = () =>
  useMutation({
    mutationKey: ['user/join-group'],
    mutationFn: (groupCode: string) => fireJoinGroup(groupCode),
    onSuccess(data) {
      toast.success(data.userMsg, { position: 'top-right', autoClose: 1000, closeOnClick: true });
    },
  });

export const useSearchGroupQuery = (groupId: string) =>
  useQuery({
    queryKey: [`group/search/${groupId}`],
    queryFn: () => fireSearchGroup(groupId),
    enabled: false,
  });

export const useGroupHomeQuery = (groupId: string) =>
  useQuery({
    queryKey: [`group/home/${groupId}`],
    queryFn: () => fireGroupDetails(groupId),
  });

export const useGroupMemberListQuery = (groupId: string) =>
  useQuery({
    queryKey: [`group/userslist/${groupId}`],
    queryFn: () => fireGroupUserList(groupId),
  });

export const useSendInviteMutation = () =>
  useMutation({
    mutationKey: ['group/send-invite'],
    mutationFn: (request: sendInviteRequest) => fireSendInvite(request),
    onSuccess(data, variables) {
      queryClient.invalidateQueries({ queryKey: [`group/userslist/${variables.groupCode}`] });
      toast.success(data.userMsg, { position: 'top-right', autoClose: 1000, closeOnClick: true });
    },
  });
export const useFetchFavoritesQuery = () =>
  useQuery({
    queryKey: ['user/favorites'],
    queryFn: () => fireFetchFavorites(),
    select(data) {
      const sendInviteUIModel: SendInviteUserDao[] = data.favList.map((user) => ({
        email: user.email,
        isSelected: false,
        type: 'NONE',
        userId: user.userId,
        userImg: null,
        userName: user.username,
      }));
      return sendInviteUIModel;
    },
  });
