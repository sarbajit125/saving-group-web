import {
  Grid,
  GridCol,
  Group,
  SimpleGrid,
  Text,
  Card,
  Center,
  Box,
  Stack,
  Avatar,
} from '@mantine/core';
import { IoListOutline, IoGridOutline, IoAdd } from 'react-icons/io5';
import { PiUsersLight } from 'react-icons/pi';
import SideNavBar from '../components/SideNavBar/SideNavBar';
import { navLinksArr } from '../constants/NavLinksConstant';
import { GroupItemUIDao, GroupRoles } from '../models/uiModels';
import { ColorDao } from '../constants/colorConstant';

function GroupList() {
  const dummyGroupList: GroupItemUIDao[] = [
    {
      groupCode: 'ABC1234',
      groupImage:
        'https://uploads-ssl.webflow.com/5fe0022130b6119c3b25d03f/6000a4262c3c62f6aadb85d3_shutterstock_1044844045.jpg',
      groupName: 'Cuisine',
      role: GroupRoles.Gold,
      memberCount: 3,
    },
    {
      groupCode: 'ABC1235',
      groupImage: null,
      groupName: 'Art',
      role: GroupRoles.Gold,
      memberCount: 1,
    },
    {
      groupCode: 'ABC1239',
      groupImage: null,
      groupName: 'Music',
      role: GroupRoles.Silver,
      memberCount: 1,
    },
    {
      groupCode: 'ABC1236',
      groupImage:
        'https://images.unsplash.com/photo-1525824236856-8c0a31dfe3be?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdhdGVyZmFsbHxlbnwwfHwwfHx8MA%3D%3D',
      groupName: 'Vizaag',
      role: GroupRoles.Regular,
      memberCount: 4,
    },
    {
      groupCode: 'ABC1237',
      groupImage: null,
      groupName: 'Dhamra',
      role: GroupRoles.Regular,
      memberCount: 1,
    },
  ];
  return (
    <Grid>
      <GridCol span={2}>
        <SideNavBar title="Olith Banking" navlinks={navLinksArr} />
      </GridCol>
      <GridCol span={10}>
        <Group p="md" mt="xl" mr="md" ml="md" justify="space-between">
          <Text> Groups(11)</Text>
          <Group p="md">
            <IoGridOutline fontSize="1em" />
            <IoListOutline fontSize="1em" />
          </Group>
        </Group>
        <SimpleGrid p="md" cols={4}>
          <Card shadow="sm" padding="lg" radius="md" h={200} withBorder>
            <Center h={200}>
              <Stack>
                <IoAdd
                  fontSize="4em"
                  style={{
                    backgroundColor: ColorDao.primaryBGColor,
                    color: ColorDao.primaryColor,
                    borderRadius: 30,
                    alignSelf: 'center',
                  }}
                />
                <Text> Create Group </Text>
              </Stack>
            </Center>
          </Card>
          {dummyGroupList.map((item) => (
            <Card shadow="sm" padding="lg" radius="md" h={200} withBorder key={item.groupCode}>
              <Center>
                <Stack>
                  {item.groupImage != null ? (
                    <Avatar
                      src={item.groupImage}
                      alt="Group image"
                      size="lg"
                      style={{ alignSelf: 'center' }}
                    />
                  ) : (
                    <Avatar src={null} size="lg" style={{ alignSelf: 'center' }}>
                      <PiUsersLight fontSize="4em" />
                    </Avatar>
                  )}
                  <Box>
                    <Text style={{ textAlign: 'center' }}> {item.groupName} </Text>
                    <Text style={{ textAlign: 'center' }}> Member count: {item.memberCount}</Text>
                  </Box>
                </Stack>
              </Center>
            </Card>
          ))}
        </SimpleGrid>
      </GridCol>
    </Grid>
  );
}

export default GroupList;
