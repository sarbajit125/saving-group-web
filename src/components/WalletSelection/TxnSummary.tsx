import { Badge, Card, CardSection, Center, Divider, Group, Stack, Text } from '@mantine/core';
import { formattedCurrency } from '../../constants/coreLibrary';
import {
  FeesUIModel,
  TransactionType,
} from '../../models/uiModels';
import { ColorDao } from '../../constants/colorConstant';

function TxnSummary(props: TxnSummaryProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <CardSection>
        <Center>
          <Text>{formattedCurrency('INR', props.enteredAmount)}</Text>
          <Badge color={ColorDao.goldBGColor}>{props.service}</Badge>
        </Center>
        <Divider variant="dashed" />
      </CardSection>
      <Stack>
        {props.feesModel.map((item) => (
          <Group justify="space-between">
            <Text>{item.key}</Text>
            <Text>
              {item.isAmount && typeof item.value === 'number'
                ? formattedCurrency('INR', item.value)
                : item.value}
            </Text>
          </Group>
        ))}
      </Stack>
    </Card>
  );
}

export default TxnSummary;
export interface TxnSummaryProps {
  enteredAmount: number;
  service: TransactionType;
  feesModel: FeesUIModel[];
}
