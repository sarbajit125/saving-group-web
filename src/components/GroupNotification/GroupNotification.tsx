import { Box, Button, Divider, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { FaHandshake, FaHandshakeAltSlash } from 'react-icons/fa';
import { IoPersonRemoveOutline } from 'react-icons/io5';
import { MdOutlineVerified, MdOutlineApproval } from 'react-icons/md';

import { GroupNotificationFilter, GroupNotificationUIModel } from '../../models/uiModels';
import { ColorDao } from '../../constants/colorConstant';
import { calculateTimeDifference } from '../../constants/coreLibrary';

function GroupNotification() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const notifications: GroupNotificationUIModel[] = [
    {
      id: '1',
      message: 'You have deposited funds.',
      isRead: false,
      date: new Date(today.setHours(8, 0, 0, 0)), // Adjust time as needed
      type: GroupNotificationFilter.DEPOSIT,
    },
    {
      id: '2',
      message: 'Withdrawal successful.',
      isRead: false,
      date: new Date(yesterday.setHours(10, 30, 0, 0)), // Adjust time as needed
      type: GroupNotificationFilter.WITHDRAWAL,
    },
    {
      id: '3',
      message: 'Joined a new group.',
      isRead: true,
      date: new Date(today.setHours(12, 45, 0, 0)), // Adjust time as needed
      type: GroupNotificationFilter.JOINED,
    },
    {
      id: '4',
      message: 'Left the discussion group.',
      isRead: false,
      date: new Date(yesterday.setHours(14, 15, 0, 0)), // Adjust time as needed
      type: GroupNotificationFilter.LEFT,
    },
    {
      id: '5',
      message: 'You have been removed from the group.',
      isRead: false,
      date: new Date(today.setHours(16, 20, 0, 0)), // Adjust time as needed
      type: GroupNotificationFilter.REMOVED,
    },
    {
      id: '6',
      message: 'Approval needed for pending request.',
      isRead: true,
      date: new Date(yesterday.setHours(18, 0, 0, 0)), // Adjust time as needed
      type: GroupNotificationFilter.REQUEST,
    },
  ];
  const setIconForNots = (type: GroupNotificationFilter): JSX.Element => {
    switch (type) {
      case GroupNotificationFilter.DEPOSIT:
        return <GiReceiveMoney />;
      case GroupNotificationFilter.WITHDRAWAL:
        return <GiPayMoney />;
      case GroupNotificationFilter.JOINED:
        return <FaHandshake />;
      case GroupNotificationFilter.LEFT:
        return <FaHandshakeAltSlash />;
      case GroupNotificationFilter.REMOVED:
        return <IoPersonRemoveOutline />;
      case GroupNotificationFilter.REQUEST:
        return <MdOutlineApproval />;
      default:
        return <GiReceiveMoney />;
    }
  };
  const setButtonTitle = (type: GroupNotificationFilter): string => {
    switch (type) {
      case GroupNotificationFilter.DEPOSIT:
        return 'Transaction History';
      case GroupNotificationFilter.WITHDRAWAL:
        return 'Transaction History';
      case GroupNotificationFilter.JOINED:
        return 'Group History';
      case GroupNotificationFilter.LEFT:
        return 'Group History';
      case GroupNotificationFilter.REMOVED:
        return 'Group History';
      case GroupNotificationFilter.REQUEST:
        return 'Approval Management';
      default:
        return 'Transaction History';
    }
  };
  const setButtonAction = (type: GroupNotificationFilter) => {
    console.log(type);
  };

  return (
    <Stack gap="xs">
      <Group justify="space-between">
        <Text>Notifications</Text>
        <Button variant="transparent" leftSection={<MdOutlineVerified />}>
          Mark all as read
        </Button>
      </Group>
      <Divider variant="solid" />
      {notifications.map((item) => (
        <Box>
          <Group justify="space-between" align="baseline">
            <Group>
              <Box>
                {setIconForNots(item.type)}
                {item.isRead ? (
                  <Box
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 8,
                      backgroundColor: ColorDao.serviceText1,
                    }}
                  />
                ) : null}
              </Box>
              <Box>
                <Text size="sm">{item.message}</Text>
                <Button
                  variant="outline"
                  c={ColorDao.greyColor}
                  color={ColorDao.greyColor}
                  size="compact-xs"
                  onClick={() => setButtonAction(item.type)}
                >
                  {setButtonTitle(item.type)}
                </Button>
              </Box>
            </Group>
            <Text size="sm" fw="lighter" c={ColorDao.greyColor}>
              {calculateTimeDifference(item.date)}
            </Text>
          </Group>
          <Divider mt={"sm"} variant="solid" />
        </Box>
      ))}
    </Stack>
  );
}

export default GroupNotification;
