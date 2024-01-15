import { FC, useEffect, useRef } from 'react'

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { ListItemButton, Typography } from '@mui/material'

import { formatDistanceToNowLocale } from '@/utils/dateUtils'

import AppNotification from '@/types/notification/AppNotification.type'

type NotificationListItemProps = {
    notification: AppNotification,
    handleNotificationRead: (notificationId: string) => Promise<void>
}

const NotificationListItemButton: FC<NotificationListItemProps> = ({ notification, handleNotificationRead }) => {
    const { id, date, messageCode, readStatus, redirectUrl } = notification

    const listItemButtonRef = useRef<HTMLDivElement | null>(null)

    const router = useRouter()

    const { t: translation } = useTranslation()

    useEffect(() => {
        const currentRef = listItemButtonRef.current

        if (!currentRef) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || readStatus) return

                handleNotificationRead(id)
            },
            { threshold: 1.0 }
        )

        observer.observe(currentRef)

        return () => {
            if (!currentRef) return

            observer.unobserve(currentRef)
        }
    }, [id, readStatus, handleNotificationRead])

    const formattedDate = router.locale && formatDistanceToNowLocale(date, router.locale)

    const handleClick = () => router.push(redirectUrl)

    return (
        <ListItemButton
            onClick={handleClick}
            ref={listItemButtonRef}
            sx={{
                flexDirection: 'column',
                alignItems: 'start',
                py: 1,
                '&:hover': {
                    backgroundColor: 'primary.main'
                }
            }}
        >
            <Typography variant="body2" sx={{
                fontSize: { xs: '0.7em', sm: '0.75em', md: '0.8em', lg: '0.85em' }
            }}>
                {translation(messageCode)}
            </Typography>

            <Typography variant="caption" color="text.secondary" sx={{
                fontSize: { xs: '0.6em', sm: '0.65em', md: '0.7em', lg: '0.75em' }
            }}>
                {formattedDate}
            </Typography>
        </ListItemButton>
    )
}

export default NotificationListItemButton
