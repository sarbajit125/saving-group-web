import {
  Autocomplete,
  Grid,
  GridCol,
  Group,
  Avatar,
  Stack,
  Center,
  Text,
  Flex,
  Box,
  Divider,
  LoadingOverlay,
} from '@mantine/core';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { CiSearch } from 'react-icons/ci';
import Cards from 'react-credit-cards-2';
import { GoBell, GoCreditCard } from 'react-icons/go';
import { IoPersonOutline } from 'react-icons/io5';
import { GiBank } from 'react-icons/gi';
import { PiBankLight, PiPiggyBank } from 'react-icons/pi';
import { useNavigate } from '@tanstack/react-router';
import SideNavBar, { SideNavbarItem } from '../components/SideNavBar/SideNavBar';
import WelcomeCard from '../components/WelcomeCard/welcomeCard';
import { ServiceCardsDao } from '../models/uiModels';
import { ColorDao } from '../constants/colorConstant';
import DashboardGraph from '../components/DashboardGraph/DashboardGraph';
import DashboardBanners from '../components/DashboardBanners/DashboardBanners';
import RecentTransactionTable, {
  RecentTransactionRowProps,
} from '../components/TransactionTable/TransactionTable';
import { StatusType, getNameInitials } from '../constants/coreLibrary';
import { userDetailQuery } from '../handlers/networkHook';

export function HomePage() {
  const navigate = useNavigate();
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

  const defaultServiceDao: ServiceCardsDao[] = [
    {
      serviceCode: 'P2P',
      name: 'Transfer via card number',
      icon: <GoCreditCard style={{ color: `${ColorDao.serviceText1}`, fontSize: '2em' }} />,
      bgColor: ColorDao.serviceColor1,
      textColor: ColorDao.serviceText1,
    },
    {
      serviceCode: 'NEFT',
      name: 'Transfer to another bank',
      icon: <GiBank style={{ color: `${ColorDao.serviceText2}`, fontSize: '2em' }} />,
      bgColor: ColorDao.serviceColor2,
      textColor: ColorDao.serviceText2,
    },
    {
      serviceCode: 'U2S',
      name: 'Transfer to same bank',
      icon: <PiBankLight style={{ color: `${ColorDao.serviceText3}`, fontSize: '2em' }} />,
      bgColor: ColorDao.serviceColor3,
      textColor: ColorDao.serviceText3,
    },
    {
      serviceCode: 'SAVE',
      name: 'Saving groups',
      icon: <PiPiggyBank style={{ color: `${ColorDao.serviceText2}`, fontSize: '2em' }} />,
      bgColor: ColorDao.serviceColor2,
      textColor: ColorDao.serviceText2,
    },
  ];
  const topServiceTapped = (serviceCode: string) => {
    switch (serviceCode) {
      case 'SAVE':
        navigate({ to: '/user/group/lobby' });
        break;
      default:
        console.log(serviceCode);
    }
  };
  const homeVM = userDetailQuery();
  return (
    <>
      {homeVM.isLoading ? (
        <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      ) : null}
      {homeVM.isSuccess ? (
        <Grid>
          <GridCol span={2}>
            <SideNavBar title="Olith Banking" navlinks={linksArr} />
            <Divider orientation="vertical" />
          </GridCol>
          <GridCol span={10}>
            <Group mt="md" p="lg" justify="space-between">
              <Autocomplete
                placeholder="Search"
                leftSection={<CiSearch fontSize="1em" />}
                data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                visibleFrom="xs"
                w="50%"
              />
              <Group mr="sm">
                <GoBell fontSize="1em" />
                <IoPersonOutline fontSize="1em" />
                <Avatar src={null} alt={homeVM.data.userDetails.username} color="red">
                  {getNameInitials(homeVM.data.userDetails.username)}
                </Avatar>
              </Group>
            </Group>
            <Grid>
              <GridCol span={7}>
                <Flex direction="column" justify="flex-start" align="flex-start">
                  <WelcomeCard
                    name={homeVM.data.userDetails.username}
                    serviceList={defaultServiceDao}
                    serviceTapped={(code) => topServiceTapped(code)}
                  />
                  <DashboardGraph balance={1000} currencySign="INR" />
                  <DashboardBanners rows={homeVM.data.bannerList} />
                </Flex>
              </GridCol>
              <Stack mt="100">
                <Cards number="4012888888881881" expiry="08/23" cvc="054" name="Vitaly Rtishchev" />
                <Center
                  h={44}
                  w={290}
                  mt="md"
                  ml={44}
                  p="md"
                  style={{
                    borderWidth: 2,
                    borderStyle: 'dashed',
                    borderColor: ColorDao.serviceText2,
                  }}
                >
                  <Text c={ColorDao.serviceText2} fw="bold">
                    Add new card
                  </Text>
                </Center>
                <Box mt="md" ml="xl">
                  <RecentTransactionTable items={recentTable} />
                </Box>
              </Stack>
              <GridCol />
            </Grid>
          </GridCol>
        </Grid>
      ) : null}
    </>
  );
}
