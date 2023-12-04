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
import splash from '../assets/splash.png';
import classes from './Login.module.css';

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
              <Stack h="100%" align="streach" mr="md">
                <Stack h="250" justify="flex-end">
                  <Title>Welcome back to Saving group</Title>
                  <Text>It's great to have you back</Text>
                </Stack>
                <Stack mt="md">
                  <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput label="Username" mb="sm" />
                    <PasswordInput label="Password" mb="sm" />
                    <Group justify="space-between">
                      <Checkbox label="Remember me?" variant="outline" />
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
