import type { Meta, StoryObj } from '@storybook/react';
import DashboardBanners, { DashboardBannersProps } from './DashboardBanners';

const meta: Meta<typeof DashboardBanners> = {
    title: 'Dashboard banners',
    component: DashboardBanners,
  };
  type Story = StoryObj<typeof DashboardBanners>;
  export const Primary: Story = (args: DashboardBannersProps) => (
    <DashboardBanners
      {...args}
    />
  );

  Primary.args = {
  rows: [{
    url: 'https://media.angi.com/s3fs-public/home-landscape-design.jpeg?impolicy=leadImage',
    action: 'https://www.makemytrip.com/flights/',
  }, {
    url: 'https://www.tasteofcinema.com/wp-content/uploads/2016/12/days-of-heaven.jpg',
    action: 'https://in.bookmyshow.com/',
  }],
};

export default meta;
