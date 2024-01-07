import {
  Avatar,
  Badge,
  Button,
  Container,
  Divider,
  Group,
  Pagination,
  Paper,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
} from '@mantine/core';
import dayjs from 'dayjs';
import { TbListDetails } from 'react-icons/tb';
import { FcApprove, FcDisapprove } from 'react-icons/fc';
import { useState } from 'react';
import { GiCardExchange } from 'react-icons/gi';
import { FaHandshakeAltSlash } from 'react-icons/fa';
import { modals } from '@mantine/modals';
import TopNavBar from '../components/TopNavBar/TopNavBar';
import {
  GroupApprovalItemUIModel,
  ApproverItem,
  ApprovalType,
  RequestType,
  GroupRoles,
  UserManageItemModel,
} from '../models/uiModels';
import { DateFormatConstants, UIString, getNameInitials } from '../constants/coreLibrary';
import { ColorDao } from '../constants/colorConstant';
import UserDetails from '../components/UserDetails/UserDetails';
import RequestDetails from '../components/UserDetails/RequestDetails';

function UserManagement() {
  const [isUserTab, setIsUserTab] = useState<boolean>(true);
  const generateRandomId = (): string => Math.random().toString(36).substring(2, 15);
  const generateRandomGroupRole = (): GroupRoles => {
    const roles = Object.keys(GroupRoles).map((key) => GroupRoles[key as keyof typeof GroupRoles]);
    const randomIndex = Math.floor(Math.random() * roles.length);
    return roles[randomIndex];
  };
  const generateRandomApprovalType = (): ApprovalType => {
    const roles = Object.keys(ApprovalType).map(
      (key) => ApprovalType[key as keyof typeof ApprovalType]
    );
    const randomIndex = Math.floor(Math.random() * roles.length);
    return roles[randomIndex];
  };
  const generateRandomDate = (): Date => {
    const startDate = new Date();
    const randomOffset = Math.floor(Math.random() * 10); // Random offset in days
    startDate.setDate(startDate.getDate() - randomOffset);
    return startDate;
  };
  const generateRandomRequestType = (): RequestType => {
    const requestTypes = Object.values(RequestType);
    const randomIndex = Math.floor(Math.random() * requestTypes.length);
    return requestTypes[randomIndex];
  };
  const generateRandomApprover = (): ApproverItem => ({
    userId: generateRandomId(),
    name: `User_${Math.floor(Math.random() * 100)}`,
    role: generateRandomGroupRole(),
    decision: generateRandomApprovalType(),
  });

  const approvalCols: string[] = [
    'Request Id',
    'Request Type',
    'Request Date',
    'Request Status',
    'Decision',
  ];
  const userCols: string[] = ['Name', 'User Id', 'Joining Date', 'Role', 'Actions'];

  const generateRandomApprovalItem = (): GroupApprovalItemUIModel => {
    const requestId = generateRandomId();
    return {
      requestId,
      requestType: generateRandomRequestType(),
      requestTimeStamp: generateRandomDate(),
      initiatorDetails: {
        userId: generateRandomId(),
        name: `User_${Math.floor(Math.random() * 100)}`,
        role: generateRandomGroupRole(),
      },
      approverArr: Array.from({ length: 3 }, generateRandomApprover),
      initiatedOnDetails: {
        userId: generateRandomId(),
        name: `User_${Math.floor(Math.random() * 100)}`,
        role: generateRandomGroupRole(),
      },
    };
  };
  const createRandomUser = (): UserManageItemModel => ({
    userId: `user_${Math.floor(Math.random() * 1000)}`, // Generate a random user ID
    firstName: `User ${Math.floor(Math.random() * 1000)}`,
    lastName: `_${Math.floor(Math.random() * 1000)}`,
    joiningDate: generateRandomDate(),
    role: generateRandomGroupRole(),
  });

  const arrayOfGroupApprovalItems: GroupApprovalItemUIModel[] = Array.from(
    { length: 10 },
    generateRandomApprovalItem
  );
  const userManageItemModels: UserManageItemModel[] = Array.from({ length: 10 }, () =>
    createRandomUser()
  );

  const setRowMessage = (item: GroupApprovalItemUIModel): string => {
    switch (item.requestType) {
      case RequestType.join:
        return `${item.initiatorDetails.name + UIString.space}wants to join the Group`;
      case RequestType.leave:
        return `${item.initiatorDetails.name + UIString.space}wants to leave the Group`;
      case RequestType.remove:
        return `${item.initiatorDetails.name + UIString.space} wants to remove ${
          item.initiatedOnDetails?.name ?? UIString.space
        } from the Group`;
      default:
        return UIString.empty;
    }
  };
  const setRowBadge = (item: GroupApprovalItemUIModel): JSX.Element => {
    const isUserApprover = item.approverArr.filter((approver) => approver.userId === '1');
    if (isUserApprover.length > 0) {
      if (
        item.approverArr.filter(
          (approver) => approver.userId === '1' && approver.decision === ApprovalType.pending
        ).length > 0
      ) {
        return <Badge color={ColorDao.goldBGColor}> Pending with You</Badge>;
      }
      return <Badge color={ColorDao.serviceColor2}> Pending with Others</Badge>;
    }
    return <Badge color={ColorDao.serviceText2}> Pending</Badge>;
  };
  const setRoleBadge = (item: UserManageItemModel): JSX.Element => {
    switch (item.role) {
      case GroupRoles.Gold:
        return <Badge color={ColorDao.goldColor}> Gold</Badge>;
      case GroupRoles.Silver:
        return <Badge color={ColorDao.silverColor}> Silver</Badge>;
      case GroupRoles.Regular:
        return <Badge color={ColorDao.serviceText2}> Regular</Badge>;
      default:
        return <Badge color={ColorDao.serviceText2}> Regular</Badge>;
    }
  };
  const openUserDetail = (item: UserManageItemModel) =>
    modals.open({
      title: 'User details',
      children: <UserDetails item={item} />,
      size: 'auto',
      radius: 'md',
    });

  const openRequestDetail = (item: GroupApprovalItemUIModel) =>
    modals.openConfirmModal({
      title: `Approval request for Id: ${item.requestId}`,
      children: <RequestDetails item={item} />,
      size: 'auto',
      radius: 'md',
      labels: { confirm: 'Approve', cancel: 'Reject' },
      confirmProps: {
        color: ColorDao.serviceText1,
      },
      cancelProps: {
        variant: 'outline',
        color: ColorDao.negativeColor,
      },
      onCancel() {
        console.log('Cancel');
      },
      onConfirm() {
        console.log('Confirm');
      },
    });
  const setUserButtons = (item: UserManageItemModel): JSX.Element => {
    if (item.userId === '1') {
      return (
        <Button
          leftSection={<TbListDetails />}
          variant="outline"
          color={ColorDao.primaryColor}
          size="compact-md"
        >
          View details
        </Button>
      );
    }
    return (
      <Group>
        <Button
          leftSection={<TbListDetails />}
          variant="outline"
          color={ColorDao.primaryColor}
          size="compact-md"
          onClick={() => openUserDetail(item)}
        >
          View details
        </Button>
        <Button
          leftSection={<GiCardExchange />}
          variant="outline"
          color={ColorDao.serviceText3}
          size="compact-md"
        >
          Change role
        </Button>
        <Button
          leftSection={<FaHandshakeAltSlash />}
          variant="outline"
          color={ColorDao.negativeColor}
          size="compact-md"
        >
          Remove user
        </Button>
      </Group>
    );
  };
  const setApprovalButtons = (item: GroupApprovalItemUIModel): JSX.Element => {
    const isUserApprover = item.approverArr.filter((approver) => approver.userId === '1');
    if (isUserApprover.length > 0) {
      if (
        item.approverArr.filter(
          (approver) => approver.userId === '1' && approver.decision === ApprovalType.pending
        ).length > 0
      ) {
        return (
          <Group>
            <Button leftSection={<FcApprove />} color={ColorDao.serviceText1}>
              Approve
            </Button>
            <Button leftSection={<FcDisapprove />} color={ColorDao.negativeColor}>
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
  const approvalTableRow = arrayOfGroupApprovalItems.map((item) => (
    <TableTr key={item.requestId}>
      <TableTd>{item.requestId}</TableTd>
      <TableTd>{setRowMessage(item)}</TableTd>
      <TableTd>{dayjs(item.requestTimeStamp).format(DateFormatConstants.dashboard)}</TableTd>
      <TableTd> {setRowBadge(item)} </TableTd>
      <TableTd> {setApprovalButtons(item)} </TableTd>
    </TableTr>
  ));
  const userTableRow = userManageItemModels.map((item) => (
    <TableTr key={item.userId}>
      <TableTd>
        <Group>
          <Avatar src={null}>{getNameInitials(item.firstName, item.lastName)}</Avatar>
          <Text>{item.firstName + UIString.space + item.lastName}</Text>
        </Group>
      </TableTd>
      <TableTd>{item.userId}</TableTd>
      <TableTd>{dayjs(item.joiningDate).format(DateFormatConstants.dashboard)}</TableTd>
      <TableTd>{setRoleBadge(item)}</TableTd>
      <TableTd> {setUserButtons(item)} </TableTd>
    </TableTr>
  ));
  return (
    <Container fluid>
      <Stack>
        <TopNavBar />
        <Group>
          <Button
            variant={isUserTab ? 'filled' : 'subtle'}
            color={ColorDao.primaryColor}
            onClick={() => setIsUserTab(true)}
          >
            User Management
          </Button>{' '}
          <Divider size="md" orientation="vertical" />
          <Button
            variant={isUserTab ? 'subtle' : 'filled'}
            color={ColorDao.primaryColor}
            onClick={() => setIsUserTab(false)}
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
            <TableTbody>{isUserTab ? userTableRow : approvalTableRow}</TableTbody>
          </Table>
          <Group mt="md" justify="flex-end">
            <Pagination total={10} radius="md" color={ColorDao.primaryColor} />
          </Group>
        </Paper>
      </Stack>
    </Container>
  );
}

export default UserManagement;
