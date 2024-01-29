import { Stack, Group, Avatar, Box, Button, Divider, SimpleGrid, Card, Text } from '@mantine/core';
import { CiUser } from 'react-icons/ci';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { RiShieldUserLine, RiMailLine } from 'react-icons/ri';
import { formattedCurrency, getNameInitials } from '../../constants/coreLibrary';
import { ColorDao } from '../../constants/colorConstant';
import { GroupUserShortDao } from '../../models/responseModels';

function UserDetails({ item }: UserDetailsProps) {
  return (
    <Stack p="md">
      <Group>
        <Avatar size="lg" src={null}>
          {getNameInitials(item.userDetails.username)}
        </Avatar>
        <Box>
          <Text fw="bolder" size="md">{item.userDetails.username}</Text>
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
              <Text size="sm">{item.userDetails.username}</Text>
            </Box>
          </Group>
        </Card>
        <Card shadow="sm" padding="sm" radius="md" withBorder>
          <Group wrap="nowrap">
            <CiUser fontSize="2em" />
            <Box>
              <Text size="md" fw="bold">Last Name</Text>
              <Text size="sm">{item.userDetails.username}</Text>
            </Box>
          </Group>
        </Card>
        <Card shadow="sm" padding="sm" radius="md" withBorder>
          <Group wrap="nowrap">
          <RiShieldUserLine fontSize="2em" />
            <Box>
              <Text size="md" fw="bold">User Id</Text>
              <Text size="sm">{item.userDetails.userId}</Text>
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
              <Text size="sm">{formattedCurrency('INR', item.contributedAmount)}</Text>
            </Box>
          </Group>
        </Card>
        <Card shadow="sm" padding="sm" radius="md" withBorder>
          <Group wrap="nowrap">
          <GiPayMoney fontSize="2em" />
            <Box>
              <Text size="md" fw="bold">Amount Withdrawn</Text>
              <Text size="sm">{formattedCurrency('INR', item.withdrawnAmount)}</Text>
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
  item: GroupUserShortDao;
}
