import { Card, CardSection, Box, Text, Group } from '@mantine/core';
import { ServiceCardsDao } from '../../models/uiModels';
import { ColorDao } from '../../constants/colorConstant';

function WelcomeCard({ name, serviceList, serviceTapped }: WelcomeCardProps) {
  return (
    <Box mt="md" mb="md">
      <Box mt="sm" p="md">
        <Text c={ColorDao.primaryColor}> Welcome back {name}</Text>
      </Box>
      <Box mt="sm">
        <Group grow wrap="nowrap">
          {serviceList.map((item) => (
            <Card
              shadow="sm"
              padding="md"
              radius="md"
              id={item.serviceCode}
              withBorder
              mr="md"
              style={{ backgroundColor: item.bgColor ?? 'white' }}
              onClick={() => serviceTapped(item.serviceCode)}
              key={item.serviceCode}
            >
              <CardSection p="md">{item.icon}</CardSection>
              <Text c={item.textColor ?? 'black'} fw={500} size="sm">
                {' '}
                {item.name}{' '}
              </Text>
            </Card>
          ))}
        </Group>
      </Box>
    </Box>
  );
}

export default WelcomeCard;

export interface WelcomeCardProps {
  name: string;
  serviceList: ServiceCardsDao[];
  serviceTapped: (code: string) => void;
}
