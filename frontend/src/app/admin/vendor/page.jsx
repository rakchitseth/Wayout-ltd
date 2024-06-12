'use client';
import { TextInput, Textarea, SimpleGrid, Group, Title, Button, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { enqueueSnackbar } from 'notistack';

export default function Vendor() {
  const form = useForm({
    initialValues: {
      productName: '',
      id: '',
      quantity: '',
      latestBy: '',
      instructions: '',
    },
    validate: {
      productName: (value) => (value.trim().length < 2 ? 'Invalid ProductName' : null),
      id: (value) => (value.trim().length < 2 ? 'Invalid Id' : null),
    //   quantity: (value) => (value.trim().length === 0 ? 'Invalid Quantity' : null),
    //   latestBy: (value) => (value.length === 2 ? 'Invalid Date' : null),
        instructions: (value) => (value.trim().length < 2 ? 'Invalid Instructions' : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit(() => {
        enqueueSnackbar('Order placed successfully', { variant: 'success' });
        form.clear();
    })}>
      <Title
        order={2}
        size="h1"
        style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
        fw={900}
        ta="center"
      >
        Place Order to Vendor
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
        <TextInput
          label="Product Name"
          placeholder="Product Name"
          variant="filled"
          {...form.getInputProps('productName')}
        />
        <TextInput
          label="Id"
          placeholder="Product Unique Id"
          variant="filled"
          {...form.getInputProps('id')}
        />
      </SimpleGrid>

      <NumberInput
        label="Quantity"
        placeholder="Quantity to Order"
        mt="md"
        variant="filled"
        {...form.getInputProps('quantity')}
      />

        {/* <TextInput
        label="Date"
        placeholder="Date"
        mt="md"
        name="date"
        variant="filled"
        {...form.getInputProps('latestBy')}
        /> */}

      <Textarea
        mt="md"
        label="Instructions"
        placeholder="Your message"
        maxRows={10}
        minRows={5}
        autosize
        name="message"
        variant="filled"
        {...form.getInputProps('instructions')}
      />

      <Group justify="center" mt="xl">
        <Button type="submit" size="md">
          Send message
        </Button>
      </Group>
    </form>
  );
}