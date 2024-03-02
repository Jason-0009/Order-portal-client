import { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import useWebSocket from 'react-use-websocket'

import clearNotifications from '@/api/notification/clearNotifications'
import fetchNotifications from '@/api/notification/fetchNotifications'
import markNotificationAsRead from '@/api/notification/markNotificationAsRead'

import AppNotification from '@/types/notification/AppNotification.type'
import AppNotificationData from '@/types/notification/AppNotificationData.type'

const SOCKET_URL = `${process.env.NEXT_PUBLIC_WS_URL}/notifications`

const useNotifications = (userId: string | undefined) => {
    const { data: fetchedNotifications, isLoading } = useQuery(['notifications', userId],
        () => fetchNotifications(userId as string), {
        enabled: !!userId, refetchOnWindowFocus: false
    })

    const [notifications, setNotifications] = useState<AppNotification[] | null>(null)

    const notificationIdsRef = useRef<Set<number>>(new Set())

    const { lastMessage } = useWebSocket(SOCKET_URL)

    const handleWebSocketMessage = (message: MessageEvent) => {
        const data: AppNotificationData = JSON.parse(message.data)
        const { id, date } = data

        if (notificationIdsRef.current.has(id)) return

        const notification: AppNotification = {
            ...data,
            date: new Date(date * 1000).toISOString()
        }

        notificationIdsRef.current.add(id)

        setNotifications(previousNotifications => [notification, ...(previousNotifications || [])])
    }

    const handleFetchedNotifications = (fetchedNotifications: AppNotification[]) => {
        const uniqueFetchedNotifications = fetchedNotifications.filter(({ id }) =>
            !notificationIdsRef.current.has(id))

        notificationIdsRef.current = new Set([...notificationIdsRef.current,
        ...uniqueFetchedNotifications.map(({ id }) => id)])

        setNotifications(previousNotifications =>
            [...(previousNotifications || []), ...uniqueFetchedNotifications])
    }

    useEffect(() => {
        if (lastMessage) {
            handleWebSocketMessage(lastMessage)

            return
        }

        if (!fetchedNotifications) return

        handleFetchedNotifications(fetchedNotifications)
    }, [lastMessage, fetchedNotifications])

    const handleNotificationRead = async (notificationId: number) => {
        await markNotificationAsRead(notificationId)

        setNotifications(currentNotifications =>
            (currentNotifications || []).map(notification =>
                notification.id === notificationId ?
                    { ...notification, readStatus: true } : notification))
    }

    const clearAllNotifications = async (userId: string) => {
        await clearNotifications(userId)

        setNotifications([])

        notificationIdsRef.current.clear()
    }

    return { notifications, isLoading, handleNotificationRead, clearAllNotifications }
}

export default useNotifications
