import {
  Avatar,
  Button,
  Group,
  Menu,
  MenuTarget,
  MenuDropdown,
  MenuLabel,
  MenuDivider,
  MenuItem,
} from '@mantine/core';
import { IoChevronDown, IoExitOutline } from 'react-icons/io5';
import { PiUsersLight } from 'react-icons/pi';
import { RiGalleryLine } from 'react-icons/ri';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useNavigate } from '@tanstack/react-router';
import { ColorDao } from '../../constants/colorConstant';

function TopNavBar({ groupId, showSendInvite, sendInvitCallback }: TopNavBarProps) {
  const navigate = useNavigate();
  const menuItems: MenuRightItem[] = [
    {
      id: 'PROFILEPIC',
      name: 'Edit group profile picture',
      leftIcon: <RiGalleryLine />,
    },
    {
      id: 'LEAVEGROUP',
      name: 'Leave Group',
      leftIcon: <IoExitOutline />,
    },
    {
      id: 'DELETEGROUP',
      name: 'Delete Group',
      leftIcon: <MdOutlineDeleteForever />,
    },
  ];
  return (
    <Group
      h={60}
      mt="md"
      style={{ backgroundColor: 'red', borderRadius: 6 }}
      justify="space-between"
    >
      <Group>
        <Button
          variant="transparent"
          c={ColorDao.onTextColor}
          onClick={() => navigate({ to: '/user/group/dashboard/$groupId', params: { groupId } })}
        >
          Summary
        </Button>
        <Button
          variant="transparent"
          c={ColorDao.onTextColor}
          onClick={() =>
            navigate({ to: '/user/group/user-management/$groupId', params: { groupId } })
          }
        >
          User management
        </Button>
        {showSendInvite ? (
          <Button
            variant="transparent"
            c={ColorDao.onTextColor}
            onClick={() => sendInvitCallback()}
          >
            Send Invite
          </Button>
        ) : null}
      </Group>
      <Group p="sm" mr="sm" gap="xs">
        <Avatar size="md">
          <PiUsersLight style={{ color: ColorDao.onTextColor }} />
        </Avatar>
        <Menu
          shadow="md"
          position="left-start"
          trigger="click-hover"
          openDelay={100}
          closeDelay={400}
        >
          <MenuTarget>
            <IoChevronDown style={{ color: ColorDao.onTextColor, marginLeft: -5 }} />
          </MenuTarget>
          <MenuDropdown>
            <MenuLabel>Role: Founder</MenuLabel>
            <MenuDivider />
            {menuItems.map((item) => (
              <MenuItem
                leftSection={item.leftIcon}
                id={item.id}
                onClick={() => console.log(item.id)}
              >
                {item.name}
              </MenuItem>
            ))}
          </MenuDropdown>
        </Menu>
      </Group>
    </Group>
  );
}

export default TopNavBar;
export interface TopNavBarProps {
  groupId: string;
  showSendInvite: boolean;
  sendInvitCallback: () => void;
}
interface MenuRightItem {
  id: string;
  name: string;
  leftIcon?: JSX.Element;
}
