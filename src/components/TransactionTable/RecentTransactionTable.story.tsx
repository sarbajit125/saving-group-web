import { Meta, StoryObj } from '@storybook/react';
import RecentTransactionTable, { RecentTransactionRowProps, RecentTransactionTableProps } from './TransactionTable';
import { StatusType } from '../../constants/coreLibrary';

const meta: Meta<typeof RecentTransactionTable> = {
    title: 'Recent transaction table',
    component: RecentTransactionTable,
  };
  type Story = StoryObj<typeof RecentTransactionTable>;
  export const Primary: Story = (args: RecentTransactionTableProps) => (
    <RecentTransactionTable
      {...args}
    />
  );

const recentTable: RecentTransactionRowProps[] = [
    {
        amount: 280,
        currencySymbol: 'INR',
        date: new Date(),
        isCredit: false,
        serviceCode: 'BILLPAY',
        status: StatusType.success,
        title: 'Water bill',
    },
    {
        amount: 1200,
        currencySymbol: 'INR',
        date: new Date(),
        isCredit: true,
        serviceCode: 'CASHIN',
        status: StatusType.success,
        title: 'Salary Oct',
    },
    {
        amount: 480,
        currencySymbol: 'INR',
        date: new Date(),
        isCredit: false,
        serviceCode: '',
        status: StatusType.failure,
        title: 'Electric bill',
    },
    {
        amount: 500,
        currencySymbol: 'INR',
        date: new Date(),
        isCredit: true,
        serviceCode: 'CASHIN',
        status: StatusType.success,
        title: 'Jane transfer',
    },
    {
        amount: 100,
        currencySymbol: 'INR',
        date: new Date(),
        isCredit: false,
        serviceCode: 'BILLPAY',
        status: StatusType.success,
        title: 'Internet Bill',
    },
];

  Primary.args = {
    items: recentTable,
  };
  export default meta;
