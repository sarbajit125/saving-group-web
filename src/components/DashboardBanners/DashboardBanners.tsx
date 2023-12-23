import { Carousel } from '@mantine/carousel';
import { Button, Paper } from '@mantine/core';
import { BannerDao } from '../../models/responseModels';
import classes from './DashboardBanners.module.css';

function DashboardBanners(props: DashboardBannersProps) {
    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noreferrer');
      };
  return (
    <Carousel
      withIndicators
      loop
      dragFree
      height={200}
      slideSize={{ base: '100%', sm: '50%' }}
      slideGap={{ base: 'xl', sm: 2 }}
      align="start"
    >
      {props.rows.map((item) => (
        <Carousel.Slide key={item.url}>
          <Paper
            shadow="md"
            p="xl"
            radius="md"
            style={{
              backgroundImage: `url(${item.url})`,
            }}
            className={classes.card}
          >
            <Button variant="white" color="dark" onClick={() => (openInNewTab(item.action))}>Read more</Button>
          </Paper>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default DashboardBanners;

export interface DashboardBannersProps {
  rows: BannerDao[];
}
