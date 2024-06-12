import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { useRouter } from 'next/navigation';

export function UserButton({ user }) {

  const router = useRouter();

  return (
    <UnstyledButton className={classes.user}
      onClick={() => router.push('/user/profile')}
    >
      <Group>
        <Avatar
          src={`${process.env.NEXT_PUBLIC_API_URL}/${user.avatar}`}
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user.name}
          </Text>

          <Text c="dimmed" size="xs">
            {user.email}
          </Text>
        </div>

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}