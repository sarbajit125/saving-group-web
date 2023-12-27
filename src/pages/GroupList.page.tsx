import {
  Grid,
  GridCol,
  Group,
  SimpleGrid,
  Text,
  Card,
  Center,
  Box,
  Stack,
  Avatar,
  Button,
} from '@mantine/core';
import { IoListOutline, IoGridOutline, IoAdd } from 'react-icons/io5';
import { PiUsersLight } from 'react-icons/pi';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import { navLinksArr } from '../constants/NavLinksConstant';
import { GroupItemUIDao, GroupRoles, InviteItemUIDao } from '../models/uiModels';
import { ColorDao } from '../constants/colorConstant';

function GroupList() {
  const dummyGroupList: GroupItemUIDao[] = [
    {
      groupCode: 'ABC1234',
      groupImage:
        'https://uploads-ssl.webflow.com/5fe0022130b6119c3b25d03f/6000a4262c3c62f6aadb85d3_shutterstock_1044844045.jpg',
      groupName: 'Cuisine',
      role: GroupRoles.Gold,
      memberCount: 3,
    },
    {
      groupCode: 'ABC1235',
      groupImage: null,
      groupName: 'Art',
      role: GroupRoles.Gold,
      memberCount: 1,
    },
    {
      groupCode: 'ABC1239',
      groupImage: null,
      groupName: 'Music',
      role: GroupRoles.Silver,
      memberCount: 1,
    },
    {
      groupCode: 'ABC1236',
      groupImage:
        'https://images.unsplash.com/photo-1525824236856-8c0a31dfe3be?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdhdGVyZmFsbHxlbnwwfHwwfHx8MA%3D%3D',
      groupName: 'Vizaag',
      role: GroupRoles.Regular,
      memberCount: 4,
    },
    {
      groupCode: 'ABC1237',
      groupImage: null,
      groupName: 'Dhamra',
      role: GroupRoles.Regular,
      memberCount: 1,
    },
  ];
  const dummyInviteList: InviteItemUIDao[] = [
    {
      groupCode: 'ABC1236',
      groupImage:
        'https://images.unsplash.com/photo-1525824236856-8c0a31dfe3be?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdhdGVyZmFsbHxlbnwwfHwwfHx8MA%3D%3D',
      groupName: 'Vizaag',
      invitedBy: 'Harshal Sehgal',
    },
    {
      groupCode: 'CDF12345',
      groupImage: null,
      groupName: 'Archies',
      invitedBy: 'Harshal Sehgal',
    },
    {
      groupCode: 'CDF129805',
      groupImage: null,
      groupName: 'Vizaag',
      invitedBy: 'Harshal Sehgal',
    },
  ];
  return (
    <Grid>
      <GridCol span={2}>
        <SideNavBar title="Olith Banking" navlinks={navLinksArr} />
      </GridCol>
      <GridCol span={6}>
        <Group p="md" mt="xl" mr="md" ml="md" justify="space-between">
          <Text> Groups(11)</Text>
          <Group p="md">
            <IoGridOutline fontSize="1.5em" />
            <IoListOutline fontSize="1.5em" />
          </Group>
        </Group>
        <SimpleGrid p="md" cols={4}>
          <Card shadow="sm" padding="lg" radius="md" h={200} withBorder>
            <Center h={200}>
              <Stack>
                <Avatar src={null} size="lg" style={{ alignSelf: 'center' }}>
                  <IoAdd fontSize="4em" style={{ color: ColorDao.primaryColor }} />
                </Avatar>
                <Text> Create Group </Text>
              </Stack>
            </Center>
          </Card>
          {dummyGroupList.map((item) => (
            <Card shadow="sm" padding="lg" radius="md" h={200} withBorder key={item.groupCode}>
              <Center h={200}>
                <Stack>
                    <Avatar src={item.groupImage} size="lg" style={{ alignSelf: 'center' }}>
                      <PiUsersLight fontSize="4em" />
                    </Avatar>
                  <Box>
                    <Text fw="bold" style={{ textAlign: 'center' }}> {item.groupName} </Text>
                    <Text style={{ textAlign: 'center' }}> Members: {item.memberCount}</Text>
                  </Box>
                </Stack>
              </Center>
            </Card>
          ))}
        </SimpleGrid>
      </GridCol>
      <GridCol span={4}>
        <Group p="md" mt="xl" mr="sm" ml="sm" justify="space-between">
          <Text>Pending Invite</Text>
          <Button color={ColorDao.primaryColor}>Create Group</Button>
        </Group>
        <Stack mr="sm" ml="sm">
          {dummyInviteList.map((item) => (
            <Group mt="md" justify="space-between">
              <Group>
                <Avatar src={item.groupImage} alt="invite-request" size="lg">
                  <PiUsersLight fontSize="2em" />
                </Avatar>
                <Box>
                <Text size="sm" fw="bold">{item.groupName}</Text>
                  <Text size="xs">Invited By: {item.invitedBy}</Text>
                  <Text size="xs">5 Friends 41,000 members</Text>
                </Box>
              </Group>
              <Group>
                <Button variant="outline" color={ColorDao.primaryColor}>Join</Button>
                <Button variant="outline" color={ColorDao.goldColor}>Decline</Button>
              </Group>
            </Group>
          ))}
        </Stack>
      </GridCol>
    </Grid>
  );
}

export default GroupList;
