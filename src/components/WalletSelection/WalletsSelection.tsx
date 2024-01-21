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
} from '@mantine/core';
import dayjs from 'dayjs';
import { CiWallet } from 'react-icons/ci';
import { v4 as uuidv4 } from 'uuid';
import {
  CardPaymentInstrument,
  CardType,
  InstrumentType,
  TransactionType,
  WalletPaymentInstrument,
} from '../../models/uiModels';
import { DateFormatConstants } from '../../constants/coreLibrary';

const getRandomCardType = () => {
  const cardTypes = Object.values(CardType);
  const randomIndex = Math.floor(Math.random() * cardTypes.length);
  return cardTypes[randomIndex];
};

const getRandomDate = () => {
  const currentDate = new Date();
  const randomFutureDate = new Date(
    currentDate.getFullYear() + 1,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  return randomFutureDate;
};
const cardDummy: CardPaymentInstrument[] = Array.from({ length: 10 }, (_, index) => ({
  instrumentId: uuidv4(),
  instrumentBalance: Math.random() * 1000,
  instrumentCurrency: 840, // Assuming USD as currency code
  instrumentType: InstrumentType.card,
  cardType: getRandomCardType(),
  cardHolderName: `Card Holder ${index + 1}`,
  cardExpiry: getRandomDate(),
}));

function WalletsSelection(props: WalletSelectionProps) {
  const [typesList, setTypeList] = useState<InstrumentType[]>([]);
  const [selectedType, setInstrumentType] = useState<string>(typesList[0]);
  const [selectedInstrument, setSelected] = useState<
    CardPaymentInstrument | WalletPaymentInstrument | undefined
  >();
  const [cardList, setCardList] = useState<CardPaymentInstrument[]>(cardDummy);
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
  
  const walletList: WalletPaymentInstrument[] = [];
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
  const setForCards = () => (
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
  const setForWallets = () => (
    <Stack>
      {walletList.map((item) => (
        <Card shadow="sm" padding="lg" radius="md" withBorder onClick={() => setSelected(item)}>
          <Group justify="space-around">
            <Group>
              <Avatar>
                <CiWallet />
              </Avatar>
              <Box>
                <Text>{item.instrumentId}</Text>
                <Text>{`${item.walletType}- ${item.walletId}`}</Text>
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
  return (
    <Stack>
      <RadioGroup
        value={selectedType}
        onChange={setInstrumentType}
        name="wallet-selection"
        label="Choose payment method"
      >
        <Group>
          {typesList.map((item) => (
            <Radio value={item} label={item} />
          ))}
        </Group>
      </RadioGroup>
      {selectedType === InstrumentType.card ? setForCards() : setForWallets()}
    </Stack>
  );
}

export default WalletsSelection;

export interface WalletSelectionProps {
  enteredAmount: number;
  serviceType: TransactionType;
  selectedInstrument: (
    instrument: CardPaymentInstrument | WalletPaymentInstrument | undefined
  ) => void;
}
