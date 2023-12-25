import { Box, Stack, Text } from '@mantine/core';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { faker } from '@faker-js/faker';
import { formattedCurrency } from '../../constants/coreLibrary';
import { ColorDao } from '../../constants/colorConstant';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
function DashboardGraph(props: DashboardGraphProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        backgroundColor: 'rgb(255, 99, 132)',
        barPercentage: 6,
        barThickness: 8,
      },
      {
        label: 'Expenditure',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        backgroundColor: 'rgb(75, 192, 192)',
        barPercentage: 6,
        barThickness: 8,
      },
      {
        label: 'Saving',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        backgroundColor: 'rgb(53, 162, 235)',
        barPercentage: 6,
        barThickness: 8,
      },
    ],
  };
  return (
    <Stack mt="md">
      <Box>
        <Text> Balance</Text>
        <Box display="inline">
          <Text c={ColorDao.primaryColor} fw="bold"> {formattedCurrency(props.currencySign, props.balance)}</Text>
        </Box>
      </Box>
      <Box p="sm">
        <Bar
          data={data}
          width={600}
          height={300}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: false,
              },
              legend: {
                display: false,
              },
            },
            responsive: true,
            scales: {
              x: {
                grid: {
                  display: false,
                },
                border:{
                  display: false,
                },
                stacked: true,
              },
              y: {
                grid: {
                  display: false,
                },
                display: false,
                stacked: true,
              },
            },
            elements: {
              bar: {
                borderRadius: 12,
              },
            },
          }}
        />
      </Box>
    </Stack>
  );
}
export interface DashboardGraphProps {
  balance: number;
  currencySign: string;
}
export default DashboardGraph;
