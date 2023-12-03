import { Text, Paper, Button, Grid, GridCol, Image, Box, Container, Center } from '@mantine/core';
import splash from '../assets/splash.png';

export function LoginPage() {
  return (
    <Container fluid h="100%">
      <Center>
        <Paper shadow="md" withBorder p="xl">
          <Grid>
            <GridCol span={6}>
              <Box h={100} w="auto" bg="cyan" />
              <Box h={100} w="auto" bg="red" />
            </GridCol>
            <GridCol span={6}>
              <Image src={splash} radius="md" h={200} w="auto" fit="contain" />
            </GridCol>
          </Grid>
        </Paper>
      </Center>
    </Container>
  );
}
