import { Box, Stack, Center, Group, Text } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { TbPlaystationTriangle } from 'react-icons/tb';
import { FiHome } from 'react-icons/fi';
import { MdOutlineAccountBalance } from 'react-icons/md';
import { CiCreditCard1 } from 'react-icons/ci';
import { GrUserSettings } from 'react-icons/gr';
import { ColorDao } from '../../constants/colorConstant';

function SideNavBar(props: SideNavbarProps) {
  const setIconForService = (code: string): JSX.Element => {
    switch (code) {
      case 'HOME':
        return <FiHome />;
      case 'ACCOUNTS':
        return <MdOutlineAccountBalance />;
      case 'CARDS':
        return <CiCreditCard1 />;
      case 'SETTINGS':
        return <GrUserSettings />;
      default:
        return <TbPlaystationTriangle />;
    }
  };

  const createItemforNav = (item: SideNavbarItem): JSX.Element => (
    <Link
      to="/login"
      key={item.serviceCode}
      id={item.title}
      style={{ textDecoration: 'none', color: ColorDao.greyColor }}
    >
      <Group>
        {setIconForService(item.serviceCode)}
        <Text> {item.title}</Text>
      </Group>
    </Link>
  );
  return (
    <Group h="100vh" style={{ alignItems: 'flex-start' }} p="md">
      <Stack>
      <Center h={100}>
        <Group>
          <TbPlaystationTriangle fontSize="2em" />
          <Text>{props.title}</Text>
        </Group>
      </Center>
      <Box>
        <Stack p="md">{props.navlinks.map((item) => createItemforNav(item))}</Stack>
      </Box>
      </Stack>
      <Box
        style={{
          backgroundColor: ColorDao.greyColor,
          alignSelf: 'stretch',
          padding: 2,
          margin: 5,
          borderRadius: 6,
        }}
      />
    </Group>

  );
}

export interface SideNavbarProps {
  title: string;
  navlinks: SideNavbarItem[];
}

export interface SideNavbarItem {
  title: string;
  serviceCode: string;
}

export default SideNavBar;
