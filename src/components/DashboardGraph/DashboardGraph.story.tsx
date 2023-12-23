import type { Meta, StoryObj } from '@storybook/react';
import DashboardGraph, { DashboardGraphProps } from './DashboardGraph';

const meta: Meta<typeof DashboardGraph> = {
    title: 'Dashboard expenditure graph',
    component: DashboardGraph,
  };
  type Story = StoryObj<typeof DashboardGraph>;
  export const Primary: Story = (args: DashboardGraphProps) => (
    <DashboardGraph
      {...args}
    />
  );

  Primary.args = {
   balance: 1000,
   currencySign: 'INR',
};

export default meta;
