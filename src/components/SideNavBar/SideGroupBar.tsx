import { Avatar, Box, Center, NavLink, Paper, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { SideNavSectionItem } from '../../models/uiModels';

function SideGroupBar(props: SideGroupBarProps) {
  const [menu, setMenu] = useState<SideNavSectionItem[]>(props.menu);
  return (
    <Paper>
      <Center h={100}>
        <Avatar src={props.groupImage} size="lg">
          SG
        </Avatar>
        <Box mt="sm">
          <Text>{props.groupTitle}</Text>
          <Text>Group Code: {props.groupCode} </Text>
          <Text>{props.groupDesc}</Text>
        </Box>
      </Center>
      <Stack>
        {menu.map((menuItem) => (
          <NavLink label={menuItem.sectionName} active={menuItem.isSelected} childrenOffset={28}>
            {menuItem.subItems.map((item) => (
              <NavLink label={item.title} href={item.serviceCode} />
            ))}
          </NavLink>
        ))}
      </Stack>
    </Paper>
  );
}

export default SideGroupBar;
export interface SideGroupBarProps {
  groupTitle: string;
  groupCode: string;
  groupDesc?: string;
  groupImage: string | null;
  menu: SideNavSectionItem[];
}
