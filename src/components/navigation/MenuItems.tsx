import { FC } from 'react'

import { useQuery } from 'react-query'

import { Box } from '@mui/material'

import checkAuth from '@/api/checkAuth'

import Routes from './Routes'

import NotificationMenu from '../notification/NotificationMenu'

import UserProfileMenu from '../user/UserProfileMenu'

import LanguageSelector from '../selector/LanguageSelector'
import ThemeSelector from '../selector/ThemeSelector'

const MenuItems: FC = () => {
    const { data: isAuthenticated } = useQuery('auth', checkAuth)

    return (
        <Box sx={{
            display: 'flex',
            alignItems: { lg: 'flex-start', xs: 'center' },
            flexDirection: { lg: 'column', xs: 'row' }
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
