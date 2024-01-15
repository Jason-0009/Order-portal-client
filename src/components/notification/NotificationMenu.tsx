import { FC, MouseEvent, useState } from 'react'
import { useQuery } from 'react-query'

import {
    IconButton, Badge, Popover
} from '@mui/material'

import { Notifications } from '@mui/icons-material'

import useNotifications from '@/hooks/useNotifications'

import checkAuth from '@/api/checkAuth'
import fetchUserProfile from '@/api/user/fetchUserProfile'

import NotificationPopoverContent from './NotificationPopoverContent'

const NotificationMenu: FC = () => {
    const [notificationMenuAnchorElement,
        setNotificationMenuAnchorElement] = useState<HTMLElement | null>(null)

    const { data: isAuthenticated } = useQuery('auth', checkAuth)
    const { data: userProfile } = useQuery('userProfile', fetchUserProfile,
        { enabled: !!isAuthenticated })

    const { notifications, isLoading,
        handleNotificationRead, clearAllNotifications } = useNotifications(userProfile?.id)

    const unreadNotificationCount = notifications?.filter(notification => !notification.readStatus).length

    const handleNotificationMenuOpen = (event: MouseEvent<HTMLElement>) =>
        setNotificationMenuAnchorElement(event.currentTarget)

    const handleNotificationMenuClose = () => setNotificationMenuAnchorElement(null)

    const handleClearAllNotifications = () => {
        if (!userProfile) return

        clearAllNotifications(userProfile.id)
    }

    return (
        <>
            <IconButton onClick={handleNotificationMenuOpen} sx={{
                mr: 1,
                '&:hover': {
                    backgroundColor: 'primary.main',
                }
            }}>
                <Badge
                    badgeContent={unreadNotificationCount}
                    sx={{
   
                        '.MuiBadge-badge': {
                            backgroundColor: 'badgeBackground.main'
                        }
                    }}
                >
                    <Notifications sx={{
                        color: notificationMenuAnchorElement ? "text.secondary" : "text.primary",
                        fontSize: { xs: '0.8em', sm: '0.9em', md: '1em' }
                    }} />
                </Badge>
            </IconButton>

            <Popover
                open={!!notificationMenuAnchorElement}
                anchorEl={notificationMenuAnchorElement}
                onClose={handleNotificationMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <NotificationPopoverContent
                    notifications={notifications}
                    isLoading={isLoading}
                    handleClearAllNotifications={handleClearAllNotifications}
                    handleNotificationRead={handleNotificationRead}
                />
            </Popover>
        </>
    )
}

export default NotificationMenu
