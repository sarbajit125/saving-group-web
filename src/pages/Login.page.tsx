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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useState } from 'react';
import splash from '../assets/splash.png';
import classes from './Login.module.css';
import { loginRequestSchema } from '../handlers/schemaHandler';

export function LoginPage() {
  const [shouldRemember, toggleRem] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: zodResolver(loginRequestSchema),
  });
  return (
    <Container fluid>
      <Paper shadow="md" withBorder p="xl" className={classes.paper}>
        <Grid>
          <GridCol span={6}>
            <Box className={classes.form}>
              <Stack h="100%" align="streach" mr="md">
                <Stack h="250" justify="flex-end">
                  <Title order={3} size="h1">
                    Welcome back to Saving group
                  </Title>
                  <Text>It's great to have you back</Text>
                </Stack>
                <Stack mt="md">
                  <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                  </form>
                </Stack>
                <Group grow>
                  <Button variant="filled"> Login </Button>
                  <Button variant="outline"> Create account </Button>
                </Group>
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
