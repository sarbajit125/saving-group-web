import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Button,
  Grid,
  GridCol,
  Group,
  NumberInput,
  Paper,
  PinInput,
  Stack,
} from '@mantine/core';
import { useState } from 'react';
import { modals } from '@mantine/modals';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import {
  CardPaymentInstrument,
  FeesUIModel,
  TransactionType,
  WalletPaymentInstrument,
} from '../models/uiModels';
import HeaderProgressBar from '../components/HeaderPogressBar/HeaderPogressBar';
import WalletsSelection from '../components/WalletSelection/WalletsSelection';
import TxnSummary from '../components/WalletSelection/TxnSummary';
import TopNavBar from '../components/TopNavBar/TopNavBar';
import { ColorDao } from '../constants/colorConstant';

function GroupAddMoney() {
  const [transactionType, setTransactionType] = useState<TransactionType>(TransactionType.DEPOSIT);
  const [enteredAmount, setAmount] = useState<number>(0);
  const [transactionProgress, setProgress] = useState<number>(0);
  const [isCustomAmount, setIsCustom] = useState<boolean>(true);
  const [selectedInstrument, setSelected] = useState<
    CardPaymentInstrument | WalletPaymentInstrument | undefined
  >();
  const setFeesTable = (): FeesUIModel[] => {
    let model: FeesUIModel[] = [];
    switch (transactionType) {
      case TransactionType.DEPOSIT:
        model.push({ isAmount: false, key: 'To', value: 'Group123' });
        model.push({ isAmount: false, key: 'From', value: selectedInstrument?.instrumentId ?? '' });
        model.push({ isAmount: true, key: 'Fees', value: 0.12 });
        model.push({ isAmount: true, key: 'Net Amount', value: enteredAmount + 0.12 });
        break;
      case TransactionType.WITHDRAWAL:
        model.push({ isAmount: false, key: 'From', value: 'Group123' });
        model.push({ isAmount: false, key: 'To', value: selectedInstrument?.instrumentId ?? '' });
        model.push({ isAmount: true, key: 'Fees', value: 0.12 });
        model.push({ isAmount: true, key: 'Net Amount', value: enteredAmount + 0.12 });
        break;
      default:
        model = [];
    }
    return model;
  };
  const openPINModal = () =>
    modals.open({
      id: 'PIN-MODAL',
      title: 'Enter PIN to confirm payment',
      size: 'auto',
      radius: 'md',
      children: (
        <Stack>
          <PinInput mask type="number" />
          <Button>Proceed</Button>
        </Stack>
      ),
    });
  return (
    <Stack>
      <TopNavBar
        groupId=""
        showSendInvite={false}
        sendInvitCallback={function (): void {
        throw new Error('Function not implemented.');
      }}
      />
      <Paper shadow="xs" p="xl" mt="md" w="80%">
        <Grid>
          <GridCol span={2}>
            <Button
              variant="default"
              onClick={() => setTransactionType(TransactionType.DEPOSIT)}
              leftSection={<GiPayMoney fontSize="3em" />}
              fullWidth
              h="50%"
              mb="md"
              radius="sm"
            >
              Add money
            </Button>
            <Button
              variant="default"
              onClick={() => setTransactionType(TransactionType.WITHDRAWAL)}
              leftSection={<GiReceiveMoney fontSize="3em" />}
              fullWidth
              h="50%"
              mb="md"
              radius="sm"
            >
              Withdraw money
            </Button>
          </GridCol>
          <GridCol span={10}>
            <HeaderProgressBar
              items={['Add amount', 'Payments', 'Confirm payment']}
              progress={transactionProgress}
            />
            <Accordion variant="separated" value={transactionProgress.toString()}>
              <AccordionItem key={0} value="0">
                <AccordionControl>{transactionType}</AccordionControl>
                <AccordionPanel>
                  <Stack>
                    <NumberInput
                      label="Enter amount"
                      placeholder="Enter amount between 0 to 10,000"
                      min={0}
                      max={10000}
                      defaultValue={0}
                      prefix="INR"
                      allowNegative={false}
                      decimalScale={2}
                      fixedDecimalScale
                      thousandSeparator=","
                      value={enteredAmount}
                      disabled={!isCustomAmount}
                    />
                    <Group>
                      <Button
                        variant="outline"
                        color={ColorDao.primaryColor}
                        onClick={() => setAmount(100)}
                      >
                        100
                      </Button>
                      <Button
                        variant="outline"
                        color={ColorDao.primaryColor}
                        onClick={() => setAmount(500)}
                      >
                        500
                      </Button>
                      <Button
                        variant="outline"
                        color={ColorDao.primaryColor}
                        onClick={() => setAmount(1000)}
                      >
                        1000
                      </Button>
                      <Button
                        variant="outline"
                        color={ColorDao.primaryColor}
                        onClick={() => setIsCustom(true)}
                      >
                        Custom amount
                      </Button>
                    </Group>
                    <Group justify="flex-end">
                      <Button
                        onClick={() => setProgress(1)}
                        disabled={enteredAmount === 0}
                        color={ColorDao.primaryColor}
                      >
                        Continue
                      </Button>
                    </Group>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem key={1} value="1">
                <AccordionControl>Select payment method</AccordionControl>
                <AccordionPanel>
                  <Stack>
                    <WalletsSelection
                      enteredAmount={enteredAmount}
                      serviceType={transactionType}
                      selectedInstrument={(instrument) => setSelected(instrument)}
                    />
                    <Group justify="flex-end">
                      <Button
                        onClick={() => setProgress(2)}
                        disabled={selectedInstrument === undefined}
                        color={ColorDao.primaryColor}
                      >
                        Continue
                      </Button>
                    </Group>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem key={2} value="2">
                <AccordionControl>Confirmation</AccordionControl>
                <AccordionPanel>
                  <Stack>
                    <TxnSummary
                      enteredAmount={enteredAmount}
                      service={transactionType}
                      feesModel={setFeesTable()}
                    />
                    <Group justify="flex-end">
                      <Button color={ColorDao.primaryColor} onClick={() => openPINModal()}>
                        Make payment
                      </Button>
                    </Group>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </GridCol>
        </Grid>
      </Paper>
    </Stack>
  );
}

export default GroupAddMoney;
