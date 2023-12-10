import {
  Text,
  Paper,
  Button,
  Grid,
  GridCol,
  Image,
  Box,
  Container,
  Title,
  Stack,
  TextInput,
  PasswordInput,
  Group,
  Center,
  Anchor,
  Checkbox,
  LoadingOverlay,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import splash from '../assets/splash.png';
import classes from './Login.module.css';
import { loginRequestSchema } from '../handlers/schemaHandler';
import { loginMutation } from '../handlers/networkHook';

export function LoginPage() {
  const [shouldRemember, toggleRem] = useState<boolean>(false);
  const navigate = useNavigate();
  const loginVM = loginMutation();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: zodResolver(loginRequestSchema),
    validateInputOnChange: true,
  });
  return (
    <Container pos="relative" fluid>
      <LoadingOverlay
        visible={loginVM.isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Paper shadow="md" withBorder p="xl" className={classes.paper}>
        <Grid>
          <GridCol span={6}>
            <Box className={classes.form}>
              <Stack h="100%" align="streach" mr="md">
                <Stack h="250" justify="flex-end">
                  <Title order={3} size="h1">
                    Welcome back to Saving group
                  </Title>
                  <Text>It is great to have you back</Text>
                </Stack>
                <form
                  onSubmit={form.onSubmit((values) =>
                    loginVM.mutate({ username: values.username, password: values.password })
                  )}
                >
                  <Stack mt="md">
                    <TextInput label="Username" mb="sm" {...form.getInputProps('username')} />
                    <PasswordInput label="Password" mb="sm" {...form.getInputProps('password')} />
                    <Group justify="space-between">
                      <Checkbox
                        label="Remember me?"
                        checked={shouldRemember}
                        variant="outline"
                        onChange={() => toggleRem(!shouldRemember)}
                      />
                      <Anchor underline="never" c="black">
                        Forgot password?
                      </Anchor>
                    </Group>
                  </Stack>
                  <Group mt="xs" grow>
                    <Button disabled={!form.isValid()} type="submit" variant="filled">
                      LOGIN
                    </Button>
                      <Button variant="outline" onClick={() => navigate({ to: '/register' })}>
                        CREATE ACCOUNT
                      </Button>
                  </Group>
                </form>
                <Center mt="md">
                  <Stack align="center" gap="xs">
                    <Text>Or login with </Text>
                    <Group>
                      <Anchor underline="never">Facebook</Anchor>
                      <Anchor underline="never">Google</Anchor>
                    </Group>
                  </Stack>
                </Center>
              </Stack>
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
