import { Text, Paper, Button, Grid, GridCol, Image, Box, Container, Title, Flex, Stack, TextInput, PasswordInput } from '@mantine/core';
import splash from '../assets/splash.png';
import classes from './Login.module.css';
import { useForm } from '@mantine/form';

export function LoginPage() {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  return (
    <Container fluid style={{ height: '100%' }}>
        <Paper shadow="md" withBorder p="xl" className={classes.paper}>
          <Grid>
            <GridCol span={6}>
             <Box className={classes.form}>
              <Stack h="100%" align="flex-start">
                <Stack h="250" justify="flex-end">
                <Title>Welcome back to Saving group</Title>
                <Text>It's great to have you back</Text>
                </Stack>
                <Stack>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                  <TextInput label="Username"/>
                  <PasswordInput label="Password" />
                </form>
                </Stack>
              </Stack>
              <div className={classes.bottomBox} />
             </Box>
            </GridCol>
            <GridCol span={6}>
              <Image src={splash} className={classes.image} fit="initial" />
            </GridCol>
          </Grid>
        </Paper>
    </Container>
  );
}
