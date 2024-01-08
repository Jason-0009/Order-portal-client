import { FC, useEffect, useRef } from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Button, ListItem, ListItemButton, Typography } from '@mui/material'

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
        if (!listItemButtonRef.current) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || readStatus) return

                handleNotificationRead(id)
            },
            { threshold: 1.0 }
        )

        observer.observe(listItemButtonRef.current)

        return () => {
            if (!listItemButtonRef.current) return

            observer.unobserve(listItemButtonRef.current)
        }
    }, [id, readStatus])

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
            <Typography variant="body2" fontSize='0.85em'>
                {translation(messageCode)}
            </Typography>

            <Typography variant="caption" fontSize='0.75em' color="text.secondary">
                {formattedDate}
            </Typography>
        </ListItemButton>
    )
}

export default NotificationListItemButton
