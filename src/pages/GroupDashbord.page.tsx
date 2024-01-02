import { Container, Grid, GridCol, Paper, Stack, Text } from '@mantine/core';
import TopNavBar from '../components/TopNavBar/TopNavBar';
import GoalsTab from '../components/GoalsTab/GoalsTab';
import { GoalItemDao } from '../models/uiModels';
import { dashboardRoute } from '../Router';
import GroupMonthGraph from '../components/GroupMonthGraph/GroupMonthGraph';
import GroupGauge from '../components/GroupGauge/GroupGauge';
import GroupNotification from '../components/GroupNotification/GroupNotification';

function GroupDashboard() {
  const { groupId } = dashboardRoute.useParams();
  console.log(groupId);
  const dummyGoalsArr: GoalItemDao[] = [
    { amount: 400, id: '1', isCompleted: true, name: 'Train ticket' },
    { amount: 500, id: '2', isCompleted: true, name: 'Lunch' },
    { amount: 600, id: '3', isCompleted: false, name: 'Taxi' },
    { amount: 700, id: '4', isCompleted: false, name: 'Ganja' },
    { amount: 800, id: '5', isCompleted: false, name: 'Beach' },
  ];
  return (
    <Container fluid>
      <TopNavBar />
      <Grid>
        <GridCol span={8}>
          <Stack>
          <GoalsTab
            goals={dummyGoalsArr}
            totalDeposited={2300}
            totalWithdrawan={100}
            creationDate={new Date()}
          />
          <GroupMonthGraph />
          </Stack>
        </GridCol>
        <GridCol span={4}>
          <Paper shadow="xs" p="xl" m="md" withBorder>
            <Stack>
              <Text size="md" fw="bold"> On going goal summary</Text>
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
