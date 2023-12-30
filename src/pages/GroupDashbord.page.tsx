import { Container, Grid, GridCol, Paper } from '@mantine/core';
import TopNavBar from '../components/TopNavBar/TopNavBar';
import GoalsTab from '../components/GoalsTab/GoalsTab';
import { GoalItemDao } from '../models/uiModels';
import { dashboardRoute } from '../Router';

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
        <GridCol span={7}>
          <GoalsTab
            goals={dummyGoalsArr}
            totalDeposited={2300}
            totalWithdrawan={100}
            creationDate={new Date()}
          />
        </GridCol>
        <GridCol span={5}>
          <Paper />
        </GridCol>
      </Grid>
    </Container>
  );
}

export default GroupDashboard;
