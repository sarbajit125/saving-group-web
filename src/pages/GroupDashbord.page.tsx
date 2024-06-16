import {
  AppShell,
  Avatar,
  Badge,
  Burger,
  Container,
  Grid,
  GridCol,
  Group,
  LoadingOverlay,
  Paper,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import GoalsTab from '../components/GoalsTab/GoalsTab';
import { dashboardRoute } from '../Router';
import GroupMonthGraph from '../components/GroupMonthGraph/GroupMonthGraph';
import GroupGauge from '../components/GroupGauge/GroupGauge';
import GroupNotification from '../components/GroupNotification/GroupNotification';
import { useGroupHomeQuery } from '../handlers/networkHook';
import { useUserStore } from '../store/userStore';

function GroupDashboard() {
  const { groupId } = dashboardRoute.useParams();
  const groupHomeVM = useGroupHomeQuery(groupId);
  const [opened, { toggle }] = useDisclosure();
  const userStore = useUserStore();
  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
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
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Container fluid>
          <LoadingOverlay
            visible={groupHomeVM.isLoading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          <Grid>
            <GridCol span={8}>
              {groupHomeVM.isSuccess ? (
                <Stack>
                  <GoalsTab
                    goals={groupHomeVM.data.goalList}
                    totalDeposited={groupHomeVM.data.totalDeposited}
                    totalWithdrawan={groupHomeVM.data.totalWithdrawan}
                    creationDate={groupHomeVM.data.createdOn}
                    groupCurrency={groupHomeVM.data.groupCurrency}
                  />
                  <GroupMonthGraph />
                </Stack>
              ) : null}
            </GridCol>
            <GridCol span={4}>
              <Paper shadow="xs" p="xl" m="md" withBorder>
                <Stack>
                  <Text size="md" fw="bold">
                    On going goal summary
                  </Text>
                  <GroupGauge />
                  <GroupNotification />
                </Stack>
              </Paper>
            </GridCol>
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default GroupDashboard;
