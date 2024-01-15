import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import useWebSocket from 'react-use-websocket'

import fetchOrderStatistics from '@/api/order/fetchOrderStatistics'

import OrderStatistics from '@/types/order/OrderStatistics.type'

const SOCKET_URL = `${process.env.NEXT_PUBLIC_WS_URL}/statistics`

const useOrderStatistics = () => {
    const { data: fetchedStatistics } = useQuery('statistics', fetchOrderStatistics)
    const [statistics, setStatistics] = useState<OrderStatistics | null>(null)
    const { lastMessage, sendMessage } = useWebSocket(SOCKET_URL)

    useEffect(() => {
        if (lastMessage) {
            try {
                const updatedStatistics: OrderStatistics = JSON.parse(lastMessage.data)

                setStatistics(updatedStatistics)
            } catch (error) {
                throw error
            }

            return
        }

        if (!fetchedStatistics) return

        setStatistics(fetchedStatistics)
    }, [fetchedStatistics, lastMessage])

    return { statistics, sendMessage }
}

export default useOrderStatistics
