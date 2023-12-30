import { Avatar, Button, Group } from '@mantine/core';
import { IoChevronDown } from 'react-icons/io5';
import { PiUsersLight } from 'react-icons/pi';
import { ColorDao } from '../../constants/colorConstant';

function TopNavBar() {
  return (
    <Group h={60} mt="md" style={{ backgroundColor: 'red', borderRadius: 6 }} justify="space-between">
      <Group>
        <Button variant="transparent" c={ColorDao.onTextColor}>Summary</Button>
        <Button variant="transparent" c={ColorDao.onTextColor}>User management</Button>
      </Group>
      <Group p="sm" mr="sm">
        <Avatar size="md">
        <PiUsersLight style={{ color: ColorDao.onTextColor }} />
        </Avatar>
        <IoChevronDown style={{ color: ColorDao.onTextColor }} />
      </Group>
    </Group>
  );
}

export default TopNavBar;
