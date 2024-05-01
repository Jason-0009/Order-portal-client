import { ChangeEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import useWebSocket from 'react-use-websocket'

import fetchOrders from '@/api/order/fetchOrders'

import PagedResponse from '@/types/PagedResponse.type'
import Order from '@/types/order/Order.type'
import OrderStatus from '@/types/order/OrderStatus.enum'

const SOCKET_URL = `${process.env.NEXT_PUBLIC_WS_URL}/orders`

const useOrders = (url: string) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredDate, setFilteredDate] = useState<Date | null>(null)
    const [filteredStatus, setFilteredStatus] = useState<OrderStatus | null>(null)

    const { data: fetchedOrders, isLoading, error, refetch } = useQuery(
        ['orders', currentPage, filteredDate, filteredStatus],
        () => fetchOrders(url, currentPage - 1, filteredDate, filteredStatus),
        { keepPreviousData: true, refetchOnWindowFocus: false, retry: 0 }
    )

    const [currentOrders, setCurrentOrders] = useState<PagedResponse<Order> | null>(null)
    const { lastMessage } = useWebSocket(SOCKET_URL)

    useEffect(() => {
        if (!fetchedOrders) return

        setCurrentOrders(fetchedOrders)

        if (!lastMessage) return

        refetch()
    }, [fetchedOrders, lastMessage, currentPage, refetch])

    const handlePageChange = (_: ChangeEvent<unknown>, page: number) => setCurrentPage(page)

    const setFilteredDateAndResetPage = (date: Date | null) => {
        setFilteredDate(date)
        setCurrentPage(1)
    }

    const setFilteredStatusAndResetPage = (status: OrderStatus | null) => {
        setFilteredStatus(status)
        setCurrentPage(1)
    }

    return {
        currentOrders,
        isLoading,
        error,
        currentPage,
        handlePageChange,
        filteredDate,
        setFilteredDateAndResetPage,
        filteredStatus,
        setFilteredStatusAndResetPage
    }
}

export default useOrders
