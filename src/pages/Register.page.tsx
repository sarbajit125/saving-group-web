import {
  Container,
  Grid,
  GridCol,
  Paper,
  Image,
  Text,
  Box,
  Button,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  LoadingOverlay,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import splash from '../assets/splash.png';
import classes from './Login.module.css';
import { registerUISchema } from '../handlers/schemaHandler';
import { registerMutation } from '../handlers/networkHook';

export function RegisterPage() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      email: '',
      confirm: '',
    },

    validate: zodResolver(registerUISchema),
    validateInputOnChange: true,
  });
  const registerVM = registerMutation();
  return (
    <Container pos="relative" fluid>
      <LoadingOverlay
        visible={registerVM.isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Paper shadow="md" withBorder p="xl" className={classes.paper}>
        <Grid>
          <GridCol span={6}>
            <Image src={splash} className={classes.image} fit="initial" />{' '}
          </GridCol>
          <GridCol span={6}>
            <Box className={classes.form}>
              <Stack h="100%" align="streach" mr="md">
                <Stack h="150" justify="flex-end">
                  <Title order={3} size="h1">
                    Join us
                  </Title>
                  <Text>Create your free account and start saving</Text>
                </Stack>
                <form
                  onSubmit={form.onSubmit((values) =>
                    registerVM.mutate({
                      confirm: values.confirm,
                      email: values.email,
                      password: values.password,
                      username: values.username,
                    })
                  )}
                >
                  <Stack mt="md">
                    <TextInput label="Username" mb="sm" {...form.getInputProps('username')} />
                    <TextInput label="Email" mb="sm" {...form.getInputProps('email')} />
                    <PasswordInput label="Password" mb="sm" {...form.getInputProps('password')} />
                    <PasswordInput
                      label="Confirm password"
                      mb="sm"
                      {...form.getInputProps('confirm')}
                    />
                  </Stack>
                  <Group mt="xs" grow>
                    <Button variant="outline"> LOGIN </Button>
                    <Button disabled={!form.isValid()} type="submit" variant="filled">
                      CREATE ACCOUNT
                    </Button>
                  </Group>
                </form>
              </Stack>
            </Box>
          </GridCol>
        </Grid>
      </Paper>
    </Container>
  );
}
