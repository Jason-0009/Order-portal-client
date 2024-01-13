import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { Box, Button, List, Typography } from '@mui/material'
import { NotificationsActive } from '@mui/icons-material'

import NotificationListItemButton from './NotificationListItemButton'

import AppNotification from '@/types/notification/AppNotification.type'

type NotificationPopoverContentProps = {
    notifications: AppNotification[],
    handleClearAllNotifications: () => void,
    handleNotificationRead: (notificationId: string) => Promise<void>
}

const NotificationPopoverContent: FC<NotificationPopoverContentProps> = ({
    notifications,
    handleClearAllNotifications,
    handleNotificationRead
}) => {
    const { t: translation } = useTranslation()

    return (
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

            {notifications.length === 0 ? (
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
                            ml: 1,
                            py: 0.5,
                            borderRadius: '20px',
                            '&:hover': {
                                backgroundColor: 'primary.main'
                            }
                        }}
                    >
                        {translation('clearAll')}
                    </Button>

                    <List sx={{ pt: 0 }}>
                        {notifications.map(notification => {
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
    )
}

export default NotificationPopoverContent