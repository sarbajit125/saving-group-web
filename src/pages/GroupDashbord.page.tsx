import { Container, Grid, GridCol, LoadingOverlay, Paper, Stack, Text } from '@mantine/core';
import TopNavBar from '../components/TopNavBar/TopNavBar';
import GoalsTab from '../components/GoalsTab/GoalsTab';
import { dashboardRoute } from '../Router';
import GroupMonthGraph from '../components/GroupMonthGraph/GroupMonthGraph';
import GroupGauge from '../components/GroupGauge/GroupGauge';
import GroupNotification from '../components/GroupNotification/GroupNotification';
import { useGroupHomeQuery } from '../handlers/networkHook';

function GroupDashboard() {
  const { groupId } = dashboardRoute.useParams();
  const groupHomeVM = useGroupHomeQuery(groupId);
  return (
    <Container fluid>
      <LoadingOverlay
        visible={groupHomeVM.isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <TopNavBar groupId={groupId} />
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
  );
}

export default GroupDashboard;
