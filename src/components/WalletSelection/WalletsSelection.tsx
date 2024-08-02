import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  Image,
  Checkbox,
  Group,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Text,
  LoadingOverlay,
} from '@mantine/core';
import dayjs from 'dayjs';
import { CiWallet } from 'react-icons/ci';
import {
  CardPaymentInstrument,
  CardType,
  InstrumentType,
  TransactionType,
  WalletPaymentInstrument,
} from '../../models/uiModels';
import { DateFormatConstants } from '../../constants/coreLibrary';
import { listInstrumentQuery } from '../../handlers/networkHook';
import { ColorDao } from '../../constants/colorConstant';

function WalletsSelection(props: WalletSelectionProps) {
  const [typesList, setTypeList] =
  useState<InstrumentType[]>([InstrumentType.wallet, InstrumentType.card]);
  const [selectedType, setInstrumentType] = useState<string>(typesList[0]);
  const [selectedInstrument, setSelected] = useState<
    CardPaymentInstrument | WalletPaymentInstrument | undefined
  >();
  const listInstrumentVM = listInstrumentQuery();
  useEffect(() => {
    props.selectedInstrument(selectedInstrument);
  }, [selectedInstrument]);
  useEffect(() => {
    switch (props.serviceType) {
      case TransactionType.DEPOSIT:
        setTypeList([InstrumentType.wallet, InstrumentType.card]);
        break;
      case TransactionType.WITHDRAWAL:
        setTypeList([InstrumentType.card]);
        break;
    }
  }, [props.serviceType]);
  const setCardImage = (cardType: CardType): string => {
    switch (cardType) {
      case CardType.VISA:
        return 'https://logos-world.net/wp-content/uploads/2020/05/Visa-Logo.png';
      case CardType.MASTERCARD:
        return 'https://images.fastcompany.net/image/upload/w_1200,c_limit,q_auto:best/wp-cms/uploads/2023/04/i-3-90885664-mastercard-logo.jpg';
      case CardType.OTHERS:
        return 'https://w7.pngwing.com/pngs/123/955/png-transparent-india-rupay-debit-card-bank-credit-card-india-text-trademark-logo.png';
      default:
        return 'https://logos-world.net/wp-content/uploads/2020/05/Visa-Logo.png';
    }
  };
  const setForCards = (cardList: CardPaymentInstrument[]) => (
    <Stack h={100} style={{ overflow: 'auto' }}>
      {cardList.map((item) => (
        <Paper shadow="sm" radius="md" withBorder onClick={() => setSelected(item)}>
          <Group justify="space-between">
            <Group p="sm" ml="sm">
              <div style={{ width: 40, height: 40, borderRadius: '50%' }}>
                <Image
                  h={40}
                  w={40}
                  radius="md"
                  fit="scale-down"
                  src={setCardImage(item.cardType)}
                  alt="card-logo"
                />
              </div>
              <Box>
                <Text fw="bold" size="sm">
                  {item.instrumentId}
                </Text>
                <Text fw="lighter" size="xs">
                  {item.cardHolderName}
                </Text>
              </Box>
            </Group>
            <Text size="xs">{dayjs(item.cardExpiry).format(DateFormatConstants.cardExpiry)}</Text>
            <Checkbox
              checked={selectedInstrument?.instrumentId === item.instrumentId}
              onChange={() => setSelected(item)}
              disabled={props.enteredAmount > item.instrumentBalance}
              error={props.enteredAmount > item.instrumentBalance ? 'Insufficient balance' : null}
              mr="sm"
              p="sm"
            />
          </Group>
        </Paper>
      ))}
    </Stack>
  );
  const setForWallets = (walletList: WalletPaymentInstrument[]) => (
    <Stack>
      {walletList.map((item) => (
        <Card shadow="sm" padding="lg" radius="md" withBorder onClick={() => setSelected(item)}>
          <Group justify="space-between">
            <Group>
              <Avatar>
                <CiWallet />
              </Avatar>
              <Box>
                <Text fw={700}>{item.instrumentId}</Text>
                <Text size="sm" tt="capitalize">{`${item.walletType} Wallet`}</Text>
              </Box>
            </Group>
            <Checkbox
              checked={selectedInstrument?.instrumentId === item.instrumentId}
              onChange={() => setSelected(item)}
              disabled={props.enteredAmount > item.instrumentBalance}
              error={props.enteredAmount > item.instrumentBalance ? 'Insufficient balance' : null}
            />
          </Group>
        </Card>
      ))}
    </Stack>
  );
  if (listInstrumentVM.isLoading) {
    <LoadingOverlay
      visible
      zIndex={1000}
      overlayProps={{ radius: 'sm', blur: 2 }}
    />;
  }
  if (listInstrumentVM.isSuccess) {
    return (
      <Stack>
        <RadioGroup
          value={selectedType}
          onChange={setInstrumentType}
          name="wallet-selection"
          label="Choose payment method"
          color={ColorDao.primaryColor}
        >
          <Group>
            {typesList.map((item) => (
              <Radio value={item} label={item} />
            ))}
          </Group>
        </RadioGroup>
        {selectedType === InstrumentType.card ?
        setForCards(listInstrumentVM.data.cardList) :
        setForWallets(listInstrumentVM.data.walletList)}
      </Stack>
    );
  }
}

export default WalletsSelection;

export interface WalletSelectionProps {
  enteredAmount: number;
  serviceType: TransactionType;
  selectedInstrument: (
    instrument: CardPaymentInstrument | WalletPaymentInstrument | undefined
  ) => void;
}
