import type { Meta, StoryObj } from '@storybook/react';
import SideNavBar, { SideNavbarItem, SideNavbarProps } from './SideNavBar';

const meta: Meta<typeof SideNavBar> = {
    title: 'Side Nav menu',
    component: SideNavBar,
  };
  type Story = StoryObj<typeof SideNavBar>;
  export const Primary: Story = (args: SideNavbarProps) => (
    <SideNavBar
      {...args}
    />
  );

const linksArr: SideNavbarItem[] = [
    {
        serviceCode: 'HOME',
         title: 'Home',
    },
    {
        serviceCode: 'ACCOUNTS',
         title: 'Accounts',
    },
    {
        serviceCode: 'CARDS',
         title: 'Cards',
    },
    {
        serviceCode: 'SETTINGS',
         title: 'Settings',
    },
];
  Primary.args = {
   title: 'Atil Bank',
   navlinks: linksArr,
};

export default meta;
