import { Box, Table, Text, Group, Center } from '@mantine/core';
import { RiBillLine, RiMoneyEuroBoxLine } from 'react-icons/ri';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { ColorDao } from '../../constants/colorConstant';
import { StatusType, formattedCurrency } from '../../constants/coreLibrary';

function RecentTransactionTable({ items }: RecentTransactionTableProps) {
  const setIconView = (icon: JSX.Element, bgColor: ColorDao): JSX.Element => (
    <Center bg={bgColor} style={{ borderRadius: '6px' }} >
      {icon}
    </Center>
  );

  const getIconForTransaction = (code: string): JSX.Element => {
    switch (code) {
      case 'BILLPAY':
        return setIconView(
          <LiaFileInvoiceDollarSolid color={ColorDao.cyanColor} fontSize="3em" style={{ padding: 5 }} />,
          ColorDao.cyanColor
        );
      case 'CASHIN':
        return setIconView(
          <RiMoneyEuroBoxLine color={ColorDao.goldColor} fontSize="3em" style={{ padding: 5 }} />,
          ColorDao.goldColor
        );
      default:
        return setIconView(
          <RiBillLine color={ColorDao.primaryColor} fontSize="3em" style={{ padding: 5 }} />,
          ColorDao.primaryColor
        );
    }
  };
  const getStatusMessage = (status: StatusType): string => {
    switch (status) {
      case StatusType.success:
        return 'successfully';
      case StatusType.failure:
        return 'failed';
      case StatusType.pending:
        return '';
      default:
        return '';
    }
  };
  const getAmountText = (isCredit: boolean, currenySymbol: string, amount: number): string => {
    const symbol = isCredit ? '+' : '-';
    return `${symbol} ${formattedCurrency(currenySymbol, amount)}`;
  };
  return (
    <Table highlightOnHover>
      <Table.Tbody>
        {items.map((item) => (
          <Table.Tr>
            <Table.Td>
              <Group justify="space-between">
                <Group>
                  {getIconForTransaction(item.serviceCode)}
                  <Box>
                    <Text>
                      {item.serviceCode === 'CASHIN' ? `Income: ${item.title}` : item.title}
                    </Text>
                    <Text>{getStatusMessage(item.status)}</Text>
                  </Box>
                </Group>
                <Text
                  fw="500"
                  style={{
                    color: item.isCredit ? ColorDao.primaryColor : ColorDao.negativeColor,
                  }}
                >
                  {getAmountText(item.isCredit, item.currenySymbol, item.amount)}
                </Text>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

export default RecentTransactionTable;

export interface RecentTransactionTableProps {
  items: RecentTransactionRowProps[];
}

export interface RecentTransactionRowProps {
  serviceCode: string;
  status: StatusType;
  isCredit: boolean;
  title: string;
  date: Date;
  currenySymbol: string;
  amount: number;
}
