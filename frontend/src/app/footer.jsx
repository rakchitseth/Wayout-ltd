import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';

import classes from './FooterLinks.module.css';
import Link from 'next/link';

const data = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', link: '/' },
      { label: 'About', link: '/footer/about' },
      { label: 'Contact Us', link: '/Contactus' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'Privacy Policy', link: '/footer/privacy' },
      { label: 'Terms & Condition', link: '/footer/terms' },
      { label: 'Shipping Policy', link: '/footer/shipping' },
      { label: 'Return & Refunds', link: '/footer/return' },
    ],
  },
  // {
  //   title: 'Community',
  //   links: [
  //     { label: 'Join Discord', link: '#' },
  //     { label: 'Follow on Twitter', link: '#' },
  //     { label: 'Email newsletter', link: '#' },
  //     { label: 'GitHub discussions', link: '#' },
  //   ],
  // },
];

const  FooterLinks = () => {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className={classes.link}
        component={Link}
        href={link.link}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          {/* <MantineLogo size={30} /> */}
          <Text size="xs" c="dimmed" className={classes.description}>
           The Wayout to your fashion
          </Text>
          <Text size="xs" c="dimmed" className={classes.description}>
            
          </Text>
          <img  src="https://wayoutwebapp.web.app/static/media/Final%20Logo.659ab236dcd241067c99.png" alt="" width={200} />
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 Wayout ltd All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}

export default FooterLinks;