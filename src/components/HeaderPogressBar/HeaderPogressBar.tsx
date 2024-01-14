import { Avatar, Divider, Flex, Text } from '@mantine/core';
import { ColorDao } from '../../constants/colorConstant';

function HeaderProgressBar(props: HeaderProgressProps) {
  return (
    <Flex justify="center" align="center" p="sm" ml="sm" mr="sm" gap="xs">
      {props.items.map((item, index) => (
        <>
          <Flex direction="column" align="center" w={80}>
            <Avatar color={props.progress <= index ? ColorDao.primaryBGColor : ColorDao.greyColor}>
              {index + 1}
            </Avatar>
            <Text
              c={props.progress <= index ? ColorDao.textColor : ColorDao.textColor}
              fw={props.progress === index ? 'bold' : 'normal'}
              size="sm"
              style={{ textAlign: 'center' }}
            >
              {item}
            </Text>
          </Flex>
          {index + 1 !== props.items.length ? (
            <Divider
              size="md"
              color={props.progress <= index ? ColorDao.textColor : ColorDao.textColor}
              w={60}
            />
          ) : null}
        </>
      ))}
    </Flex>
  );
}

export default HeaderProgressBar;

export interface HeaderProgressProps {
  items: string[];
  progress: number;
}
