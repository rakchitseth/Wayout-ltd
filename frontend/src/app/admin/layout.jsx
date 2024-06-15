'use client';
import { Icon2fa, IconBellRinging, IconDashboard, IconDatabaseImport, IconFingerprint, IconLogout, IconPackageExport, IconSettings, IconShirt, IconShoppingCart } from '@tabler/icons-react';
import { AppShell, Burger, Button, Checkbox, Group, RangeSlider, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react'
import classes from './sidebar.module.css';
import UserAuthoriser from '@/context/UserAuth';
import { SnackbarProvider } from 'notistack';
import Link from 'next/link';
import { IconUser } from '@tabler/icons-react';
import { UserButton } from './UserButton/UserButton';
import useAppContext from '@/context/AppContext';

const data = [
    { link: '/admin/dashboard', label: 'Dashboard', icon: IconDashboard },
    { link: '/admin/manageproduct', label: 'Manage Product', icon: IconShirt },
    { link: '/admin/manageuser', label: 'Manage User', icon: IconUser },
    { link: '/admin/addproduct', label: 'Add Product', icon: IconShirt },
    { link: '/admin/vendor', label: 'Vendor', icon: IconPackageExport },
    { link: '/admin/manage-orders', label: 'Manage Orders', icon: IconShoppingCart },
];

const Layout = ({ children }) => {

    const [active, setActive] = useState('Billing');

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const [currentUser, setCurrentUser] = useState(JSON.parse(typeof window !== 'undefined'?sessionStorage.getItem('user'):null));

    const { logout } = useAppContext();

    const links = data.map((item) => (
        <Link
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <UserAuthoriser>
                <AppShell
                    header={{ height: 0 }}
                    navbar={{
                        width: 300,
                        breakpoint: 'sm',
                        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
                    }}
                    padding="md"
                    layout="alt"
                >

                    <AppShell.Header>
                        {/* <AdminNavbar /> */}
                        <Group h="100%" px="md">
                            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />

                        </Group>
                    </AppShell.Header>

                    <AppShell.Navbar p="md">
                        <Title order={3}>Admin Options</Title>
                        {links}
                        <div className={classes.footer}>
                            {/* <UserButton user={currentUser} /> */}
                            <Button fullWidth rightSection={<IconLogout />} py={10} color='red' variant='light' onClick={logout}>Logout</Button>

                        </div>
                    </AppShell.Navbar>

                    <AppShell.Main>
                        {children}
                    </AppShell.Main>
                </AppShell>
            </UserAuthoriser>
        </SnackbarProvider>
    )
}

export default Layout