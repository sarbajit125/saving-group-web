import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mantine/core';

ChartJS.register(ArcElement, Tooltip, Legend);

function GroupGauge() {
  const data: ChartData<'doughnut', number[], unknown> = {
    datasets: [
      {
        data: [200, 100],
        backgroundColor: ['#336699', '#99CCFF'],
        borderColor: '#D1D6DC',
      },
    ],
  };
  return (
    <Box p="md" m="md">
      <Doughnut
        data={data}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          rotation: -90,
          circumference: 180,
          cutout: '60%',
          maintainAspectRatio: false,
          responsive: true,
        }}
      />
    </Box>
  );
}

export default GroupGauge;
