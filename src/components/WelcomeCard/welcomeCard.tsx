import { Card, CardSection, Title, Box, Text, Group } from '@mantine/core';
import { ServiceCardsDao } from '../../models/uiModels';
import { ColorDao } from '../../constants/colorConstant';

function WelcomeCard({ name, serviceList, serviceTapped }: WelcomeCardProps) {
  return (
    <Box mt="md" mb="md">
      <Box mt="sm" p="md">
        <Title c={ColorDao.primaryColor}> Welcome back {name}</Title>
      </Box>
      <Box mt="sm">
        <Group>
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
