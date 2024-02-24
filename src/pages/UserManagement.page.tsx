import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  LoadingOverlay,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  Modal,
  Pagination,
  Paper,
  Popover,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
  TextInput,
} from '@mantine/core';
import dayjs from 'dayjs';
import { TbListDetails } from 'react-icons/tb';
import { FcApprove, FcDisapprove } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import { GiCardExchange } from 'react-icons/gi';
import { FaHandshakeAltSlash } from 'react-icons/fa';
import { modals } from '@mantine/modals';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import TopNavBar from '../components/TopNavBar/TopNavBar';
import {
  ApprovalType,
  RequestType,
  GroupRoles,
  ManageRoleUIModel,
  RequestConfirmationProps,
  SendInviteUserDao,
  CurrentGroupDetailsDao,
  MemberActionRowItem,
} from '../models/uiModels';
import {
  DateFormatConstants,
  UIString,
  getNameInitials,
  paginationPageSize,
} from '../constants/coreLibrary';
import { ColorDao } from '../constants/colorConstant';
import UserDetails from '../components/UserDetails/UserDetails';
import RequestDetails from '../components/UserDetails/RequestDetails';
import {
  useApprovalListQuery,
  useApproveMutation,
  useChangeRoleMutation,
  useFetchFavoritesQuery,
  useGroupMemberListQuery,
  useLeaveMutation,
  useSendInviteMutation,
  userDetailQuery,
} from '../handlers/networkHook';
import { ApprovalListItem, GroupUserShortDao } from '../models/responseModels';
import { groupManagement } from '../Router';
import { checkMemberInFavList } from '../constants/utilityConstant';
import { useUserStore } from '../store/userStore';

function UserManagement() {
  const [isUserTab, setIsUserTab] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const { groupId } = groupManagement.useParams();
  const [currentUserDetails, setCurrentUser] = useState<CurrentGroupDetailsDao>({
    groupCode: groupId,
    groupUserId: UIString.empty,
    role: GroupRoles.Regular,
  });
  const homeStore = useUserStore();
  // Get QueryClient from the context
  const queryClient = useQueryClient();
  const usersListVM = useGroupMemberListQuery(groupId, page);
  const approvalListVM = useApprovalListQuery(groupId, false, page);
  const approveDecisionVM = useApproveMutation();
  const homeVM = userDetailQuery();
  const fetchFavVM = useFetchFavoritesQuery();
  const sendInviteVM = useSendInviteMutation();
  const changeRoleVM = useChangeRoleMutation();
  const removeVM = useLeaveMutation();
  const [opened, { open, close }] = useDisclosure(false);
  const [favList, setFavList] = useState<SendInviteUserDao[]>([]);
  const generateRandomDate = (): Date => {
    const startDate = new Date();
    const randomOffset = Math.floor(Math.random() * 10); // Random offset in days
    startDate.setDate(startDate.getDate() - randomOffset);
    return startDate;
  };
  // Set favorite list for send invite flow
  useEffect(() => {
    if (usersListVM.isSuccess && fetchFavVM.isSuccess) {
      setFavList(checkMemberInFavList(fetchFavVM.data, usersListVM.data.usersList));
    }
  }, [usersListVM.isSuccess, fetchFavVM.isSuccess]);
  // Set CurrentUser GroupId
  useEffect(() => {
    if (usersListVM.isSuccess) {
      const findCurrentUser = usersListVM.data.usersList.find(
        (user) => user.userDetails.userId === homeStore.userDetails.userId
      );
      if (findCurrentUser) {
        setCurrentUser({
          groupUserId: findCurrentUser.groupUserId,
          role: findCurrentUser.role,
          groupCode: groupId,
        });
      }
    }
  }, [usersListVM.isSuccess]);
  // call user list api after send invite success
  useEffect(() => {
    if (
      sendInviteVM.isSuccess ||
      changeRoleVM.isSuccess ||
      approveDecisionVM.isSuccess ||
      removeVM.isSuccess
    ) {
      console.log('Sital');
      queryClient.invalidateQueries({
        queryKey: [`group/userslist/${groupId}/${page}`],
      });
      queryClient.invalidateQueries({ queryKey: [`group/approval-list/${groupId}/${page}`] });
    }
  }, [
    sendInviteVM.isSuccess,
    changeRoleVM.isSuccess,
    approveDecisionVM.isSuccess,
    removeVM.isSuccess,
  ]);
  const approvalCols: string[] = [
    'Request Id',
    'Request Type',
    'Request Date',
    'Request Status',
    'Decision',
  ];
  const userCols: string[] = ['Name', 'User Id', 'Joining Date', 'Role', 'Actions'];

  const setRowMessage = (item: ApprovalListItem): string => {
    switch (item.type) {
      case RequestType.join:
        return `${item.initiatorsName + UIString.space}wants to join the Group`;
      case RequestType.leave:
        return `${item.initiatorsName + UIString.space}wants to leave the Group`;
      case RequestType.remove:
        return `${item.initiatorsName + UIString.space} wants to remove ${
          item.targetName ?? UIString.space
        } from the Group`;
      default:
        return UIString.empty;
    }
  };
  const setRowBadge = (item: ApprovalListItem): JSX.Element => {
    const isUserApprover = item.approvers.find(
      (approver) => approver.groupId === currentUserDetails.groupUserId
    );
    if (isUserApprover) {
      if (isUserApprover.decision === ApprovalType.pending) {
        return <Badge color={ColorDao.goldColor}> Pending with You</Badge>;
      }
      return <Badge color={ColorDao.serviceText2}> Pending with Others</Badge>;
    }
    return <Badge color={ColorDao.serviceText3}> {item.status}</Badge>;
  };
  const setRoleBadge = (item: GroupUserShortDao): JSX.Element => {
    switch (item.role) {
      case GroupRoles.Gold:
        return <Badge color={ColorDao.goldColor}> Gold</Badge>;
      case GroupRoles.Silver:
        return <Badge color={ColorDao.silverColor}> Silver</Badge>;
      default:
        return <Badge color={ColorDao.serviceText2}> Regular</Badge>;
    }
  };
  const openUserDetail = (item: GroupUserShortDao) =>
    modals.open({
      title: 'User details',
      id: 'User-details',
      children: <UserDetails item={item} />,
      size: 'auto',
      radius: 'md',
    });

  const openRequestDetail = (item: ApprovalListItem) =>
    modals.open({
      title: `Approval request Id: ${item.requestId}`,
      children: <RequestDetails item={item} />,
      size: 'auto',
      radius: 'md',
      id: 'Request-details',
    });
  const setDropdownMenus = (item: GroupUserShortDao): JSX.Element => {
    let menuItems: ManageRoleUIModel[] = [];
    switch (item.role) {
      case GroupRoles.Gold:
        menuItems = [];
        break;
      case GroupRoles.Silver:
        menuItems = [
          { userId: item.groupUserId, action: 'UPG-SILVER', name: 'Upgrade to Silver' },
          { userId: item.groupUserId, action: 'DOWN-REGULAR', name: 'Downgrade to Regular' },
        ];
        break;
      case GroupRoles.Regular:
        menuItems = [{ userId: item.groupUserId, action: 'UPG-SILVER', name: 'Upgrade to Silver' }];
        break;
    }
    return (
      <MenuDropdown>
        <MenuLabel>Set user role</MenuLabel>
        {menuItems.map((itm) => (
          <MenuItem
            key={itm.action}
            onClick={() =>
              changeRoleVM.mutate({
                groupCode: groupId,
                initiatorGroupUserId: currentUserDetails.groupUserId,
                targetGroupUserId: item.groupUserId,
                targetRole: itm.action === 'UPG-SILVER' ? GroupRoles.Silver : GroupRoles.Regular,
              })
            }
          >
            {itm.name}
          </MenuItem>
        ))}
      </MenuDropdown>
    );
  };
  const setConfirmModal = (props: RequestConfirmationProps) =>
    modals.openConfirmModal({
      title: 'Please confirm',
      id: 'Request-confirmation',
      children: <Text>This action is irreversible, Please confirm your decision</Text>,
      labels: { confirm: props.decision, cancel: 'Cancel' },
      confirmProps: {
        color: ColorDao.serviceText1,
      },
      cancelProps: {
        variant: 'outline',
        color: ColorDao.negativeColor,
      },
      onCancel() {
        modals.close('Request-confirmation');
      },
      onConfirm() {
        modals.close('Request-confirmation');
        if (props.requestType === RequestType.remove && props.isRemove) {
          removeVM.mutate({
            groupCode: groupId,
            requestType: 'REMOVE',
            initatedOn: props.requestId,
            requestedBy: currentUserDetails.groupUserId,
          });
        } else {
          approveDecisionVM.mutate({
            groupCode: groupId,
            requestType: props.requestType,
            decision: props.decision === 'ACCEPT' ? 'Y' : 'N',
            requestId: props.requestId,
            userId: currentUserDetails.groupUserId,
          });
        }
      },
    });
  const setUserButtons = (item: GroupUserShortDao): JSX.Element => {
    const btnList: MemberActionRowItem[] = [
      {
        title: 'View details',
        itemId: item.groupUserId,
        type: 'user-detail',
        action: () => openUserDetail(item),
      },
    ];
    if (
      (currentUserDetails.role === GroupRoles.Gold &&
        currentUserDetails.groupUserId !== item.groupUserId) ||
      (currentUserDetails.role === GroupRoles.Silver &&
        currentUserDetails.groupUserId !== item.groupUserId &&
        item.role !== GroupRoles.Gold)
    ) {
      btnList.push({
        title: 'Change role',
        itemId: item.groupUserId,
        type: 'change-role',
        action: () => {},
      });
      btnList.push({
        title: 'Remove user',
        itemId: item.groupUserId,
        type: 'remove-member',
        action: () => {
          setConfirmModal({
            decision: 'CONFIRM',
            requestId: item.groupUserId,
            requestType: RequestType.remove,
            isRemove: true,
          });
        },
      });
    }
    return (
      <Group>
        {btnList.map((button) =>
          button.type === 'change-role' ? (
            <Menu shadow="md" width={200}>
              <MenuTarget>
                <Button
                  leftSection={<GiCardExchange />}
                  variant="outline"
                  color={ColorDao.serviceText3}
                  size="compact-md"
                  key={button.itemId}
                >
                  {button.title}
                </Button>
              </MenuTarget>
              {setDropdownMenus(item)}
            </Menu>
          ) : (
            <Button
              variant="outline"
              size="compact-md"
              onClick={() => button.action()}
              key={button.itemId}
              leftSection={
                button.type === 'user-detail' ? <TbListDetails /> : <FaHandshakeAltSlash />
              }
              color={button.type === 'user-detail' ? ColorDao.primaryColor : ColorDao.negativeColor}
            >
              {button.title}
            </Button>
          )
        )}
      </Group>
    );
  };
  const setApprovalButtons = (item: ApprovalListItem): JSX.Element => {
    const isUserApprover = item.approvers.find(
      (approver) => approver.groupId === currentUserDetails.groupUserId
    );
    if (isUserApprover) {
      if (isUserApprover.decision === ApprovalType.pending) {
        return (
          <Group>
            <Button
              leftSection={<FcApprove />}
              color={ColorDao.serviceText1}
              onClick={() =>
                setConfirmModal({
                  decision: 'ACCEPT',
                  requestId: item.requestId,
                  requestType: item.type,
                })
              }
            >
              Approve
            </Button>
            <Button
              leftSection={<FcDisapprove />}
              color={ColorDao.negativeColor}
              onClick={() =>
                setConfirmModal({
                  decision: 'REJECT',
                  requestId: item.requestId,
                  requestType: item.type,
                })
              }
            >
              Reject
            </Button>
            <Button
              leftSection={<TbListDetails />}
              variant="outline"
              color={ColorDao.primaryColor}
              onClick={() => openRequestDetail(item)}
            >
              View Details
            </Button>
          </Group>
        );
      }
      return (
        <Group>
          <Text> Your decision has been recorded</Text>
          <Button
            leftSection={<TbListDetails />}
            variant="outline"
            color={ColorDao.primaryColor}
            onClick={() => openRequestDetail(item)}
          >
            View Details
          </Button>
          ;
        </Group>
      );
    }
    return (
      <Button
        leftSection={<TbListDetails />}
        variant="outline"
        color={ColorDao.primaryColor}
        onClick={() => openRequestDetail(item)}
      >
        View Details
      </Button>
    );
  };
  const setSendInviteRow = (): JSX.Element => (
    <Stack h={140} style={{ overflow: 'scroll' }}>
      {favList.map((user) => (
        <Group key={user.userId} justify="space-between">
          <Group>
            <Avatar src={user.userImg}>{getNameInitials(user.userName)}</Avatar>
            <Box>
              <Text size="sm" fw="bold">
                {user.userName}
              </Text>
              <Text size="xs">{user.email}</Text>
            </Box>
          </Group>
          {user.type === 'NONE' ? (
            <Checkbox
              checked={user.isSelected}
              p="md"
              mr="md"
              onChange={() => {
                const newFavList = favList.map((item) =>
                  item.userId === user.userId ? { ...item, isSelected: !user.isSelected } : item
                );
                setFavList(newFavList);
              }}
            />
          ) : (
            <Badge>{user.type}</Badge>
          )}
        </Group>
      ))}
    </Stack>
  );
  const userTableRow = (): JSX.Element => {
    if (usersListVM.isSuccess) {
      return (
        <TableTbody>
          {usersListVM.data.usersList.map((item) => (
            <TableTr key={item.groupUserId}>
              <TableTd>
                <Group>
                  <Avatar src={null}>{getNameInitials(item.userDetails.username)}</Avatar>
                  <Text>
                    {item.groupUserId === currentUserDetails.groupUserId
                      ? 'You'
                      : item.userDetails.username}
                  </Text>
                </Group>
              </TableTd>
              <TableTd>{item.groupUserId}</TableTd>
              <TableTd>{dayjs(generateRandomDate()).format(DateFormatConstants.dashboard)}</TableTd>
              <TableTd>{setRoleBadge(item)}</TableTd>
              <TableTd> {setUserButtons(item)} </TableTd>
            </TableTr>
          ))}
          ;
        </TableTbody>
      );
    }
    return <div />;
  };
  const setApprovalTableRow = (): JSX.Element => {
    if (approvalListVM.isSuccess && usersListVM.isSuccess) {
      return (
        <TableTbody>
          {approvalListVM.data.approvalList.map((item) => (
            <TableTr key={item.requestId}>
              <TableTd>{item.requestId}</TableTd>
              <TableTd>{setRowMessage(item)}</TableTd>
              <TableTd>{dayjs(item.requestDate).format(DateFormatConstants.dashboard)}</TableTd>
              <TableTd> {setRowBadge(item)} </TableTd>
              <TableTd> {setApprovalButtons(item)} </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      );
    }
    return <div />;
  };
  return (
    <Container fluid>
      <LoadingOverlay
        visible={usersListVM.isLoading || approvalListVM.isLoading || removeVM.isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Modal opened={opened} onClose={close} title="Send Invite">
        <Stack>
          <Group justify="space-between">
            <TextInput placeholder="Enter Username" />
            <Button
              color={ColorDao.primaryColor}
              size="compact-md"
              mr="md"
              disabled={favList.filter((user) => user.isSelected).length === 0}
              onClick={() => {
                sendInviteVM.mutate({
                  groupCode: groupId,
                  userIds: favList.filter((user) => user.isSelected).map((item) => item.userId),
                  initiatedBy: homeVM.isSuccess ? homeVM.data.userDetails.userId : UIString.empty,
                });
                close();
              }}
            >
              Send Invite
            </Button>
          </Group>
          <Text size="sm" mt="md">
            {`Favorite list ${favList.filter((user) => user.isSelected).length} / ${
              favList.length
            }`}
          </Text>
          {setSendInviteRow()}
          <Box display="inline">
            <Text size="sm" mt="md" fw="normal" span>
              Share code manually
            </Text>
            <Popover width={200} position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button
                  size="compact-sm"
                  ml="sm"
                  variant="outline"
                  color={ColorDao.primaryColor}
                  onClick={() => navigator.clipboard.writeText(groupId)}
                >
                  {groupId}
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Text size="xs">group code copied to clipboard</Text>
              </Popover.Dropdown>
            </Popover>
          </Box>
        </Stack>
      </Modal>
      <Stack>
        <TopNavBar groupId={groupId} showSendInvite sendInvitCallback={() => open()} />
        <Group>
          <Button
            variant={isUserTab ? 'filled' : 'subtle'}
            color={ColorDao.primaryColor}
            onClick={() => {
              setIsUserTab(true);
              setPage(1);
            }}
          >
            User Management
          </Button>{' '}
          <Divider size="md" orientation="vertical" />
          <Button
            variant={isUserTab ? 'subtle' : 'filled'}
            color={ColorDao.primaryColor}
            onClick={() => {
              setIsUserTab(false);
              setPage(1);
            }}
          >
            Approval Management
          </Button>
        </Group>
        <Paper shadow="xs" withBorder p="xl">
          <Table highlightOnHover>
            <TableThead>
              <TableTr>
                {isUserTab
                  ? userCols.map((item) => <TableTh>{item}</TableTh>)
                  : approvalCols.map((item) => <TableTh>{item}</TableTh>)}
              </TableTr>
            </TableThead>
            {isUserTab ? userTableRow() : setApprovalTableRow()}
          </Table>
          {isUserTab &&
          usersListVM.isSuccess &&
          usersListVM.data.totalUserCount / paginationPageSize > 1 ? (
            <Group mt="md" justify="flex-end">
              <Pagination
                total={usersListVM.data.totalUserCount / paginationPageSize}
                radius="md"
                color={ColorDao.primaryColor}
                value={page}
                onChange={setPage}
              />
            </Group>
          ) : !isUserTab &&
            approvalListVM.isSuccess &&
            approvalListVM.data.totalCount / paginationPageSize > 1 ? (
            <Group mt="md" justify="flex-end">
              <Pagination
                total={approvalListVM.data.totalCount / paginationPageSize}
                radius="md"
                value={page}
                color={ColorDao.primaryColor}
                onChange={setPage}
              />
            </Group>
          ) : null}
        </Paper>
      </Stack>
    </Container>
  );
}

export default UserManagement;
