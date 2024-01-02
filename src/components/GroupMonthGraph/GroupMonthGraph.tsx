import { Paper, Stack, Group, Text, Box } from '@mantine/core';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function GroupMonthGraph() {
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const data: ChartData<'bar', (number | [number, number] | null)[], unknown> = {
    labels: month,
    datasets: [
      {
        label: 'Deposits',
        data: month.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        barThickness: 8,
      },
      {
        label: 'Withdrawals',
        data: month.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        barThickness: 8,
      },
    ],
  };
  return (
    <Paper shadow="xs" p="xl" mt="md" withBorder>
      <Stack>
        <Group justify="space-between">
          <Text size="md" fw="bold">Monthly revenue</Text>
          <Group>
            <Box
              style={{
                width: 16,
                height: 16,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderRadius: 8,
              }}
            />
            <Text>Deposits</Text>
            <Box
              style={{
                width: 16,
                height: 16,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderRadius: 8,
              }}
            />
            <Text>Withdrawals</Text>
          </Group>
        </Group>
        <Bar
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
              },
            },
            elements: {
              bar: {
                borderRadius: 12,
              },
            },
          }}
          data={data}
        />
        ;
      </Stack>
    </Paper>
  );
}

export default GroupMonthGraph;
