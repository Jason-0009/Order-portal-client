import { FC, MouseEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { useTranslation } from 'next-i18next'

import {
    IconButton, Avatar, Popover, Box,
    Typography, Divider
} from '@mui/material'

import checkAuth from '@/api/checkAuth'

import fetchUserProfile from '@/api/user/fetchUserProfile'

import ConfirmButton from '../common/button/ConfirmButton'

const UserProfileMenu: FC = () => {
    const [profileMenuAnchorElement, setProfileMenuAnchorElement] = useState<HTMLElement | null>(null)
    
    const { data: isAuthenticated } = useQuery('auth', checkAuth)
    const { data: userProfile } = useQuery('userProfile', fetchUserProfile,
        { enabled: !!isAuthenticated })
    const { t: translation } = useTranslation()

    const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) =>
        setProfileMenuAnchorElement(event.currentTarget as HTMLElement)

    const handleProfileMenuClose = () => setProfileMenuAnchorElement(null)

    const handleLogout = () => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/logout`

    return (
        <>
            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                <Avatar src={userProfile?.imageUrl} />
            </IconButton>

            <Popover
                open={!!profileMenuAnchorElement}
                anchorEl={profileMenuAnchorElement}
                onClose={handleProfileMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Box sx={{
                    padding: 2,
                    width: 200,
                    backgroundColor: 'secondary.main'
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {userProfile?.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {userProfile?.email}
                    </Typography>

                    <Divider sx={{ mt: 1, mb: 2 }} />

                    <ConfirmButton
                        onClick={handleLogout}
                        size='medium'
                        text={translation('logout')}
                    />
                </Box>
            </Popover>
        </>
    )
}

export default UserProfileMenu
