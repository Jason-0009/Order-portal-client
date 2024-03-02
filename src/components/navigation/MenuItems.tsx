import { FC } from 'react'

import { useSelector } from 'react-redux'

import { Box } from '@mui/material'

import { RootState } from '@/store'

import Routes from './Routes'

import NotificationMenu from '../notification/NotificationMenu'

import UserProfileMenu from '../user/UserProfileMenu'

import LanguageSelector from '../selector/LanguageSelector'
import ThemeSelector from '../selector/ThemeSelector'

const MenuItems: FC = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)

    return (
        <Box sx={{
            display: 'flex',
            alignItems: { lg: 'center', xs: 'flex-start' },
            flexDirection: { lg: 'row', xs: 'column' }
        }}>
            { isAuthenticated && <Routes /> }

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
