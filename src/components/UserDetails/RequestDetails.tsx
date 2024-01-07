import { Avatar, Badge, Box, Divider, Group, Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import {
  ApprovalType,
  ApproverItem,
  GroupApprovalItemUIModel,
} from '../../models/uiModels';
import { DateFormatConstants, getNameInitials } from '../../constants/coreLibrary';
import { ColorDao } from '../../constants/colorConstant';

function RequestDetails({ item }: RequestDetailsProps) {
  const setDecisionBadge = (approver: ApproverItem): JSX.Element => {
    switch (approver.decision) {
      case ApprovalType.approved:
        return <Badge color={ColorDao.serviceText1}>{approver.decision}</Badge>;
      case ApprovalType.rejected:
        return <Badge color={ColorDao.negativeColor}>{approver.decision}</Badge>;
      case ApprovalType.pending:
        return <Badge color={ColorDao.primaryColor}>{approver.decision}</Badge>;
      default:
        return <Badge color={ColorDao.primaryColor}>{approver.decision}</Badge>;
    }
  };

  return (
    <Stack>
      <SimpleGrid cols={2}>
        <Box>
          <Text size="md" fw="bold"> State</Text>
          <Text size="sm"> Pending </Text>
        </Box>
        <Box>
          <Text size="md" fw="bold">Request Date</Text>
          <Text size="sm">{dayjs(item.requestTimeStamp).format(DateFormatConstants.dashboard)}</Text>
        </Box>
        <Box>
          <Text size="md" fw="bold"> Opened By</Text>
          <Text size="sm">{item.initiatorDetails.name}</Text>
        </Box>
        <Box>
          <Text size="md" fw="bold">Request on</Text>
          <Text size="sm">{item.initiatedOnDetails?.name}</Text>
        </Box>
      </SimpleGrid>
      <Paper withBorder shadow="sm" p="sm">
        <Text size="md" fw="bold"> Approvers details</Text>
        <Stack>
          {item.approverArr.map((approver) => (
            <Box mt="sm">
            <Group justify="space-between">
              <Group>
                <Avatar>{getNameInitials(approver.name)}</Avatar>
                <Box>
                  <Text size="md" fw="bold">{approver.name}</Text>
                  <Text size="sm">{approver.role}</Text>
                </Box>
              </Group>
              {setDecisionBadge(approver)}
            </Group>
            <Divider mt="sm" size="sm" />
            </Box>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}

export default RequestDetails;

export interface RequestDetailsProps {
  item: GroupApprovalItemUIModel;
}
