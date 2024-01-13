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

    const { notifications, handleNotificationRead, clearAllNotifications } = useNotifications(userProfile?.id)

    const unreadNotificationCount = notifications
        .filter(notification => !notification.readStatus).length

    const handleNotificationMenuOpen = (event: MouseEvent<HTMLElement>) =>
        setNotificationMenuAnchorElement(event.currentTarget)

    const handleNotificationMenuClose = () => setNotificationMenuAnchorElement(null)

    const handleClearAllNotifications = () => {
        if (!userProfile) return

        clearAllNotifications(userProfile.id)
    }

    return (
        <>
            <IconButton onClick={handleNotificationMenuOpen} sx={{ mr: 1 }}>
                <Badge
                    badgeContent={unreadNotificationCount}
                    sx={{
                        '.MuiBadge-badge': {
                            backgroundColor: 'badgeBackground.main'
                        }
                    }}
                >
                    <Notifications sx={{
                        color: notificationMenuAnchorElement ? "text.secondary" : "text.primary"
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
                    handleClearAllNotifications={handleClearAllNotifications}
                    handleNotificationRead={handleNotificationRead}
                />
            </Popover>
        </>
    )
}

export default NotificationMenu
