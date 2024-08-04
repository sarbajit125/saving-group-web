import { Button, Center, Group, Paper, Stack, Text } from '@mantine/core';
import { FaCircleCheck } from 'react-icons/fa6';
import { FaTimesCircle, FaPauseCircle } from 'react-icons/fa';
import { FeesUIModel, RequestStatus } from '../../models/uiModels';
import { formattedCurrency } from '../../constants/coreLibrary';
import { ColorDao } from '../../constants/colorConstant';

const setStatusBar = (
  txnStatus: RequestStatus,
  serviceCode: string,
  transactionAmount: number
): JSX.Element => {
  let statusIcon: JSX.Element = <FaCircleCheck />;
  let statusMessage: string = 'Payment successful';
  let statusColor = ColorDao.bedazzledBlue;
  switch (serviceCode) {
    case 'GROUP-ADD':
      statusIcon = <FaCircleCheck />;
      statusMessage = 'Deposit to Group successful';
      statusColor = ColorDao.bedazzledBlue;
      if (txnStatus === RequestStatus.failed) {
        statusIcon = <FaTimesCircle />;
        statusMessage = 'Deposit failed';
        statusColor = ColorDao.negativeColor;
      }
      break;
    case 'GROUP-WITHDRAW':
      switch (txnStatus) {
        case RequestStatus.success:
          statusIcon = <FaCircleCheck />;
          statusMessage = 'Withdrawn money successfully';
          statusColor = ColorDao.bedazzledBlue;
          break;
        case RequestStatus.failed:
          statusIcon = <FaTimesCircle />;
          statusMessage = 'Withdrawal request failed';
          statusColor = ColorDao.negativeColor;
          break;
        default:
          statusIcon = <FaPauseCircle />;
          statusMessage = 'Request pending for approval';
          statusColor = ColorDao.goldBGColor;
          break;
      }
      break;
    default:
      statusIcon = <FaCircleCheck />;
      statusMessage = 'Payment successful';
      statusColor = ColorDao.bedazzledBlue;
      break;
  }
  return (
    <Center h={300}>
      {statusIcon}
      <Text c={statusColor}>{statusMessage}</Text>
      <Text fw={700} size="lg"> INR {transactionAmount}</Text>
    </Center>
  );
};

const TxnStatusPage = (props: TxnStatusPageProps) => (
  <Paper>
    {setStatusBar(props.txnStatus, props.serviceCode, props.transactionAmount)}
    <Stack>
      {props.feeModel.map((item) => (
        <Group justify="space-between">
          <Text>{item.key}</Text>
          <Text>
            {item.isAmount && typeof item.value === 'number'
              ? formattedCurrency('INR', item.value)
              : item.value}
          </Text>
        </Group>
      ))}
      <Group justify="center">
        <Button color={ColorDao.bedazzledBlue}>Print</Button>
        <Button onClick={props.okBtnAction} color={ColorDao.primaryColor}>
          Ok
        </Button>
      </Group>
    </Stack>
  </Paper>
);

export interface TxnStatusPageProps {
  txnStatus: RequestStatus;
  serviceCode: string;
  transactionAmount: number;
  feeModel: FeesUIModel[];
  okBtnAction: () => void;
}

export default TxnStatusPage;
