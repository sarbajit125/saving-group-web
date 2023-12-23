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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
function DashboardGraph(props: DashboardGraphProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Dataset 3',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        backgroundColor: 'rgb(53, 162, 235)',
      },
    ],
  };
  return (
    <Stack>
      <Box>
        <Text> Balance</Text>
        <Box display="inline">
          <Text> {formattedCurrency(props.currencySign, props.balance)}</Text>
        </Box>
      </Box>
      <Box>
        <Bar
          data={data}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked',
              },
            },
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              },
            },
            elements: {
              bar: {
                borderRadius: 12,
              },
            },
            bar: {
                datasets: {
                    barPercentage: 0.3,
                    barThickness: 'flex',
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
