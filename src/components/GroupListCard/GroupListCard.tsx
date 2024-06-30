import { isStringDefined } from '../../constants/utilityConstant';
import { useDownloadDocQuery } from '../../handlers/networkHook';
import { GroupLobbyDetails } from '../../models/responseModels';
import { Card, Center, Stack, Avatar, Box, Text } from '@mantine/core';
import { PiUsersLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

function GroupListCard({item}: GroupListCardProps) {
  const navigate = useNavigate();
  const downloadDocVM = useDownloadDocQuery(item.groupImg ?? '', isStringDefined(item.groupImg));
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      h={200}
      withBorder
      key={item.groupCode}
      onClick={() => navigate(`/user/group/${item.groupCode}/dashboard`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'; // Increase the size on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'; // Restore the original size on mouse leave
      }}
    >
      <Center h={200}>
        <Stack>
          <Avatar src={downloadDocVM.data} size="lg" style={{ alignSelf: 'center' }}>
            <PiUsersLight fontSize="4em" />
          </Avatar>
          <Box>
            <Text fw="bold" style={{ textAlign: 'center' }}>
              {item.groupName}
            </Text>
            <Text style={{ textAlign: 'center' }}> Members: {item.memberCount}</Text>
          </Box>
        </Stack>
      </Center>
    </Card>
  );
}

export default GroupListCard;
export interface GroupListCardProps {
    item: GroupLobbyDetails
}
