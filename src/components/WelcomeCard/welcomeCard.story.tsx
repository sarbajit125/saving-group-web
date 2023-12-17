import type { Meta, StoryObj } from '@storybook/react';
import { PiBankLight, PiPiggyBank } from 'react-icons/pi';
import { GiBank } from 'react-icons/gi';
import { GoCreditCard } from 'react-icons/go';
import { ServiceCardsDao } from '../../models/uiModels';
import WelcomeCard, { WelcomeCardProps } from './welcomeCard';
import { ColorDao } from '../../constants/colorConstant';

const meta: Meta<typeof WelcomeCard> = {
  title: 'Welcome Card',
  component: WelcomeCard,
};
type Story = StoryObj<typeof WelcomeCard>;
export const Primary: Story = (args: WelcomeCardProps) => (
  <WelcomeCard
    {...args}
  />
);
const defaultServiceDao : ServiceCardsDao[] = [{
    serviceCode: 'P2P',
    name: 'Transfer via card number',
    icon: <GoCreditCard style={{ color: `${ColorDao.serviceText1}`, fontSize: '4em' }} />,
    bgColor: ColorDao.serviceColor1,
    textColor: ColorDao.serviceText1,
}, {
    serviceCode: 'NEFT',
    name: 'Transfer to another bank',
    icon: <GiBank style={{ color: `${ColorDao.serviceText2}`, fontSize: '4em' }} />,
    bgColor: ColorDao.serviceColor2,
    textColor: ColorDao.serviceText2,
}, {
    serviceCode: 'U2S',
    name: 'Transfer to same bank',
    icon: <PiBankLight style={{ color: `${ColorDao.serviceText3}`, fontSize: '4em' }} />,
    bgColor: ColorDao.serviceColor3,
    textColor: ColorDao.serviceText3,
}, {
    serviceCode: 'SAVE',
    name: 'Saving groups',
    icon: <PiPiggyBank style={{ color: `${ColorDao.serviceText2}`, fontSize: '4em' }} />,
    bgColor: ColorDao.serviceColor2,
    textColor: ColorDao.serviceText2,
}];
Primary.args = {
    name: 'Sarbajit Biswal',
    serviceList: defaultServiceDao,
    serviceTapped(code) {
        console.log(code);
    },
};

export default meta;
