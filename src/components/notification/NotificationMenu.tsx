import { FC, Fragment, MouseEvent, useState } from 'react'

import { useTranslation } from 'next-i18next'

import {
    IconButton, Badge, Popover, Box,
    Typography, Button, List, Divider
} from '@mui/material'

import { Notifications, NotificationsActive } from '@mui/icons-material'

import useAuth from '@/hooks/useAuth'
import useNotifications from '@/hooks/useNotifications'
import useUserProfile from '@/hooks/user/useUserProfile'

import NotificationListItemButton from './NotificationListItemButton'

const NotificationMenu: FC = () => {
    const [notificationMenuAnchorElement,
        setNotificationMenuAnchorElement] = useState<HTMLElement | null>(null)

    const { isAuthenticated } = useAuth()
    const { notifications, handleNotificationRead, clearAllNotifications } = useNotifications()
    const { userProfile } = useUserProfile(isAuthenticated)
    const { t: translation } = useTranslation()

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
                <Box sx={{
                    backgroundColor: 'secondary.main',
                    width: 250,
                    height: 250,
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        borderRadius: '8px',
                        backgroundColor: 'secondary.main',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        borderRadius: '8px',
                        backgroundColor: 'text.primary',
                    }
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2,
                        pb: 1
                    }}>
                        <Typography variant="body1" fontWeight={600}>
                            {translation('notifications')}
                        </Typography>
                    </Box>

                    {notifications?.length === 0 ? (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mt: 4
                        }}>
                            <NotificationsActive sx={{ fontSize: '5em', mb: 0.5 }} />

                            <Typography variant="body2">
                                {translation('noNotifications')}
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            <Button
                                onClick={handleClearAllNotifications}
                                variant="text"
                                sx={{
                                    color: 'red',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.75rem',
                                    ml: 1
                                }}
                            >
                                {translation('clearAll')}
                            </Button>

                            <List sx={{ pt: 0 }}>
                                {notifications.map((notification, index) => {
                                    const { id } = notification

                                    return (
                                        <NotificationListItemButton
                                            key={id}
                                            notification={notification}
                                            handleNotificationRead={handleNotificationRead}
                                        />
                                    )
                                })}
                            </List>
                        </>
                    )}
                </Box>
            </Popover>
        </>
    )
}

export default NotificationMenu
