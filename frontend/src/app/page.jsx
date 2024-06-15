'use client';
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

import { Pagination, Autoplay } from 'swiper/modules';
import { Navbar } from './navbar';
import { Avatar, Box, Container, Grid, Group, Rating, Text, Title, px, rem, useMantineTheme } from '@mantine/core';
import classes from './page.module.css';
import Link from 'next/link';
import Features from './Features';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';
import ProductCard from './(main)/browse/ProductCard';
import { useRef } from 'react';

const VideoPLayer = () => {
  const videoRef= useRef(null);

  useEffect(() => {
    if (videoRef.current){
      videoRef.current.play();
      } 
  }, []);
  
  return (
    <div className='video-container'>
    <video ref={videoRef} autoPlay loop playsInline  width="100%" height="100%">
      <source src="https://wayoutwebapp.web.app/static/media/wayout_landmark.6d62dcd43cb5b2353d9c.mp4" type="video/mp4" />
    </video>
    </div>
  )

}

const TestimonialCard = () => {
  return <Box>
    <Rating value={4} />
    <Text size="lg" mt={5} mb={5}>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore autem repellat iusto minima quasi, officia quam vel eveniet maiores cupiditate.
    </Text>
    <Group>
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
        radius="xl"
      />

      <div style={{ flex: 1 }}>
        <Text size="sm" fw={500}>
          Harriette Spoonlicker
        </Text>

        <Text c="dimmed" size="xs">
          hspoonlicker@outlook.com
        </Text>
      </div>
    </Group>
  </Box>
}
const Home = () => {

  const theme = useMantineTheme();
  const [productList, setProductList] = useState([]);

  const fetchProduct = () => {
    if (window !== undefined) {
      //   setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/getall`)
        .then((result) => result.json())
        .then(data => {
          console.log(data);
          setProductList(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [])


  return (
    <>
      <Navbar />
      <VideoPLayer />
      {/* <div className='video-container'>  
      <video ref={videoRef} autoplay loop playsinline  width="100%" height="100%">
        <source src="https://wayoutwebapp.web.app/static/media/wayout_landmark.6d62dcd43cb5b2353d9c.mp4" type="video/mp4" />

      </video>
      </div> */}
      
        

      {/* <Container p={10} size={'xl'}>
        <Grid gutter="lg">
          {
            categoryData.map(category => (
              <Grid.Col span={{ md: 2, sm: 6 }}>
                <img className={classes.categoryIcon} src={category.image} alt="" />
                <Title order={3} align="center">{category.name}</Title>
              </Grid.Col>
            ))
          }
        </Grid>
      </Container> */}
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide><img src="https://cdn.shopify.com/s/files/1/0514/9494/4962/files/bluorng_desktop_12.jpg?v=1714640036" alt="" /></SwiperSlide>
        {/* <SwiperSlide> <video src="/wayout.mp4"></video> </SwiperSlide> */}
      </Swiper>
      <Title order={1} align="center">Collections </Title>
      <div>
        <Container p={10} size={'xl'}>
          {/* <Title order={1} align="center">The World&apos;s #1 Embroidery On A Fabric -&quot;ChikanKari&quot;</Title> */}
          {/* <Text align="center">From #1 Chikankari Brand- CK Sewa Chikan Industries</Text> */}
          {/* <Title order={1} align="center">Best Seller</Title> */}
          <Grid>
            {productList.slice(0, 4).map(product => (
              <Grid.Col span={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={product._id}>
                <ProductCard productData={product} key={product._id} />
              </Grid.Col>
            ))}
          </Grid>

        </Container>

      </div>


      
      <Title order={1} align="center">Our Facilities</Title>
      <Features />
      {/* <Container py={20}>
        <Title order={1} align="center">Customer Reviews</Title>
        <Carousel
          slideSize={{ base: '100%', sm: '50%' }}
          slideGap={{ base: rem(2), sm: 'xl' }}
          align="start"
          slidesToScroll={1}
        >
          <Carousel.Slide>
            <TestimonialCard />
          </Carousel.Slide>
          <Carousel.Slide>
            <TestimonialCard />
          </Carousel.Slide>
          <Carousel.Slide>
            <TestimonialCard />
          </Carousel.Slide>
          <Carousel.Slide>
            <TestimonialCard />
          </Carousel.Slide>
        </Carousel>
      </Container> */}
    </>
  );
}



export default Home;