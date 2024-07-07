import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Grid,
  GridCol,
  Group,
  NumberInput,
  Paper,
  PinInput,
  Stack,
  Textarea,
} from '@mantine/core';
import { useState } from 'react';
import { modals } from '@mantine/modals';
import {
  CardPaymentInstrument,
  FeesUIModel,
  TransactionType,
  WalletPaymentInstrument,
} from '../models/uiModels';
import HeaderProgressBar from '../components/HeaderPogressBar/HeaderPogressBar';
import WalletsSelection from '../components/WalletSelection/WalletsSelection';
import TxnSummary from '../components/WalletSelection/TxnSummary';
import { ColorDao } from '../constants/colorConstant';

function GroupAddMoney() {
  const [transactionType, setTransactionType] = useState<TransactionType>(TransactionType.DEPOSIT);
  const [enteredAmount, setAmount] = useState<number>(0);
  const [openedIndexes, setOpenedIndexes] = useState<string[]>(['0']);
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
  const handleButtonClick = () => {
    setOpenedIndexes((prevIndexes) => {
      console.log('coming to here');
      // Ensure the second accordion is opened
      if (!prevIndexes.includes('1')) {
        console.log('coming to 1');
        return [...prevIndexes, '1'];
      }
      if (!prevIndexes.includes('2')) {
        console.log('coming to 2');
        return [...prevIndexes, '2'];
      }
      return prevIndexes;
    });
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
    <Paper shadow="xs" p="xl" mt="md" w="80%">
      <Stack>
        <Group>
          <Button
            variant={transactionType === TransactionType.DEPOSIT ? 'filled' : 'subtle'}
            color={ColorDao.primaryColor}
            onClick={() => {
              setTransactionType(TransactionType.DEPOSIT);
            }}
          >
            Deposit Money
          </Button>
          <Divider size="md" orientation="vertical" />
          <Button
            variant={transactionType === TransactionType.WITHDRAWAL ? 'filled' : 'subtle'}
            color={ColorDao.primaryColor}
            onClick={() => {
              setTransactionType(TransactionType.WITHDRAWAL);
            }}
          >
            Withdraw Money
          </Button>
        </Group>
        <Divider size="sm" />
        <Grid>
          <GridCol span={2}>
            <Box>
              <HeaderProgressBar
                index="1"
                name="Enter Amount"
                isSelected={openedIndexes.includes('0')}
              />
              <HeaderProgressBar
                index="2"
                name="Select payment method"
                isSelected={openedIndexes.includes('1')}
              />
              <HeaderProgressBar
                index="3"
                name="Payment details"
                isSelected={openedIndexes.includes('2')}
              />
            </Box>
          </GridCol>
          <GridCol span={10}>
            <Accordion multiple value={openedIndexes} variant="filled" onChange={handleButtonClick}>
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
                    <Textarea
                      autosize
                      label="Remark"
                      placeholder="Enter remark(Optional)"
                      maxRows={2}
                    />
                    {openedIndexes[openedIndexes.length - 1] === '0' ? (
                      <Group justify="flex-end">
                        <Button
                          onClick={handleButtonClick}
                          disabled={enteredAmount === 0}
                          color={ColorDao.primaryColor}
                        >
                          Continue
                        </Button>
                      </Group>
                    ) : null}
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
                    {openedIndexes[openedIndexes.length - 1] === '1' ? (
                      <Group justify="flex-end">
                        <Button
                          onClick={handleButtonClick}
                          disabled={selectedInstrument === undefined}
                          color={ColorDao.primaryColor}
                        >
                          Continue
                        </Button>
                      </Group>
                    ) : null}
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
      </Stack>
    </Paper>
  );
}

export default GroupAddMoney;
