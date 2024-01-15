import { FC, MouseEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { useTranslation } from 'next-i18next'

import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Popover,
    Typography
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
            <IconButton color="inherit" onClick={handleProfileMenuOpen} sx={{
                '&:hover': {
                    backgroundColor: 'primary.main'
                }
            }}>
                <Avatar src={userProfile?.imageUrl} sx={{
                    width: { xs: 24, sm: 28, md: 32, lg: 36 },
                    height: { xs: 24, sm: 28, md: 32, lg: 36 }
                }} />
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
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 2,
                    width: { xs: 150, lg: 200 },
                    backgroundColor: 'secondary.main',
                    justifyContent: 'center',
                }}>
                    <Typography variant="h6" sx={{
                        fontSize: { xs: '0.9em', sm: '1em', md: '1.1em', lg: '1.2em' },
                        fontWeight: 600
                    }}>
                        {userProfile?.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{
                        fontSize: { xs: '0.7em', sm: '0.8em', md: '0.85em', lg: '0.9em' },
                        overflowWrap: 'break-word'
                    }}>
                    {userProfile?.email}
                </Typography>

                <Divider sx={{ mt: 1, mb: 2 }} />

                <ConfirmButton
                    onClick={handleLogout}
                    size='medium'
                    text={translation('logout')}
                />
            </Box>
        </Popover >
        </>
    )
}

export default UserProfileMenu
