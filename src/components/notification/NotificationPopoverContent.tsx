import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { NotificationsActive } from '@mui/icons-material'
import { Box, Button, CircularProgress, List, Typography } from '@mui/material'

import NotificationListItemButton from './NotificationListItemButton'

import AppNotification from '@/types/notification/AppNotification.type'

type NotificationPopoverContentProps = {
    notifications: AppNotification[] | null,
    isLoading: boolean,
    handleClearAllNotifications: () => void,
    handleNotificationRead: (notificationId: string) => Promise<void>
}

const NotificationPopoverContent: FC<NotificationPopoverContentProps> = ({
    notifications,
    isLoading,
    handleClearAllNotifications,
    handleNotificationRead
}) => {
    const { t: translation } = useTranslation()

    return (
        <Box sx={{
            backgroundColor: 'secondary.main',
            width: { xs: 150, sm: 200, lg: 250 },
            height: { xs: 150, sm: 200, lg: 250 },
            overflow: 'auto'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                pt: 2,
                pb: 1
            }}>
                <Typography variant="body1" sx={{
                    fontWeight: 600,
                    fontSize: { xs: '0.8em', sm: '0.85em', lg: '0.9em' }
                }}>
                    {translation('notifications')}
                </Typography>
            </Box>

            {isLoading ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 8
                }}>
                    <CircularProgress color="error" />
                </Box>
            ) : notifications && (
                notifications.length > 0 ? (
                    <>
                        <Button
                            onClick={handleClearAllNotifications}
                            variant="text"
                            sx={{
                                color: 'red',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: { xs: '0.65em', sm: '0.7em', lg: '0.75em' },
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
                            {notifications.map(notification =>
                                <NotificationListItemButton
                                    key={notification.id}
                                    notification={notification}
                                    handleNotificationRead={handleNotificationRead}
                                />
                            )
                            }
                        </List>
                    </>
                ) : (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: { xs: 1, sm: 3, lg: 4 }
                    }}>
                        <NotificationsActive sx={{
                            fontSize: { xs: '3em', sm: '4em', lg: '5em' },
                            mb: 0.5
                        }} />

                        <Typography variant="body2" sx={{
                            fontSize: { xs: '0.65em', sm: '0.8em', lg: '0.88em' }
                        }}>
                            {translation('noNotifications')}
                        </Typography>
                    </Box>
                )
            )}
        </Box>
    )
}

export default NotificationPopoverContent