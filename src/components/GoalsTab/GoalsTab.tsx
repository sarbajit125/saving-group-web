import { Avatar, Box, Button, Card, Center, Divider, Group, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { GoGoal } from 'react-icons/go';
import { IoAdd } from 'react-icons/io5';
import { FaRegCalendarDays } from 'react-icons/fa6';
import dayjs from 'dayjs';
import { ColorDao } from '../../constants/colorConstant';
import { GoalCategoryFilter, GoalCategoryItem, GoalItemDao } from '../../models/uiModels';
import { DateFormatConstants, formattedCurrency } from '../../constants/coreLibrary';

function GoalsTab(props: GoalTabProps) {
  const goalTopArr: GoalCategoryItem[] = [
    {
      id: GoalCategoryFilter.ALL_GOAL,
      name: 'All goals',
    },
    {
      id: GoalCategoryFilter.ONGOING,
      name: 'Ongoing goals',
    },
    {
      id: GoalCategoryFilter.COMPLETED,
      name: 'Archived goals',
    },
  ];
  const [selectedGoalFilter, setSelectedGoalFilter] = useState<GoalCategoryFilter>(
    goalTopArr[0].id
  );
  const [selectedGoals, setSelectedGoals] = useState<GoalItemDao[]>([]);
  useEffect(() => {
    switch (selectedGoalFilter) {
      case GoalCategoryFilter.ALL_GOAL:
        setSelectedGoals(props.goals);
        break;
      case GoalCategoryFilter.ONGOING:
        setSelectedGoals(props.goals.filter((goal) => goal.isCompleted));
        break;
      case GoalCategoryFilter.COMPLETED:
        setSelectedGoals(props.goals.filter((goal) => !goal.isCompleted));
        break;
    }
  }, [selectedGoalFilter]);

  return (
    <Stack mt="md" p="sm">
      <Group>
        {goalTopArr.map((item) => (
          <Button
            variant="transparent"
            onClick={() => setSelectedGoalFilter(item.id)}
            style={{
              color: selectedGoalFilter === item.id ? ColorDao.primaryColor : ColorDao.greyColor,
              textUnderlineOffset: '3px',
              textDecoration: selectedGoalFilter === item.id ? 'underline' : 'none',
            }}
          >
            {item.name}
          </Button>
        ))}
      </Group>
      <Group>
        {selectedGoals.map((item) => (
          <Card shadow="sm" padding="md" radius="md" withBorder id={item.id}>
            <Group>
              <Avatar src={null} size="md">
                <GoGoal fontStyle="1.5em" />
              </Avatar>
              <Box>
                <Text c={ColorDao.greyColor} size="md" fw="lighter">
                  {' '}
                  {item.name}
                </Text>
                <Text size="lg" fw="bold">
                  {formattedCurrency('INR', item.amount)}
                </Text>
              </Box>
            </Group>
          </Card>
        ))}
        <Card shadow="sm" padding="md" radius="md" withBorder id="AddGOAL">
          <Center>
            <Group>
              <Avatar src={null} size="md">
                <IoAdd fontStyle="1.5em" />
              </Avatar>
              <Text c={ColorDao.greyColor} size="md" fw="lighter">
                Add a goal
              </Text>
            </Group>
          </Center>
        </Card>
      </Group>
      <Group justify="space-between" mt="md" p="sm">
        <Group>
          <Box>
            <Text>{formattedCurrency('INR', props.totalDeposited)}</Text>
            <Text>Total deposited</Text>
          </Box>
          <Divider orientation="vertical" />
          <Box>
            <Text>{formattedCurrency('INR', props.totalWithdrawan)}</Text>
            <Text>Total withdrawn</Text>
          </Box>
        </Group>
        <Group>
          <Group>
            <FaRegCalendarDays fontSize="2em" style={{ color: ColorDao.greyColor }} />
            <Box>
              <Text>{dayjs(props.creationDate).format(DateFormatConstants.dashboard)}</Text>
              <Text>Creation date</Text>
            </Box>
            <Divider orientation="vertical" />
            <FaRegCalendarDays fontSize="2em" style={{ color: ColorDao.greyColor }} />
            <Box>
              {props.completionDate !== undefined ? (
                <Text>{dayjs(props.creationDate).format(DateFormatConstants.dashboard)}</Text>
              ) : <Text>Not set</Text>}
              <Text>Completion date</Text>
            </Box>
          </Group>
        </Group>
      </Group>
    </Stack>
  );
}

export default GoalsTab;

export interface GoalTabProps {
  goals: GoalItemDao[];
  totalDeposited: number;
  totalWithdrawan: number;
  creationDate: Date;
  completionDate?: Date;
}
