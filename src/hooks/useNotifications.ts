import { useState, useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import useWebSocket from 'react-use-websocket'

import fetchNotifications from '@/api/notification/fetchNotifications'
import markNotificationAsRead from '@/api/notification/markNotificationAsRead'
import clearNotifications from '@/api/notification/clearNotifications'

import AppNotification from '@/types/notification/AppNotification.type'
import AppNotificationData from '@/types/notification/AppNotificationData.type'

const SOCKET_URL = `${process.env.NEXT_PUBLIC_WS_URL}/notifications`

const useNotifications = (userId: string | undefined) => {
    const { data: fetchedNotifications, isLoading } = useQuery('notifications',
        () => fetchNotifications(userId as string), { enabled: !!userId })

    const [notifications, setNotifications] = useState<AppNotification[]>([])

    const notificationIdsRef = useRef<Set<string>>(new Set())

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

        setNotifications(previousNotifications => [notification, ...previousNotifications])
    }

    const handleFetchedNotifications = (fetchedNotifications: AppNotification[]) => {
        const uniqueFetchedNotifications = fetchedNotifications.filter(({ id }) =>
            !notificationIdsRef.current.has(id))

        if (uniqueFetchedNotifications.length === 0) return

        notificationIdsRef.current = new Set([...notificationIdsRef.current,
        ...uniqueFetchedNotifications.map(({ id }) => id)])

        setNotifications(previousNotifications =>
            [...previousNotifications, ...uniqueFetchedNotifications])
    }

    useEffect(() => {
        if (lastMessage) {
            try {
                handleWebSocketMessage(lastMessage)
            } catch (error) {
                throw error
            }
        }

        if (!fetchedNotifications) return

        handleFetchedNotifications(fetchedNotifications)
    }, [lastMessage, fetchedNotifications])

    const handleNotificationRead = async (notificationId: string) => {
        await markNotificationAsRead(notificationId)

        setNotifications(currentNotifications =>
            [...currentNotifications.map(notification =>
                notification.id === notificationId ?
                    { ...notification, readStatus: true } : notification)])
    }

    const clearAllNotifications = async (userId: string) => {
        await clearNotifications(userId)

        setNotifications([])

        notificationIdsRef.current.clear()
    }

    return {
        notifications, isLoading,
        handleNotificationRead, clearAllNotifications
    }
}

export default useNotifications
