import { Box, Stack, Center, Group, Title, Text } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import React from 'react';
import { TbPlaystationTriangle } from 'react-icons/tb';
import { FiHome } from 'react-icons/fi';
import { MdOutlineAccountBalance } from 'react-icons/md';
import { CiCreditCard1 } from 'react-icons/ci';
import { GrUserSettings } from 'react-icons/gr';

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
           <Link to="/login">
           <Group>
            {setIconForService(item.serviceCode)}
            <Text> {item.title}</Text>
           </Group>
           </Link>
        );
  return (
    <Stack w="25%">
        <Center h={144}>
            <Group>
            <TbPlaystationTriangle fontSize="2em" />
            <Title>{props.title}</Title>
            </Group>
        </Center>
        <Box>
            <Stack>
                {props.navlinks.map((item) => createItemforNav(item))}
            </Stack>
        </Box>
    </Stack>
  );
}

export interface SideNavbarProps {
    title: string,
    navlinks: SideNavbarItem[]
}

export interface SideNavbarItem {
    title: string,
    serviceCode: string,
}

export default SideNavBar;
