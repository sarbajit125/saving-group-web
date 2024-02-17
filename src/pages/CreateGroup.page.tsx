import {
  LoadingOverlay,
  Paper,
  Grid,
  GridCol,
  Box,
  Stack,
  TextInput,
  Button,
  Container,
  Title,
  Image,
  Text,
  NativeSelect,
  NumberInput,
  Group,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import splash from '../assets/splash.png';
import classes from './Login.module.css';
import { useCreateGroupMutation } from '../handlers/networkHook';
import { createGroupRequestType, createGroupSchema } from '../handlers/schemaHandler';
import { ColorDao } from '../constants/colorConstant';

const CreateGroupPage = () => {
  const createGroupVM = useCreateGroupMutation();
  const navigate = useNavigate();
  const form = useForm<createGroupRequestType>({
    initialValues: {
      groupname: '',
      groupDesc: '',
      groupCurrency: 'INR',
      targetAmount: 0,
      targetDate: undefined,
    },
    validateInputOnChange: true,
    validate: zodResolver(createGroupSchema),
  });
  useEffect(() => {
    if (createGroupVM.isSuccess) {
        navigate({ to: '/user/group/lobby' });
    }
  }, [createGroupVM.isSuccess]);
  return (
    <Container pos="relative" fluid>
      <LoadingOverlay
        visible={createGroupVM.isPending}
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
              <Stack h="100%" align="stretch" mr="md">
                <Stack h="150" justify="flex-end">
                  <Title order={3} size="h1">
                    Create you saving group
                  </Title>
                  <Text>Fill the form to create your own group and plan trip</Text>
                </Stack>
                <form
                  onSubmit={form.onSubmit((values) =>
                    createGroupVM.mutate({
                      groupname: values.groupname,
                      groupDesc: values.groupDesc,
                      groupCurrency: values.groupCurrency,
                      targetAmount: values.targetAmount,
                      targetDate: values.targetDate,
                    })
                  )}
                >
                  <Stack mt="md">
                    <TextInput
                      label="Group name"
                      mb="sm"
                      {...form.getInputProps('groupname')}
                      withAsterisk
                    />
                    <TextInput
                      label="Group description"
                      mb="sm"
                      withAsterisk
                      {...form.getInputProps('groupDesc')}
                    />
                    <Group mb="sm">
                      <NativeSelect
                        label="Select currency"
                        data={['INR', 'USD']}
                        withAsterisk
                        {...form.getInputProps('groupCurrency')}
                      />
                      <NumberInput
                        label="Set Target amount"
                        max={50000}
                        allowNegative={false}
                        decimalScale={2}
                        fixedDecimalScale
                        thousandSeparator=","
                        {...form.getInputProps('targetAmount')}
                      />
                      <DatePickerInput
                        label="Target Date"
                        minDate={new Date()}
                        maxDate={dayjs(new Date()).add(10, 'year').toDate()}
                        {...form.getInputProps('targetDate')}
                      />
                    </Group>
                    <Group grow>
                      <Button
                        color={ColorDao.primaryColor}
                        type="submit"
                        disabled={!form.isValid()}
                      >
                        Submit
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => form.reset()}
                        color={ColorDao.negativeColor}
                        type="reset"
                      >
                        Reset form
                      </Button>
                    </Group>
                  </Stack>
                </form>
              </Stack>
            </Box>
          </GridCol>
        </Grid>
      </Paper>
    </Container>
  );
};
export default CreateGroupPage;
