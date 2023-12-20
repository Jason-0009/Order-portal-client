import { FC, useEffect, useRef } from 'react'

import { ListItem, Typography } from '@mui/material'

import { formatDistanceToNow } from 'date-fns'
import { it } from 'date-fns/locale'

import AppNotification from '@/types/notification/AppNotification.type'

type NotificationListItemProps = {
    notification: AppNotification,
    handleNotificationRead: (notificationId: string) => Promise<void>
}

const NotificationListItem: FC<NotificationListItemProps> = ({ notification, handleNotificationRead }) => {
    const { id, date, message, readStatus } = notification

    const listItemRef = useRef<HTMLLIElement | null>(null)

    useEffect(() => {
        if (!listItemRef.current) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || readStatus) return

                handleNotificationRead(id)
            },
            { threshold: 1.0 }
        )

        observer.observe(listItemRef.current)

        return () => {
            if (!listItemRef.current) return

            observer.unobserve(listItemRef.current)
        }
    }, [id, readStatus])

    const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true, locale: it })

    return (
        <ListItem
            ref={listItemRef}
            sx={{ flexDirection: 'column', alignItems: 'start' }}
        >
            <Typography variant="body2">
                {message}
            </Typography>

            <Typography variant="caption" color="text.secondary">
                {formattedDate}
            </Typography>
        </ListItem>
    )
}

export default NotificationListItem
