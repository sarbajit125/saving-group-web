import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Divider,
  Grid,
  GridCol,
  Group,
  NumberInput,
  Paper,
  PinInput,
  Stack,
  Textarea,
  Text,
  LoadingOverlay,
} from '@mantine/core';
import { useState } from 'react';
import { modals } from '@mantine/modals';
import { useParams } from 'react-router-dom';
import { VscError } from 'react-icons/vsc';
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
import { RouteParams } from '../constants/coreLibrary';
import { addMoneyGroupMutation } from '../handlers/networkHook';
import { useUserStore } from '../store/userStore';

function GroupAddMoney() {
  const { groupId } = useParams<RouteParams>() as RouteParams;
  const addMoneyMutation = addMoneyGroupMutation();
  const userData = useUserStore();
  const [transactionType, setTransactionType] = useState<TransactionType>(TransactionType.DEPOSIT);
  const [enteredAmount, setAmount] = useState<number>(0);
  const [enteredRemark, setRemark] = useState<string | null>(null);
  const [openedIndexes, setOpenedIndexes] = useState<string[]>(['0']);
  const [isCustomAmount, setIsCustom] = useState<boolean>(false);
  const [selectedInstrument, setSelected] = useState<
    CardPaymentInstrument | WalletPaymentInstrument | undefined
  >();
  const [enteredOTP, setOTPText] = useState<string>('');
  const setFeesTable = (): FeesUIModel[] => {
    const model: FeesUIModel[] = [];
    const taxPercentage: number = 0.12;
    model.push({
      isAmount: false,
      key: transactionType === TransactionType.DEPOSIT ? 'To' : 'From',
      value: groupId,
    });
    model.push({
      isAmount: false,
      key: transactionType === TransactionType.DEPOSIT ? 'From' : 'To',
      value: selectedInstrument?.instrumentId ?? '',
    });
    model.push({ isAmount: true, key: 'Fees', value: enteredAmount * taxPercentage });
    model.push({
      isAmount: true,
      key: 'Net Amount',
      value: enteredAmount - enteredAmount * taxPercentage,
    });
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
  const pinModalTap = () => {
    modals.close('PIN-MODAL');
    if (enteredOTP === '1357' && selectedInstrument !== undefined) {
      /// call add money API
      addMoneyMutation.mutate({
        currency: 'INR',
        groupCode: groupId,
        remarks: enteredRemark,
        serviceCode: transactionType === TransactionType.DEPOSIT ? 'GROUP-ADD' : 'GROUP-WITHDRAW',
        transactionAmount: enteredAmount,
        transactionDate: new Date(),
        sender: {
          userId: userData.userDetails.userId,
          paymentInstrument: selectedInstrument.instrumentId,
        },
      });
    } else {
      modals.close('PIN-MODAL');
      /// Show invalid OTP Text
      modals.open({
        id: 'ERROR-MODAL',
        title: 'Payment Failed',
        size: 'auto',
        radius: 'md',
        children: (
          <Stack justify="center" align="center">
            <Center>
              <VscError size={30} color={ColorDao.negativeColor} />
            </Center>
            <Text ta="center" fw={500}>OTP invalid. Please retry</Text>
            <Button color={ColorDao.negativeColor} onClick={() => modals.close('ERROR-MODAL')}>
              Ok
            </Button>
          </Stack>
        ),
      });
    }
  };
  const openPINModal = () =>
    modals.open({
      id: 'PIN-MODAL',
      title: 'Enter PIN to confirm payment',
      size: 'auto',
      radius: 'md',
      children: (
        <Stack>
          <PinInput
            mask
            type="number"
            inputType="tel"
            inputMode="numeric"
            value={enteredOTP}
            onComplete={setOTPText}
          />
          <Button disabled={enteredOTP.length < 4} onClick={pinModalTap}>
            Proceed
          </Button>
        </Stack>
      ),
    });
  return (
    <Paper shadow="xs" p="xl" mt="md" w="80%">
      <LoadingOverlay
        visible={addMoneyMutation.isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      ;
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
                        variant={enteredAmount === 100 ? 'filled' : 'outline'}
                        color={ColorDao.primaryColor}
                        onClick={() => setAmount(100)}
                      >
                        100
                      </Button>
                      <Button
                        variant={enteredAmount === 500 ? 'filled' : 'outline'}
                        color={ColorDao.primaryColor}
                        onClick={() => setAmount(500)}
                      >
                        500
                      </Button>
                      <Button
                        variant={enteredAmount === 1000 ? 'filled' : 'outline'}
                        color={ColorDao.primaryColor}
                        onClick={() => setAmount(1000)}
                      >
                        1000
                      </Button>
                      <Button
                        variant={isCustomAmount ? 'filled' : 'outline'}
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
                      value={enteredRemark ?? undefined}
                      onChange={(event) => setRemark(event.currentTarget.value)}
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
