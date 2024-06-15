"use client";
import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Paper, Grid, Loader, Timeline, Select, Card } from '@mantine/core';
import { IconCircleCheckFilled, IconPackageExport, IconTruck, IconTruckLoading } from '@tabler/icons-react';
import { DateInput, DatePicker, MonthPicker } from '@mantine/dates';
import './styles.css';

const ManageOrders = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(new Date());

  const fetchPaymentHistory = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/getall`);
    const data = await response.json();
    console.log(data);
    setPaymentData(data);
    setLoading(false);
  }

  const updateOrder = async (id, status) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    console.log(data);
    fetchPaymentHistory();
  }

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const getActive = (status) => {
    if (status === 'placed') return 0;
    if (status === 'shipped') return 1;
    if (status === 'ontheway') return 2;
    if (status === 'delivered') return 3;
  }

  const getLineVariant = (step, status) => {
    if (status === 'placed' && step > 0) return 'dashed';
    if (status === 'shipped' && step > 1) return 'dashed';
    if (status === 'ontheway' && step > 2) return 'dashed';
    return 'solid';
  }

  const calculateDaySale = () => {
    let total = 0;
    paymentData.forEach(order => {
      const date = new Date(order.createdAt);
      if (date.getDate() === value.getDate()) {
        total += order.details.amount / 100;
      }
    });
    return total;
  }

  const calculateMonthSale = () => {
    let total = 0;
    paymentData.forEach(order => {
      const date = new Date(order.createdAt);
      if (date.getMonth() === value.getMonth()) {
        total += order.details.amount / 100;
      }
    });
    return total;
  }

  const sortDayOrders = () => {
    return paymentData.filter(order => {
      const date = new Date(order.createdAt);
      return date.getDate() === value.getDate();
    });
  }

  const sortMonthOrders = () => {
    return paymentData.filter(order => {
      const date = new Date(order.createdAt);
      return date.getMonth() === value.getMonth();
    });
  }

  return (
    <Container size="lg">
      <Title order={1} align="center" my={20}>Order History</Title>

      <Grid>
        <Grid.Col span={4}>
          <Title order={3} align="center" weight="bold">Selected Date : </Title>
          <Title order={3} align="center" weight="bold">{value.toDateString()}</Title>
          <Card shadow="xs" padding="sm" withBorder mb={20}>
            <Text align="center">Monthly Sale</Text>
            <Title order={2} align="center" weight="bold">₹ {calculateMonthSale()}</Title>
          </Card>
          <Card shadow="xs" padding="sm" withBorder mb={20}>
            <Text align="center">Daily Sale</Text>
            <Title order={2} align="center" weight="bold">₹ {calculateDaySale()}</Title>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <DatePicker ml={40} value={value} onChange={setValue} onDateChange={sortDayOrders} />
        </Grid.Col>
        <Grid.Col span={4}>

          <MonthPicker value={value} onChange={setValue} onDateChange={sortMonthOrders} />
        </Grid.Col>
      </Grid>

      {loading ? (
        <Loader />
      ) : (
        paymentData.map((order, index) => (
          <Paper mt={30} padding="lg" shadow="md" p={20} withBorder key={order._id}>
            <Grid gutter="md" key={order._id} mb={20}>
              <Grid.Col span={6}>
                <Text size='sm' c={'dimmed'}>Shipping Address</Text>
                <Text>{order.shipping.name}</Text>
                <Text>{order.shipping.address.line1}</Text>
                <Text>{order.shipping.address.postal_code}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size='sm' c={'dimmed'}>Order Details</Text>
                <Text>Placed On: {new Date(order.createdAt).toDateString()}</Text>
                <Text>Order ID: {order._id}</Text>
                <Text>Amount: ₹{order.details.amount / 100}</Text>
                <Text>Payment Status: {order.details.status}</Text>
              </Grid.Col>
            </Grid>

            <Select my={20}
              label="Update Order Status"
              placeholder="Pick value"
              onChange={(value) => updateOrder(order._id, value)}
              data={['placed', 'shipped', 'ontheway', 'delivered']}
            />

            <Timeline active={getActive(order.status)} bulletSize={24} lineWidth={2}>
              <Timeline.Item lineVariant={getLineVariant(1, order.status)} bullet={<IconCircleCheckFilled size={16} />} title="Order Placed">
                <Text c="dimmed" size="sm">
                  Order has been placed successfully.
                </Text>
                {/* <Text size="xs" mt={4}>2 hours ago</Text> */}
              </Timeline.Item>
              <Timeline.Item lineVariant={getLineVariant(2, order.status)} bullet={<IconTruckLoading size={16} />} title="Shipped">
                <Text c="dimmed" size="sm">
                  Product has been shipped and is on the way to the customer.
                </Text>
                {/* <Text size="xs" mt={4}>2 hours ago</Text> */}
              </Timeline.Item>

              <Timeline.Item lineVariant={getLineVariant(3, order.status)} bullet={<IconTruck size={16} />} title="On the Way">
                <Text c="dimmed" size="sm">
                  Product is on the way to the customer.
                </Text>
                {/* <Text size="xs" mt={4}>52 minutes ago</Text> */}
              </Timeline.Item>

              <Timeline.Item title="Delivered" bullet={<IconPackageExport size={16} />} lineVariant="dashed">
                <Text c="dimmed" size="sm">
                  Product has been delivered to the customer.
                </Text>
                {/* <Text size="xs" mt={4}>34 minutes ago</Text> */}
              </Timeline.Item>
            </Timeline>

          </Paper>
        ))
      )}
    </Container>
  );
};

export default ManageOrders;