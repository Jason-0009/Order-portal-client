import { FC, MouseEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { useSelector } from 'react-redux'

import { Badge, IconButton, Popover } from '@mui/material'

import { Notifications } from '@mui/icons-material'

import { RootState } from '@/store'

import useNotifications from '@/hooks/useNotifications'

import fetchUserProfile from '@/api/user/fetchUserProfile'

import NotificationPopoverContent from './NotificationPopoverContent'

const NotificationMenu: FC = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)
    
    const [notificationMenuAnchorElement,
        setNotificationMenuAnchorElement] = useState<HTMLElement | null>(null)

    const { data: userProfile } = useQuery('userProfile', fetchUserProfile,
        { enabled: !!isAuthenticated, refetchOnWindowFocus: false })

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
