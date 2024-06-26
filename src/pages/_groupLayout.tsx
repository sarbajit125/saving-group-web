import {
  AppShell,
  Group,
  Burger,
  Avatar,
  Badge,
  LoadingOverlay,
  Text,
  Container,
  Button,
  Stack,
  Divider,
} from '@mantine/core';
import { IoSettings, IoReceipt, IoExit } from 'react-icons/io5';
import { MdGroups, MdGroupAdd } from 'react-icons/md';
import { AiOutlineTransaction } from 'react-icons/ai';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import { useGroupHomeQuery } from '../handlers/networkHook';
import { useUserStore } from '../store/userStore';
import { RouteParams } from '../constants/coreLibrary';
import { ROUTES } from '../constants/NavLinksConstant';

const GroupLayout = () => {
  const { groupId } = useParams<RouteParams>() as RouteParams;
  const groupHomeVM = useGroupHomeQuery(groupId);
  const [opened, { toggle }] = useDisclosure();
  const userStore = useUserStore();

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 140, md: 240, lg: 290 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group gap="xs">
            <Avatar src="https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JvdXB8ZW58MHx8MHx8fDA%3D" />
            <Text>{groupHomeVM.data?.groupName ?? ''}</Text>
          </Group>
          <Group gap={2}>
            <Text fw={500}>Hi {userStore.userDetails.username}</Text>
            <Badge variant="light" color="cyan">
              {groupHomeVM.data?.role ?? ''}
            </Badge>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack justify="space-between">
          <Stack>
            <NavLink to={ROUTES.GROUP_SETTINGS(groupId)}>
              {({ isActive }) => (
                <Button
                  fullWidth
                  variant={isActive ? 'filled' : 'light'}
                  leftSection={<IoSettings />}
                >
                  Group settings
                </Button>
              )}
            </NavLink>
            <NavLink to={ROUTES.GROUP_MEMBER_MANAGEMENT(groupId)}>
              {({ isActive }) => (
                <Button
                  fullWidth
                  variant={isActive ? 'filled' : 'light'}
                  leftSection={<MdGroups />}
                >
                  Member Management
                </Button>
              )}
            </NavLink>
            <NavLink to={ROUTES.GROUP_DASHBOARD(groupId)}>
              {({ isActive }) => (
                <Button
                  fullWidth
                  variant={isActive ? 'filled' : 'light'}
                  leftSection={<MdGroupAdd />}
                >
                  Dashboard
                </Button>
              )}
            </NavLink>
            <NavLink to="/setting">
              {({ isActive }) => (
                <Button
                  fullWidth
                  variant={isActive ? 'filled' : 'light'}
                  leftSection={<AiOutlineTransaction />}
                >
                  Transaction History
                </Button>
              )}
            </NavLink>
            <NavLink to="/setting">
              {({ isActive }) => (
                <Button
                  fullWidth
                  variant={isActive ? 'filled' : 'light'}
                  leftSection={<IoReceipt />}
                >
                  My Statement
                </Button>
              )}
            </NavLink>
            <NavLink to={ROUTES.GROUP_TRANSFER_SERVICE(groupId)}>
              {({ isActive }) => (
                <Button
                  fullWidth
                  variant={isActive ? 'filled' : 'light'}
                  leftSection={<IoReceipt />}
                >
                  Send/Withdraw Money
                </Button>
              )}
            </NavLink>
          </Stack>
          <Stack>
            <Divider />
            <NavLink to={ROUTES.GROUP_LOBBY}>
              {({ isActive }) => (
                <Button fullWidth variant={isActive ? 'filled' : 'light'} rightSection={<IoExit />}>
                  Exit
                </Button>
              )}
            </NavLink>
          </Stack>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Container fluid>
          <LoadingOverlay
            visible={groupHomeVM.isLoading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
export default GroupLayout;
