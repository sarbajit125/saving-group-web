import { Image, Stack, Text } from '@mantine/core';

function EmptyView() {
  return (
      <Stack justify="flex-start" gap="xs" h={300}>
      <Image
        radius="md"
        h="auto"
        w="auto"
        fit="contain"
        src="https://static-00.iconduck.com/assets.00/empty-inbox-illustration-2048x1705-c6b72zjl.png"
      />
        <Text size="lg" ta="center" c="blue"> No invites</Text>
      </Stack>
  );
}

export default EmptyView;
