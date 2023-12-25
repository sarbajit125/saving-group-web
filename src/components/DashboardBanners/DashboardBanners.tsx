import { Carousel } from '@mantine/carousel';
import { Image, Card, Text } from '@mantine/core';
import { BannerDao } from '../../models/responseModels';

function DashboardBanners(props: DashboardBannersProps) {
  return (
    <Carousel withIndicators w="100%" dragFree slideSize="100%" align="center" mt="md" p="md">
      {props.rows.map((item) => (
        <Carousel.Slide key={item.url}>
          <Card
            shadow="sm"
            padding="xl"
            component="a"
            href={item.action}
            target="_blank"
          >
            <Card.Section>
              <Image
                src={item.url}
                h={160}
                alt="No way!"
              />
            </Card.Section>

            <Text fw={500} size="lg" mt="md">
              You&apos;ve won a million dollars in cash!
            </Text>

            <Text mt="xs" c="dimmed" size="sm">
              Please click anywhere on this card to claim your reward, this is not a fraud, trust us
            </Text>
          </Card>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default DashboardBanners;

export interface DashboardBannersProps {
  rows: BannerDao[];
}
