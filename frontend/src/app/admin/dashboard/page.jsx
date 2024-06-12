'use client';
import { Box, Card, Center, Container, Grid, Group, Paper, RingProgress, Text, Title, rem } from '@mantine/core';
import { IconCheck, IconMessage, IconShirt, IconShoppingCart, IconUser } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import BarChart from '../BarChart';
import PieChart from '../PieChart';
import LineChart from '../LineChart';
import './styles.css';

// const lineData = [
//   {
//     "id": "japan",
//     "color": "hsl(244, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 177
//       },
//       {
//         "x": "helicopter",
//         "y": 178
//       },
//       {
//         "x": "boat",
//         "y": 207
//       },
//       {
//         "x": "train",
//         "y": 142
//       },
//       {
//         "x": "subway",
//         "y": 269
//       },
//       {
//         "x": "bus",
//         "y": 96
//       },
//       {
//         "x": "car",
//         "y": 197
//       },
//       {
//         "x": "moto",
//         "y": 290
//       },
//       {
//         "x": "bicycle",
//         "y": 134
//       },
//       {
//         "x": "horse",
//         "y": 55
//       },
//       {
//         "x": "skateboard",
//         "y": 160
//       },
//       {
//         "x": "others",
//         "y": 253
//       }
//     ]
//   },
//   {
//     "id": "france",
//     "color": "hsl(244, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 269
//       },
//       {
//         "x": "helicopter",
//         "y": 255
//       },
//       {
//         "x": "boat",
//         "y": 165
//       },
//       {
//         "x": "train",
//         "y": 57
//       },
//       {
//         "x": "subway",
//         "y": 55
//       },
//       {
//         "x": "bus",
//         "y": 137
//       },
//       {
//         "x": "car",
//         "y": 104
//       },
//       {
//         "x": "moto",
//         "y": 12
//       },
//       {
//         "x": "bicycle",
//         "y": 56
//       },
//       {
//         "x": "horse",
//         "y": 209
//       },
//       {
//         "x": "skateboard",
//         "y": 20
//       },
//       {
//         "x": "others",
//         "y": 102
//       }
//     ]
//   },
//   {
//     "id": "us",
//     "color": "hsl(17, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 88
//       },
//       {
//         "x": "helicopter",
//         "y": 250
//       },
//       {
//         "x": "boat",
//         "y": 69
//       },
//       {
//         "x": "train",
//         "y": 277
//       },
//       {
//         "x": "subway",
//         "y": 127
//       },
//       {
//         "x": "bus",
//         "y": 281
//       },
//       {
//         "x": "car",
//         "y": 207
//       },
//       {
//         "x": "moto",
//         "y": 37
//       },
//       {
//         "x": "bicycle",
//         "y": 127
//       },
//       {
//         "x": "horse",
//         "y": 40
//       },
//       {
//         "x": "skateboard",
//         "y": 124
//       },
//       {
//         "x": "others",
//         "y": 69
//       }
//     ]
//   },
//   {
//     "id": "germany",
//     "color": "hsl(330, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 298
//       },
//       {
//         "x": "helicopter",
//         "y": 70
//       },
//       {
//         "x": "boat",
//         "y": 156
//       },
//       {
//         "x": "train",
//         "y": 152
//       },
//       {
//         "x": "subway",
//         "y": 127
//       },
//       {
//         "x": "bus",
//         "y": 229
//       },
//       {
//         "x": "car",
//         "y": 217
//       },
//       {
//         "x": "moto",
//         "y": 61
//       },
//       {
//         "x": "bicycle",
//         "y": 143
//       },
//       {
//         "x": "horse",
//         "y": 209
//       },
//       {
//         "x": "skateboard",
//         "y": 58
//       },
//       {
//         "x": "others",
//         "y": 293
//       }
//     ]
//   },
//   {
//     "id": "norway",
//     "color": "hsl(203, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 204
//       },
//       {
//         "x": "helicopter",
//         "y": 287
//       },
//       {
//         "x": "boat",
//         "y": 249
//       },
//       {
//         "x": "train",
//         "y": 111
//       },
//       {
//         "x": "subway",
//         "y": 20
//       },
//       {
//         "x": "bus",
//         "y": 79
//       },
//       {
//         "x": "car",
//         "y": 175
//       },
//       {
//         "x": "moto",
//         "y": 13
//       },
//       {
//         "x": "bicycle",
//         "y": 54
//       },
//       {
//         "x": "horse",
//         "y": 2
//       },
//       {
//         "x": "skateboard",
//         "y": 63
//       },
//       {
//         "x": "others",
//         "y": 277
//       }
//     ]
//   }
// ]

const StatCard = ({ stat, Icon }) => {
  return <Paper withBorder radius="md" p="md" shadow='md' variant=''>
    <Group>
      <RingProgress
        size={80}
        roundCaps
        thickness={8}
        sections={[{ value: stat.progress, color: stat.color }]}
        label={
          <Center>
            <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          </Center>
        }
      />

      <div>
        <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
          {stat.label}
        </Text>
        <Text fw={700} size="xl">
          {stat.stats}
        </Text>
      </div>
    </Group>
  </Paper>
}

const Dashboard = () => {

  const [userList, setUserList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [pieColorChartData, setPieColorChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [barChartKeys, setBarChartKeys] = useState([]);
  const [ordersTimelineData, setOrdersTimelineData] = useState([]);
  const [usersTimelineData, setUsersTimelineData] = useState([]);

  const formatPieData = (data) => {
    const categoryData = {};
    data.forEach(element => {
      if (Object.keys(categoryData).includes(element.material)) {
        categoryData[element.material] += 1;
      } else {
        categoryData[element.material] = 1;
      }
    });
    // console.log(categoryData);
    const chatData = Object.keys(categoryData).map((key) => {
      return {
        id: key,
        label: key,
        value: categoryData[key],
        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
      }
    })
    // console.log(chatData);
    setPieChartData(chatData);
  }

  const formatColorPieData = (data) => {
    const categoryData = {};
    data.forEach(element => {
      if (Object.keys(categoryData).includes(element.color)) {
        categoryData[element.color] += 1;
      } else {
        categoryData[element.color] = 1;
      }
    });
    // console.log(categoryData);
    const chatData = Object.keys(categoryData).map((key) => {
      return {
        id: key,
        label: key,
        value: categoryData[key],
        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
      }
    })
    // console.log(chatData);
    setPieColorChartData(chatData);
  }

  const formatOrdersTimelineData = (data) => {
    const ordersData = {};

    // Find the oldest date
    const dates = data.map(order => new Date(order.createdAt));
    const oldestDate = new Date(Math.min.apply(null, dates));

    // Use the current date as the latest date
    const latestDate = new Date();

    // Create an array of dates for every day between the oldest date and now
    for (let d = new Date(oldestDate); d <= latestDate; d.setDate(d.getDate() + 1)) {
      ordersData[new Date(d).toDateString()] = 0;
    }

    // Count the number of orders for each date
    data.forEach(order => {
      const orderDate = new Date(order.createdAt).toDateString();
      if (ordersData[orderDate] !== undefined) {
        ordersData[orderDate] += 1;
      }
    });

    const chartData = Object.keys(ordersData).map(date => ({
      x: date,
      y: ordersData[date]
    }));

    return [{
      "id": 'No. of Orders',
      "data": chartData,
      "color": 'hsl(0, 70%, 50%)'
    }];
  }

  const formatUsersTimelineData = (data) => {
    const usersData = {};

    // Find the oldest date
    const dates = data.map(user => new Date(user.createdAt));
    const oldestDate = new Date(Math.min.apply(null, dates));

    // Use the current date as the latest date
    const latestDate = new Date();

    // Create an array of dates for every day between the oldest date and now
    for (let d = new Date(oldestDate); d <= latestDate; d.setDate(d.getDate() + 1)) {
      usersData[new Date(d).toDateString()] = 0;
    }

    // Count the number of orders for each date
    data.forEach(user => {
      const userDate = new Date(user.createdAt).toDateString();
      if (usersData[userDate] !== undefined) {
        usersData[userDate] += 1;
      }
    });

    const chartData = Object.keys(usersData).map(date => ({
      x: date,
      y: usersData[date]
    }));

    return [{
      "id": 'No. of Users',
      "data": chartData,
      "color": 'hsl(0, 70%, 50%)'
    }];
  }

  const formBarData = (data) => {
    setBarChartData(
      data.map(item => (
        {
          name: item.title,
          stock: item.stock
        }
      ))
    )

    console.log(data.map(item => (
      {
        name: item.title,
        stock: item.stock
      }
    )));

    setBarChartKeys(
      data.map(item => (
        item.title
      ))
    )
  }

  const fetchUsers = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/getall`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUserList(data);
        const temp = formatUsersTimelineData(data);
        console.log(temp);
        setUsersTimelineData(temp);
      })
  }

  const fetchOrders = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/getall`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setOrderList(data);
        const temp = formatOrdersTimelineData(data);
        console.log(temp);
        setOrdersTimelineData(temp);
      })
  }

  const fetchProducts = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/getall`)
      .then(res => res.json())
      .then(data => {
        setProductList(data);
        console.log(data);
        formatPieData(data);
        formatColorPieData(data);
        formBarData(data);
      })
  }

  const fetchFeedbacks = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback/getall`)
      .then(res => res.json())
      .then(data => {
        setFeedbackList(data);
      })
  }

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchProducts();
    fetchFeedbacks();
  }, [])


  return (
    <div>
      <Box mt={'5vh'}>

        <Grid h={'15vh'}>

          <Grid.Col span={{ base: 12, md: 4, xl: 3 }}>
            <StatCard stat={{ label: 'Total Users', stats: userList.length, progress: 10, color: 'blue' }} Icon={IconUser} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4, xl: 3 }}>
            <StatCard stat={{ label: 'Total Orders', stats: orderList.length, progress: 35, color: 'cyan' }} Icon={IconShoppingCart} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4, xl: 3 }}>
            <StatCard stat={{ label: 'Total Products', stats: productList.length, progress: 60, color: 'pink' }} Icon={IconShirt} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4, xl: 3 }}>
            <StatCard stat={{ label: 'Total Feedbacks', stats: 0, progress: 0, color: 'yellow' }} Icon={IconMessage} />
          </Grid.Col>
        </Grid>

        <Grid>

          <Grid.Col span={{ base: 12, md: 6 }} h={'40vh'}>
            <Title order={3}>Product Color Distribution</Title>
            <PieChart data={pieColorChartData} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} h={'40vh'}>
            <Title order={3}>Product Material Distribution</Title>
            <PieChart data={pieChartData} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} h={'40vh'}>
            <LineChart data={ordersTimelineData} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} h={'40vh'}>
            <LineChart data={usersTimelineData} />
          </Grid.Col>
        </Grid>
      </Box>
    </div>
  )
}

export default Dashboard;