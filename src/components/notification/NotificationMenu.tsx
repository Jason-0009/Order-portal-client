import { FC, Fragment, MouseEvent, useState } from 'react'

import {
    IconButton, Badge, Popover, Box,
    Typography, Button, List, Divider
} from '@mui/material'

import { Notifications, NotificationsActive } from '@mui/icons-material'

import useAuth from '@/hooks/useAuth'
import useNotifications from '@/hooks/useNotifications'
import useUserProfile from '@/hooks/user/useUserProfile'

import NotificationListItem from './NotificationListItem'

const NotificationMenu: FC = () => {
    const [notificationMenuAnchorElement, setNotificationMenuAnchorElement] = useState<HTMLElement | null>(null)

    const { isAuthenticated } = useAuth()
    const { notifications, handleNotificationRead, clearAllNotifications } = useNotifications()
    const { userProfile } = useUserProfile(isAuthenticated)

    const handleNotificationMenuOpen = (event: MouseEvent<HTMLElement>) =>
        setNotificationMenuAnchorElement(event.currentTarget)

    const handleNotificationMenuClose = () => setNotificationMenuAnchorElement(null)

    return (
        <Box>
            <IconButton
                color={'inherit'}
                onClick={handleNotificationMenuOpen}
            >
                <Badge
                    badgeContent={notifications.filter(notification => !notification.readStatus).length}
                    sx={{
                        '.MuiBadge-badge': {
                            backgroundColor: 'darkred'
                        }
                    }}
                >
                    <Notifications sx={{ color: notificationMenuAnchorElement ? "black" : "white" }} />
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
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 2,
                    mb: 1
                }}>
                    <Typography variant="body1" fontWeight={600}>
                        Notifiche
                    </Typography>
                </Box>

                {notifications?.length === 0 ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        px: 2,
                        pb: 2,
                        fontSize: '1.5em'
                    }}>
                        <NotificationsActive sx={{ fontSize: '2em' }} />

                        <Typography variant="body2">
                            Ancora nessuna notifica
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{
                        maxWidth: 250,
                        maxHeight: 300,
                        overflow: 'auto',
                        mt: '-0.em',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                            borderRadius: '8px',
                            backgroundColor: '#F5F5F5',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: '8px',
                            backgroundColor: '#C1C1C1',
                        }
                    }}>
                        <Button
                            onClick={() => userProfile && clearAllNotifications(userProfile.id)}
                            variant="text"
                            sx={{
                                color: 'grey.700',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                p: 0.5,
                                ml: 1.5
                            }}
                        >
                            Cancella tutto
                        </Button>

                        <List sx={{ pt: 0 }}>
                            {notifications.map((notification, index) => {
                                const { id } = notification

                                return (
                                    <Fragment key={id}>
                                        <NotificationListItem
                                            notification={notification}
                                            handleNotificationRead={handleNotificationRead}
                                        />

                                        {index < notifications.length - 1 && <Divider />}
                                    </Fragment>
                                )
                            })}
                        </List>
                    </Box>
                )}
            </Popover>
        </Box>
    )
}

export default NotificationMenu
