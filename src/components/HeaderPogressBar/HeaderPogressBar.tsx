import { Avatar, Divider, Stack, Text } from '@mantine/core';
import { ColorDao } from '../../constants/colorConstant';

function HeaderProgressBar(props: HeaderProgressProps) {
  return (
    <Stack align="center">
      <Avatar>{props.index}</Avatar>
      <Text style={{ textAlign: 'center' }} c={props.isSelected ? ColorDao.bedazzledBlue : ColorDao.greyColor}>{props.name}</Text>
      <Divider orientation="vertical" size="md" />
    </Stack>
  );
}

export default HeaderProgressBar;

export interface HeaderProgressProps {
  index: string;
  name: string;
  isSelected: boolean;
}
