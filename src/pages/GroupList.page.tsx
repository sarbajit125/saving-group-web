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
import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import { navLinksArr } from '../constants/NavLinksConstant';
import { ColorDao } from '../constants/colorConstant';
import {
  useApproveMutation,
  useGroupLobbyQuery,
  useJoinGroupMutation,
  useSearchGroupQuery,
} from '../handlers/networkHook';
import { RequestType } from '../models/uiModels';
import { useUserStore } from '../store/userStore';

function GroupList() {
  const [enteredGroupCode, setGroupCode] = useState<string>('');
  const navigate = useNavigate();
  const lobbyVM = useGroupLobbyQuery();
  const joinVM = useJoinGroupMutation();
  const searchGroupVM = useSearchGroupQuery(enteredGroupCode);
  const approveVM = useApproveMutation();
  const userStore = useUserStore();
  // Get QueryClient from the context
  const queryClient = useQueryClient();
  useEffect(() => {
    if (enteredGroupCode.length !== 0) {
      searchGroupVM.refetch();
    }
  }, [enteredGroupCode]);
  useEffect(() => {
    if (approveVM.isSuccess || approveVM.isError) {
      queryClient.invalidateQueries({ queryKey: ['user/group'] });
    }
  }, [approveVM.isSuccess, approveVM.isError]);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Grid>
      <LoadingOverlay
        visible={
          lobbyVM.isLoading || joinVM.isPending || searchGroupVM.isLoading || approveVM.isPending
        }
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <GridCol span={2}>
        <SideNavBar title="Olith Banking" navlinks={navLinksArr} />
      </GridCol>
      <GridCol span={6}>
        <Group p="md" mt="xl" mr="md" ml="md" justify="space-between">
          <Text>{lobbyVM.isSuccess ? `Groups(${lobbyVM.data.groupList.length})` : 'Group'}</Text>
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
            ? lobbyVM.data.groupList.map((item) => (
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  h={200}
                  withBorder
                  key={item.groupCode}
                  onClick={() =>
                    navigate({
                      to: '/user/group/dashboard/$groupId',
                      params: { groupId: item.groupCode },
                    })
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'; // Increase the size on hover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'; // Restore the original size on mouse leave
                  }}
                >
                  <Center h={200}>
                    <Stack>
                      <Avatar src={item.groupImg} size="lg" style={{ alignSelf: 'center' }}>
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
              {searchGroupVM.isSuccess ? (
                <Center h={100}>
                  <Stack>
                    <Avatar src={null} size="lg" style={{ alignSelf: 'center' }}>
                      <PiUsersLight fontSize="4em" />
                    </Avatar>
                    <Box>
                      <Text fw="bold" style={{ textAlign: 'center' }}>
                        {searchGroupVM.data.groupName}
                      </Text>
                      <Text mt="sm" fw="normal" style={{ textAlign: 'center' }} size="sm">
                        Member count: {searchGroupVM.data.memberCount}
                      </Text>
                    </Box>
                  </Stack>
                </Center>
              ) : null}
              <Button
                disabled={searchGroupVM.data?.groupCode.length === 0}
                color={ColorDao.primaryColor}
                onClick={() => {
                  joinVM.mutate(enteredGroupCode);
                  close();
                }}
              >
                Send Request
              </Button>
            </Stack>
          </Modal>
        </Group>
        <Stack mr="sm" ml="sm">
          {lobbyVM.isSuccess
            ? lobbyVM.data.inviteList.map((item, index) => (
                <Group mt="md" justify="space-between" key={index}>
                  <Group>
                    <Avatar src={item.groupImg} alt="invite-request" size="lg">
                      <PiUsersLight fontSize="2em" />
                    </Avatar>
                    <Box>
                      <Text size="sm" fw="bold">
                        {item.groupName}
                      </Text>
                      <Text size="xs">Invited By: {item.groupCode}</Text>
                      <Text size="xs">5 Friends 41,000 members</Text>
                    </Box>
                  </Group>
                  <Group>
                    <Button
                      variant="outline"
                      color={ColorDao.primaryColor}
                      onClick={() =>
                        approveVM.mutate({
                          decision: 'Y',
                          groupCode: item.groupCode,
                          requestId: item.requestId || '',
                          userId: userStore.userDetails.userId,
                          requestType: RequestType.invite,
                        })
                      }
                    >
                      Join
                    </Button>
                    <Button
                      variant="outline"
                      color={ColorDao.goldColor}
                      onClick={() =>
                        approveVM.mutate({
                          decision: 'N',
                          groupCode: item.groupCode,
                          requestId: item.requestId || '',
                          userId: userStore.userDetails.userId,
                          requestType: RequestType.invite,
                        })
                      }
                    >
                      Decline
                    </Button>
                  </Group>
                </Group>
              ))
            : null}
        </Stack>
      </GridCol>
    </Grid>
  );
}

export default GroupList;
