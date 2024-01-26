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
  Modal,
  TextInput,
  LoadingOverlay,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoListOutline, IoGridOutline, IoAdd } from 'react-icons/io5';
import { PiUsersLight } from 'react-icons/pi';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import { navLinksArr } from '../constants/NavLinksConstant';
import { InviteItemUIDao } from '../models/uiModels';
import { ColorDao } from '../constants/colorConstant';
import { useGroupLobbyQuery, useJoinGroupMutation } from '../handlers/networkHook';

function GroupList() {
  const [enteredGroupCode, setGroupCode] = useState<string>('');
  const navigate = useNavigate();
  const lobbyVM = useGroupLobbyQuery();
  const joinVM = useJoinGroupMutation();
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
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Grid>
      <LoadingOverlay
        visible={lobbyVM.isLoading || joinVM.isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <GridCol span={2}>
        <SideNavBar title="Olith Banking" navlinks={navLinksArr} />
      </GridCol>
      <GridCol span={6}>
        <Group p="md" mt="xl" mr="md" ml="md" justify="space-between">
          <Text>{lobbyVM.isSuccess ? `Groups(${lobbyVM.data.length})` : 'Group'}</Text>
          <Group p="md">
            <IoGridOutline fontSize="1.5em" />
            <IoListOutline fontSize="1.5em" />
          </Group>
        </Group>
        <SimpleGrid p="md" cols={4}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            h={200}
            withBorder
            onClick={() => navigate({ to: '/user/group/create-group' })}
          >
            <Center h={200}>
              <Stack>
                <Avatar src={null} size="lg" style={{ alignSelf: 'center' }}>
                  <IoAdd fontSize="4em" style={{ color: ColorDao.primaryColor }} />
                </Avatar>
                <Text> Create Group </Text>
              </Stack>
            </Center>
          </Card>
          {lobbyVM.isSuccess
            ? lobbyVM.data.map((item) => (
                <Card shadow="sm" padding="lg" radius="md" h={200} withBorder key={item.groupCode}>
                  <Center h={200}>
                    <Stack>
                      <Avatar src={item.groupImage} size="lg" style={{ alignSelf: 'center' }}>
                        <PiUsersLight fontSize="4em" />
                      </Avatar>
                      <Box>
                        <Text fw="bold" style={{ textAlign: 'center' }}>
                          {item.groupName}
                        </Text>
                        <Text style={{ textAlign: 'center' }}> Members: {item.memberCount}</Text>
                      </Box>
                    </Stack>
                  </Center>
                </Card>
              ))
            : null}
        </SimpleGrid>
      </GridCol>
      <GridCol span={4}>
        <Group p="md" mt="xl" mr="sm" ml="sm" justify="space-between">
          <Text>Pending Invite</Text>
          <Button onClick={open} color={ColorDao.primaryColor}>
            Join Group
          </Button>
          <Modal opened={opened} onClose={close} title="Join Group">
            <TextInput
              placeholder="Enter group code"
              value={enteredGroupCode}
              onChange={(event) => setGroupCode(event.currentTarget.value)}
            />
            <Stack mt="md">
              <Center h={100}>
                <Stack>
                  <Avatar src={null} size="lg" style={{ alignSelf: 'center' }}>
                    <PiUsersLight fontSize="4em" />
                  </Avatar>
                  <Box>
                    <Text fw="bold" style={{ textAlign: 'center' }}>
                      Alok
                    </Text>
                  </Box>
                </Stack>
              </Center>
              <Button color={ColorDao.primaryColor}>Send Request</Button>
            </Stack>
          </Modal>
        </Group>
        <Stack mr="sm" ml="sm">
          {dummyInviteList.map((item, index) => (
            <Group mt="md" justify="space-between" key={index}>
              <Group>
                <Avatar src={item.groupImage} alt="invite-request" size="lg">
                  <PiUsersLight fontSize="2em" />
                </Avatar>
                <Box>
                  <Text size="sm" fw="bold">
                    {item.groupName}
                  </Text>
                  <Text size="xs">Invited By: {item.invitedBy}</Text>
                  <Text size="xs">5 Friends 41,000 members</Text>
                </Box>
              </Group>
              <Group>
                <Button variant="outline" color={ColorDao.primaryColor}>
                  Join
                </Button>
                <Button variant="outline" color={ColorDao.goldColor}>
                  Decline
                </Button>
              </Group>
            </Group>
          ))}
        </Stack>
      </GridCol>
    </Grid>
  );
}

export default GroupList;
