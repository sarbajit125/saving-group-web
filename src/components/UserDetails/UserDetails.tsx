import { Stack, Group, Avatar, Box, Button, Divider, SimpleGrid, Card, Text } from '@mantine/core';
import { CiUser } from 'react-icons/ci';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { RiShieldUserLine, RiMailLine } from 'react-icons/ri';
import { UserManageItemModel } from '../../models/uiModels';
import { formattedCurrency, getNameInitials, UIString } from '../../constants/coreLibrary';
import { ColorDao } from '../../constants/colorConstant';

function UserDetails({ item }: UserDetailsProps) {
  return (
    <Stack p="md">
      <Group>
        <Avatar size="lg" src={null}>
          {getNameInitials(item.firstName, item.lastName)}
        </Avatar>
        <Box>
          <Text fw="bolder" size="md">{item.firstName + UIString.space + item.lastName}</Text>
          <Text fw="lighter" size="xs">{item.role}</Text>
          <Button mt="sm" size="compact-sm" color={ColorDao.primaryColor}>Send Email</Button>
        </Box>
      </Group>
      <Divider size="md" />
      <Text size="sm" fw="bold">Contact Information</Text>
      <SimpleGrid cols={2}>
        <Card shadow="sm" padding="sm" radius="md" withBorder>
          <Group wrap="nowrap">
            <CiUser fontSize="2em" />
            <Box>
              <Text size="md" fw="bold">First Name</Text>
              <Text size="sm">{item.firstName}</Text>
            </Box>
          </Group>
        </Card>
        <Card shadow="sm" padding="sm" radius="md" withBorder>
          <Group wrap="nowrap">
            <CiUser fontSize="2em" />
            <Box>
              <Text size="md" fw="bold">Last Name</Text>
              <Text size="sm">{item.lastName}</Text>
            </Box>
          </Group>
        </Card>
        <Card shadow="sm" padding="sm" radius="md" withBorder>
          <Group wrap="nowrap">
          <RiShieldUserLine fontSize="2em" />
            <Box>
              <Text size="md" fw="bold">User Id</Text>
              <Text size="sm">{item.userId}</Text>
            </Box>
          </Group>
        </Card>
        <Card shadow="sm" padding="sm" radius="md" withBorder>
          <Group wrap="nowrap">
          <RiMailLine fontSize="2em" />
            <Box>
              <Text size="md" fw="bold">Email</Text>
              <Text size="sm">abc@gmail.com</Text>
            </Box>
          </Group>
        </Card>
        <Card shadow="sm" padding="sm" radius="md" withBorder>
          <Group wrap="nowrap">
          <GiReceiveMoney fontSize="2em" />
            <Box>
              <Text size="md" fw="bold">Amount Contributed</Text>
              <Text size="sm">{formattedCurrency('INR', 2300)}</Text>
            </Box>
          </Group>
        </Card>
        <Card shadow="sm" padding="sm" radius="md" withBorder>
          <Group wrap="nowrap">
          <GiPayMoney fontSize="2em" />
            <Box>
              <Text size="md" fw="bold">Amount Withdrawn</Text>
              <Text size="sm">{formattedCurrency('INR', 2300)}</Text>
            </Box>
          </Group>
        </Card>
      </SimpleGrid>
      <Divider size="md" />
      <Button w={100} variant="outline"> Close</Button>
    </Stack>
  );
}

export default UserDetails;

export interface UserDetailsProps {
  item: UserManageItemModel;
}
