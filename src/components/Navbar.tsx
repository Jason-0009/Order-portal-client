import { FC } from 'react'
import { useQuery } from 'react-query'

import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'

import { Link, AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material'
import { LocalPizza } from '@mui/icons-material'

import checkAuth from '@/api/checkAuth'

import Routes from './Routes'
import NotificationMenu from './notification/NotificationMenu'
import UserProfileMenu from './user/UserProfileMenu'

import LanguageSelector from './selector/LanguageSelector'
import ThemeSelector from './selector/ThemeSelector'

const Navbar: FC = () => {
    const { t: translation } = useTranslation()

    const { data: isAuthenticated } = useQuery('auth', checkAuth)

    return (
        <AppBar position="relative" sx={{
            fontFamily: 'Heebo',
            backgroundColor: 'secondary.main',
            backgroundImage: 'none',
            boxShadow: 'none'
        }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Link component={NextLink} href="/" color="inherit">
                    <IconButton color="inherit" disableRipple>
                        <LocalPizza />

                        <Typography variant="h6" sx={{
                            textTransform: 'uppercase',
                            textShadow: '0px 0px 10px currentColor',
                            fontWeight: 700,
                            letterSpacing: '1px',
                            ml: 1
                        }}>
                            {translation('title')}
                        </Typography>
                    </IconButton>
                </Link>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isAuthenticated && <Routes />}

                    <LanguageSelector />
                    <ThemeSelector />

                    {isAuthenticated && (
                        <>
                            <NotificationMenu />
                            <UserProfileMenu />
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
