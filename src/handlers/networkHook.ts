import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import {
  LoginRequestType,
  RegisterRequestType,
  addMoneyGroupRequest,
  createGroupRequestType,
  removeRequestInterface,
  requestInterface,
  sendInviteRequest,
  updateRoleRequestInterface,
} from './schemaHandler';
import {
  downloadDocId,
  fireAddMoneyGroup,
  fireApprovalHistory,
  fireApprovalRequest,
  fireChangeRole,
  fireCreateGroup,
  fireFetchFavorites,
  fireFetchInstrumentList,
  fireGroupDetails,
  fireGroupLobby,
  fireGroupUserList,
  fireJoinGroup,
  fireLeaveRequest,
  fireSearchGroup,
  fireSendInvite,
  fireUserDetails,
  loginUser,
  registerUser,
  uploadGroupImage,
} from './axiosHandler';
import { APIConstants, paginationPageSize } from '../constants/coreLibrary';
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

export const useGroupMemberListQuery = (groupId: string, pageNo: number) =>
  useQuery({
    queryKey: [`group/userslist/${groupId}/${pageNo}`],
    queryFn: () => fireGroupUserList(groupId, pageNo, paginationPageSize),
    placeholderData: keepPreviousData,
  });

export const useSendInviteMutation = () =>
  useMutation({
    mutationKey: ['group/send-invite'],
    mutationFn: (request: sendInviteRequest) => fireSendInvite(request),
    onSuccess(data) {
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
export const useApproveMutation = () =>
  useMutation({
    mutationKey: ['user/approve'],
    mutationFn: (request: requestInterface) => fireApprovalRequest(request),
    onSuccess(data) {
      toast.success(data.userMsg, { position: 'top-right', autoClose: 1000, closeOnClick: true });
    },
  });
export const useLeaveMutation = () =>
  useMutation({
    mutationKey: ['group/leave'],
    mutationFn: (request: removeRequestInterface) => fireLeaveRequest(request),
    onSuccess(data) {
      toast.success(data.userMsg, { position: 'top-right', autoClose: 1000, closeOnClick: true });
    },
  });
export const useApprovalListQuery = (groupId: string, showHistory: boolean, pageNo: number) =>
  useQuery({
    queryKey: [`group/approval-list/${groupId}/${pageNo}`],
    queryFn: () => fireApprovalHistory(groupId, pageNo, paginationPageSize, showHistory),
    placeholderData: keepPreviousData,
  });
export const useChangeRoleMutation = () =>
  useMutation({
    mutationKey: ['/group/ChangeRole'],
    mutationFn: (request: updateRoleRequestInterface) => fireChangeRole(request),
    onSuccess(data) {
      toast.success(data.userMsg, { position: 'top-right', autoClose: 1000, closeOnClick: true });
    },
  });

export const useUploadGroupMutation = (groupId: string) => useMutation({
  mutationKey: ['group/uploadProfile'],
  mutationFn: (filePath: string) => uploadGroupImage(filePath, groupId),
  onSuccess(data) {
    toast.success(data.userMsg, { position: 'top-right', autoClose: 1000, closeOnClick: true });
  },
});

export const useDownloadDocQuery = (docId: string, startDownload: boolean = false) => useQuery({
  queryKey: [`docId/${docId}`],
  enabled: startDownload,
  queryFn: () => downloadDocId(docId),
});

export const listInstrumentQuery = () => useQuery({
  queryKey: ['list-instrument'],
  queryFn: () => fireFetchInstrumentList(),
  staleTime: 180000,
});

export const addMoneyGroupMutation = () => useMutation({
  mutationKey: ['group/add-money'],
  mutationFn: (request: addMoneyGroupRequest) => fireAddMoneyGroup(request),
  onSuccess(data) {
    toast.success(data.userMsg, { position: 'top-right', autoClose: 1000, closeOnClick: true });
  },
});
