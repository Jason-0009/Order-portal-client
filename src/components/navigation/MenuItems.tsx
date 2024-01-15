import { FC } from 'react'

import { useQuery } from 'react-query'

import { Box, Theme, useMediaQuery } from '@mui/material'

import checkAuth from '@/api/checkAuth'

import Routes from './Routes'

import NotificationMenu from '../notification/NotificationMenu'

import UserProfileMenu from '../user/UserProfileMenu'

import LanguageSelector from '../selector/LanguageSelector'
import ThemeSelector from '../selector/ThemeSelector'

const MenuItems: FC = () => {
    const { data: isAuthenticated } = useQuery('auth', checkAuth)
    const isMobileOrTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

    return (
        <Box sx={{
            display: 'flex',
            alignItems: isMobileOrTablet ? 'flex-start' : 'center',
            flexDirection: isMobileOrTablet ? 'column' : 'row'
        }}>
            {isAuthenticated && <Routes />}

            <Box sx={{ mr: 1 }}>
                <LanguageSelector />
                <ThemeSelector />

                {isAuthenticated && (
                    <>
                        <NotificationMenu />
                        <UserProfileMenu />
                    </>
                )}
            </Box>
        </Box>
    )
}

export default MenuItems
