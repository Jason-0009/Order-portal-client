import { FC } from 'react'

import NextLink from 'next/link'

import {
    Link, AppBar, Toolbar, Typography,
    IconButton, Box
} from '@mui/material'
import { LocalPizza } from '@mui/icons-material'

import useAuth from '@/hooks/useAuth'

import Routes from './Routes'
import NotificationMenu from './notification/NotificationMenu'
import ProfileMenu from './ProfileMenu'


const Header: FC = () => {
    const { isAuthenticated } = useAuth()

    return (
        <AppBar position="relative" color="primary" >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Link component={NextLink} href="/" color="inherit">
                    <IconButton color="inherit" disableRipple>
                        <LocalPizza />

                        <Typography variant="h6" sx={{ fontFamily: 'Train One', textTransform: 'uppercase' }}>
                            Awesome Pizza
                        </Typography>
                    </IconButton>
                </Link>

                {isAuthenticated && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Routes />
                        <NotificationMenu />
                        <ProfileMenu />
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header
